# Simple React Form

Simple React Form is the simplest way to handle forms in React. It helps you make reusable form components in **React** and [React Native](#react-native).

This is just a framework, you must [create the form components](#field-types) or [install a package with fields](#contributions) that you will use.

To use with React Native, see [the dedicated section](#react-native)

## Features

- Minimal API with `Form` and `Field`.
- Works with React and React Native.
- Full TypeScript definitions.
- Controlled or uncontrolled forms.
- Create your own field components.

See [API.md](./API.md) for the complete API reference.


### Installation

Install the base package

```sh
npm install simple-react-form
# or
yarn add simple-react-form
```

### Example

```js
import React, { useState } from 'react'
import { Form, Field } from 'simple-react-form'
import DatePicker from './myFields/DatePicker'
import Text from './myFields/Text'

function PostsCreate() {
  const [state, setState] = useState({})

  return (
    <div>
      <Form state={state} onChange={setState}>
        <Field fieldName="name" label="Name" type={Text} />
        <Field fieldName="date" label="A Date" type={DatePicker} />
      </Form>
      <p>My name is {state.name}</p>
    </div>
  )
}
```

## Contributions

- [simple-react-form-material-ui](https://github.com/nicolaslopezj/simple-react-form-material-ui) Material UI set of fields.
- [simple-react-form-bootstrap](https://github.com/fermuch/simple-react-form-bootstrap) Bootstrap set of fields.

# Docs

## Using with state

In this example, the current value of the form will be stored in a state variable using `useState`.

```js
import React, { useState } from 'react'
import { Form, Field } from 'simple-react-form'
import DatePicker from './myFields/DatePicker'
import Text from './myFields/Text'

function PostsCreate() {
  const [state, setState] = useState({})

  return (
    <div>
      <Form state={state} onChange={setState}>
        <Field fieldName="name" label="Name" type={Text} />
        <Field fieldName="date" label="A Date" type={DatePicker} />
      </Form>
      <p>My name is {state.name}</p>
    </div>
  )
}
```

## Using without state

In this example, the current value of the form will be stored inside the Form component and passed in the onSubmit function. The difference on this is that the `state` prop does not change over time.

```js
import React, { useRef } from 'react'
import { Form, Field } from 'simple-react-form'
import DatePicker from './myFields/DatePicker'
import Text from './myFields/Text'

function PostsCreate({ initialDoc }) {
  const formRef = useRef()

  const onSubmit = ({ name, date }) => {
    // handle submit
  }

  return (
    <div>
      <Form ref={formRef} state={initialDoc} onSubmit={onSubmit}>
        <Field fieldName="name" label="Name" type={Text} />
        <Field fieldName="date" label="A Date" type={DatePicker} />
      </Form>
      <button onClick={() => formRef.current.submit()}>Submit</button>
    </div>
  )
}
```

## Field Types

React Simple Form is built from the idea that you can create custom components easily.

Basically, a field type is a component that receives a `value` prop and an `onChange` handler. It must render the value and call `onChange` with the new value whenever it changes.

```js
import UploadImage from '../components/my-fields/upload'

<Field fieldName='picture' type={UploadImage} squareOnly={true}/>
```

### Creating the field type

You must create a React component.

```js
import React from 'react'

function UploadImage({ value, onChange, label, errorMessage }) {
  return (
    <div>
      <p>{label}</p>
      <div>
        <img src={value} alt="preview" />
      </div>
      <TextField
        value={value}
        hintText="Image Url"
        onChange={event => onChange(event.target.value)}
      />
      <p>{errorMessage}</p>
    </div>
  )
}

export default UploadImage
```

You can view the full list of props [here](https://github.com/nicolaslopezj/simple-react-form/blob/master/src/FieldType.js#L4).

## React Native

In React Native the API is the same, but wrap the form contents in a `View` component.

Example:

```js
import React from 'react'
import { View, TextInput } from 'react-native'

function TextFieldComponent({ value, onChange }) {
  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={onChange}
        value={value}
      />
    </View>
  )
}

export default TextFieldComponent
```

Render the form inside the desired component

```js
import React, { useState } from 'react'
import Text from '../components/my-fields/text'
import { Form, Field } from 'simple-react-form'
import { View } from 'react-native'

function MyForm() {
  const [state, setState] = useState({})

  return (
    <Form state={state} onChange={setState}>
      <View>
        <Field fieldName='email' type={Text}/>
        <Field fieldName='password' type={Text}/>
      </View>
    </Form>
  )
}
```

> You should always render your fields inside a View when using react native.

### WithValue higher-order component

If you need to access the current form value in child components, use the `WithValue` component.

```js
import React from 'react'
import { Form, Field, WithValue } from 'simple-react-form'
import Text from './myFields/Text'

function Example() {
  return (
    <div>
      <Form>
        <WithValue>
          {value => (
            <div>
              <p>The name is {value.name}</p>
              <Field fieldName="name" label="Name" type={Text} />
            </div>
          )}
        </WithValue>
      </Form>
    </div>
  )
}
```

## Contributors

- [@nicolaslopezj](http://github.com/nicolaslopezj)
- [@fermuch](http://github.com/fermuch)
- [@joadr](http://github.com/joadr)
- [@prinzdezibel](http://github.com/prinzdezibel)

## Running Tests

Clone the repository, install dependencies and run:

```sh
yarn test
```
