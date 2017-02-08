'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _Array = require('../Array');

var _Array2 = _interopRequireDefault(_Array);

var _Object = require('../Object');

var _Object2 = _interopRequireDefault(_Object);

var _dotObject = require('dot-object');

var _dotObject2 = _interopRequireDefault(_dotObject);

var _utility = require('../utility');

var _generateInputsForKeys = require('../utility/generateInputsForKeys');

var _generateInputsForKeys2 = _interopRequireDefault(_generateInputsForKeys);

var _getPresentFields = require('../utility/getPresentFields');

var _getPresentFields2 = _interopRequireDefault(_getPresentFields);

var _cleanFields = require('../utility/clean-fields');

var _cleanFields2 = _interopRequireDefault(_cleanFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  /**
   * The object that has the values of the form.
   */
  state: _react2.default.PropTypes.object,
  /**
   * Alias of state
   */
  doc: _react2.default.PropTypes.object,

  /**
   * A callback that fires when the form value changes.
   * The argument will be the value.
   */
  onChange: _react2.default.PropTypes.func,

  /**
   * The Mongo Collection for the form.
   */
  collection: _react2.default.PropTypes.object,

  /**
   * The simple schema for the form.
   */
  schema: _react2.default.PropTypes.object,

  /**
   * The type of the form. insert or update.
   */
  type: _react2.default.PropTypes.oneOf(['insert', 'update', 'function']),

  /**
   * Set to true to enable automatic form submission for a type="update" form.
   * When the form change event is emitted, the change will be automatically
   * saved to the database.
   */
  autoSave: _react2.default.PropTypes.bool,

  /**
   * Set to false for an insert or update form to keep empty string values when
   * cleaning the form document.
   */
  removeEmptyStrings: _react2.default.PropTypes.bool,

  /**
   * Set to false for an insert or update form to skip filtering out unknown
   * properties when cleaning the form document.
   */
  filter: _react2.default.PropTypes.bool,

  /**
   * Set to false for an insert or update form to keep leading and trailing
   * spaces for string values when cleaning the form document.
   */
  trimStrings: _react2.default.PropTypes.bool,

  /**
   * Set to false for an insert or update form to skip autoconverting property
   * values when cleaning the form document.
   */
  autoConvert: _react2.default.PropTypes.bool,

  /**
   * Replace the current document if the one in the props changes.
   */
  replaceOnChange: _react2.default.PropTypes.bool,

  /**
   * Clear the form after a successful insert.
   * Only works on insert and function types.
   */
  clearOnSuccess: _react2.default.PropTypes.bool,

  /**
   * Keep arrays when updating.
   */
  keepArrays: _react2.default.PropTypes.bool,

  /**
   * A function that is called when the form action finished with success.
   */
  onSuccess: _react2.default.PropTypes.func,

  /**
   * A function that is called when the form action error.
   */
  onError: _react2.default.PropTypes.func,
  /**
   * A function that is called when the form is submitted.
   */
  onSubmit: _react2.default.PropTypes.func,

  /**
   * Id of the form.
   */
  formId: _react2.default.PropTypes.string,

  /**
   * The component for the array wrapper
   */
  arrayComponent: _react2.default.PropTypes.any,

  /**
   * The component for the object wrapper
   */
  objectComponent: _react2.default.PropTypes.any,

  /**
   * Show errors in the console
   */
  logErrors: _react2.default.PropTypes.bool,

  /**
   * Commit only changes
   */
  commitOnlyChanges: _react2.default.PropTypes.bool,

  /**
   * Minimum wait time between auto saves
   */
  autoSaveWaitTime: _react2.default.PropTypes.number,

  /**
   * Fields to be omited
   */
  omit: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),

  /**
   * Validate schema. Only for onSubmit
   */
  validate: _react2.default.PropTypes.bool,

  /**
   * The child components
   */
  children: _react2.default.PropTypes.any,

  /**
   * Render form tag
   */
  useFormTag: _react2.default.PropTypes.bool
};

var defaultProps = {
  type: 'function',
  keepArrays: true,
  autoSave: false,
  removeEmptyStrings: true,
  trimStrings: true,
  autoConvert: true,
  filter: true,
  replaceOnChange: true,
  clearOnSuccess: false,
  formId: 'defaultFormId',
  arrayComponent: _Array2.default,
  objectComponent: _Object2.default,
  logErrors: true,
  commitOnlyChanges: false,
  autoSaveWaitTime: 500,
  omit: [],
  validate: true,
  useFormTag: true
};

var childContextTypes = {
  schema: _react2.default.PropTypes.object,
  doc: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func.isRequired,
  errorMessages: _react2.default.PropTypes.object,
  form: _react2.default.PropTypes.any.isRequired
};

var Form = function (_React$Component) {
  (0, _inherits3.default)(Form, _React$Component);

  function Form(props) {
    (0, _classCallCheck3.default)(this, Form);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    var state = props.state || props.doc || {};
    _this.state = {
      doc: _underscore2.default.clone(state),
      changes: {},
      validationContext: _this.getSchema(props) ? _this.getSchema(props).newContext() : null,
      errorMessages: {}
    };
    _this.fields = [];
    _this.autoSave = _underscore2.default.debounce(_this.submit.bind(_this), props.autoSaveWaitTime);
    _this.errorMessages = {};
    _this.onFormSubmit = _this.onFormSubmit.bind(_this);
    _this.onValueChange = _this.onValueChange.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Form, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        schema: this.getSchema(),
        doc: this.state.doc,
        onChange: this.onValueChange,
        errorMessages: this.state.errorMessages,
        form: this
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.replaceOnChange || this.props.formId !== nextProps.formId) {
        var state = this.props.state || this.props.doc || {};
        var nextState = nextProps.state || nextProps.doc || {};
        if (!_underscore2.default.isEqual(state, nextState)) {
          this.setState({ doc: _underscore2.default.clone(nextState), changes: {} });
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      //  Console.log('did update form', prevProps, prevState)
    }
  }, {
    key: 'getSchema',
    value: function getSchema(props) {
      props = props || this.props;
      if (props.schema) {
        return props.schema;
      } else if (props.collection) {
        return props.collection.simpleSchema();
      } else {
        //  Throw new Error('no schema was specified.')
      }
    }

    /*
     * This is necesarry to allow the form to filter the fields when updating
     */

  }, {
    key: 'registerComponent',
    value: function registerComponent(_ref) {
      var field = _ref.field,
          component = _ref.component;

      this.fields.push({ field: field, component: component });
    }
  }, {
    key: 'unregisterComponent',
    value: function unregisterComponent(fieldName) {
      var index = _underscore2.default.findIndex(this.fields, function (_ref2) {
        var field = _ref2.field;
        return field === fieldName;
      });
      this.fields.splice(index, 1);
    }
  }, {
    key: 'callChildFields',
    value: function callChildFields(_ref3) {
      var method = _ref3.method,
          input = _ref3.input;

      this.fields.map(function (field) {
        if (_underscore2.default.isFunction(field.component[method])) {
          field.component[method](input);
        }
      });
    }
  }, {
    key: 'onCommit',
    value: function onCommit(error, docId) {
      this.setState({ errorMessages: {} });
      if (error) {
        if (error.reason === 'INVALID') {
          this.handleServerError(error);
        } else {
          this.handleError();
        }
        if (this.props.logErrors) {
          console.log('[form-' + this.props.formId + '-error]', error);
        }

        if (this.props.onError) {
          this.props.onError(error);
        }
      } else {
        this.callChildFields({ method: 'onSuccess' });
        if (_underscore2.default.isFunction(this.props.onSuccess)) {
          this.props.onSuccess(docId);
        }
        if (this.props.clearOnSuccess) {
          this.clearForm();
        } else {
          // if clearOnSuccess is false, we still need to clear the changes
          this.setState({ changes: {} });
        }
      }
    }
  }, {
    key: 'getValidationOptions',
    value: function getValidationOptions() {
      return {
        validationContext: this.props.formId,
        filter: this.props.filter,
        autoConvert: this.props.autoConvert,
        removeEmptyStrings: this.props.removeEmptyStrings,
        trimStrings: this.props.trimStrings
      };
    }
  }, {
    key: 'onFormSubmit',
    value: function onFormSubmit(event) {
      event.preventDefault();
      this.submit();
    }
  }, {
    key: 'submit',
    value: function submit() {
      var data = this.props.commitOnlyChanges ? this.state.changes : this.state.doc;
      if (this.props.type === 'insert') {
        var dot = _dotObject2.default.dot(this.state.doc);
        var doc = _dotObject2.default.object(dot);
        this.props.collection.insert(doc, this.getValidationOptions(), this.onCommit.bind(this));
      } else if (this.props.type === 'update') {
        var presentFields = (0, _getPresentFields2.default)(this.fields);
        var modifier = (0, _utility.docToModifier)(data, { keepArrays: this.props.keepArrays, fields: presentFields });
        if (!_underscore2.default.isEqual(modifier, {})) {
          this.props.collection.update(this.state.doc._id, modifier, this.getValidationOptions(), this.onCommit.bind(this));
        } else {
          this.callChildFields({ method: 'onSuccess' });
          if (_underscore2.default.isFunction(this.props.onSuccess)) {
            this.props.onSuccess();
          }
        }
      } else if (this.props.type === 'function') {
        var _doc = _dotObject2.default.object(_dotObject2.default.dot(data));
        var isValid = true;
        if (this.props.validate && this.getSchema()) {
          isValid = this.getSchema().namedContext(this.getValidationOptions().validationContext).validate(_doc);
        }
        if (isValid) {
          if (!_underscore2.default.isFunction(this.props.onSubmit)) {
            throw new Error('You must pass a onSubmit function or set the form type to insert or update');
          }
          var _presentFields = (0, _getPresentFields2.default)(this.fields);
          var cleanDoc = (0, _cleanFields2.default)(_dotObject2.default.dot(data), _presentFields);
          var success = this.props.onSubmit(_dotObject2.default.object(_dotObject2.default.dot(cleanDoc)));
          if (success === false) {
            this.onCommit('onSubmit error');
          } else {
            this.onCommit();
          }
        } else {
          this.onCommit('Validation error');
        }
      }
    }
  }, {
    key: 'cleanErrorMessages',
    value: function cleanErrorMessages() {
      this.errorMessages = {};
      this.setState({ errorMessages: {} });
    }
  }, {
    key: 'clearForm',
    value: function clearForm() {
      this.setState({ doc: {}, changes: {} });
    }
  }, {
    key: 'setErrorMessage',
    value: function setErrorMessage(fieldName, message) {
      var errorMessages = _underscore2.default.clone(this.errorMessages);
      errorMessages[fieldName] = message;
      this.errorMessages = errorMessages;
      this.setState({ errorMessages: errorMessages });
    }
  }, {
    key: 'setErrorsWithContext',
    value: function setErrorsWithContext(context) {
      var invalidKeys = context.invalidKeys();
      var errorMessages = {};
      invalidKeys.map(function (field) {
        errorMessages[field.name] = context.keyErrorMessage(field.name);
      });

      if (this.props.logErrors) {
        console.log('[form-' + this.props.formId + '-error-messages]', errorMessages);
      }

      if (this.props.onError) {
        this.props.onError(errorMessages);
      }

      this.errorMessages = errorMessages;
      this.setState({ errorMessages: errorMessages });
    }
  }, {
    key: 'handleError',
    value: function handleError() {
      var context = this.getSchema().namedContext(this.getValidationOptions().validationContext);
      this.setErrorsWithContext(context);
    }
  }, {
    key: 'handleServerError',
    value: function handleServerError(error) {
      var _this2 = this;

      var errors = JSON.parse(error.details);
      var errorMessages = {};
      errors.forEach(function (fieldError) {
        errorMessages[fieldError.name] = _this2.getSchema().messageForError(fieldError.type, fieldError.name, null, fieldError.value);
      });
      if (this.props.logErrors) {
        console.log('[form-' + this.props.formId + '-error-messages]', errorMessages);
      }

      if (this.props.onError) {
        this.props.onError(error);
      }

      this.errorMessages = errorMessages;
      this.setState({ errorMessages: errorMessages });
    }
  }, {
    key: 'isRN',
    value: function isRN() {
      return navigator.product === 'ReactNative';
    }
  }, {
    key: 'onValueChange',
    value: function onValueChange(fieldName, newValue) {
      //  newValue = typeof newValue === 'undefined' ? null : newValue
      _dotObject2.default.del(fieldName, this.state.doc);
      var doc = _dotObject2.default.str('val.' + fieldName, newValue, { val: this.state.doc }).val;
      _dotObject2.default.del(fieldName, this.state.changes);
      var changes = _dotObject2.default.str('val.' + fieldName, newValue, { val: this.state.changes }).val;
      this.setState({ doc: doc, changes: changes });

      if (this.props.autoSave) {
        this.autoSave();
      }

      if (_underscore2.default.isFunction(this.props.onChange)) {
        this.props.onChange(this.state.doc, this.state.changes);
      }
    }
  }, {
    key: 'generateChildren',
    value: function generateChildren() {
      var schema = this.getSchema();
      if (!schema) {
        throw new Error('You must pass a schema or manually render the fields');
      }
      return (0, _generateInputsForKeys2.default)(schema._firstLevelSchemaKeys, '', schema, this.props.omit);
    }
  }, {
    key: 'renderInsideForm',
    value: function renderInsideForm() {
      if (!this.props.children) {
        return this.generateChildren();
      } else {
        return this.props.children;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.useFormTag) {
        return _react2.default.createElement(
          'form',
          { onSubmit: this.onFormSubmit },
          this.renderInsideForm()
        );
      } else {
        if (this.isRN()) {
          return this.renderInsideForm();
        } else {
          return _react2.default.createElement(
            'div',
            null,
            this.renderInsideForm()
          );
        }
      }
    }
  }]);
  return Form;
}(_react2.default.Component);

exports.default = Form;


Form.propTypes = propTypes;
Form.defaultProps = defaultProps;
Form.childContextTypes = childContextTypes;