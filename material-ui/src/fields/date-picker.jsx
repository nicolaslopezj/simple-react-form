import React from 'react';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import {FieldType, registerType} from 'simple-react-form';

const propTypes = {
  /**
   * Minimum date for the picker.
   */

  //minDate: React.PropTypes.date,
  /**
   * Maximum date for the picker.
   */

  //maxDate: React.PropTypes.date,
  /**
   * Takes the date as a parameters and must return a string.
   */

  //formatDate: React.PropTypes.func,
};

const defaultProps = {

};

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
});
