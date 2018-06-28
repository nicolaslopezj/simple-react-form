import React from 'react'
import Form from './index'
import Field from '../Field'
import PropTypes from 'prop-types'
import ReactTestUtils from 'react-dom/test-utils'
import '../setupTest'
import ObjectField from '../Object'

class DummyInput extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    errorMessage: PropTypes.string
  }

  render() {
    return (
      <div>
        <div className="errorMessage">{this.props.errorMessage}</div>
        <input
          value={this.props.value || ''}
          onChange={event => {
            this.props.onChange(event.target.value)
          }}
        />
      </div>
    )
  }
}

test('Should render by default a <form>', () => {
  const tree = ReactTestUtils.renderIntoDocument(
    <Form>
      <div>dummy</div>
    </Form>
  )
  ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'form')
})

test('Should not render a <form> if useFormTag is false', () => {
  const tree = ReactTestUtils.renderIntoDocument(
    <Form useFormTag={false}>
      <div>dummy</div>
    </Form>
  )
  expect.assertions(1)
  try {
    ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'form')
  } catch (error) {
    expect(error.message).toContain('Did not find exactly one match (found: 0) for tag:form')
  }
})

test('onChange should dispatch on changes', () => {
  const mockFn = jest.fn()

  const tree = ReactTestUtils.renderIntoDocument(
    <Form onChange={mockFn}>
      <Field fieldName="foo" type={DummyInput} />
    </Form>
  )

  const input = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'input')
  ReactTestUtils.Simulate.change(input, {target: {value: 'foobar'}})
  expect(mockFn.mock.calls[0][0]).toEqual({foo: 'foobar'})

  ReactTestUtils.Simulate.change(input, {target: {value: 'barfoo'}})
  expect(mockFn.mock.calls[1][0]).toEqual({foo: 'barfoo'})

  ReactTestUtils.findRenderedComponentWithType(tree, Form).onChange('bar', 'test')
  expect(mockFn.mock.calls[2][0]).toEqual({bar: 'test', foo: 'barfoo'})
})

it('should render the form correctly', () => {
  const tree = ReactTestUtils.renderIntoDocument(
    <Form>
      <Field fieldName="foo" type={DummyInput} />
    </Form>
  )

  ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'form')

  ReactTestUtils.findRenderedComponentWithType(tree, Field)

  ReactTestUtils.findRenderedComponentWithType(tree, DummyInput)
})

test('passes the errorMessage correctly', () => {
  const errorMessages = {
    'person.name': 'Error'
  }

  const tree = ReactTestUtils.renderIntoDocument(
    <Form errorMessages={errorMessages}>
      <Field fieldName="person" type={ObjectField}>
        <Field fieldName="name" type={DummyInput} />
      </Field>
    </Form>
  )

  const content = ReactTestUtils.findRenderedDOMComponentWithClass(tree, 'errorMessage')
  expect(content.innerHTML).toBe(errorMessages['person.name'])
})
