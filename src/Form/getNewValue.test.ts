import getNewValue from './getNewValue'

it('Should set deep array values', () => {
  const result = getNewValue({}, 'items.0.hello', 'world')
  expect(result).toEqual({items: [{hello: 'world'}]})
})
