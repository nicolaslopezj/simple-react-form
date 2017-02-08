'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (doc, fields) {
  var newDoc = {};
  _underscore2.default.each(doc, function (val, key) {
    var keys = key.split('.').reduce(function (memo, value) {
      var last = _underscore2.default.last(memo);
      var pre = last ? last + '.' : '';
      return _underscore2.default.union(memo, [pre + value]);
    }, []);
    var contains = false;
    keys.forEach(function (newKey) {
      if (_underscore2.default.contains(fields, newKey)) {
        contains = true;
      }
    });
    if (contains) {
      newDoc[key] = val;
    }
  });

  return newDoc;
};

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }