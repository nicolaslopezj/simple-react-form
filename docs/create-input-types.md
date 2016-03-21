
## Create Input Types

React Simple Form is built from the idea that you can create custom components easily.

First, you have to register the type:

```js
import { registerType } from 'simple-react-form';

registerType(options);
```

**Options:**

- **type**: *String*. The name of the attribute.
- **component**: *React Component*. The component of the field.

And the component have the following propTypes:

- **value**: *Any* Optional. The value of the field.
- **label**: *String*. The label for the field.
- **errorMessage**: *String* Optional. If there is a error, this will be the message.
- **onChange**: *Function*. Call this function when the value changes. If the value change, the prop ```value``` will change too.

#### Example:

```jsx
import { FieldType, registerType } from 'simple-react-form';

class MyTextareaComponent extends FieldType {
  render() {
    return (
      <TextField
        ref="input"
        fullWidth={true}
        multiLine={true}
        rows={2}
        value={this.props.value}
        floatingLabelText={this.props.label}
        errorText={this.props.errorMessage}
        onChange={(event) => this.props.onChange(event.target.value)} />
    );
  }
}

registerType({
  type: 'textarea',
  component: MyTextareaComponent,
});
```
