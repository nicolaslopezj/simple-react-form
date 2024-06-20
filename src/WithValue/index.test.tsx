import {render, screen} from '@testing-library/react'
import React from 'react'
import Field from '../Field'
import Form from '../Form'
import ObjectField from '../Object'
import {FieldProps} from '../types'
import WithValue from './index'
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

it('should pass the value of the form', () => {
  render(
    <Form state={{name: 'Nicolás'}}>
      <WithValue>
        {value => (
          <div>
            <div className="theValue">{value.name}</div>
            <Field fieldName="name" type={DummyInput} />
          </div>
        )}
      </WithValue>
    </Form>,
  )

  const content = screen.getByText('Nicolás')
  expect(content.innerHTML).toBe('Nicolás')
})

it('should pass the value of the form on sub object data', () => {
  const doc = {person: {name: 'Nicolás'}}

  render(
    <Form state={doc}>
      <Field fieldName="person" type={ObjectField}>
        <WithValue>
          {person => (
            <div>
              <div className="theValue">{person.name}</div>
              <Field fieldName="name" type={DummyInput} />
            </div>
          )}
        </WithValue>
      </Field>
    </Form>,
  )

  const content = screen.getByText('Nicolás')
  expect(content.innerHTML).toBe('Nicolás')
})
