'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _textField = require('material-ui/lib/text-field');

var _textField2 = _interopRequireDefault(_textField);

var _simpleReactForm = require('simple-react-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextFieldComponent = function (_FieldType) {
  _inherits(TextFieldComponent, _FieldType);

  function TextFieldComponent(props) {
    _classCallCheck(this, TextFieldComponent);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextFieldComponent).call(this, props));

    _this.state = { value: props.value };
    return _this;
  }

  _createClass(TextFieldComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ value: nextProps.value });
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(event) {
      if (event.keyCode == 13) {
        this.props.onChange(this.state.value);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var type = this.mrf.type || this.type;
      return _react2.default.createElement(_textField2.default, _extends({
        ref: 'input',
        fullWidth: true,
        value: this.state.value,
        type: type,
        floatingLabelText: this.props.useHint ? null : this.props.label,
        hintText: this.props.useHint ? this.props.label : null,
        errorText: this.props.errorMessage,
        disabled: this.props.disabled,
        onChange: function onChange(event) {
          return _this2.setState({ value: event.target.value });
        },
        onKeyDown: this.onKeyDown.bind(this),
        onBlur: function onBlur() {
          return _this2.props.onChange(_this2.state.value);
        }
      }, this.passProps));
    }
  }]);

  return TextFieldComponent;
}(_simpleReactForm.FieldType);

(0, _simpleReactForm.registerType)({
  type: 'text',
  component: TextFieldComponent,
  description: 'Simple checkbox field.',
  optionsDefinition: {
    //type: Match.Optional(String),
  },
  optionsDescription: {
    type: 'Input type, it can be email, password, etc.'
  }
});

var StringFieldComponent = function (_TextFieldComponent) {
  _inherits(StringFieldComponent, _TextFieldComponent);

  function StringFieldComponent(props) {
    _classCallCheck(this, StringFieldComponent);

    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(StringFieldComponent).call(this, props));

    _this3.type = 'text';
    return _this3;
  }

  return StringFieldComponent;
}(TextFieldComponent);

(0, _simpleReactForm.registerType)({
  type: 'string',
  component: StringFieldComponent
});

var NumberFieldComponent = function (_TextFieldComponent2) {
  _inherits(NumberFieldComponent, _TextFieldComponent2);

  function NumberFieldComponent(props) {
    _classCallCheck(this, NumberFieldComponent);

    var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(NumberFieldComponent).call(this, props));

    _this4.type = 'number';
    return _this4;
  }

  return NumberFieldComponent;
}(TextFieldComponent);

(0, _simpleReactForm.registerType)({
  type: 'number',
  component: NumberFieldComponent
});

var DateFieldComponent = function (_TextFieldComponent3) {
  _inherits(DateFieldComponent, _TextFieldComponent3);

  function DateFieldComponent(props) {
    _classCallCheck(this, DateFieldComponent);

    var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(DateFieldComponent).call(this, props));

    _this5.type = 'date';
    return _this5;
  }

  return DateFieldComponent;
}(TextFieldComponent);

(0, _simpleReactForm.registerType)({
  type: 'date',
  component: DateFieldComponent
});