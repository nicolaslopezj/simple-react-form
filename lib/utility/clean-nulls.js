'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isBasicObject = function isBasicObject(obj) {
  return _underscore2.default.isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;
};

var isNullUndefinedOrEmptyString = function isNullUndefinedOrEmptyString(val) {
  return val === void 0 || val === null || typeof val === 'string' && val.length === 0;
};

var cleanNulls = function cleanNulls(doc, isArray, keepEmptyStrings) {
  var newDoc = isArray ? [] : {};
  _underscore2.default.each(doc, function (val, key) {
    if (!_underscore2.default.isArray(val) && isBasicObject(val)) {
      val = cleanNulls(val, false, keepEmptyStrings); // Recurse into plain objects
      if (!_underscore2.default.isEmpty(val)) {
        newDoc[key] = val;
      }
    } else if (_underscore2.default.isArray(val)) {
      val = cleanNulls(val, true, keepEmptyStrings); // Recurse into non-typed arrays
      if (!_underscore2.default.isEmpty(val)) {
        newDoc[key] = val;
      }
    } else if (!isNullUndefinedOrEmptyString(val)) {
      newDoc[key] = val;
    } else if (keepEmptyStrings && typeof val === 'string' && val.length === 0) {
      newDoc[key] = val;
    }
  });

  return newDoc;
};

exports.default = cleanNulls;