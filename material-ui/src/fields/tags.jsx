import React from 'react';
import TextField from 'material-ui/lib/text-field';
import {FieldType, registerType} from 'react-form';
import styles from '../styles';

class StringArrayComponent extends FieldType {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onKeyDown(event) {
    if (event.keyCode == 13) {
      this.addItem();
    }
  }

  addItem() {
    if (!this.state.value) return;
    var value = (this.props.value || []);
    value.push(this.state.value);
    this.props.onChange(value);
    this.setState({ value: '' });
  }

  removeItem(value) {
    const newValue = _.without(this.props.value, value);
    this.props.onChange(newValue);
  }

  renderItems() {
    return (this.props.value || []).map((value, index) => {
      return (
        <div onClick={() => this.removeItem(value)} key={index} style={styles.tag}>
          {value}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <TextField
          ref='input'
          fullWidth={true}
          value={this.state.value}
          floatingLabelText={this.props.useHint ? null : this.props.label}
          hintText={this.props.useHint ? this.props.label : null}
          errorText={this.props.errorMessage}
          disabled={this.props.disabled}
          onChange={(event) => this.setState({ value: event.target.value })}
          onKeyDown={this.onKeyDown.bind(this)}
          onBlur={this.addItem.bind(this)}
          {...this.passProps} />
        {this.renderItems()}
      </div>
    );
  }
}

registerType({
  type: 'string-array',
  component: StringArrayComponent,
  allowedTypes: [[String]],
});

registerType({
  type: 'tags',
  component: StringArrayComponent,
  allowedTypes: [[String]],
  description: 'Tags input',
});
