'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  children: _react2.default.PropTypes.any,
  fieldName: _react2.default.PropTypes.string.isRequired
};

var childContextTypes = {
  parentFieldName: _react2.default.PropTypes.string
};

var ArrayContextItem = function (_React$Component) {
  (0, _inherits3.default)(ArrayContextItem, _React$Component);

  function ArrayContextItem() {
    (0, _classCallCheck3.default)(this, ArrayContextItem);
    return (0, _possibleConstructorReturn3.default)(this, (ArrayContextItem.__proto__ || Object.getPrototypeOf(ArrayContextItem)).apply(this, arguments));
  }

  (0, _createClass3.default)(ArrayContextItem, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        parentFieldName: this.props.fieldName
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.props.children
      );
    }
  }]);
  return ArrayContextItem;
}(_react2.default.Component);

exports.default = ArrayContextItem;


ArrayContextItem.propTypes = propTypes;
ArrayContextItem.childContextTypes = childContextTypes;