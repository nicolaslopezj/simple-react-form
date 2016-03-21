'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _datePicker = require('material-ui/lib/date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _simpleReactForm = require('simple-react-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePickerComponent = function (_FieldType) {
  _inherits(DatePickerComponent, _FieldType);

  function DatePickerComponent() {
    _classCallCheck(this, DatePickerComponent);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DatePickerComponent).apply(this, arguments));
  }

  _createClass(DatePickerComponent, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(_datePicker2.default, _extends({
        ref: 'input',
        fullWidth: true,
        value: this.props.value,
        floatingLabelText: this.props.useHint ? null : this.props.label,
        hintText: this.props.useHint ? this.props.label : null,
        errorText: this.props.errorMessage,
        disabled: this.props.disabled,
        onChange: function onChange(_, date) {
          return _this2.props.onChange(date);
        }
      }, this.passProps));
    }
  }]);

  return DatePickerComponent;
}(_simpleReactForm.FieldType);

(0, _simpleReactForm.registerType)({
  type: 'date-picker',
  component: DatePickerComponent,
  allowedTypes: [Date],
  description: 'Material UI Date picker.',
  optionsDefinition: {
    minDate: _react2.default.PropTypes.date,
    maxDate: _react2.default.PropTypes.date,
    formatDate: _react2.default.PropTypes.func
  },
  optionsDescription: {
    minDate: 'Minimum date for the picker.',
    maxDate: 'Maximum date for the picker.',
    formatDate: 'Takes the date as a parameters and must return a string.'
  }
});