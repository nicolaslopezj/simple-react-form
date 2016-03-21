import React from 'react';
import TextField from 'material-ui/lib/text-field';
import {FieldType, registerType} from 'simple-react-form';

class TextFieldComponent extends FieldType {

  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  onKeyDown(event) {
    if (event.keyCode == 13) {
      this.props.onChange(this.state.value);
    }
  }

  render() {
    var type = this.mrf.type || this.type;
    return (
      <TextField
        ref='input'
        fullWidth={true}
        value={this.state.value}
        type={type}
        floatingLabelText={this.props.useHint ? null : this.props.label}
        hintText={this.props.useHint ? this.props.label : null}
        errorText={this.props.errorMessage}
        disabled={this.props.disabled}
        onChange={(event) => this.setState({ value: event.target.value })}
        onKeyDown={this.onKeyDown.bind(this)}
        onBlur={() => this.props.onChange(this.state.value)}
        {...this.passProps} />
    );
  }
}

registerType({
  type: 'text',
  component: TextFieldComponent,
  description: 'Simple checkbox field.',
  optionsDefinition: {
    //type: Match.Optional(String),
  },
  optionsDescription: {
    type: 'Input type, it can be email, password, etc.',
  },
});

class StringFieldComponent extends TextFieldComponent {
  constructor(props) {
    super(props);
    this.type = 'text';
  }
}

registerType({
  type: 'string',
  component: StringFieldComponent,
});

class NumberFieldComponent extends TextFieldComponent {
  constructor(props) {
    super(props);
    this.type = 'number';
  }
}

registerType({
  type: 'number',
  component: NumberFieldComponent,
});

class DateFieldComponent extends TextFieldComponent {
  constructor(props) {
    super(props);
    this.type = 'date';
  }
}

registerType({
  type: 'date',
  component: DateFieldComponent,
});
