'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isBasicObject = function isBasicObject(obj) {
  return (0, _isObject2.default)(obj) && Object.getPrototypeOf(obj) === Object.prototype;
};

var isNullUndefinedOrEmptyString = function isNullUndefinedOrEmptyString(val) {
  return val === void 0 || val === null || typeof val === 'string' && val.length === 0;
};

var cleanNulls = function cleanNulls(doc, docIsArray, keepEmptyStrings) {
  var newDoc = docIsArray ? [] : {};
  (0, _each2.default)(doc, function (val, key) {
    if (!(0, _isArray2.default)(val) && isBasicObject(val)) {
      val = cleanNulls(val, false, keepEmptyStrings); // Recurse into plain objects
      if (!(0, _isEmpty2.default)(val)) {
        newDoc[key] = val;
      }
    } else if ((0, _isArray2.default)(val)) {
      val = cleanNulls(val, true, keepEmptyStrings); // Recurse into non-typed arrays
      if (!(0, _isEmpty2.default)(val)) {
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