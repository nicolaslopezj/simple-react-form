import replaceIndexKeys from './replace-index-keys'

test('Should replace indexes to $', () => {
  const key = 'foo.0.bar.1.fuu.2.baz'
  const expected = 'foo.$.bar.$.fuu.$.baz'
  const result = replaceIndexKeys(key)
  expect(result).toEqual(expected)
})

test('Should not replace if the fieldName is a number', () => {
  const key = 'foo.0.bar.2'
  const expected = 'foo.$.bar.2'
  const result = replaceIndexKeys(key)
  expect(result).toEqual(expected)
})

