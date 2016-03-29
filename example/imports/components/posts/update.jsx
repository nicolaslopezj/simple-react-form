import React from 'react';
import { Form, Field } from 'simple-react-form';
import RaisedButton from 'material-ui/lib/raised-button';

import Posts from './posts';

class PostsUpdate extends React.Component {
  render() {
    return (
      <div>
        <h1>Post update</h1>
        <Form
          collection={Posts}
          type="update"
          ref="form"
          doc={this.props.post}>
          <Field fieldName="title"/>
          <Field fieldName="body"/>
        </Form>
        <RaisedButton primary={true} label="Save" onTouchTap={() => this.refs.form.submit()}/>
      </div>
    );
  }
};
