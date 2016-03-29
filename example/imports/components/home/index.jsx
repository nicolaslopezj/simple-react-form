import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Simple React Form</h1>
        <p>
          Welcome to the example of simple-react-form.
        </p>
        <h2>
          Develop mode
        </h2>
        <p>
          To start develop mode run
        </p>
        <div>
          <code>
            npm run watch-form
          </code>
        </div>
        <div>
          <code>
            npm run watch-material
          </code>
        </div>
        <h2>
          Browse the examples
        </h2>
        <h4>
          Forms with simple schema
        </h4>
        <p>
          <a href={FlowRouter.path('posts.create')}>
            Create post, rendered automatically
          </a>
        </p>
      </div>
    );
  }
};
