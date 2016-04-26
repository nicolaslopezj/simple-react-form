import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Colors from 'material-ui/lib/styles/colors';
import {FieldType, registerType} from 'simple-react-form';
import styles from '../styles';

const propTypes = {
  /**
   * The options for the select input. Each item must have label and value.
   */
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    label: React.PropTypes.string.isRequired,
    value:  React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]).isRequired,
  })),
};

const defaultProps = {
};

class SelectComponent extends FieldType {

  renderItems() {
    var options = null;
    if (this.props.options) {
      options = this.props.options;
    } else if (this.props.fieldSchema.allowedValues) {
      options = _.map(this.props.fieldSchema.allowedValues, function(allowedValue) {
        return {
          label: allowedValue,
          value: allowedValue,
        };
      });
    } else {
      throw new Error('You must set the options for the select field');
    }

    return options.map((item) => {
      return <MenuItem key={item.value} value={item.value} primaryText={item.label} />;
    });
  }

  render() {
    return (
      <SelectField
        value={this.props.value}
        onChange={(event, index, value) => this.props.onChange(value)}
        fullWidth={true}
        disabled={this.props.disabled}
        floatingLabelText={this.props.label}
        errorText={this.props.errorMessage}
        {...this.passProps}>
        {this.renderItems()}
      </SelectField>
    );
  }
}

SelectComponent.propTypes = propTypes;
SelectComponent.defaultProps = defaultProps;

registerType({
  type: 'select',
  component: SelectComponent,
  allowedTypes: [String, Number],
  description: 'Simple select field.',
});
