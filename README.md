# Simple React Form

[![travis-ci](https://travis-ci.org/nicolaslopezj/simple-react-form.svg?branch=master)](https://travis-ci.org/nicolaslopezj/simple-react-form)
[![npm version](https://badge.fury.io/js/simple-react-form.svg)](https://badge.fury.io/js/simple-react-form)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Simple React Form is a library to make reusable form components in **React** and [React Native](#react-native) and works
great with **Meteor**

This is just a framework, you must [create the form components](#custom-input-types) that you will use.

If you use material-ui you are lucky, because I published a material-ui set of components.
[simple-react-form-material-ui](https://github.com/nicolaslopezj/simple-react-form-material-ui).

Made for Meteor, but works without Meteor too. This package was inspired by aldeed's autoform.

To use with react native [check here](#react-native)

### Installation

Install the base package

```sh
npm install --save simple-react-form
```

If you use material-ui install that package too

```sh
npm install --save simple-react-form-material-ui
```

If you don't use material-ui check the [contributions](#contributions) if there is a package for you.

Browse the [examples](https://github.com/nicolaslopezj/simple-react-form-examples).

### Example

```js
import React from 'react'
import {Form, Field} from 'simple-react-form'
import DatePicker from 'simple-react-form-material-ui/lib/date-picker'
import Text from 'simple-react-form-material-ui/lib/text'

class PostsCreate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <Form state={this.state} onChange={changes => this.setState(changes)}>
          <Field fieldName='name' label='Name' type={Text}/>
          <Field fieldName='date' label='A Date' type={DatePicker}/>
        </Form>
        <p>
          My name is {this.state.name}
        </p>
      </div>
    )
  }
}
```

Since Material-UI V0.15.0 components require a theme to be provided. Recommended way is wrapping your component in
a `MuiThemeProvider` component like shown in the example
You can find more examples [here](https://github.com/nicolaslopezj/simple-react-form-examples).

## Contributions

- [simple-react-form-material-ui](https://github.com/nicolaslopezj/simple-react-form-material-ui) Material UI set of fields.
- [simple-react-form-bootstrap](https://github.com/fermuch/simple-react-form-bootstrap) Bootstrap set of fields.

# Docs

## Using with state

In this example, the current value of the form will be stored in ```this.state```

```js
import React from 'react'
import {Form, Field} from 'simple-react-form'
import DatePicker from 'simple-react-form-material-ui/lib/date-picker'
import Text from 'simple-react-form-material-ui/lib/text'

class PostsCreate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <Form state={this.state} onChange={changes => this.setState(changes)}>
          <Field fieldName='name' label='Name' type={Text}/>
          <Field fieldName='date' label='A Date' type={DatePicker}/>
        </Form>
        <p>
          My name is {this.state.name}
        </p>
      </div>
    )
  }
}
```

## Use with Meteor Simple Schema

Automatic forms creation with [aldeed/meteor-simple-schema](https://github.com/aldeed/meteor-simple-schema) and React.

##### Allow ```srf``` field for schemas

With simple-schema you must define the object attributes that are not the basics.

Just add this code once in your app.

```js
SimpleSchema.extendOptions({
  srf: Match.Optional(Object)
})
```

### Basic Example

Schema

```js
import {Meteor} from 'meteor/meteor'
import Textarea from 'simple-react-form-material-ui/lib/textarea'
import Text from 'simple-react-form-material-ui/lib/text'

const Posts = new Meteor.Collection('posts')

Posts.attachSchema({
  title: {
    type: String,
    srf: {
      type: Text
    }
  },
  body: {
    type: String,
    label: 'Content',
    srf: {
      type: Textarea
    }
  }
})

export default Posts
```

An insert form.

```jsx
import React from 'react'
import {Form} from 'simple-react-form'
import Posts from '../../collections/posts'

class PostsCreate extends React.Component {
  render() {
    return (
      <div>
        <h1>Create a post</h1>
        <Form
        collection={Posts}
        type='insert'
        ref='form'
        onSuccess={(docId) => FlowRouter.go('posts.update', { postId: docId })}/>
        <RaisedButton label='Create' onTouchTap={() => this.refs.form.submit()}/>
      </div>
    )
  },
}
```

An update form.

```jsx
import React from 'react'
import {Form, Field} from 'simple-react-form'
import Posts from '../../collections/posts'

class PostsUpdate extends React.Component {
  render() {
    return (
      <div>
        <h1>Post update</h1>
        <Form
        collection={Posts}
        type='update'
        ref='form'
        doc={this.props.post}>
          <Field fieldName='title'/>
          <Field fieldName='body'/>
        </Form>
        <RaisedButton primary={true} label='Save' onTouchTap={() => this.refs.form.submit()}/>
      </div>
    )
  }
}
```

## Custom Input Types

React Simple Form is built from the idea that you can create custom components easily.

Basically this consist in a component that have the prop ```value``` and the prop ```onChange```.
You must render the ```value``` and call ```onChange``` passing the new value
when the value has changed.

You can also pass props to this components setting them in the srf parameter of
the simple-schema object:

```
import UploadImage from '../components/my-fields/upload'

Post.attachSchema({
  picture: {
    type: String,
    srf: {
      type: UploadImage,
      squareOnly: true
    }
  }
})
```

Or simply in the field while rendering:

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

You can view the full list of props [here](https://github.com/nicolaslopezj/simple-react-form/blob/master/src/field.jsx#L11).

*Props that are not define in propTypes will be stored in ```this.passProps``` and deleted from propTypes.*

## React Native

With React Native the api is the same, but you must pass the option ```useFormTag={false}``` to the form.

Example:

You must create all your field types (Maybe someone makes a package in the future!)

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

<Form state={this.state} onChange={changes => this.setState(changes)} useFormTag={false}>
  <View>
    <Field fieldName='email' type={Text}/>
    <Field fieldName='password' type={Text}/>
  </View>
</Form>
```

> You should always render your fields inside a View when using react native.
