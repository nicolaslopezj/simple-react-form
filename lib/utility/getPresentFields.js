'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (fields) {
  return (0, _filter2.default)(fields, function (field) {
    var props = field.component.props;
    return !props.disabled;
  }).map(function (field) {
    return field.field;
  });
};

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }