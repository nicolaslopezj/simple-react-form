import cleanNulls from './clean-nulls'

test('Should remove null fields', () => {
  const doc = {
    present: 'hi',
    otherPresent: 'good morning',
    notPresent: null,
    presents: ['hi', 'hola'],
    emptyString: '',
    notDefined: undefined,
    anEmptyObject: {},
    notEmptyObject: {
      a: 1,
      b: null,
      c: undefined,
      d: 4
    }
  }
  const expected = {
    present: 'hi',
    presents: ['hi', 'hola'],
    otherPresent: 'good morning',
    notEmptyObject: {
      a: 1,
      d: 4
    }
  }
  const result = cleanNulls(doc, false, false)
  expect(result).toEqual(expected)
})

test('Should remove null fields on arrays', () => {
  const doc = {
    present: 'hi',
    otherPresent: 'good morning',
    notPresent: null,
    presents: ['hi', 'hola'],
    emptyString: '',
    notDefined: undefined,
    anEmptyObject: {},
    notEmptyObject: {
      a: 1,
      b: null,
      c: undefined,
      d: 4
    }
  }
  const expected = {
    present: 'hi',
    presents: ['hi', 'hola'],
    otherPresent: 'good morning',
    notEmptyObject: {
      a: 1,
      d: 4
    }
  }
  // send an array of objects, expect a cleaned array
  const result = cleanNulls([ doc, doc ], true, false)
  expect(result).toEqual([ expected, expected ])
})

test('Should keep empty strings if option enabled', () => {
  const doc = {
    present: 'hi',
    otherPresent: 'good morning',
    notPresent: null,
    emptyString: ''
  }
  const expected = {
    present: 'hi',
    otherPresent: 'good morning',
    emptyString: ''
  }
  const result = cleanNulls(doc, false, true)
  expect(result).toEqual(expected)
})
