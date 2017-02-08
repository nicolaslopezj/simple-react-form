'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (key) {
  return key.replace(/\.[0-9]+\./g, '.$.');
};