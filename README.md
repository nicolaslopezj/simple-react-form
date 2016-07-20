# Simple React Form

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Simple React Form is a powerful framework that simplifies the use of forms in React.

This is just a framework, you must [create the form components](https://github.com/nicolaslopezj/simple-react-form/blob/master/docs/create-input-types.md) that you will use.

If you use material-ui you are lucky, because I published a material-ui set of components.
[simple-react-form-material-ui](https://github.com/nicolaslopezj/simple-react-form-material-ui).

Made for Meteor, but works without Meteor too. This package was inspired by aldeed's autoform.

### Installation

Install the base package

```sh
npm install --save simple-react-form
```

If you use material-ui install that package too

```sh
npm install --save simple-react-form-material-ui
```

And register the material-ui components, just once in your app.

```js
import 'simple-react-form-material-ui'
```

Go to the [docs](https://github.com/nicolaslopezj/simple-react-form/tree/master/docs) folder to continue.

Browse the [examples](https://github.com/nicolaslopezj/simple-react-form-examples).

### Example

```jsx
import React from 'react'
import {Form, Field} from 'simple-react-form'

class PostsCreate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Form
        state={this.state}
        onChange={changes => this.setState(changes)}>
        <Field fieldName='title' type='string' label='Title'/>
        <Field fieldName='body' type='textarea' label='Body'/>
        <p>
          The title is "{this.state.title}"
        </p>
      </Form>
    )
  }
}
```

You can find more examples [here](https://github.com/nicolaslopezj/simple-react-form-examples).
