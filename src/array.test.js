import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Form from './form'
import Field from './field'
import {default as ArrayField} from './array'

it('should render correctly', () => {
  const component = mount(
    <Form>
      <Field fieldName="array" type={ArrayField} />
    </Form>
  );

  expect(component.find('ArrayComponent').length).toBe(1);
});

xit('addItem should add an item', () => {})
xit('removeItem should remove the item', () => {})
xit('should render an error if there is one', () => {})
