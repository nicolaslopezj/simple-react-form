import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import FontIcon from 'material-ui/FontIcon';
import Colors from 'material-ui/styles/colors';
import {FieldType, registerType} from 'simple-react-form';

const propTypes = {

};

const defaultProps = {

};

class CheckboxComponent extends FieldType {

  render() {
    return (
      <div style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Checkbox
          label={this.props.label}
          disabled={this.props.disabled}
          checked={this.props.value}
          onCheck={() => this.props.onChange(!this.props.value)}
          {...this.passProps}
        />
        <span style={{ color: Colors.red500 }}>{this.props.errorMessage}</span>
      </div>
    );
  }
}

CheckboxComponent.propTypes = propTypes;
CheckboxComponent.defaultProps = defaultProps;

registerType({
  type: 'checkbox',
  component: CheckboxComponent,
  allowedTypes: [Boolean],
  description: 'Simple checkbox field.',
});

registerType({
  type: 'boolean',
  component: CheckboxComponent,
});
