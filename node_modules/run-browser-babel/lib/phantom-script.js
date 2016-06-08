'use strict';
var args = require('system').args;
var webpage = require('webpage');

var url = args[1];
var page = webpage.create();

page.onConsoleMessage = function (msg) {
  console.log(msg);
};

page.open(url, function (status) {});
