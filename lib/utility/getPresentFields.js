'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (fields) {
  return _underscore2.default.filter(fields, function (field) {
    var props = field.component.props;
    return !props.disabled;
  }).map(function (field) {
    return field.field;
  });
};

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }