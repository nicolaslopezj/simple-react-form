'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (flatDoc, keepEmptyStrings) {
  var nulls = {};

  // Loop through the flat doc
  _underscore2.default.each(flatDoc, function (val, key) {
    // If value is undefined, null, or an empty string, report this as null so it will be unset
    if (val === null) {
      nulls[key] = '';
    } else if (val === void 0) {
      nulls[key] = '';
    } else if (!keepEmptyStrings && typeof val === 'string' && val.length === 0) {
      nulls[key] = '';
    } else if (_underscore2.default.isArray(val) && (0, _cleanNulls2.default)(val, true, keepEmptyStrings).length === 0) {
      // If value is an array in which all the values recursively are undefined, null, or an empty string, report this as null so it will be unset
      nulls[key] = '';
    }
  });

  return nulls;
};

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _cleanNulls = require('./clean-nulls');

var _cleanNulls2 = _interopRequireDefault(_cleanNulls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }