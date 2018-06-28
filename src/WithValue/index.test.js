import React from 'react'
import ReactTestUtils from 'react-dom/test-utils'
import Form from '../Form'
import Field from '../Field'
import WithValue from './index'
import '../setupTest'
import PropTypes from 'prop-types'
import ObjectField from '../Object'

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

it('should pass the value of the form', () => {
  const tree = ReactTestUtils.renderIntoDocument(
    <Form state={{name: 'Nicolás'}}>
      <WithValue>
        {value => (
          <div>
            <div className="theValue">{value.name}</div>
            <Field fieldName="name" type={DummyInput} />
          </div>
        )}
      </WithValue>
    </Form>
  )

  const content = ReactTestUtils.findRenderedDOMComponentWithClass(tree, 'theValue')
  expect(content.innerHTML).toBe('Nicolás')
})

it('should pass the value of the form on sub object data', () => {
  const doc = {person: {name: 'Nicolás'}}
  const tree = ReactTestUtils.renderIntoDocument(
    <Form state={doc}>
      <Field fieldName="person" type={ObjectField}>
        <WithValue>
          {person => (
            <div>
              <div className="theValue">{person.name}</div>
              <Field fieldName="name" type={DummyInput} />
            </div>
          )}
        </WithValue>
      </Field>
    </Form>
  )

  const content = ReactTestUtils.findRenderedDOMComponentWithClass(tree, 'theValue')
  expect(content.innerHTML).toBe('Nicolás')
})
