import React from 'react';
import Paper from 'material-ui/Paper';
import { Form, ObjectComponent } from 'simple-react-form';

const styles = {
  label: {
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 5,
    fontSize: 12,
  },
};

export default class MaterialObject extends ObjectComponent {
  render() {
    return (
      <Paper style={{ marginTop: 20, marginBottom: 20, padding: 20 }}>
        <div style={styles.label}>{this.getLabel()}</div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        {this.renderChildren(this.props.children)}
      </Paper>
    );
  }
}

//MRF.Object = MaterialObject;
Form.defaultProps.objectComponent = MaterialObject;

//ObjectComponent = MaterialObject;
