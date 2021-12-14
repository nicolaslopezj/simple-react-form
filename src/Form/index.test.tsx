import React from 'react'
import ObjectField from '../Object'
import {FieldProps} from '../types'
import Form from './index'
import {render, screen, fireEvent} from '@testing-library/react'
import Field from '../Field'
import '@testing-library/jest-dom'

function DummyInput(props: FieldProps) {
  return (
    <div>
      <div className="errorMessage">{props.errorMessage}</div>
      <input
        value={props.value || ''}
        onChange={event => {
          props.onChange(event.target.value)
        }}
      />
    </div>
  )
}

test('Should render by default a <form>', () => {
  const {container} = render(
    <Form>
      <div>dummy</div>
    </Form>
  )
  expect(container.querySelector('form')).toBeInTheDocument()
})

test('Should not render a <form> if useFormTag is false', () => {
  const {container} = render(
    <Form useFormTag={false}>
      <div>dummy</div>
    </Form>
  )

  expect(container.querySelector('form')).not.toBeInTheDocument()
})

test('onChange should dispatch on changes', () => {
  const mockFn = jest.fn()

  const {container} = render(
    <Form onChange={mockFn}>
      <Field fieldName="foo" type={DummyInput} />
    </Form>
  )

  fireEvent.change(container.querySelector('input'), {target: {value: 'foobar'}})
  expect(mockFn.mock.calls[0][0]).toEqual({foo: 'foobar'})

  fireEvent.change(container.querySelector('input'), {target: {value: 'barfoo'}})
  expect(mockFn.mock.calls[1][0]).toEqual({foo: 'barfoo'})
})

it('should render the form correctly', () => {
  const {container} = render(
    <Form>
      <Field fieldName="foo" type={DummyInput} />
    </Form>
  )

  expect(container.querySelector('form')).toBeInTheDocument()
  expect(container.querySelector('input')).toBeInTheDocument()
})

test('passes the errorMessage correctly', () => {
  const errorMessages = {
    'person.name': 'Error'
  }

  render(
    <Form errorMessages={errorMessages}>
      <Field fieldName="person" type={ObjectField}>
        <Field fieldName="name" type={DummyInput} />
      </Field>
    </Form>
  )

  expect(screen.getByText(errorMessages['person.name'])).toBeInTheDocument()
})

test('allows calling on submit using ref', () => {
  let form = null
  const mockFn = jest.fn()

  const {container} = render(
    <Form ref={handle => (form = handle)} onSubmit={mockFn}>
      <Field fieldName="name" type={DummyInput} />
    </Form>
  )

  fireEvent.change(container.querySelector('input'), {target: {value: 'Nicolás'}})

  fireEvent.submit(container.querySelector('form'))

  console.log(mockFn.mock.calls)

  fireEvent.change(container.querySelector('input'), {target: {value: 'Nico'}})

  form.submit()

  console.log(mockFn.mock.calls)

  expect(mockFn.mock.calls[0][0]).toEqual({name: 'Nicolás'})
  expect(mockFn.mock.calls[1][0]).toEqual({name: 'Nico'})
})
