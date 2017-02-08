'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.propTypes = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = exports.propTypes = {
  /**
   * The current value of the field
   */
  value: _react2.default.PropTypes.any,

  /**
   * Field label
   */
  label: _react2.default.PropTypes.any,

  /**
   * The error message if there is a error
   */
  errorMessage: _react2.default.PropTypes.string,

  /**
   * Call this function when the value changes
   */
  onChange: _react2.default.PropTypes.func.isRequired,

  /**
   * If the input is disabled
   */
  disabled: _react2.default.PropTypes.bool,

  /**
   * The schema for the field
   */
  fieldSchema: _react2.default.PropTypes.object,

  /**
   * The schema for the object
   */
  schema: _react2.default.PropTypes.object,

  /**
   * Use hint instead of label
   */
  useHint: _react2.default.PropTypes.bool,

  /**
   * Form
   */
  form: _react2.default.PropTypes.object.isRequired,

  /**
   * The name of the field
   */
  fieldName: _react2.default.PropTypes.string.isRequired,

  /**
   * The props that must be passed to the child component
   */
  passProps: _react2.default.PropTypes.object
};

var FieldType = function (_React$Component) {
  (0, _inherits3.default)(FieldType, _React$Component);

  function FieldType(props) {
    (0, _classCallCheck3.default)(this, FieldType);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FieldType.__proto__ || Object.getPrototypeOf(FieldType)).call(this, props));

    console.warn('Now you don\'t have to extend FieldType to create components');
    return _this;
  }

  return FieldType;
}(_react2.default.Component);

exports.default = FieldType;


FieldType.propTypes = propTypes;