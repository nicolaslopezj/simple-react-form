'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _textField = require('material-ui/lib/text-field');

var _textField2 = _interopRequireDefault(_textField);

var _colors = require('material-ui/lib/styles/colors');

var _colors2 = _interopRequireDefault(_colors);

var _reactForm = require('react-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxComponent = function (_FieldType) {
  _inherits(CheckboxComponent, _FieldType);

  function CheckboxComponent() {
    _classCallCheck(this, CheckboxComponent);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CheckboxComponent).apply(this, arguments));
  }

  _createClass(CheckboxComponent, [{
    key: 'checkedIcon',
    value: function checkedIcon() {
      return _react2.default.createElement(
        _textField2.default,
        { className: 'material-icons' },
        'check_box'
      );
    }
  }, {
    key: 'unCheckedIcon',
    value: function unCheckedIcon() {
      return _react2.default.createElement(
        _textField2.default,
        { className: 'material-icons' },
        'check_box_outline_blank'
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { style: { paddingTop: 10, paddingBottom: 10 } },
        _react2.default.createElement(_textField2.default, _extends({
          label: this.props.label,
          disabled: this.props.disabled,
          checked: this.props.value,
          onCheck: function onCheck() {
            return _this2.props.onChange(!_this2.props.value);
          },
          checkedIcon: this.checkedIcon(),
          unCheckedIcon: this.unCheckedIcon()
        }, this.passProps)),
        _react2.default.createElement(
          'span',
          { style: { color: _colors2.default.red500 } },
          this.props.errorMessage
        )
      );
    }
  }]);

  return CheckboxComponent;
}(_reactForm.FieldType);

(0, _reactForm.registerType)({
  type: 'checkbox',
  component: CheckboxComponent,
  allowedTypes: [Boolean],
  description: 'Simple checkbox field.',
  optionsDefinition: {},
  optionsDescription: {}
});

(0, _reactForm.registerType)({
  type: 'boolean',
  component: CheckboxComponent
});