import each from 'lodash/each'
import last from 'lodash/last'
import union from 'lodash/union'
import includes from 'lodash/includes'

export default function (doc, fields) {
  const newDoc = {}
  each(doc, (val, key) => {
    const keys = key.split('.').reduce((memo, value) => {
      const lastItem = last(memo)
      const pre = lastItem ? lastItem + '.' : ''
      return union(memo, [pre + value])
    }, [])
    let contains = false
    keys.forEach(newKey => {
      if (includes(fields, newKey)) {
        contains = true
      }
    })
    if (contains) {
      newDoc[key] = val
    }
  })

  return newDoc
}
