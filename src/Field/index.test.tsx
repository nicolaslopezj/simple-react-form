import React, {useState} from 'react'
import Form from '../Form'
import Field from '../Field'
import {act, fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {FieldProps} from '../types'

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
      <Field ref={handle => (field = handle)} fieldName="name" type={DummyInput} />
    </Form>
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
    return <div></div>
  }

  render(
    <Form state={{hello: 'world'}}>
      <Field fieldName="name" type={DummyInput} />
    </Form>
  )

  expect(checked).toBe(true)
})

test('should inherit field type props', () => {
  interface DummyProps {
    name: string
  }
  function DummyInput(props: FieldProps<string, DummyProps>) {
    return <div></div>
  }

  render(
    <Form state={{hello: 'world'}}>
      <Field fieldName="hello" type={DummyInput} name="ss2ss" />
    </Form>
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
    </Form>
  )

  expect(checked).toBe(true)
})

test('should allow using nested field with onChange', async () => {
  function HelloInput(props: FieldProps) {
    return (
      <>
        <button
          onClick={() => {
            props.onChange('no')
          }}>
          setno
        </button>
        {props.fieldName}: {props.value}
      </>
    )
  }

  function ItemsInput(props: FieldProps) {
    return (
      <>
        <button
          onClick={() => {
            props.onChange(oldVal => {
              return [...oldVal, {hello: oldVal.length}]
            })
          }}>
          add
        </button>
        {props.value.map((item, index: number) => {
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
  })

  await act(async () => {
    fireEvent.click(screen.getByText('setno'))
  })

  await act(async () => {
    fireEvent.click(screen.getByText('add'))
    fireEvent.click(screen.getByText('add'))
    fireEvent.click(screen.getByText('add'))
  })

  expect(testValue).toEqual({items: [{hello: 'no'}, {hello: 1}, {hello: 2}, {hello: 3}]})
})
