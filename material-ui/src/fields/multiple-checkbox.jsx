import React from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import Colors from 'material-ui/lib/styles/colors';
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
    description: React.PropTypes.string,
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
    return this.props.options.map(option => {
      return (
        <div key={option.value} style={{ marginTop: 10 }}>
          <Checkbox
          checked={_.contains(currentVal, option.value)}
          onCheck={() => this.onCheck(option.value, currentVal)}
          label={option.label}
          disabled={this.props.disabled}
          {...this.passProps}
          />
          <div
          style={{ marginLeft: 40, color: Colors.grey500, cursor: 'pointer' }}
          onClick={() => this.onCheck(option.value, currentVal)}>
            {(option.description || '').split('\n').map((text, index) => <div key={index}>{text}</div>)}
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div style={styles.fieldContainer}>
        <div style={styles.mirrorLabel}>
          {this.props.label}
        </div>
        {this.renderOptions()}
        <div style={styles.errorMessage}>{this.props.errorMessage}</div>
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
