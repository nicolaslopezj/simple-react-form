import React from 'react';
import ObjectComponent from './object';

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
   * The add label
   */
  addLabel: React.PropTypes.string,

  /**
   * The remove label
   */
  removeLabel: React.PropTypes.string,

  /**
   * Show the container label
   */
  showLabel: React.PropTypes.bool,

  /**
   * The field should be read only mode
   */
  disabled: React.PropTypes.bool,

  /**
   *
   */
  autoAddItem: React.PropTypes.bool,
};

const defaultProps = {
  addLabel: 'Add',
  removeLabel: 'Remove',
  showLabel: true,
  errorMessages: {},
  autoAddItem: false,
};

export default class ArrayComponent extends ObjectComponent {

  onValueChange(fieldName, newValue) {
    const withoutSelf = fieldName.replace(`${this.props.fieldName}.`, '');
    const index = withoutSelf.split('.')[0];
    const plainFieldName = withoutSelf.replace(`${index}.`, '');
    let value = _.clone(this.props.value);

    if (!value) {
      value = [];
    }

    if (!value[index]) {
      value[index] = {};
    }

    value[index][plainFieldName] = newValue;
    this.props.onChange(this.props.fieldName, value);
  }

  addItem() {
    var newArray = this.props.value;
    if (_.isArray(newArray)) {
      newArray.push({});
    } else {
      newArray = [{}];
    }

    this.props.onChange(this.props.fieldName, newArray);
  }

  removeItem(index) {
    const value = this.props.value || [];
    var newArray = _.without(value, value[index]);
    this.props.onChange(this.props.fieldName, newArray);
  }

  renderChildrenComponent(children, index) {
    return React.Children.map(children, (child) => {
      var options = {};
      if (_.isObject(child) && child.type && child.type.recieveMRFData) {
        var fieldName = child.props.fieldName;
        const value = (this.props.value || [])[index] ? this.props.value[index][fieldName] : undefined;
        options = {
          fieldName: `${this.props.fieldName}.${index}.${fieldName}`,
          schema: this.getSchema(),
          value,
          onChange: this.onValueChange.bind(this),
          errorMessage: child.props.errorMessage || this.props.errorMessages[`${this.props.fieldName}.${index}.${fieldName}`],
          errorMessages: this.props.errorMessages,
          form: this.props.form,
        };
      } else if (_.isObject(child) && child.props) {
        options = {
          children: this.renderChildrenComponent(child.props.children, index),
        };
      }

      return React.cloneElement(child, options);
    });
  }

  renderChildren() {
    const value = this.props.value || [];
    if (this.props.autoAddItem && !this.props.disabled && value.length == 0) {
      value.push({});
    }
    return value.map((item, index) => {
      var component = this.renderChildrenComponent(this.props.children, index);
      return this.renderChildrenItem({ index, component });
    });
  }

  renderChildrenItem({ index, component }) {
    return (
      <div style={{ marginTop: 20, marginBottom: 20, padding: 20 }} key={`${this.props.fieldName}.${index}`}>
        {component}
        <div style={{ marginTop: 10, textAlign: 'right' }}>
          <button onClick={() => this.removeItem(index)}>
            {this.props.removeLabel}
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <div><b>{this.getLabel()}</b></div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        {this.renderChildren()}
        <div style={{ marginTop: 10 }}>
          <button onClick={this.addItem.bind(this)}>
            {this.props.addLabel}
          </button>
        </div>
      </div>
    );
  }
}

ArrayComponent.propTypes = propTypes;
ArrayComponent.defaultProps = defaultProps;
