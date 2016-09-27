import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Form from './form'
import Field from './field'

class DummyInput extends React.Component {
  render() {
    return (
      <input
        value={this.props.value || ''}
        onChange={(e) => this.props.onChange(e.target.value)}
      >
      </input>
    )
  }
}

test('Should render by default a <form>', () => {
  const component = shallow(
    <Form>
      <div>dummy</div>
    </Form>
  );
  expect(component.find('form').length).toBe(1);
});

test('Should not render a <form> if useFormTag is false', () => {
  const component = shallow(
    <Form useFormTag={false}>
      <div>dummy</div>
    </Form>
  );
  expect(component.find('form').length).toBe(0);
});

test('onChange should dispatch on changes', () => {
  let calls;
  const mockFn = jest.fn();
  const component = mount(
    <Form
      onChange={mockFn}
    >
      <Field fieldName="foo" type={DummyInput} />
    </Form>
  );

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
