import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Colors from 'material-ui/lib/styles/colors';
import {FieldType, registerType} from 'simple-react-form';
import styles from '../styles';

class SelectComponent extends FieldType {

  renderItems() {
    return this.mrf.options.map((item) => {
      return <MenuItem key={item.value} value={item.value} primaryText={item.label} />;
    });
  }

  render() {
    return (
      <div style={styles.fieldContainer}>
        <div style={styles.mirrorLabel}>
          {this.props.label}
        </div>
        <SelectField
          value={this.props.value}
          onChange={(event, index, value) => this.props.onChange(value)}
          fullWidth={true}
          disabled={this.props.disabled}
          {...this.passProps}>
          {this.renderItems()}
        </SelectField>
        <div style={styles.errorMessage}>{this.props.errorMessage}</div>
      </div>
    );
  }
}

registerType({
  type: 'select',
  component: SelectComponent,
  allowedTypes: [String, Number],
  description: 'Simple select field.',
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
    options: 'The options for the select input. Each item must have ```label``` and ```value```.',
  },
});
