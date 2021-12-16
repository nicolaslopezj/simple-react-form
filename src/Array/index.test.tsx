import React from 'react'
import Form from '../Form'
import Field from '../Field'
import ArrayField from './index'
import ObjectField from '../Object'
import {FieldProps} from '../types'
import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'

function DummyInput(props: FieldProps) {
  return (
    <input
      name={props.fieldName}
      className="test-input"
      value={props.value || ''}
      onChange={event => {
        props.onChange(event.target.value)
      }}
    />
  )
}

it('should render correctly', () => {
  const {container} = render(
    <Form>
      <Field fieldName="array" type={ArrayField} />
    </Form>
  )

  expect(container.querySelector('.srf-array-container')).toBeInTheDocument()
})

it('addItem should add an item', () => {
  const {container} = render(
    <Form>
      <Field fieldName="array" type={ArrayField}>
        <div className="children" />
      </Field>
    </Form>
  )

  expect(container.querySelector('.children')).not.toBeInTheDocument()

  // click the add button
  fireEvent.click(screen.getByText('Add'))

  expect(container.querySelector('.children')).toBeInTheDocument()
})

it('removeItem should remove the item', () => {
  const {container} = render(
    <Form>
      <Field fieldName="array" type={ArrayField}>
        <div className="children" />
      </Field>
    </Form>
  )
  // add the first component
  fireEvent.click(screen.getByText('Add'))
  expect(container.querySelector('.children')).toBeInTheDocument()

  // press the remove button
  fireEvent.click(screen.getByText('Remove'))
  expect(container.querySelector('.children')).not.toBeInTheDocument()
})

it('should render an error if there is one', () => {
  const {container} = render(
    <Form>
      <Field fieldName="array" type={ArrayField} errorMessage="I AM AN ERROR" />
    </Form>
  )

  expect(container.querySelector('.srf_errorMessage')).toBeInTheDocument()
})

it('should pass the value to the child fields', () => {
  const item = {name: 'hello', text: 'bye'}
  const {container} = render(
    <Form state={{items: [item]}}>
      <Field fieldName="items" type={ArrayField}>
        <Field fieldName="name" type={DummyInput} />
        <Field fieldName="text" type={DummyInput} />
      </Field>
    </Form>
  )

  // check the value of the first item
  expect(container.getElementsByTagName('input')[0].value).toBe('hello')
  expect(container.getElementsByTagName('input')[1].value).toBe('bye')
})

test('onChange should make changes correctly', () => {
  let state: any = {persons: [{name: 'Nicolás'}]}

  const {container} = render(
    <Form state={state} onChange={changes => (state = changes)}>
      <Field fieldName="persons" type={ArrayField}>
        <Field fieldName="name" type={DummyInput} />
      </Field>
    </Form>
  )

  // change input text value
  fireEvent.change(container.querySelector('.test-input'), {target: {value: 'Joaquín'}})
  expect(state).toEqual({persons: [{name: 'Joaquín'}]})
})

test('onChange should make changes correctly on double array', () => {
  let state: any = {
    person: {
      friends: [{name: 'Nicolás'}]
    }
  }

  const {container} = render(
    <Form state={state} onChange={changes => (state = changes)}>
      <Field fieldName="person" type={ObjectField}>
        <Field fieldName="friends" type={ArrayField}>
          <Field fieldName="name" type={DummyInput} />
        </Field>
      </Field>
    </Form>
  )

  fireEvent.change(container.querySelector('input'), {target: {value: 'Joaquín'}})
  expect(state).toEqual({
    person: {
      friends: [{name: 'Joaquín'}]
    }
  })
})
