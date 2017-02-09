import Field from '../Field'
import React from 'react'
import includes from 'lodash/includes'
import reject from 'lodash/reject'

export default function (keys, parent = '', schema, omit = [], props = {}) {
  const fieldNames = reject(keys, (key) => {
    var fullKey = parent ? `${parent}.${key}` : key
    var keySchema = schema.schema(fullKey)
    const options = keySchema.srf || keySchema.mrf
    if (options && options.omit) return true
    if (includes(omit, fullKey)) return true
  })
  return fieldNames.map((key) => {
    var fullKey = parent ? `${parent}.${key}` : key
    return <Field {...props} fieldName={key} key={fullKey} />
  })
}
