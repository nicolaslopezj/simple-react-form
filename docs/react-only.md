# Tutorial for use without Meteor

## Basic Example

An insert form.

```jsx
import React from 'react';
import { Form, Field } from 'simple-react-form';

class PostsCreate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Form
        state={this.state}
        onChange={({ title, body }) => this.setState({ title, body })}>
        <Field fieldName="title" type="string" label="Title"/>
        <Field fieldName="body" type="textarea" label="Body"/>
      </Form>
    );
  },
};
```
