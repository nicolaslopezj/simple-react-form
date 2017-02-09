'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (doc, fields) {
  var newDoc = {};
  (0, _each2.default)(doc, function (val, key) {
    var keys = key.split('.').reduce(function (memo, value) {
      var lastItem = (0, _last2.default)(memo);
      var pre = lastItem ? lastItem + '.' : '';
      return (0, _union2.default)(memo, [pre + value]);
    }, []);
    var contains = false;
    keys.forEach(function (newKey) {
      if ((0, _includes2.default)(fields, newKey)) {
        contains = true;
      }
    });
    if (contains) {
      newDoc[key] = val;
    }
  });

  return newDoc;
};

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _last = require('lodash/last');

var _last2 = _interopRequireDefault(_last);

var _union = require('lodash/union');

var _union2 = _interopRequireDefault(_union);

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }