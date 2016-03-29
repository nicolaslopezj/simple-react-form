import React from 'react';
import ArrayComponent from './array';
import ObjectComponent from './object';
import DotObject from './dot';
import { docToModifier } from './utility';
import Field from './field';
import { getFieldTypeName } from './types';

const propTypes = {
  /**
   * The object that has the values of the form.
   */
  state: React.PropTypes.object,
  /**
   * Alias of state
   */
  doc: React.PropTypes.object,

  /**
   * A callback that fires when the form value changes. The argument will be the value.
   */
  onChange: React.PropTypes.func,

  /**
   * The Mongo Collection for the form.
   */
  collection: React.PropTypes.object,

  /**
   * The simple schema for the form.
   */
  schema: React.PropTypes.object,

  /**
   * The type of the form. insert or update.
   */
  type: React.PropTypes.oneOf(['insert', 'update', 'function']),

  /**
   * Set to true to enable automatic form submission for a type="update" form. Whenever the form change event is emitted, the change will be automatically saved to the database.
   */
  autoSave: React.PropTypes.bool,

  /**
   * Set to false for an insert or update form to keep empty string values when cleaning the form document.
   */
  removeEmptyStrings: React.PropTypes.bool,

  /**
   * Set to false for an insert or update form to skip filtering out unknown properties when cleaning the form document.
   */
  filter: React.PropTypes.bool,

  /**
   * Set to false for an insert or update form to keep leading and trailing spaces for string values when cleaning the form document.
   */
  trimStrings: React.PropTypes.bool,

  /**
   * Set to false for an insert or update form to skip autoconverting property values when cleaning the form document.
   */
  autoConvert: React.PropTypes.bool,

  /**
   * Replace the current document if the one in the props changes.
   */
  replaceOnChange: React.PropTypes.bool,

  /**
   * Keep arrays when updating.
   */
  keepArrays: React.PropTypes.bool,

  /**
   * A function that is called when the form action finished with success.
   */
  onSuccess: React.PropTypes.func,

  /**
   * Id of the form.
   */
  formId: React.PropTypes.string,

  /**
   * The component for the array wrapper
   */
  arrayComponent: React.PropTypes.any,

  /**
   * The component for the object wrapper
   */
  objectComponent: React.PropTypes.any,

  /**
   * Show errors in the console
   */
  logErrors: React.PropTypes.bool,

  /**
   * Commit only changes
   */
  commitOnlyChanges: React.PropTypes.bool,

  /**
   * Minimum wait time between auto saves
   */
  autoSaveWaitTime: React.PropTypes.number,
};

const defaultProps = {
  keepArrays: true,
  autoSave: false,
  removeEmptyStrings: true,
  trimStrings: true,
  autoConvert: true,
  filter: true,
  replaceOnChange: true,
  formId: 'defaultFormId',
  arrayComponent: ArrayComponent,
  objectComponent: ObjectComponent,
  logErrors: false,
  commitOnlyChanges: true,
  autoSaveWaitTime: 500,
};

export default class Form extends React.Component {

  constructor(props) {
    super(props);
    const state = this.props.state || this.props.doc || {};
    this.state = {
      doc: _.clone(state),
      changes: {},
      validationContext: this.getSchema() ? this.getSchema().newContext() : null,
      errorMessages: {},
    };
    this.fields = [];
    this.autoSave = _.debounce(this.submit.bind(this), this.props.autoSaveWaitTime);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.replaceOnChange || this.props.formId !== nextProps.formId) {
      const state = this.props.state || this.props.doc || {};
      const nextState = nextProps.state || nextProps.doc || {};
      if (!_.isEqual(state, nextState)) {
        this.setState({ doc: _.clone(nextState), changes: {} });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('did update form', prevProps, prevState);
  }

  getSchema() {
    if (this.props.schema) {
      return this.props.schema;
    } else if (this.props.collection) {
      return this.props.collection.simpleSchema();
    } else {
      //Throw new Error('no schema was specified.');
    }
  }

  registerComponent({ field, component }) {
    this.fields.push({ field, component });
  }

  callChildFields({ method, input }) {
    this.fields.map((field) => {
      if (_.isFunction(field.component[method])) {
        field.component[method](input);
      }
    });
  }

  onCommit(error, docId) {
    this.setState({ errorMessages: {} });
    if (error) {
      this.handleError();
      if (this.props.logErrors) {
        console.log(`[form-${this.props.formId}-error]`, error);
      }
    } else {
      this.callChildFields({ method: 'onSuccess' });
      if (_.isFunction(this.props.onSuccess)) {
        this.props.onSuccess(docId);
        this.setState({ changes: {} });
      }
    }
  }

  getValidationOptions() {
    return {
      validationContext: this.props.formId,
      filter: this.props.filter,
      autoConvert: this.props.autoConvert,
      removeEmptyStrings: this.props.removeEmptyStrings,
      trimStrings: this.props.trimStrings,
    };
  }

  submit() {
    const data = this.props.commitOnlyChanges ? this.state.changes : this.state.doc;
    if (this.props.type == 'insert') {
      const dot = DotObject.dot(data);
      const doc = DotObject.object(dot);
      this.props.collection.insert(doc, this.getValidationOptions(), this.onCommit.bind(this));
    } else if (this.props.type == 'update') {
      var modifier = docToModifier(data, { keepArrays: this.props.keepArrays });
      if (!_.isEqual(modifier, {})) {
        this.props.collection.update(this.state.doc._id, modifier, this.getValidationOptions(), this.onCommit.bind(this));
      } else {
        this.callChildFields({ method: 'onSuccess' });
        if (_.isFunction(this.props.onSuccess)) {
          this.props.onSuccess();
        }
      }
    } else if (this.props.type == 'function') {
      const doc = DotObject.object(DotObject.dot(data));
      const isValid = this.getSchema().namedContext(this.getValidationOptions().validationContext).validate(doc);
      if (isValid) {
        var success = this.props.onSubmit(doc);
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

  handleError() {
    var context = this.getSchema().namedContext(this.getValidationOptions().validationContext);
    var invalidKeys = context.invalidKeys();
    var errorMessages = {};
    invalidKeys.map((field) => {
      errorMessages[field.name] = context.keyErrorMessage(field.name);
    });
    if (this.props.logErrors) {
      console.log(`[form-${this.props.formId}-error-messages]`, errorMessages);
    }

    this.setState({ errorMessages });
  }

  onValueChange(fieldName, newValue) {
    newValue = typeof newValue === 'undefined' ? null : newValue;
    DotObject.del(fieldName, this.state.doc);
    var doc = DotObject.str(`val.${fieldName}`, newValue, { val: this.state.doc }).val;
    DotObject.del(fieldName, this.state.changes);
    var changes = DotObject.str(`val.${fieldName}`, newValue, { val: this.state.changes }).val;
    this.setState({ doc, changes });

    if (this.props.autoSave) {
      this.autoSave();
    }

    if (_.isFunction(this.props.onChange)) {
      this.props.onChange(this.state.doc, this.state.changes);
    }
  }

  renderChildren(children) {
    return React.Children.map(children, (child) => {
      var options = null;
      if (child.type && child.type.recieveMRFData) {
        var fieldName = child.props.fieldName;
        options = {
          schema: this.getSchema(),
          value: this.state.doc ? DotObject.pick(fieldName, this.state.doc) : undefined,
          onChange: this.onValueChange.bind(this),
          errorMessage: this.state.errorMessages[fieldName],
          errorMessages: this.state.errorMessages,
          form: this,
        };
      } else if (child.props) {
        options = {
          children: this.renderChildren(child.props.children),
        };
      }

      return options ? React.cloneElement(child, options) : child;
    });
  }

  generateInputsForKeys(keys, parent = '') {
    var schema = this.getSchema();
    keys = _.reject(keys, (key) => {
      var fullKey = parent ? `${parent}.${key}` : key;
      var keySchema = schema._schema[fullKey];
      var options = keySchema.mrf;
      if (options && options.omit) return true;
    });
    return keys.map((key) => {
      var fullKey = parent ? `${parent}.${key}` : key;
      var type = getFieldTypeName({ fieldName: fullKey, schema });
      if (type == 'array') {
        var _keys = schema.objectKeys(`${fullKey}.$`);
        return (
          <this.props.arrayComponent fieldName={key} key={key}>
            {this.generateInputsForKeys(_keys, `${fullKey}.$`)}
          </this.props.arrayComponent>
        );
      } else if (type == 'object') {
        var _keys = schema.objectKeys(fullKey);
        return (
          <this.props.objectComponent fieldName={key} key={fullKey}>
            {this.generateInputsForKeys(_keys, fullKey)}
          </this.props.objectComponent>
        );
      } else {
        return <Field fieldName={key} key={fullKey}/>;
      }
    });
  }

  generateChildren() {
    var schema = this.getSchema();
    return this.generateInputsForKeys(schema._firstLevelSchemaKeys);
  }

  render() {
    if (!this.props.children) {
      return <div>{this.renderChildren(this.generateChildren())}</div>;
    } else {
      return <div>{this.renderChildren(this.props.children)}</div>;
    }
  }
};

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;
