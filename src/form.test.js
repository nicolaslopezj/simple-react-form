import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Form from './form';

test('Should render by default a <form>', () => {
  const component = shallow(
    <Form>
      <div>dummy</div>
    </Form>
  );
  expect(component.find('form').length).toBe(1);
});

test('Should not render a <form> if useFormTag is false', () => {
  const component = shallow(
    <Form useFormTag={false}>
      <div>dummy</div>
    </Form>
  );
  expect(component.find('form').length).toBe(0);
});
