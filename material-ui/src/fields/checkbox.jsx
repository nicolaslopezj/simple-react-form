import React from 'react';
import Checkbox from 'material-ui/lib/text-field';
import FontIcon from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';
import {FieldType, registerType} from 'simple-react-form';

class CheckboxComponent extends FieldType {

  checkedIcon() {
    return <FontIcon className="material-icons">check_box</FontIcon>;
  }

  unCheckedIcon() {
    return <FontIcon className="material-icons">check_box_outline_blank</FontIcon>;
  }

  render() {
    return (
      <div style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Checkbox
          label={this.props.label}
          disabled={this.props.disabled}
          checked={this.props.value}
          onCheck={() => this.props.onChange(!this.props.value)}
          checkedIcon={this.checkedIcon()}
          unCheckedIcon={this.unCheckedIcon()}
          {...this.passProps}
        />
        <span style={{ color: Colors.red500 }}>{this.props.errorMessage}</span>
      </div>
    );
  }
}

registerType({
  type: 'checkbox',
  component: CheckboxComponent,
  allowedTypes: [Boolean],
  description: 'Simple checkbox field.',
  optionsDefinition: {},
  optionsDescription: {},
});

registerType({
  type: 'boolean',
  component: CheckboxComponent,
});
