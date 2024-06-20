import {fireEvent, render} from '@testing-library/react'
import React from 'react'
import Field from '../Field'
import Form from '../Form'
import {FieldProps} from '../types'
import {default as ObjectField} from './index'
import '@testing-library/jest-dom'

class DummyInput extends React.Component<FieldProps> {
  render() {
    return (
      <input
        value={this.props.value || ''}
        onChange={event => {
          this.props.onChange(event.target.value)
        }}
      />
    )
  }
}

it('should render correctly', () => {
  const {container} = render(
    <Form>
      <Field fieldName="object" type={ObjectField}>
        <div className="children" />
      </Field>
    </Form>,
  )

  expect(container.querySelector('.children')).toBeInTheDocument()
})

it('should show an error if it has one', () => {
  const {container} = render(
    <Form errorMessages={{item: 'I AM AN ERROR'}}>
      <Field fieldName="item" type={ObjectField}>
        <div className="children" />
      </Field>
    </Form>,
  )

  expect(container.querySelector('.srf_errorMessage')).toHaveTextContent('I AM AN ERROR')
})

it('should pass the value to the child field', () => {
  const {container} = render(
    <Form state={{object: {field: 'hello'}}}>
      <Field fieldName="object" type={ObjectField}>
        <Field fieldName="field" type={DummyInput} />
      </Field>
    </Form>,
  )

  // expect input value to be hello
  expect(container.querySelector('input')).toHaveValue('hello')
})

test('onChange should make changes correctly', () => {
  let state = {person: {name: 'Nicolás'}}

  const {container} = render(
    <Form
      state={state}
      onChange={(changes: typeof state) => {
        state = changes
      }}
    >
      <Field fieldName="person" type={ObjectField}>
        <Field fieldName="name" type={DummyInput} />
      </Field>
    </Form>,
  )

  // changes the input value
  fireEvent.change(container.querySelector('input'), {target: {value: 'Joaquín'}})
  expect(state).toEqual({person: {name: 'Joaquín'}})
})
