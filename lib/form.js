'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

var _object = require('./object');

var _object2 = _interopRequireDefault(_object);

var _dot = require('./dot');

var _dot2 = _interopRequireDefault(_dot);

var _utility = require('./utility');

var _field = require('./field');

var _field2 = _interopRequireDefault(_field);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
   * Keep arrays when updating.
   */
  keepArrays: _react2.default.PropTypes.bool,

  /**
   * A function that is called when the form action finished with success.
   */
  onSuccess: _react2.default.PropTypes.func,

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
  validate: _react2.default.PropTypes.bool
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
  formId: 'defaultFormId',
  arrayComponent: _array2.default,
  objectComponent: _object2.default,
  logErrors: false,
  commitOnlyChanges: true,
  autoSaveWaitTime: 500,
  omit: [],
  validate: true
};

var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Form).call(this, props));

    var state = _this.props.state || _this.props.doc || {};
    _this.state = {
      doc: _.clone(state),
      changes: {},
      validationContext: _this.getSchema() ? _this.getSchema().newContext() : null,
      errorMessages: {}
    };
    _this.fields = [];
    _this.autoSave = _.debounce(_this.submit.bind(_this), _this.props.autoSaveWaitTime);
    _this.errorMessages = {};
    return _this;
  }

  _createClass(Form, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.replaceOnChange || this.props.formId !== nextProps.formId) {
        var state = this.props.state || this.props.doc || {};
        var nextState = nextProps.state || nextProps.doc || {};
        if (!_.isEqual(state, nextState)) {
          this.setState({ doc: _.clone(nextState), changes: {} });
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      //Console.log('did update form', prevProps, prevState);
    }
  }, {
    key: 'getSchema',
    value: function getSchema() {
      if (this.props.schema) {
        return this.props.schema;
      } else if (this.props.collection) {
        return this.props.collection.simpleSchema();
      } else {
        //Throw new Error('no schema was specified.');
      }
    }
  }, {
    key: 'registerComponent',
    value: function registerComponent(_ref) {
      var field = _ref.field;
      var component = _ref.component;

      this.fields.push({ field: field, component: component });
    }
  }, {
    key: 'callChildFields',
    value: function callChildFields(_ref2) {
      var method = _ref2.method;
      var input = _ref2.input;

      this.fields.map(function (field) {
        if (_.isFunction(field.component[method])) {
          field.component[method](input);
        }
      });
    }
  }, {
    key: 'onCommit',
    value: function onCommit(error, docId) {
      this.setState({ errorMessages: {} });
      if (error) {
        this.handleError();
        if (this.props.logErrors) {
          console.log('[form-' + this.props.formId + '-error]', error);
        }
      } else {
        this.callChildFields({ method: 'onSuccess' });
        if (_.isFunction(this.props.onSuccess)) {
          this.props.onSuccess(docId);
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
    key: 'submit',
    value: function submit() {
      var data = this.props.commitOnlyChanges ? this.state.changes : this.state.doc;
      if (this.props.type == 'insert') {
        var dot = _dot2.default.dot(data);
        var doc = _dot2.default.object(dot);
        this.props.collection.insert(doc, this.getValidationOptions(), this.onCommit.bind(this));
      } else if (this.props.type == 'update') {
        var modifier = (0, _utility.docToModifier)(data, { keepArrays: this.props.keepArrays });
        if (!_.isEqual(modifier, {})) {
          this.props.collection.update(this.state.doc._id, modifier, this.getValidationOptions(), this.onCommit.bind(this));
        } else {
          this.callChildFields({ method: 'onSuccess' });
          if (_.isFunction(this.props.onSuccess)) {
            this.props.onSuccess();
          }
        }
      } else if (this.props.type == 'function') {
        var _doc = _dot2.default.object(_dot2.default.dot(data));
        var isValid = true;
        if (this.props.validate && this.getSchema()) {
          isValid = this.getSchema().namedContext(this.getValidationOptions().validationContext).validate(_doc);
        }
        if (isValid) {
          if (!_.isFunction(this.props.onSubmit)) {
            throw new Error('You must pass a onSubmit function or set the form type to insert or update');
          }
          var success = this.props.onSubmit(_doc);
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
    key: 'setErrorMessage',
    value: function setErrorMessage(fieldName, message) {
      var errorMessages = _.clone(this.errorMessages);
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
    key: 'onValueChange',
    value: function onValueChange(fieldName, newValue) {
      //newValue = typeof newValue === 'undefined' ? null : newValue;
      _dot2.default.del(fieldName, this.state.doc);
      var doc = _dot2.default.str('val.' + fieldName, newValue, { val: this.state.doc }).val;
      _dot2.default.del(fieldName, this.state.changes);
      var changes = _dot2.default.str('val.' + fieldName, newValue, { val: this.state.changes }).val;
      this.setState({ doc: doc, changes: changes });

      if (this.props.autoSave) {
        this.autoSave();
      }

      if (_.isFunction(this.props.onChange)) {
        this.props.onChange(this.state.doc, this.state.changes);
      }
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren(children) {
      var _this2 = this;

      return _react2.default.Children.map(children, function (child) {
        var options = null;
        if (_.isObject(child) && child.type && child.type.recieveMRFData) {
          var fieldName = child.props.fieldName;
          var errorMessage = child.props.errorMessage || _this2.state.errorMessages[fieldName];
          options = {
            schema: _this2.getSchema(),
            value: _this2.state.doc ? _dot2.default.pick(fieldName, _this2.state.doc) : undefined,
            onChange: _this2.onValueChange.bind(_this2),
            errorMessage: errorMessage,
            errorMessages: _this2.state.errorMessages,
            form: _this2
          };
        } else if (_.isObject(child) && child.props) {
          options = {
            children: _this2.renderChildren(child.props.children)
          };
        }

        return options ? _react2.default.cloneElement(child, options) : child;
      });
    }
  }, {
    key: 'generateInputsForKeys',
    value: function generateInputsForKeys(keys) {
      var _this3 = this;

      var parent = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

      var schema = this.getSchema();
      keys = _.reject(keys, function (key) {
        var fullKey = parent ? parent + '.' + key : key;
        var keySchema = schema._schema[fullKey];
        var options = keySchema.srf || keySchema.mrf;
        if (options && options.omit) return true;
        if (_.contains(_this3.props.omit, fullKey)) return true;
      });
      return keys.map(function (key) {
        var fullKey = parent ? parent + '.' + key : key;
        var type = (0, _types.getFieldTypeName)({ fieldName: fullKey, schema: schema });
        if (type == 'array') {
          var _keys = schema.objectKeys(fullKey + '.$');
          return _react2.default.createElement(
            _this3.props.arrayComponent,
            { fieldName: key, key: key },
            _this3.generateInputsForKeys(_keys, fullKey + '.$')
          );
        }
        if (type == 'object') {
          var _keys = schema.objectKeys(fullKey);
          return _react2.default.createElement(
            _this3.props.objectComponent,
            { fieldName: key, key: fullKey },
            _this3.generateInputsForKeys(_keys, fullKey)
          );
        }
        return _react2.default.createElement(_field2.default, { fieldName: key, key: fullKey });
      });
    }
  }, {
    key: 'generateChildren',
    value: function generateChildren() {
      var schema = this.getSchema();
      return this.generateInputsForKeys(schema._firstLevelSchemaKeys);
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.children) {
        return _react2.default.createElement(
          'div',
          null,
          this.renderChildren(this.generateChildren())
        );
      } else {
        return _react2.default.createElement(
          'div',
          null,
          this.renderChildren(this.props.children)
        );
      }
    }
  }]);

  return Form;
}(_react2.default.Component);

exports.default = Form;
;

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;