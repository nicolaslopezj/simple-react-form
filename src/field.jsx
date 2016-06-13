import React from 'react';
import {
  getFieldType,
  getFieldComponent,
  getFieldOptionsError,
  getFieldTypeName,
} from './types';

const propTypes = {
  /**
   * The value of the field.
   */
  value: React.PropTypes.any,

  /**
   * The label of the field.
   */
  label: React.PropTypes.string,

  /**
   * The simple schema
   */
  schema: React.PropTypes.object,

  /**
   * Error message if there is a error.
   */
  errorMessage: React.PropTypes.string,

  /**
   * The name of the field in the object.
   */
  fieldName: React.PropTypes.string.isRequired,

  /**
   * Call this function when the value changes.
   */
  onChange: React.PropTypes.func,

  /**
   * Should show label
   */
  showLabel: React.PropTypes.bool,

  /**
   * Use hint instead of label.
   */
  useHint: React.PropTypes.bool,

  /**
   * The field should be read only mode.
   */
  disabled: React.PropTypes.bool,

  /**
   * The type of the input.
   */
  type: React.PropTypes.string,

  /**
   * The parent form element.
   */
  form: React.PropTypes.any,

  /**
   * The error message for the form.
   */
  errorMessages: React.PropTypes.object,
};

const defaultProps = {
  showLabel: true,
  useHint: false,
  disabled: false,
};

export default class Field extends React.Component {

  constructor(props) {
    super(props);
    if (!props.schema && !props.type) {
      throw new Error(`You must set the type for the field "${props.fieldName}" or pass a schema to the form`);
    }
  }

  onChange(value) {
    this.props.onChange(this.props.fieldName, value);
  }

  shouldComponentUpdate(nextProps) {
    const notImportantFields = ['errorMessages', 'form', 'schema', 'onChange'];
    const isPropsEqual = _.isEqual(_.omit(this.props, notImportantFields), _.omit(nextProps, notImportantFields));
    return !isPropsEqual;
  }

  getSchema() {
    return this.props.schema;
  }

  getFieldSchema() {
    return this.getSchema() ? this.getSchema().schema(this.props.fieldName) : null;
  }

  getLabel() {
    if (_.has(this.props, 'label')) {
      return this.props.label;
    } else if (this.getSchema()) {
      return this.getSchema().label(this.props.fieldName);
    } else {
      return '';
    }
  }

  getComponent() {
    var component = null;
    if (this.props.type) {
      component = getFieldType(this.props.type).component;
    } else {
      component = getFieldComponent({
        fieldName: this.props.fieldName,
        schema: this.getSchema(),
      });
    }

    return React.createElement(component, this.getChildProps());
  }

  getChildProps() {
    var typeName = this.props.type;
    if (!typeName) {
      typeName = getFieldTypeName({ fieldName: this.props.fieldName, fieldSchema: this.getFieldSchema(), schema: this.getSchema() });
    }

    /**
     * This gets the props that are defined in the propTypes of the registered component.
     */
    const type = getFieldType(typeName);
    const propOptions = _.omit(this.props, _.keys(propTypes));
    const schemaOptions = (this.getFieldSchema() && (this.getFieldSchema().srf || this.getFieldSchema().mrf)) || {};
    const totalOptions = _.extend(schemaOptions, propOptions);
    const allowedKeys = _.keys(type.component.propTypes || {});
    const onlyAllowedOptions = _.pick(totalOptions, allowedKeys);

    const error = getFieldOptionsError({ type, options: onlyAllowedOptions });
    if (error) {
      throw new Error(`Options for field "${this.props.fieldName}" are not allowed for field type "${type.name}": ${error.message}`);
    }

    /**
     * Options that are not registered in the propTypes are passed separatly.
     * This options are in the variable this.passProps of the component, they should be
     * passed to the main component of it.
     */
    const notDefinedOptions = _.omit(totalOptions, allowedKeys);

    const props = {
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
      ref: 'input',
      ...onlyAllowedOptions,
    };

    return props;
  }

  render() {
    return this.getComponent();
  }
};

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;
Field.recieveMRFData = true;
