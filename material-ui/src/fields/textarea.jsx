import React from 'react';
import TextField from 'material-ui/lib/text-field';
import {FieldType, registerType} from 'simple-react-form';

class TextareaComponent extends FieldType {
  render() {
    return (
      <TextField
        ref='input'
        fullWidth={true}
        multiLine={true}
        rows={this.mrf.rows}
        value={this.props.value}
        floatingLabelText={this.props.useHint ? null : this.props.label}
        hintText={this.props.useHint ? this.props.label : null}
        errorText={this.props.errorMessage}
        disabled={this.props.disabled}
        onChange={(event) => this.props.onChange(event.target.value)}
        {...this.passProps} />
    );
  }
}

registerType({
  type: 'textarea',
  component: TextareaComponent,
  allowedTypes: [String],
  description: 'Textarea',
  optionsDefinition: {
    //rows: Match.Optional(Number),
  },
  optionsDescription: {
    rows: 'The number of rows',
  },
  defaultOptions: {
    rows: 2,
  },
});
