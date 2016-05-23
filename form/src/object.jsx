import React from 'react';

const propTypes = {
  /**
   * Value of the object.
   */
  value: React.PropTypes.any,

  /**
   * The simple schema
   */
  schema: React.PropTypes.object,

  /**
   * Error message for the object, if there is one.
   */
  errorMessage: React.PropTypes.string,

  /**
   * Children error messages.
   */
  errorMessages: React.PropTypes.object,

  /**
   * Field name of the object in the parent object.
   */
  fieldName: React.PropTypes.string.isRequired,

  /**
   * Call this function when the value changes.
   */
  onChange: React.PropTypes.func,
  /**
   * Show the container label
   */
  showLabel: React.PropTypes.bool,

  /**
   * The field should be read only mode
   */
  disabled: React.PropTypes.bool,
};

const defaultProps = {
  showLabel: true,
  errorMessages: {},
};

export default class ObjectComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getSchema() {
    return this.props.schema;
  }

  getFieldSchema() {
    return this.getSchema().schema(this.props.fieldName);
  }

  getLabel() {
    return this.props.showLabel ? this.getSchema().label(this.props.fieldName) : '';
  }

  renderChildren(children) {
    return React.Children.map(children, (child) => {
      var fieldName = child.props.fieldName;
      var options = {};
      if (_.isObject(child) && child.type && child.type.recieveMRFData) {
        options = {
          fieldName: `${this.props.fieldName}.${fieldName}`,
          schema: this.getSchema(),
          value: this.props.value ? this.props.value[fieldName] : undefined,
          onChange: this.props.onChange,
          errorMessage: child.props.errorMessage || this.props.errorMessages[`${this.props.fieldName}.${fieldName}`],
          errorMessages: this.props.errorMessages,
          form: this.props.form,
        };
      } else if (_.isObject(child) && child.props) {
        options = {
          children: this.renderChildren(child.props.children),
        };
      }

      return React.cloneElement(child, options);
    });
  }

  render() {
    return (
      <div style={{ marginTop: 20, marginBottom: 20, padding: 20 }}>
        <div><b>{this.getLabel()}</b></div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        {this.renderChildren(this.props.children)}
      </div>
    );
  }
}

ObjectComponent.propTypes = propTypes;
ObjectComponent.defaultProps = defaultProps;
ObjectComponent.recieveMRFData = true;
