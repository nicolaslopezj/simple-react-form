'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _checkbox = require('material-ui/lib/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _reactForm = require('react-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultipleCheckboxComponent = function (_FieldType) {
  _inherits(MultipleCheckboxComponent, _FieldType);

  function MultipleCheckboxComponent() {
    _classCallCheck(this, MultipleCheckboxComponent);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MultipleCheckboxComponent).apply(this, arguments));
  }

  _createClass(MultipleCheckboxComponent, [{
    key: 'onCheck',
    value: function onCheck(value, currentVal) {
      var newVal = [];
      if (_.contains(currentVal, value)) {
        newVal = _.without(currentVal, value);
      } else {
        newVal = _.union(currentVal, [value]);
      }

      this.props.onChange(newVal);
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions() {
      var _this2 = this;

      var currentVal = this.props.value || [];
      return this.props.fieldSchema.mrf.options.map(function (option) {
        return _react2.default.createElement(
          'div',
          { key: option.value, style: { marginTop: 10 } },
          _react2.default.createElement(_checkbox2.default, _extends({
            checked: _.contains(currentVal, option.value),
            onCheck: function onCheck() {
              return _this2.onCheck(option.value, currentVal);
            },
            label: option.label,
            disabled: _this2.props.disabled
          }, _this2.passProps))
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { paddingBottom: 20 } },
        _react2.default.createElement(
          'div',
          { style: { marginBottom: 20 } },
          this.props.label
        ),
        _react2.default.createElement(
          'div',
          { style: { color: 'red' } },
          this.props.errorMessage
        ),
        this.renderOptions()
      );
    }
  }]);

  return MultipleCheckboxComponent;
}(_reactForm.FieldType);

(0, _reactForm.registerType)({
  type: 'multiple-checkbox',
  component: MultipleCheckboxComponent,
  allowedTypes: [[String], [Number]],
  description: 'Select multiple values with checkboxes.',
  optionsDefinition: {
    options: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
      label: _react2.default.PropTypes.string.isRequired,
      value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]).isRequired
    })).isRequired
  },
  optionsDescription: {
    options: 'The options for the checkbox. Each item must have ```label``` and ```value```.'
  }
});