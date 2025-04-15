# Simple React Form – API Reference

## Overview

**Simple React Form** is a framework for building reusable, type-safe forms in React and React Native. It provides a minimal API, encourages custom field components, and supports both controlled and uncontrolled form patterns.

- **Framework, not a field set**: You create or install your own field components.
- **TypeScript support**: Full type definitions for all components and hooks.
- **React Native support**: Same API, with minor differences.

---

## Installation

```sh
npm install --save simple-react-form
```

---

## Main Exports

```js
import {
  Form,
  Field,
  ArrayComponent,
  ObjectComponent,
  WithValue,
  useValue
} from 'simple-react-form'
```

---

## Components

### `<Form />`

The main container for your form. Handles state, change propagation, and submission.

**Props:**
- `children: React.ReactNode` – The fields of the form.
- `state?: object` – The object with the form values (for controlled forms).
- `onChange?: (state: object) => void` – Callback when the form value changes.
- `errorMessages?: object` – Pass error messages as an object.
- `useFormTag?: boolean` – Use `<form>` as the container (default: true).
- `onSubmit?: (value: object) => any` – Called when the form is submitted.
- ...all other standard HTML form props (except `onChange`).

**Ref methods:**
- `submit()` – Triggers form submission.
- `getValue()` – Returns the current form value.
- `reset()` – Resets the form to the initial state.

**Usage:**
```js
<Form state={formState} onChange={setFormState} onSubmit={handleSubmit}>
  <Field fieldName="name" label="Name" type={TextField} />
</Form>
```

---

### `<Field />`

Renders a field of the form. You must provide a custom field component via the `type` prop.

**Props:**
- `fieldName: string` – The name of the field in the form object.
- `type: React.ComponentType` – The field component to render.
- `label?: React.ReactNode` – Field label.
- `placeholder?: string` – Input placeholder.
- `errorMessage?: string` – Error message for this field.
- `parentValue?: any` – Value of the parent object (for nested fields).
- `fieldSchema?: object` – Schema for the field (optional).
- `schema?: object` – Schema for the object (optional).
- `passProps?: object` – Additional props passed to the field component.
- `children?: React.ReactNode` – Children (for custom field layouts).
- ...all props required by your custom field component.

**Usage:**
```js
<Field fieldName="email" label="Email" type={TextField} />
```

---

### `<ArrayComponent />`

Handles array fields (lists of objects or values). Can be extended for custom UI.

**Props:**
- `fieldName: string` – The name of the array field.
- `label?: React.ReactNode` – Label for the array field.
- `addLabel?: string` – Label for the add button (default: 'Add').
- `removeLabel?: React.ReactNode` – Label for the remove button (default: 'Remove').
- `showAddButton?: boolean` – Show the add button (default: true).
- `showRemoveButton?: boolean` – Show the remove button (default: true).
- `disabled?: boolean` – Disable add/remove buttons.
- `autoAddItem?: boolean` – Automatically add an item if empty (default: false).
- `errorMessages?: { [key: string]: string }` – Error messages for children.
- `children?: React.ReactNode` – The field(s) for each item.
- `renderItem?: (item, index) => React.ReactNode` – Custom render function for items.
- `renderProps?: boolean` – If true, children is a function receiving the index.

**Usage:**
```js
<Field fieldName="tags" type={ArrayComponent}>
  <Field fieldName="tag" type={TextField} />
</Field>
```

---

### `<ObjectComponent />`

Handles object fields (nested objects). Can be extended for custom UI.

**Props:**
- `fieldName: string` – The name of the object field.
- `label?: React.ReactNode` – Label for the object field.
- `errorMessage?: string` – Error message for this object.
- `children?: React.ReactNode` – The fields for the object.

**Usage:**
```js
<Field fieldName="address" type={ObjectComponent}>
  <Field fieldName="street" type={TextField} />
  <Field fieldName="city" type={TextField} />
</Field>
```

---

### `<WithValue />`

A render-prop component to access the current form value in children.

**Props:**
- `children: (value: any) => React.ReactNode` – Function receiving the current form value.

**Usage:**
```js
<Form>
  <WithValue>
    {value => <div>Current name: {value.name}</div>}
  </WithValue>
</Form>
```

---

### `useValue()`

A React hook to access the current form value from inside a field or child component.

**Usage:**
```js
const value = useValue()
```

---

## Contexts & Advanced Hooks

The following contexts and hooks are exported for advanced use cases:

- `ValueContext` – React context for the current form value.
- `ParentFieldNameContext` – Context for the parent field name (for nested fields).
- `ErrorMessagesContext` – Context for error messages.
- `OnChangeContext` – Context for the onChange handler.
- `useFormValueContext()` – Hook for the current value.
- `useFormParentFieldNameContext()` – Hook for the parent field name.
- `useErrorMessagesContext()` – Hook for error messages.
- `useFormOnChangeContext()` – Hook for the onChange handler.

---

## TypeScript Support

All components and hooks are fully typed. Main types:
- `FormProps`, `FormRef`
- `FieldProps`, `FieldPropsBase`, `FormFieldProps`
- `ArrayComponentProps`

See the source in `src/types.ts` for full details.

---

## Creating Custom Field Types

A field type is a React component that receives at least these props:
- `value` – The current value of the field.
- `onChange(newValue)` – Call this when the value changes.
- `label`, `errorMessage`, `parentValue`, `placeholder`, `fieldSchema`, `schema`, `passProps`, `children` (optional, see `FieldPropsBase`).

**Example:**
```js
function MyTextField({ value, onChange, label, errorMessage }) {
  return (
    <div>
      <label>{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} />
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  )
}
```

---

## React Native Support

- Use the same API as in React.
- Always wrap fields in a `<View>`.
- Use React Native components for your field types.

**Example:**
```js
import { View, TextInput } from 'react-native'

function TextFieldComponent({ value, onChange }) {
  return (
    <View>
      <TextInput value={value} onChangeText={onChange} />
    </View>
  )
}
```
