import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import Home from './index';

FlowRouter.route('/', {
  name: 'home',
  action(params) {
    mount(Home);
  },
});
