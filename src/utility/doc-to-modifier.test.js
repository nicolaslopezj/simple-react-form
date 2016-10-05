import docToModifier from './doc-to-modifier'

// FIXME
// This test throws an error since it depends on MongoObject, and
// MongoObject is a global that comes from aldeed:simple-schema.
// Since it's a meteor package, it can't be tested without
// meteor, so for now we have to skip this test.
xit('Should do something', () => {
  const doc = {
    a: 1,
    b: '2'
  }
  const options = {
    keepArrays: true,
    keepEmptyStrings: true,
    fields: [ 'a', 'b' ]
  }
  const expected = {}

  // const result = docToModifier(doc, options)
  // expect(result).toEqual(expected)
})
