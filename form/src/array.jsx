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
};

const defaultProps = {
  addLabel: 'Add',
  removeLabel: 'Remove',
  showLabel: true,
};

export default class ArrayComponent extends ObjectComponent {

  onValueChange(fieldName, newValue) {
    var withoutSelf = fieldName.replace(`${this.props.fieldName}.`, '');
    var index = withoutSelf.split('.')[0];
    var plainFieldName = withoutSelf.replace(`${index}.`, '');

    if (!this.props.value[index]) {
      this.props.value[index] = {};
    }

    this.props.value[index][plainFieldName] = newValue;
    this.props.onChange(this.props.fieldName, this.props.value);
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
    var newArray = _.without(this.props.value, this.props.value[index]);
    this.props.onChange(this.props.fieldName, newArray);
  }

  renderChildrenComponent(children, index) {
    return React.Children.map(children, (child) => {
      var fieldName = child.props.fieldName;
      var options = {};
      if (child.type.recieveMRFData) {
        options = {
          fieldName: `${this.props.fieldName}.${index}.${fieldName}`,
          schema: this.getSchema(),
          value: this.props.value[index] ? this.props.value[index][fieldName] : undefined,
          onChange: this.onValueChange.bind(this),
          errorMessage: this.props.errorMessages ? this.props.errorMessages[`${this.props.fieldName}.${index}.${fieldName}`] : undefined,
          errorMessages: this.props.errorMessages,
          form: this.props.form,
        };
      } else if (child.props) {
        options = {
          children: this.renderChildrenComponent(child.props.children, index),
        };
      }

      return React.cloneElement(child, options);
    });
  }

  renderChildren() {
    var value = this.props.value || [];
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
