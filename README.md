# Simple React Form

[![travis-ci](https://travis-ci.org/nicolaslopezj/simple-react-form.svg?branch=master)](https://travis-ci.org/nicolaslopezj/simple-react-form)
[![npm version](https://badge.fury.io/js/simple-react-form.svg)](https://badge.fury.io/js/simple-react-form)


Simple React Form is a library to make reusable form components in **React** and [React Native](#react-native).

This is just a framework, you must [create the form components](#field-types) or [install a package with fields](#contributions) that you will use.

To use with react native [check here](#react-native)

### Installation

Install the base package

```sh
npm install --save simple-react-form
```

### Example

```js
import React from 'react'
import {Form, Field} from 'simple-react-form'
import DatePicker from './myFields/DatePicker'
import Text from './myFields/Text'

class PostsCreate extends React.Component {

  state = {}

  render() {
    return (
      <div>
        <Form state={this.state} onChange={state => this.setState(state)}>
          <Field fieldName='name' label='Name' type={Text} />
          <Field fieldName='date' label='A Date' type={DatePicker} />
        </Form>
        <p>
          My name is {this.state.name}
        </p>
      </div>
    )
  }
}
```

## Contributions

- [simple-react-form-material-ui](https://github.com/nicolaslopezj/simple-react-form-material-ui) Material UI set of fields.
- [simple-react-form-bootstrap](https://github.com/fermuch/simple-react-form-bootstrap) Bootstrap set of fields.

# Docs

## Using with state

In this example, the current value of the form will be stored in ```this.state```

```js
import React from 'react'
import {Form, Field} from 'simple-react-form'
import DatePicker from './myFields/DatePicker'
import Text from './myFields/Text'

class PostsCreate extends React.Component {

  state = {}

  render() {
    return (
      <div>
        <Form state={this.state} onChange={state => this.setState(state)}>
          <Field fieldName='name' label='Name' type={Text} />
          <Field fieldName='date' label='A Date' type={DatePicker} />
        </Form>
        <p>
          My name is {this.state.name}
        </p>
      </div>
    )
  }
}
```

## Field Types

React Simple Form is built from the idea that you can create custom components easily.

Basically this consist in a component that have the prop ```value``` and the prop ```onChange```.
You must render the ```value``` and call ```onChange``` passing the new value
when the value has changed.

```js
import UploadImage from '../components/my-fields/upload'

<Field fieldName='picture' type={UploadImage} squareOnly={true}/>
```

### Creating the field type

You must create a React component.
Check the props that are passed by default [here](https://github.com/nicolaslopezj/simple-react-form/blob/master/src/FieldType.js)

```js
import React from 'react'

export default class UploadImage extends React.Component {
  render() {
    return (
      <div>
        <p>
          {this.props.label}
        </p>
        <img src={this.props.value} />
        <TextField
        value={this.props.value}
        hintText='Image Url'
        onChange={(event) => this.props.onChange(event.target.value)} />
        <p>
          {this.props.errorMessage}
        </p>
      </div>  
    );
  }
}
```

You can view the full list of props [here](https://github.com/nicolaslopezj/simple-react-form/blob/master/src/FieldType.js#L4).

*Props that are not define in propTypes will be stored in ```this.passProps``` and deleted from propTypes.*

## React Native

With React Native the api is the same, but you must enclose the inner content of the form with a ```View``` component.

Example:

```js
import React from 'react'
import {View, TextInput} from 'react-native'

export default class TextFieldComponent extends React.Component {

  render () {
    return (
      <View>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={this.props.onChange}
        value={this.props.value}/>
      </View>
    )
  }
}
```

Render the form in the component you want

```js
import Text from '../components/my-fields/text'

<Form state={this.state} onChange={changes => this.setState(changes)}>
  <View>
    <Field fieldName='email' type={Text}/>
    <Field fieldName='password' type={Text}/>
  </View>
</Form>
```

> You should always render your fields inside a View when using react native.

## Contributors

- [@nicolaslopezj](http://github.com/nicolaslopezj)
- [@fermuch](http://github.com/fermuch)
- [@joadr](http://github.com/joadr)
- [@prinzdezibel](http://github.com/prinzdezibel)
