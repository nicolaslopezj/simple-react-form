import React from 'react'
import Form from '../Form'
import Field from '../Field'
import {render} from '@testing-library/react'
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

test('should be able to add any prop to the field', () => {
  let checked = false
  function DummyInput(props: FieldProps) {
    checked = true
    expect(props.parentValue).toEqual({hello: 'world'})
    return null
  }

  render(
    <Form state={{hello: 'world'}}>
      <Field fieldName="name" type={DummyInput} passingProp={100} />
    </Form>
  )

  expect(checked).toBe(true)
})
