import getNewValue from './getNewValue'

test('supports updater functions', () => {
  const original = {counter: 1}
  const result = getNewValue(original, 'counter', n => (n || 0) + 1)
  expect(result).toEqual({counter: 2})
  expect(original).toEqual({counter: 1})
})

test('creates nested objects when missing', () => {
  const result = getNewValue({}, 'person.name.first', 'John')
  expect(result).toEqual({person: {name: {first: 'John'}}})
})

test('throws if path expects object but finds primitive', () => {
  expect(() => getNewValue({person: 5}, 'person.name', 'John')).toThrow('Expected plain object for key person')
})
