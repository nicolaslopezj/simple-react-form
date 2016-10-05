import React from 'react'
import { shallow, mount } from 'enzyme'
import Form from './index'
import Field from '../Field'

class DummyInput extends React.Component {
  render () {
    return (
      <input
        value={this.props.value || ''}
        onChange={(e) => this.props.onChange(e.target.value)} />
    )
  }
}

// since simpleSchema comes from Meteor, we need to make a stub.
class SchemaStub {
  constructor (schema) {
    this._schema = schema
  }

  schema (key) {
    return this._schema[key] || {}
  }

  label (key) {
    return `label-for-${key}`
  }

  newContext () {
    return this
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
  let calls
  const mockFn = jest.fn()
  const component = mount(
    <Form onChange={mockFn}>
      <Field fieldName='foo' type={DummyInput} />
    </Form>
  )

  component
    .find('input')
    .simulate('change', {target: {value: 'foobar'}})
  calls = mockFn.mock.calls[0]
  expect(mockFn.mock.calls[0][0]).toEqual({foo: 'foobar'})

  component
    .find('input')
    .simulate('change', {target: {value: 'barfoo'}})
  calls = mockFn.mock.calls[0]
  expect(calls[calls.length - 1]).toEqual({foo: 'barfoo'})

  component.find('Form').get(0).onValueChange('bar', 'test')
  calls = mockFn.mock.calls[0]
  expect(calls[calls.length - 1]).toEqual({bar: 'test', foo: 'barfoo'})
})

test('should render the form correctly', () => {
  const component = mount(
    <Form>
      <Field fieldName='foo' type={DummyInput} />
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

test('should generate input keys correctly based on the schema', () => {
  const component = mount(
    <Form
      type='insert'
      schema={new SchemaStub({
        name: {
          type: String,
          srf: {
            type: DummyInput
          },
          label: 'foobarONE'
        },
        ignoreMeSenpai: {
          type: Number,
          srf: {
            type: DummyInput,
            omit: true
          },
          label: 'barfooTWO'
        }
      })}
    >
      <Field fieldName='name' type={DummyInput} />
      <Field fieldName='deviceId' type={DummyInput} />
    </Form>
  )

  const generateInputsForKeys = component.instance().generateInputsForKeys.bind(component.instance())

  let nameComponent = generateInputsForKeys(['name'])[0]
  expect(nameComponent.key).toEqual('name')
  expect(nameComponent.props.fieldName).toEqual('name')

  let nameComponentWithParent = generateInputsForKeys(['name'], 'i.am.a.parent')[0]
  expect(nameComponentWithParent.key).toEqual('i.am.a.parent.name')
  expect(nameComponent.props.fieldName).toEqual('name')

  let omitComponent = generateInputsForKeys(['ignoreMeSenpai'])
  expect(omitComponent.length).toEqual(0)
})
