'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  /**
   * The current value of the field
   */
  value: _react2.default.PropTypes.any,

  /**
   * Field label
   */
  label: _react2.default.PropTypes.string,

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
   * The field should be read only mode
   */
  disabled: _react2.default.PropTypes.bool
};

var FieldType = function (_React$Component) {
  _inherits(FieldType, _React$Component);

  function FieldType(props) {
    _classCallCheck(this, FieldType);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FieldType).call(this, props));

    _this.mrf = props.mrf;
    _this.passProps = props.passProps;
    _this.registerComponent();
    return _this;
  }

  _createClass(FieldType, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.mrf = nextProps.mrf;
      this.passProps = nextProps.passProps;
    }
  }, {
    key: 'registerComponent',
    value: function registerComponent() {
      this.props.form.registerComponent({
        field: this.props.fieldName,
        component: this
      });
    }
  }]);

  return FieldType;
}(_react2.default.Component);

exports.default = FieldType;


FieldType.propTypes = propTypes;