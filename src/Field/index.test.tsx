import {fireEvent, render, screen} from '@testing-library/react'
import React, {useState, act} from 'react'
import Field from '../Field'
import Form from '../Form'
import '@testing-library/jest-dom'
import {FieldProps} from '../types'

jest.useFakeTimers()

test('should call focus on child', () => {
  let didCall = false
  let field = null

  class DummyInput extends React.Component {
    focus() {
      didCall = true
    }

    render() {
      return <input className="input" type="text" />
    }
  }

  render(
    <Form>
      <Field
        ref={handle => {
          field = handle
        }}
        fieldName="name"
        type={DummyInput}
      />
    </Form>,
  )

  // focus the input
  field.focus()
  expect(didCall).toBe(true)
})

test('should pass parent value', () => {
  let checked = false
  function DummyInput(props: FieldProps) {
    checked = true
    expect(props.parentValue).toEqual({hello: 'world'})
    return <div />
  }

  render(
    <Form state={{hello: 'world'}}>
      <Field fieldName="name" type={DummyInput} />
    </Form>,
  )

  expect(checked).toBe(true)
})

test('should inherit field type props', () => {
  interface DummyProps {
    name: string
  }
  function DummyInput(_props: FieldProps<string, DummyProps>) {
    return <div />
  }

  render(
    <Form state={{hello: 'world'}}>
      <Field fieldName="hello" type={DummyInput} name="ss2ss" />
    </Form>,
  )
})

test('should be able to add any prop to the field', () => {
  let checked = false
  function DummyInput(props: FieldProps<any, {passingProp: number}>) {
    checked = true
    expect(props.parentValue).toEqual({hello: 'world'})
    return <div>dummy</div>
  }

  render(
    <Form state={{hello: 'world'}}>
      <Field fieldName="name" type={DummyInput} passingProp={100} />
    </Form>,
  )

  expect(checked).toBe(true)
})

test('should allow using nested field with onChange', async () => {
  function HelloInput(props: FieldProps) {
    return (
      <>
        <input
          value={props.value}
          onChange={event => props.onChange(event.target.value)}
          placeholder="hello"
          className="input"
          type="text"
        />
      </>
    )
  }

  function ItemsInput(props: FieldProps) {
    return (
      <>
        <button
          type="button"
          onClick={() => {
            props.onChange(oldVal => {
              return [...oldVal, {hello: oldVal.length}]
            })
          }}
        >
          add
        </button>
        {props.value.map((_item, index: number) => {
          return <Field key={index} fieldName={String(`${index}.hello`)} type={HelloInput} />
        })}
      </>
    )
  }

  let testValue = null
  function Test() {
    const [state, setState] = useState({items: []})
    testValue = state

    return (
      <Form state={state} onChange={setState}>
        <Field fieldName="items" type={ItemsInput} />
      </Form>
    )
  }

  render(<Test />)
  await act(async () => {
    fireEvent.click(screen.getByText('add'))
    jest.advanceTimersByTime(0)
  })

  await act(async () => {
    fireEvent.change(screen.getByPlaceholderText('hello'), {target: {value: 'no'}})
    jest.advanceTimersByTime(0)
  })

  await act(async () => {
    fireEvent.click(screen.getByText('add'))
    jest.advanceTimersByTime(0)
  })
  await act(async () => {
    fireEvent.click(screen.getByText('add'))
    jest.advanceTimersByTime(0)
  })
  await act(async () => {
    fireEvent.click(screen.getByText('add'))
    jest.advanceTimersByTime(0)
  })

  expect(testValue).toEqual({items: [{hello: 'no'}, {hello: 1}, {hello: 2}, {hello: 3}]})
})

test('should allow using nested array field', async () => {
  function HelloInput(props: FieldProps) {
    return (
      <input
        value={props.value || ''}
        onChange={event => props.onChange(event.target.value)}
        placeholder={props.fieldName}
        className="input"
        type="text"
      />
    )
  }

  function InterInput(_props: FieldProps) {
    return <Field fieldName="hello" type={HelloInput} />
  }

  let testValue = null
  function Test() {
    const [state, setState] = useState({})
    testValue = state

    return (
      <Form
        state={state}
        onChange={newVal => {
          setState(newVal)
        }}
      >
        <Field fieldName="items.0" type={InterInput} />
        <Field fieldName="items.1" type={InterInput} />
      </Form>
    )
  }

  render(<Test />)

  act(() => {
    fireEvent.change(screen.getByPlaceholderText('items.0.hello'), {target: {value: 'no0'}})
    fireEvent.change(screen.getByPlaceholderText('items.1.hello'), {target: {value: 'no1'}})
    jest.advanceTimersByTime(100)
  })

  expect(testValue).toEqual({items: [{hello: 'no0'}, {hello: 'no1'}]})
})

test('adding items to array very fast should be handled correctly', async () => {
  function ItemsInput(props: FieldProps<any[], {}>) {
    return (
      <>
        <button
          type="button"
          onClick={() => props.onChange(oldVal => [...oldVal, {hello: oldVal.length}])}
        >
          add
        </button>
      </>
    )
  }

  let testValue = null
  function Test() {
    const [state, setState] = useState({items: []})
    testValue = state

    return (
      <Form state={state} onChange={setState}>
        <Field fieldName="items" type={ItemsInput} />
      </Form>
    )
  }

  render(<Test />)

  await act(async () => {
    fireEvent.click(screen.getByText('add'))
    fireEvent.click(screen.getByText('add'))
    fireEvent.click(screen.getByText('add'))
    jest.advanceTimersByTime(0)
  })

  expect(testValue).toEqual({items: [{hello: 0}, {hello: 1}, {hello: 2}]})
})
