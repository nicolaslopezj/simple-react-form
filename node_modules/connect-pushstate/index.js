'use strict';

var path = require('path');
var url = require('url');

module.exports = function(options) {
  options = options || {};

  var root = options.root || '/';
  var allow = options.allow ? new RegExp(options.allow) : false;

  return function pushState(req, res, next) {
    var pathname = url.parse(req.url).pathname;
    var allowed = allow ? allow.test(pathname) : false;
    var hasFileExtension = !!(path.extname(pathname));

    if (allowed || hasFileExtension) {
      next();
    } else {
      req.url = root;
      next();
    }
  };
};
