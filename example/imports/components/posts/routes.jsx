import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import Create from './create';
import Update from './update';

FlowRouter.route('/posts', {
  name: 'posts.index',
  action(params) {
    mount(Create);
  },
});

FlowRouter.route('/posts/create', {
  name: 'posts.create',
  action(params) {
    mount(Create);
  },
});

FlowRouter.route('/posts/:postId', {
  name: 'posts.update',
  action(params) {
    mount(Update, params);
  },
});
