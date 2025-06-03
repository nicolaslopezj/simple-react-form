import {render, screen, fireEvent, act} from '@testing-library/react'
import React from 'react'
import Field from '../Field'
import Form from '../Form'
import ObjectField from '../Object'
import {FieldProps} from '../types'
import WithValue from './index'
import '@testing-library/jest-dom'

jest.useFakeTimers()

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

test('updates the render prop when the form value changes', () => {
  function Test() {
    const [state, setState] = React.useState({name: ''})
    return (
      <Form state={state} onChange={setState}>
        <WithValue>{value => <div data-testid="val">{value.name}</div>}</WithValue>
        <Field fieldName="name" type={DummyInput} />
      </Form>
    )
  }

  const {container} = render(<Test />)

  expect(screen.getByTestId('val')).toHaveTextContent('')

  fireEvent.change(container.querySelector('input'), {target: {value: 'John'}})

  act(() => {
    jest.advanceTimersByTime(0)
  })

  expect(screen.getByTestId('val')).toHaveTextContent('John')
})
