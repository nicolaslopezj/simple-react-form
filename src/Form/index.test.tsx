import {fireEvent, render, screen} from '@testing-library/react'
import Field from '../Field'
import ObjectField from '../Object'
import {FieldProps, FormRef} from '../types'
import Form from './index'
import '@testing-library/jest-dom'
import {act} from 'react'

jest.useFakeTimers()

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
    </Form>,
  )
  expect(container.querySelector('form')).toBeInTheDocument()
})

test('Should not render a <form> if useFormTag is false', () => {
  const {container} = render(
    <Form useFormTag={false}>
      <div>dummy</div>
    </Form>,
  )

  expect(container.querySelector('form')).not.toBeInTheDocument()
})

test('onChange should dispatch on changes', async () => {
  const mockFn = jest.fn()

  const {container} = render(
    <Form onChange={mockFn}>
      <Field fieldName="foo" type={DummyInput} />
    </Form>,
  )

  await act(async () => {
    fireEvent.change(container.querySelector('input'), {target: {value: 'foobar'}})
    // Simulate state change
    jest.advanceTimersByTime(0)
  })

  expect(mockFn.mock.calls[0][0]).toEqual({foo: 'foobar'})

  await act(async () => {
    fireEvent.change(container.querySelector('input'), {target: {value: 'barfoo'}})
    // Simulate state change
    jest.advanceTimersByTime(0)
  })
  expect(mockFn.mock.calls[1][0]).toEqual({foo: 'barfoo'})
})

it('should render the form correctly', () => {
  const {container} = render(
    <Form>
      <Field fieldName="foo" type={DummyInput} />
    </Form>,
  )

  expect(container.querySelector('form')).toBeInTheDocument()
  expect(container.querySelector('input')).toBeInTheDocument()
})

test('passes the errorMessage correctly', () => {
  const errorMessages = {
    'person.name': 'Error',
  }

  render(
    <Form errorMessages={errorMessages}>
      <Field fieldName="person" type={ObjectField}>
        <Field fieldName="name" type={DummyInput} />
      </Field>
    </Form>,
  )

  expect(screen.getByText(errorMessages['person.name'])).toBeInTheDocument()
})

test('allows calling on submit using ref', () => {
  let form: FormRef = null
  const mockFn = jest.fn()

  const {container} = render(
    <Form
      ref={handle => {
        form = handle
      }}
      onSubmit={mockFn}
    >
      <Field fieldName="name" type={DummyInput} />
    </Form>,
  )

  fireEvent.change(container.querySelector('input'), {target: {value: 'Nicolás'}})

  fireEvent.submit(container.querySelector('form'))

  fireEvent.change(container.querySelector('input'), {target: {value: 'Nico'}})

  form.submit()

  expect(mockFn.mock.calls[0][0]).toEqual({name: 'Nicolás'})
  expect(mockFn.mock.calls[1][0]).toEqual({name: 'Nico'})
})

test('test form html props', () => {
  render(
    <Form target="/hello">
      <Field fieldName="name" type={DummyInput} />
    </Form>,
  )
})

test('should allow to reset state', () => {
  let form: FormRef = null
  let state = {}
  const setState = newState => {
    state = newState
  }

  const {container} = render(
    <Form
      ref={handle => {
        form = handle
      }}
      state={state}
      onChange={setState}
    >
      <Field fieldName="name" type={DummyInput} />
    </Form>,
  )

  act(() => {
    fireEvent.change(container.querySelector('input'), {target: {value: 'Nicolás'}})
  })

  expect(form.getValue()).toEqual({name: 'Nicolás'})

  act(() => {
    form.reset()
  })

  act(() => {
    fireEvent.change(container.querySelector('input'), {target: {value: 'Nico'}})
  })

  expect(form.getValue()).toEqual({name: 'Nico'})
})

test('does not render form tag in React Native environment', () => {
  const original: any = (global as any).navigator
  Object.defineProperty(global, 'navigator', {
    value: {product: 'ReactNative'},
    configurable: true,
    enumerable: true,
    writable: true,
  })

  const {container} = render(
    <Form>
      <Field fieldName="name" type={DummyInput} />
    </Form>,
  )

  expect(container.querySelector('form')).not.toBeInTheDocument()

  Object.defineProperty(global, 'navigator', {
    value: original,
    configurable: true,
    enumerable: true,
    writable: true,
  })
})

test('passes dom props to the form element', () => {
  const {container} = render(
    <Form target="/submit-here">
      <Field fieldName="name" type={DummyInput} />
    </Form>,
  )

  expect(container.querySelector('form').getAttribute('target')).toBe('/submit-here')
})
