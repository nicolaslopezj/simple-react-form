import cloneDeep from 'lodash/cloneDeep'
import isPlainObject from 'lodash/isPlainObject'
import isNil from 'lodash/isNil'

const setValue = function(value, keyParts, fieldValue) {
  const key = keyParts.shift()
  if (keyParts.length === 0) {
    value[key] = fieldValue
  } else {
    if (isNil(value[key])) {
      value[key] = {}
    }
    if (!isPlainObject(value[key])) {
      throw new Error(`Expected plain object for key ${key}`)
    }
    setValue(value[key], keyParts, fieldValue)
  }
}

export default function(val, fieldName, fieldValue) {
  const value = cloneDeep(val)

  const keyParts = fieldName.split('.')

  setValue(value, keyParts, fieldValue)

  return value
}
