import cleanFields from './clean-fields'

test('Should remove simple not present fields', () => {
  const doc = {
    present: 'hi',
    otherPresent: 'good morning',
    notPresent: 'hello',
    presents: ['hi', 'hola']
  }
  const fields = ['present', 'otherPresent', 'presents']
  const expected = {
    present: 'hi',
    presents: ['hi', 'hola'],
    otherPresent: 'good morning'
  }
  const result = cleanFields(doc, fields)
  expect(result).toEqual(expected)
})

test('Should remove object not present fields', () => {
  const doc = {
    'present.hi': 'hola',
    'present.bye': 'adios',
    notPresent: 'i am not present'
  }
  const fields = ['present']
  const expected = {
    'present.hi': 'hola',
    'present.bye': 'adios'
  }
  const result = cleanFields(doc, fields)
  expect(result).toEqual(expected)
})

test('Should remove array not present fields', () => {
  const doc = {
    'presents.0.userId': '123',
    'presents.0.name': 'fdfd',
    'presents.1.userId': 'f34',
    'presents.1.name': 'erg3',
    notPresent: 'i am not present'
  }
  const fields = ['presents']
  const expected = {
    'presents.0.userId': '123',
    'presents.0.name': 'fdfd',
    'presents.1.userId': 'f34',
    'presents.1.name': 'erg3'
  }
  const result = cleanFields(doc, fields)
  expect(result).toEqual(expected)
})

test('Should remove array not present fields with deep array fields', () => {
  const doc = {
    'presents.0.userId': '123',
    'presents.0.name': 'fdfd',
    'presents.1.userId': 'f34',
    'presents.1.name': 'erg3',
    notPresent: 'i am not present'
  }
  const fields = ['presents.0.userId', 'presents.0.name', 'presents.1.userId', 'presents.1.name']
  const expected = {
    'presents.0.userId': '123',
    'presents.0.name': 'fdfd',
    'presents.1.userId': 'f34',
    'presents.1.name': 'erg3'
  }
  const result = cleanFields(doc, fields)
  expect(result).toEqual(expected)
})

test('Should remove array not present fields keeping arrays', () => {
  const doc = {
    presents: [
      {userId: '1234', name: '123'},
      {userId: '4321', name: '321'}
    ],
    notPresent: 'i am not present'
  }
  const fields = ['presents']
  const expected = {
    presents: [
      {userId: '1234', name: '123'},
      {userId: '4321', name: '321'}
    ]
  }
  const result = cleanFields(doc, fields)
  expect(result).toEqual(expected)
})
