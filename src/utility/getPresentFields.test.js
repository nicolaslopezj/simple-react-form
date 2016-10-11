import getPresentFields from './getPresentFields'

test('Should return array of field names not including disabled', () => {
  const fields = [
    {
      field: 'present1',
      component: {
        props: {}
      }
    },
    {
      field: 'present2',
      component: {
        props: {}
      }
    },
    {
      field: 'notPresent1',
      component: {
        props: {
          disabled: true
        }
      }
    }
  ]
  const expected = ['present1', 'present2']
  const result = getPresentFields(fields)
  expect(result).toEqual(expected)
})
