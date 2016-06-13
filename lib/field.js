'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  /**
   * The value of the field.
   */
  value: _react2.default.PropTypes.any,

  /**
   * The label of the field.
   */
  label: _react2.default.PropTypes.string,

  /**
   * The simple schema
   */
  schema: _react2.default.PropTypes.object,

  /**
   * Error message if there is a error.
   */
  errorMessage: _react2.default.PropTypes.string,

  /**
   * The name of the field in the object.
   */
  fieldName: _react2.default.PropTypes.string.isRequired,

  /**
   * Call this function when the value changes.
   */
  onChange: _react2.default.PropTypes.func,

  /**
   * Should show label
   */
  showLabel: _react2.default.PropTypes.bool,

  /**
   * Use hint instead of label.
   */
  useHint: _react2.default.PropTypes.bool,

  /**
   * The field should be read only mode.
   */
  disabled: _react2.default.PropTypes.bool,

  /**
   * The type of the input.
   */
  type: _react2.default.PropTypes.string,

  /**
   * The parent form element.
   */
  form: _react2.default.PropTypes.any,

  /**
   * The error message for the form.
   */
  errorMessages: _react2.default.PropTypes.object
};

var defaultProps = {
  showLabel: true,
  useHint: false,
  disabled: false
};

var Field = function (_React$Component) {
  _inherits(Field, _React$Component);

  function Field(props) {
    _classCallCheck(this, Field);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Field).call(this, props));

    if (!props.schema && !props.type) {
      throw new Error('You must set the type for the field "' + props.fieldName + '" or pass a schema to the form');
    }
    return _this;
  }

  _createClass(Field, [{
    key: 'onChange',
    value: function onChange(value) {
      this.props.onChange(this.props.fieldName, value);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var notImportantFields = ['errorMessages', 'form', 'schema', 'onChange'];
      var isPropsEqual = _.isEqual(_.omit(this.props, notImportantFields), _.omit(nextProps, notImportantFields));
      return !isPropsEqual;
    }
  }, {
    key: 'getSchema',
    value: function getSchema() {
      return this.props.schema;
    }
  }, {
    key: 'getFieldSchema',
    value: function getFieldSchema() {
      return this.getSchema() ? this.getSchema().schema(this.props.fieldName) : null;
    }
  }, {
    key: 'getLabel',
    value: function getLabel() {
      if (_.has(this.props, 'label')) {
        return this.props.label;
      } else if (this.getSchema()) {
        return this.getSchema().label(this.props.fieldName);
      } else {
        return '';
      }
    }
  }, {
    key: 'getComponent',
    value: function getComponent() {
      var component = null;
      if (this.props.type) {
        component = (0, _types.getFieldType)(this.props.type).component;
      } else {
        component = (0, _types.getFieldComponent)({
          fieldName: this.props.fieldName,
          schema: this.getSchema()
        });
      }

      return _react2.default.createElement(component, this.getChildProps());
    }
  }, {
    key: 'getChildProps',
    value: function getChildProps() {
      var typeName = this.props.type;
      if (!typeName) {
        typeName = (0, _types.getFieldTypeName)({ fieldName: this.props.fieldName, fieldSchema: this.getFieldSchema(), schema: this.getSchema() });
      }

      /**
       * This gets the props that are defined in the propTypes of the registered component.
       */
      var type = (0, _types.getFieldType)(typeName);
      var propOptions = _.omit(this.props, _.keys(propTypes));
      var schemaOptions = this.getFieldSchema() && (this.getFieldSchema().srf || this.getFieldSchema().mrf) || {};
      var totalOptions = _.extend(schemaOptions, propOptions);
      var allowedKeys = _.keys(type.component.propTypes || {});
      var onlyAllowedOptions = _.pick(totalOptions, allowedKeys);

      var error = (0, _types.getFieldOptionsError)({ type: type, options: onlyAllowedOptions });
      if (error) {
        throw new Error('Options for field "' + this.props.fieldName + '" are not allowed for field type "' + type.name + '": ' + error.message);
      }

      /**
       * Options that are not registered in the propTypes are passed separatly.
       * This options are in the variable this.passProps of the component, they should be
       * passed to the main component of it.
       */
      var notDefinedOptions = _.omit(totalOptions, allowedKeys);

      var props = _extends({
        value: this.props.value,
        label: this.props.showLabel ? this.getLabel() : null,
        useHint: this.props.useHint,
        onChange: this.onChange.bind(this),
        errorMessage: this.props.errorMessage,
        fieldSchema: this.getFieldSchema(),
        fieldName: this.props.fieldName,
        schema: this.getSchema(),
        form: this.props.form,
        disabled: this.props.disabled,
        passProps: notDefinedOptions,
        ref: 'input'
      }, onlyAllowedOptions);

      return props;
    }
  }, {
    key: 'render',
    value: function render() {
      return this.getComponent();
    }
  }]);

  return Field;
}(_react2.default.Component);

exports.default = Field;
;

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;
Field.recieveMRFData = true;