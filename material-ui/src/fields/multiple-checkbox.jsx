import React from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import {FieldType, registerType} from 'simple-react-form';

const propTypes = {
  /**
   * The options for the checkbox.
   */
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    label: React.PropTypes.string.isRequired,
    value:  React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]).isRequired,
  })).isRequired,
};

const defaultProps = {

};

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
    return this.props.options.map((option) => {
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

MultipleCheckboxComponent.propTypes = propTypes;
MultipleCheckboxComponent.defaultProps = defaultProps;

registerType({
  type: 'multiple-checkbox',
  component: MultipleCheckboxComponent,
  allowedTypes: [[String], [Number]],
  description: 'Select multiple values with checkboxes.',
});
