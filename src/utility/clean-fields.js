import _ from 'underscore'

export default function (doc, fields) {
  const newDoc = {}
  _.each(doc, (val, key) => {
    const keys = key.split('.').reduce((memo, value) => {
      const last = _.last(memo)
      const pre = last ? last + '.' : ''
      return _.union(memo, [pre + value])
    }, [])
    let contains = false
    keys.forEach(newKey => {
      if (_.contains(fields, newKey)) {
        contains = true
      }
    })
    if (contains) {
      newDoc[key] = val
    }
  })

  return newDoc
}
