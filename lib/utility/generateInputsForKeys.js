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

  var fieldNames = (0, _reject2.default)(keys, function (key) {
    var fullKey = parent ? parent + '.' + key : key;
    var keySchema = schema.schema(fullKey);
    var options = keySchema.srf || keySchema.mrf;
    if (options && options.omit) return true;
    if ((0, _includes2.default)(omit, fullKey)) return true;
  });
  return fieldNames.map(function (key) {
    var fullKey = parent ? parent + '.' + key : key;
    return _react2.default.createElement(_Field2.default, (0, _extends3.default)({}, props, { fieldName: key, key: fullKey }));
  });
};

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

var _reject = require('lodash/reject');

var _reject2 = _interopRequireDefault(_reject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }