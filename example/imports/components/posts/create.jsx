import React from 'react';
import { Form } from 'simple-react-form';
import RaisedButton from 'material-ui/lib/raised-button';

import Posts from './posts';

export default class PostsCreate extends React.Component {
  render() {
    return (
      <div>
        <h1>Create a post</h1>
        <Form
          collection={Posts}
          type="insert"
          ref="form"
          logErrors={true}
          onSuccess={(docId) => FlowRouter.go('posts.update', { postId: docId })}
          />
        <RaisedButton label="Create" onTouchTap={() => this.refs.form.submit()}/>
      </div>
    );
  }
};
