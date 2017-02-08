import Field from '../Field'
import _ from 'underscore'
import React from 'react'

export default function (keys, parent = '', schema, omit = [], props = {}) {
  const fieldNames = _.reject(keys, (key) => {
    var fullKey = parent ? `${parent}.${key}` : key
    var keySchema = schema.schema(fullKey)
    const options = keySchema.srf || keySchema.mrf
    if (options && options.omit) return true
    if (_.contains(omit, fullKey)) return true
  })
  return fieldNames.map((key) => {
    var fullKey = parent ? `${parent}.${key}` : key
    return <Field {...props} fieldName={key} key={fullKey} />
  })
}
