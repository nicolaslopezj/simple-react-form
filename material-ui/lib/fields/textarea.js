'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _textField = require('material-ui/lib/text-field');

var _textField2 = _interopRequireDefault(_textField);

var _reactForm = require('react-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextareaComponent = function (_FieldType) {
  _inherits(TextareaComponent, _FieldType);

  function TextareaComponent() {
    _classCallCheck(this, TextareaComponent);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TextareaComponent).apply(this, arguments));
  }

  _createClass(TextareaComponent, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(_textField2.default, _extends({
        ref: 'input',
        fullWidth: true,
        multiLine: true,
        rows: this.mrf.rows,
        value: this.props.value,
        floatingLabelText: this.props.useHint ? null : this.props.label,
        hintText: this.props.useHint ? this.props.label : null,
        errorText: this.props.errorMessage,
        disabled: this.props.disabled,
        onChange: function onChange(event) {
          return _this2.props.onChange(event.target.value);
        }
      }, this.passProps));
    }
  }]);

  return TextareaComponent;
}(_reactForm.FieldType);

(0, _reactForm.registerType)({
  type: 'textarea',
  component: TextareaComponent,
  allowedTypes: [String],
  description: 'Textarea',
  optionsDefinition: {
    //rows: Match.Optional(Number),
  },
  optionsDescription: {
    rows: 'The number of rows'
  },
  defaultOptions: {
    rows: 2
  }
});