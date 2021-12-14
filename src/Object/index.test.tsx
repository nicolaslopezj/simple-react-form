// import React from 'react'
// import ReactTestUtils from 'react-dom/test-utils'
// import Form from '../Form'
// import Field from '../Field'
// import {default as ObjectField} from './index'
// import '../setupTest'
// import PropTypes from 'prop-types'

// class DummyInput extends React.Component {
//   static propTypes = {
//     value: PropTypes.string,
//     onChange: PropTypes.func
//   }

//   render() {
//     return (
//       <input
//         value={this.props.value || ''}
//         onChange={event => {
//           this.props.onChange(event.target.value)
//         }}
//       />
//     )
//   }
// }

// it('should render correctly', () => {
//   const tree = ReactTestUtils.renderIntoDocument(
//     <Form>
//       <Field fieldName="object" type={ObjectField}>
//         <div className="children" />
//       </Field>
//     </Form>
//   )
//   ReactTestUtils.findRenderedComponentWithType(tree, ObjectField)
// })

// it('should show an error if it has one', () => {
//   const tree = ReactTestUtils.renderIntoDocument(
//     <Form>
//       <Field fieldName="object" type={ObjectField} errorMessage="I AM AN ERROR">
//         <div className="children" />
//       </Field>
//     </Form>
//   )

//   ReactTestUtils.findRenderedDOMComponentWithClass(tree, 'srf_errorMessage')
// })

// it('should pass the value to the child field', () => {
//   const tree = ReactTestUtils.renderIntoDocument(
//     <Form state={{object: {field: 'hello'}}}>
//       <Field fieldName="object" type={ObjectField}>
//         <Field fieldName="field" type={DummyInput} />
//       </Field>
//     </Form>
//   )
//   const objectInput = ReactTestUtils.findRenderedComponentWithType(tree, ObjectField)
//   expect(objectInput.props.value).toEqual({field: 'hello'})
//   const input = ReactTestUtils.findRenderedComponentWithType(tree, DummyInput)
//   expect(input.props.value).toBe('hello')
// })

// test('onChange should make changes correctly', () => {
//   let state = {person: {name: 'Nicolás'}}

//   const tree = ReactTestUtils.renderIntoDocument(
//     <Form state={state} onChange={changes => (state = changes)}>
//       <Field fieldName="person" type={ObjectField}>
//         <Field fieldName="name" type={DummyInput} />
//       </Field>
//     </Form>
//   )

//   const input = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'input')
//   ReactTestUtils.Simulate.change(input, {target: {value: 'Joaquín'}})
//   expect(state).toEqual({person: {name: 'Joaquín'}})
// })
