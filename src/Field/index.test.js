import React from 'react'
import ReactTestUtils from 'react-dom/test-utils'
import Form from '../Form'
import Field from '../Field'
import '../setupTest'

test('should call focus on child', () => {
  let didCall = false

  class DummyInput extends React.Component {
    focus() {
      didCall = true
    }

    render() {
      return null
    }
  }

  const tree = ReactTestUtils.renderIntoDocument(
    <Form>
      <Field fieldName="name" type={DummyInput} />
    </Form>
  )
  const field = ReactTestUtils.findRenderedComponentWithType(tree, Field)
  field.focus()
  expect(didCall).toBe(true)
})
