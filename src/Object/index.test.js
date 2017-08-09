import React from 'react'
import {mount} from 'enzyme'
import Form from '../Form'
import Field from '../Field'
import {default as ObjectField} from './index'

it('should render correctly', () => {
  const component = mount(
    <Form>
      <Field fieldName="object" type={ObjectField}>
        <div className="children" />
      </Field>
    </Form>
  )
  expect(component.find('ObjectComponent').length).toBe(1)
})

it('should show an error if it has one', () => {
  const component = mount(
    <Form>
      <Field fieldName="object" type={ObjectField} errorMessage="I AM AN ERROR">
        <div className="children" />
      </Field>
    </Form>
  )

  expect(component.find('div').first().childAt(1).text()).toBe('I AM AN ERROR')
})

it('should render the label', () => {
  const component = mount(
    <Form>
      <Field fieldName="object" type={ObjectField} label="I AM A LABEL!">
        <div className="children" />
      </Field>
    </Form>
  )
  expect(component.find('b').text()).toBe('I AM A LABEL!')
})
