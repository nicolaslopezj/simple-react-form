'use strict';

var phantomjs = require('phantomjs');
var path = require('path');
var spawn = require('child_process').spawn;

module.exports = runPhantom;

function runPhantom(uri) {
  var proc = spawn(phantomjs.path, [
    path.join(__dirname, 'phantom-script.js'),
    uri,
    '--debug=true'
  ]);
  return proc;
}
