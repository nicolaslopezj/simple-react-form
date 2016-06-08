'use strict';
var inspect = require('util').inspect;
var console = require('console');
var finished = require('tap-finished');
var global = require('global');
var xhr = require('xhr');
var spy = require('through2-spy');
var document = global.document;
var window = global.window;

var logArray = [];

var logStream = spy(function (chunk) {
  logArray.push(chunk);
});

logStream.pipe(finished(onTapFinished));

function onTapFinished(tapResults) {
  var body = [{
    tap: tapResults,
    consoleLog: logArray.join('')
  }];

  if (window.__coverage__) {
    body[0].coverage = window.__coverage__;
  }

  xhr({
    body: JSON.stringify(body),
    uri: '/results',
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST'
  }, function (err, resp, body) {
    if (resp.statusCode === 200) console.log('Results sent!');
    else console.log('Failed to send results!');
  });
}

function proxy(original, color) {
  return function (msg) {
    var index = 1;
    var args = arguments;

    if (typeof msg === 'string') {
      msg = msg.replace(/(^|[^%])%[sd]/g, function (_, s) {
        return s + args[index++];
      });
    }
    else msg = inspect(msg);

    for (var i = index; i < args.length; i++) {
      msg += ' ' + inspect(args[i]);
    }

    logStream.write(msg + '\n');

    var elem = document.getElementById('__testling_output');
    if (elem) {
      var span = document.createElement('span');
      var txt = document.createTextNode(msg + '\n');
      span.setAttribute('style', 'color: ' + color);
      span.appendChild(txt);
      elem.appendChild(span);
    }

    if (typeof original === 'function') {
      return original.apply(this, arguments);
    }
    else if (original) return original(arguments[0]);
  };
}

window.onerror = function (msg, url, line) {
  console.error(msg + '\n' + url + ':' + line);
};

if (typeof console === 'undefined') window.console = {};

console.log = proxy(console.log, 'black');
console.warn = proxy(console.warn, 'orange');
console.error = proxy(console.error, 'red');
