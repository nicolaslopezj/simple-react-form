import React from 'react'
import ReactTestUtils from 'react-dom/test-utils'
import Form from '../Form'
import Field from '../Field'
import ArrayField from './index'
import '../setupTest'
import ObjectField from '../Object'
import PropTypes from 'prop-types'

class DummyInput extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
  }

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
  const tree = ReactTestUtils.renderIntoDocument(
    <Form>
      <Field fieldName="array" type={ArrayField} />
    </Form>
  )

  ReactTestUtils.findRenderedComponentWithType(tree, ArrayField)
})

it('addItem should add an item', () => {
  const tree = ReactTestUtils.renderIntoDocument(
    <Form>
      <Field fieldName="array" type={ArrayField}>
        <div className="children" />
      </Field>
    </Form>
  )

  expect.assertions(1)
  try {
    ReactTestUtils.findRenderedDOMComponentWithClass(tree, 'children')
  } catch (error) {
    expect(error.message).toContain('Did not find exactly one match (found: 0) for class:children')
  }

  const button = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'button')
  ReactTestUtils.Simulate.click(button)

  ReactTestUtils.findRenderedDOMComponentWithClass(tree, 'children')
})

it('removeItem should remove the item', () => {
  const tree = ReactTestUtils.renderIntoDocument(
    <Form>
      <Field fieldName="array" type={ArrayField}>
        <div className="children" />
      </Field>
    </Form>
  )
  // add the first component
  const addButton = ReactTestUtils.findRenderedDOMComponentWithClass(tree, 'srf_addButton')
  ReactTestUtils.Simulate.click(addButton)
  ReactTestUtils.findRenderedDOMComponentWithClass(tree, 'children')

  // press the remove button
  const removeButton = ReactTestUtils.findRenderedDOMComponentWithClass(tree, 'srf_removeButton')
  ReactTestUtils.Simulate.click(removeButton)
  expect.assertions(1)
  try {
    ReactTestUtils.findRenderedDOMComponentWithClass(tree, 'children')
  } catch (error) {
    expect(error.message).toContain('Did not find exactly one match (found: 0) for class:children')
  }
})

it('should render an error if there is one', () => {
  const tree = ReactTestUtils.renderIntoDocument(
    <Form>
      <Field fieldName="array" type={ArrayField} errorMessage="I AM AN ERROR" />
    </Form>
  )

  ReactTestUtils.findRenderedDOMComponentWithClass(tree, 'srf_errorMessage')
})

it('should pass the value to the child fields', () => {
  const item = {name: 'hello', text: 'bye'}
  const tree = ReactTestUtils.renderIntoDocument(
    <Form state={{items: [item]}}>
      <Field fieldName="items" type={ArrayField}>
        <Field fieldName="name" type={DummyInput} />
        <Field fieldName="text" type={DummyInput} />
      </Field>
    </Form>
  )
  const objectInput = ReactTestUtils.findRenderedComponentWithType(tree, ArrayField)
  expect(objectInput.props.value).toEqual([item])
  const inputs = ReactTestUtils.scryRenderedComponentsWithType(tree, DummyInput)
  for (const input of inputs) {
    const expectedValue = item[input.props.fieldName.replace('items.0.', '')]
    expect(input.props.value).toBe(expectedValue)
  }

  expect.assertions(inputs.length + 1)
})

test('onChange should make changes correctly', () => {
  let state = {persons: [{name: 'Nicolás'}]}

  const tree = ReactTestUtils.renderIntoDocument(
    <Form state={state} onChange={changes => (state = changes)}>
      <Field fieldName="persons" type={ArrayField}>
        <Field fieldName="name" type={DummyInput} />
      </Field>
    </Form>
  )

  const input = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'input')
  ReactTestUtils.Simulate.change(input, {target: {value: 'Joaquín'}})
  expect(state).toEqual({persons: [{name: 'Joaquín'}]})
})

test('onChange should make changes correctly on double array', () => {
  let state = {
    person: {
      friends: [{name: 'Nicolás'}]
    }
  }

  const tree = ReactTestUtils.renderIntoDocument(
    <Form state={state} onChange={changes => (state = changes)}>
      <Field fieldName="person" type={ObjectField}>
        <Field fieldName="friends" type={ArrayField}>
          <Field fieldName="name" type={DummyInput} />
        </Field>
      </Field>
    </Form>
  )

  const input = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'input')
  ReactTestUtils.Simulate.change(input, {target: {value: 'Joaquín'}})
  expect(state).toEqual({
    person: {
      friends: [{name: 'Joaquín'}]
    }
  })
})
