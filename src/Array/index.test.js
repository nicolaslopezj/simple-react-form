import React from 'react'
import { mount } from 'enzyme'
import Form from '../Form'
import Field from '../Field'
import {default as ArrayField} from './index'

it('should render correctly', () => {
  const component = mount(
    <Form>
      <Field fieldName='array' type={ArrayField} />
    </Form>
  )

  expect(component.find('ArrayComponent').length).toBe(1)
})

it('addItem should add an item', () => {
  const component = mount(
    <Form>
      <Field fieldName='array' type={ArrayField}>
        <div className='children' />
      </Field>
    </Form>
  )

  const beforePress = component.find('.children').length
  expect(beforePress).toBe(0)
  component.find('button').simulate('click')
  const afterPress = component.find('.children').length

  expect(afterPress).toBe(beforePress + 1)
})

it('removeItem should remove the item', () => {
  const component = mount(
    <Form>
      <Field fieldName='array' type={ArrayField}>
        <div className='children' />
      </Field>
    </Form>
  )
  // add the first component
  component.find('button').simulate('click')
  const beforePress = component.find('.children').length
  expect(beforePress).toBe(1)
  // press the remove button
  component.find('ArrayContextItem').parent().find('button').simulate('click')
  const afterPress = component.find('.children').length

  expect(afterPress).toBe(beforePress - 1)
})

it('should render an error if there is one', () => {
  const component = mount(
    <Form>
      <Field fieldName='array' type={ArrayField} errorMessage='I AM AN ERROR' />
    </Form>
  )
  expect(component.find('div').first().childAt(1).text()).toBe('I AM AN ERROR')
})
