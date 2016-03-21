'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _toggle = require('material-ui/lib/toggle');

var _toggle2 = _interopRequireDefault(_toggle);

var _reactForm = require('react-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToggleComponent = function (_FieldType) {
  _inherits(ToggleComponent, _FieldType);

  function ToggleComponent() {
    _classCallCheck(this, ToggleComponent);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ToggleComponent).apply(this, arguments));
  }

  _createClass(ToggleComponent, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_toggle2.default, _extends({
          label: this.props.label,
          fullWidth: true,
          defaultToggled: !!this.props.value,
          disabled: this.props.disabled,
          onToggle: function onToggle() {
            return _this2.props.onChange(!_this2.props.value);
          }
        }, this.passProps)),
        _react2.default.createElement(
          'div',
          { style: styles.errorMessage },
          this.props.errorMessage
        )
      );
    }
  }]);

  return ToggleComponent;
}(_reactForm.FieldType);

(0, _reactForm.registerType)({
  type: 'toggle',
  component: ToggleComponent,
  allowedTypes: Boolean,
  description: 'Material UI toggle.'
});