import React from 'react'
import {shallow, mount} from 'enzyme'
import Form from './index'
import Field from '../Field'
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
        onChange={event => this.props.onChange(event.target.value)}
      />
    )
  }
}

test('Should render by default a <form>', () => {
  const component = shallow(
    <Form>
      <div>dummy</div>
    </Form>
  )
  expect(component.find('form').length).toBe(1)
})

test('Should not render a <form> if useFormTag is false', () => {
  const component = shallow(
    <Form useFormTag={false}>
      <div>dummy</div>
    </Form>
  )
  expect(component.find('form').length).toBe(0)
})

test('onChange should dispatch on changes', () => {
  const mockFn = jest.fn()
  const component = mount(
    <Form onChange={mockFn}>
      <Field fieldName="foo" type={DummyInput} />
    </Form>
  )

  component.find('input').simulate('change', {target: {value: 'foobar'}})
  expect(mockFn.mock.calls[0][0]).toEqual({foo: 'foobar'})

  component.find('input').simulate('change', {target: {value: 'barfoo'}})
  expect(mockFn.mock.calls[1][0]).toEqual({foo: 'barfoo'})

  component.find('Form').get(0).onChange('bar', 'test')
  expect(mockFn.mock.calls[2][0]).toEqual({bar: 'test', foo: 'barfoo'})
})

test('should render the form correctly', () => {
  const component = mount(
    <Form>
      <Field fieldName="foo" type={DummyInput} />
    </Form>
  )

  it('should render a <form>', () => {
    expect(component.find('form').length).toBe(1)
  })

  it('should render the <Field>', () => {
    expect(component.find('Field').length).toBe(1)
  })

  it('should render the <DummyInput>', () => {
    expect(component.find('DummyInput').length).toBe(1)
  })
})
