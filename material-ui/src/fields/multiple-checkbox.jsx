import React from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import {FieldType, registerType} from 'react-form';

class MultipleCheckboxComponent extends FieldType {

  onCheck(value, currentVal) {
    var newVal = [];
    if (_.contains(currentVal, value)) {
      newVal = _.without(currentVal, value);
    } else {
      newVal = _.union(currentVal, [value]);
    }

    this.props.onChange(newVal);
  }

  renderOptions() {
    var currentVal = this.props.value || [];
    return this.props.fieldSchema.mrf.options.map((option) => {
      return (
        <div key={option.value} style={{ marginTop: 10 }}>
          <Checkbox
            checked={_.contains(currentVal, option.value)}
            onCheck={() => this.onCheck(option.value, currentVal)}
            label={option.label}
            disabled={this.props.disabled}
            {...this.passProps}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div style={{ paddingBottom: 20 }}>
        <div style={{ marginBottom: 20 }}>{this.props.label}</div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        {this.renderOptions()}
      </div>
    );
  }
}

registerType({
  type: 'multiple-checkbox',
  component: MultipleCheckboxComponent,
  allowedTypes: [[String], [Number]],
  description: 'Select multiple values with checkboxes.',
  optionsDefinition: {
    options: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      value:  React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
      ]).isRequired,
    })).isRequired,
  },
  optionsDescription: {
    options: 'The options for the checkbox. Each item must have ```label``` and ```value```.',
  },
});
