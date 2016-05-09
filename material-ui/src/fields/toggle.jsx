import React from 'react';
import Toggle from 'material-ui/Toggle';
import {FieldType, registerType} from 'simple-react-form';
import styles from '../styles';

const propTypes = {

};

const defaultProps = {

};

class ToggleComponent extends FieldType {

  render() {
    return (
      <div>
        <Toggle
          label={this.props.label}
          fullWidth={true}
          defaultToggled={!!this.props.value}
          disabled={this.props.disabled}
          onToggle={() => this.props.onChange(!this.props.value)}
          {...this.passProps}/>
        <div style={styles.errorMessage}>{this.props.errorMessage}</div>
      </div>
    );
  }

}

ToggleComponent.propTypes = propTypes;
ToggleComponent.defaultProps = defaultProps;

registerType({
  type: 'toggle',
  component: ToggleComponent,
  allowedTypes: [Boolean],
  description: 'Material UI toggle.',
});
