import React from 'react'
import { mount } from 'enzyme'
import Form from '../Form'
import SchemaStub from './SchemaStub'

class DummyInput extends React.Component {
  render () {
    return (
      <input name={this.props.fieldName} />
    )
  }
}

test('Should generate input keys correctly based on the schema', () => {
  const schema = new SchemaStub({
    name: {
      type: String,
      srf: {
        type: DummyInput
      }
    },
    ignoreMeSenpai: {
      type: Number,
      srf: {
        type: DummyInput,
        omit: true
      }
    }
  })
  const wrapper = mount(<Form schema={schema} />)
  const result = wrapper.html()
  const expected = '<form><input name="name"></form>'
  expect(result).toBe(expected)
})
