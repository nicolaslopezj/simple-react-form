'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _selectField = require('material-ui/lib/select-field');

var _selectField2 = _interopRequireDefault(_selectField);

var _menuItem = require('material-ui/lib/menus/menu-item');

var _menuItem2 = _interopRequireDefault(_menuItem);

var _colors = require('material-ui/lib/styles/colors');

var _colors2 = _interopRequireDefault(_colors);

var _simpleReactForm = require('simple-react-form');

var _styles = require('../styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectComponent = function (_FieldType) {
  _inherits(SelectComponent, _FieldType);

  function SelectComponent() {
    _classCallCheck(this, SelectComponent);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SelectComponent).apply(this, arguments));
  }

  _createClass(SelectComponent, [{
    key: 'renderItems',
    value: function renderItems() {
      return this.mrf.options.map(function (item) {
        return _react2.default.createElement(_menuItem2.default, { key: item.value, value: item.value, primaryText: item.label });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { style: _styles2.default.fieldContainer },
        _react2.default.createElement(
          'div',
          { style: _styles2.default.mirrorLabel },
          this.props.label
        ),
        _react2.default.createElement(
          _selectField2.default,
          _extends({
            value: this.props.value,
            onChange: function onChange(event, index, value) {
              return _this2.props.onChange(value);
            },
            fullWidth: true,
            disabled: this.props.disabled
          }, this.passProps),
          this.renderItems()
        ),
        _react2.default.createElement(
          'div',
          { style: _styles2.default.errorMessage },
          this.props.errorMessage
        )
      );
    }
  }]);

  return SelectComponent;
}(_simpleReactForm.FieldType);

(0, _simpleReactForm.registerType)({
  type: 'select',
  component: SelectComponent,
  allowedTypes: [String, Number],
  description: 'Simple select field.',
  optionsDefinition: {
    options: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
      label: _react2.default.PropTypes.string.isRequired,
      value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]).isRequired
    })).isRequired
  },
  optionsDescription: {
    options: 'The options for the select input. Each item must have ```label``` and ```value```.'
  }
});