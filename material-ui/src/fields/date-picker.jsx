import React from 'react';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import {FieldType, registerType} from 'simple-react-form';

class DatePickerComponent extends FieldType {

  render() {
    return (
      <DatePicker
        ref='input'
        fullWidth={true}
        value={this.props.value}
        floatingLabelText={this.props.useHint ? null : this.props.label}
        hintText={this.props.useHint ? this.props.label : null}
        errorText={this.props.errorMessage}
        disabled={this.props.disabled}
        onChange={(_, date) => this.props.onChange(date)}
        {...this.passProps} />
    );
  }
}

registerType({
  type: 'date-picker',
  component: DatePickerComponent,
  allowedTypes: [Date],
  description: 'Material UI Date picker.',
  optionsDefinition: {
    minDate: React.PropTypes.date,
    maxDate: React.PropTypes.date,
    formatDate: React.PropTypes.func,
  },
  optionsDescription: {
    minDate: 'Minimum date for the picker.',
    maxDate: 'Maximum date for the picker.',
    formatDate: 'Takes the date as a parameters and must return a string.',
  },
});
