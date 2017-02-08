'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = function (keys) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var schema = arguments[2];
  var omit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var props = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  var fieldNames = _underscore2.default.reject(keys, function (key) {
    var fullKey = parent ? parent + '.' + key : key;
    var keySchema = schema.schema(fullKey);
    var options = keySchema.srf || keySchema.mrf;
    if (options && options.omit) return true;
    if (_underscore2.default.contains(omit, fullKey)) return true;
  });
  return fieldNames.map(function (key) {
    var fullKey = parent ? parent + '.' + key : key;
    return _react2.default.createElement(_Field2.default, (0, _extends3.default)({}, props, { fieldName: key, key: fullKey }));
  });
};

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }