import {render, screen} from '@testing-library/react'
import Field from '../Field'
import Form from '../Form'
import ArrayField from './index'
import {FieldProps} from '../types'
import '@testing-library/jest-dom'

jest.useFakeTimers()

function DummyInput(props: FieldProps) {
  return (
    <input
      value={props.value || ''}
      onChange={e => props.onChange(e.target.value)}
    />
  )
}

test('autoAddItem renders an empty item when value is empty', () => {
  const {container} = render(
    <Form>
      <Field fieldName="items" type={ArrayField} autoAddItem>
        <Field fieldName="name" type={DummyInput} />
      </Field>
    </Form>,
  )
  expect(container.querySelectorAll('input')).toHaveLength(1)
})

test('renderProps provides the current index', () => {
  render(
    <Form state={{items: [{}]}}>
      <Field fieldName="items" type={ArrayField} renderProps>
        {index => <div data-testid={`item-${index}`}>Item {index}</div>}
      </Field>
    </Form>,
  )
  expect(screen.getByTestId('item-0')).toBeInTheDocument()
})

test('renderItem customizes each item element', () => {
  render(
    <Form state={{items: [{name: 'A'}]}}>
      <Field
        fieldName="items"
        type={ArrayField}
        renderItem={(item, i) => <div data-testid={`custom-${i}`}>{item.name}</div>}
      />
    </Form>,
  )
  expect(screen.getByTestId('custom-0')).toHaveTextContent('A')
})

test('honors showAddButton and custom addLabel', () => {
  const {container} = render(
    <Form>
      <Field fieldName="items" type={ArrayField} showAddButton={false} addLabel="Plus">
        <Field fieldName="name" type={DummyInput} />
      </Field>
    </Form>,
  )
  expect(screen.queryByText('Plus')).not.toBeInTheDocument()
  expect(container.querySelector('.srf_addButton')).not.toBeInTheDocument()
})

test('honors showRemoveButton and custom removeLabel', () => {
  const {container} = render(
    <Form state={{items: [{}]}}>
      <Field
        fieldName="items"
        type={ArrayField}
        showRemoveButton={false}
        removeLabel="Del"
      >
        <Field fieldName="name" type={DummyInput} />
      </Field>
    </Form>,
  )
  expect(screen.queryByText('Del')).not.toBeInTheDocument()
  expect(container.querySelector('.srf_removeButton')).not.toBeInTheDocument()
})
