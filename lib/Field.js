'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _dotObject = require('dot-object');

var _dotObject2 = _interopRequireDefault(_dotObject);

var _FieldType = require('./FieldType');

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  /**
   * The label of the field.
   */
  label: _react2.default.PropTypes.any,

  /**
   * The name of the field in the object.
   */
  fieldName: _react2.default.PropTypes.string.isRequired,

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
   * The type of the input. It can be a component
   */
  type: _react2.default.PropTypes.any,

  /**
   * Pass a error message
   */
  errorMessage: _react2.default.PropTypes.string
};

var defaultProps = {
  showLabel: true,
  useHint: false,
  disabled: false
};

var contextTypes = {
  schema: _react2.default.PropTypes.object,
  doc: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func.isRequired,
  errorMessages: _react2.default.PropTypes.object,
  form: _react2.default.PropTypes.any.isRequired,
  parentFieldName: _react2.default.PropTypes.string
};

var Field = function (_React$Component) {
  (0, _inherits3.default)(Field, _React$Component);

  function Field(props) {
    (0, _classCallCheck3.default)(this, Field);

    /* if (!this.context.schema && !props.type) {
      throw new Error(`You must set the type for the field "${props.fieldName}" or pass a schema to the form`)
    } */

    var _this = (0, _possibleConstructorReturn3.default)(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, props));

    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Field, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.registerField();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!_underscore2.default.isEqual(this.props, nextProps)) {
        this.unregisterField();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!_underscore2.default.isEqual(prevProps, this.props)) {
        this.registerField();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unregisterField();
    }
  }, {
    key: 'unregisterField',
    value: function unregisterField() {
      this.context.form.unregisterComponent(this.getFieldName());
    }
  }, {
    key: 'registerField',
    value: function registerField() {
      this.context.form.registerComponent({
        field: this.getFieldName(),
        component: this.element
      });
    }
  }, {
    key: 'getFieldName',
    value: function getFieldName() {
      if (this.context.parentFieldName) {
        return this.context.parentFieldName + '.' + this.props.fieldName;
      } else {
        return this.props.fieldName;
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(value) {
      this.context.onChange(this.getFieldName(), value);
    }
  }, {
    key: 'getSchema',
    value: function getSchema() {
      return this.context.schema;
    }
  }, {
    key: 'getFieldSchema',
    value: function getFieldSchema() {
      return this.getSchema() ? this.getSchema().schema(this.getFieldName()) : null;
    }
  }, {
    key: 'getLabel',
    value: function getLabel() {
      if (_underscore2.default.has(this.props, 'label')) {
        return this.props.label;
      } else if (this.getSchema()) {
        return this.getSchema().label(this.getFieldName());
      } else {
        return '';
      }
    }
  }, {
    key: 'getComponent',
    value: function getComponent() {
      if (_underscore2.default.isString(this.props.type)) {
        return (0, _types.getFieldType)(this.props.type, this.props.fieldName).component;
      } else if (this.props.type) {
        return this.props.type;
      } else {
        return (0, _types.getFieldComponent)({
          fieldName: this.getFieldName(),
          schema: this.getSchema()
        });
      }
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.context.doc ? _dotObject2.default.pick(this.getFieldName(), this.context.doc) : undefined;
    }
  }, {
    key: 'getErrorMessage',
    value: function getErrorMessage() {
      var errorMessages = this.context.errorMessages || {};
      return this.props.errorMessage || errorMessages[this.getFieldName()];
    }
  }, {
    key: 'getChildProps',
    value: function getChildProps() {
      var typeName = this.props.type;
      if (!typeName) {
        typeName = (0, _types.getFieldTypeName)({ fieldName: this.getFieldName(), fieldSchema: this.getFieldSchema(), schema: this.getSchema() });
      }

      /**
       * This gets the props that are defined in the propTypes of the registered component.
       */
      var fieldComponent = this.getComponent();
      var propOptions = _underscore2.default.omit(this.props, _underscore2.default.keys(propTypes));
      var schemaOptions = this.getFieldSchema() && (this.getFieldSchema().srf || this.getFieldSchema().mrf) || {};
      var totalOptions = _underscore2.default.extend(schemaOptions, propOptions);
      var allowedKeys = _underscore2.default.keys((0, _extends3.default)({}, _FieldType.propTypes, fieldComponent.propTypes));
      var onlyAllowedOptions = _underscore2.default.pick(totalOptions, allowedKeys);

      /**
       * Options that are not registered in the propTypes are passed separatly.
       * This options are in the variable this.passProps of the component, they should be
       * passed to the main component of it.
       */
      allowedKeys.push('type');
      var notDefinedOptions = _underscore2.default.omit(totalOptions, allowedKeys);

      var props = (0, _extends3.default)({
        value: this.getValue(),
        label: this.props.showLabel ? this.getLabel() : null,
        useHint: this.props.useHint,
        onChange: this.onChange,
        errorMessage: this.getErrorMessage(),
        fieldSchema: this.getFieldSchema(),
        fieldName: this.getFieldName(),
        schema: this.getSchema(),
        form: this.context.form,
        disabled: this.props.disabled,
        passProps: notDefinedOptions,
        ref: 'input'
      }, onlyAllowedOptions);

      return props;
    }
  }, {
    key: 'render',
    value: function render() {
      var component = this.getComponent();
      this.element = _react2.default.createElement(component, this.getChildProps());
      return this.element;
    }
  }]);
  return Field;
}(_react2.default.Component);

exports.default = Field;


Field.propTypes = propTypes;
Field.defaultProps = defaultProps;
Field.contextTypes = contextTypes;