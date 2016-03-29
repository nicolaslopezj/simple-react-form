# Use with Meteor Simple Schema

Automatic forms creation with [aldeed:simple-schema](http://github.com/aldeed/simple-schema) and React.

## Preparation

*You must add this lines of code in your app just once.*

##### Register the fields

```js
import 'simple-react-form-material-ui';
```

##### Allow ```srf``` field for schemas

```js
SimpleSchema.extendOptions({
  srf: Match.Optional(Object),
});
```

## Basic Example

Schema

```js
Posts = new Meteor.Collection('posts');

Posts.attachSchema({
  title: {
    type: String,
  },
  body: {
    type: String,
    label: 'Content',
    srf: {
      type: 'textarea',
    },
  }
});
```

An insert form.

```jsx
import React from 'react';
import { Form } from 'simple-react-form';
import Posts from '../../collections/posts';
import RaisedButton from 'material-ui/lib/raised-button';

class PostsCreate extends React.Component {
  render() {
    return (
      <div>
        <h1>Create a post</h1>
        <Form
          collection={Posts}
          type="insert"
          ref="form"
          onSuccess={(docId) => FlowRouter.go('posts.update', { postId: docId })}
          />
        <RaisedButton label="Create" onTouchTap={() => this.refs.form.submit()}/>
      </div>
    );
  },
};
```

An update form.

```jsx
import React from 'react';
import { Form, Field } from 'simple-react-form';
import Posts from '../../collections/posts';
import RaisedButton from 'material-ui/lib/raised-button';

class PostsUpdate extends MeteorDataComponent {
  getMeteorData() {
    const subs = Meteor.subscribe("posts.by.user");
    const post = Posts.findOne(this.props.post);
    return {
      post
    }
  }
  
  render() {
    return (
      <div>
        <h1>Post update</h1>
        <Form
          collection={Posts}
          type="update"
          ref="form"
          doc={this.data.post}>
          <Field fieldName="title"/>
          <Field fieldName="body"/>
        </Form>
        <RaisedButton primary={true} label="Save" onTouchTap={() => this.refs.form.submit()}/>
      </div>
    );
  },
};
```
