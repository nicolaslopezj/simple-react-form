# Forms

To create complex state management we use 'simple-react-form'

Simple React Form lets us build forms by composing Field components. Each Field.type is a React component that receives a value and an onChange handler. The Form manages the state for us, updating the state object as fields change.

- Field Types are components that recieve as props "value" and "onChange"
- Use the Form component to manage and update form state automatically.
- Field.fieldName will set the variable in the state object.
- Use dot notation for nested object fields.
- Use dot notation with numbers for array fields.
- All available field components are listed in `src/components/form/fields/index.tsx`, you should always try to pick one of them instead of creating a custom field.

### Example

```tsx
import {Field, Form} from 'simple-react-form'
import DateTimeCalendar from 'src/components/form/fields/DateTimeCalendar'
import TextInput from 'src/components/form/fields/TextInput'

<Form state={state} onChange={setState}>
  <Field fieldName="title" label="Title" type={TextInput} />
  <Field fieldName="createdAt" label="CreatedAt" type={DateTimeCalendar} />
  <Field fieldName="user.name" label="User Name" type={TextInput} />   // user: { name: ... }
  <Field fieldName="tags.0" label="First Tag" type={TextInput} />     // tags: [ ... ]
</Form>
```

## Custom Fields

If you need to create a specific custom field, don't create it in `src/components/form/fields`, just do it beside the component that will use it.

### Example

```tsx
import {FieldProps} from 'simple-react-form'
import InputContainer from 'src/components/form/fields/InputContainer'

export type TextInputProps = {
  inputType?: string
  disabled?: boolean
  placeholder?: string
}

export default function TextInput(props: FieldProps<string, TextInputProps>) {
  return (
    <InputContainer {...props}>
      <input
        disabled={props.disabled}
        type={props.inputType || 'text'}
        name={props.fieldName}
        value={props.value || ''}
        onChange={event => props.onChange(event.target.value)}
        placeholder={props.placeholder}
      />
    </InputContainer>
  )
}
```