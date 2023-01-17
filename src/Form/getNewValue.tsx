import cloneDeep from 'lodash/cloneDeep'
import isPlainObject from 'lodash/isPlainObject'
import isNil from 'lodash/isNil'
import isFunction from 'lodash/isFunction'
import get from 'lodash/get'

const setValue = function (value, keyParts, fieldValue) {
  const key = keyParts.shift()
  if (keyParts.length === 0) {
    value[key] = fieldValue
  } else {
    if (!isNaN(keyParts[0])) {
      // next key is array
      if (isNil(value[key])) {
        value[key] = []
      }
    } else {
      if (isNil(value[key])) {
        value[key] = {}
      }
      if (!isPlainObject(value[key])) {
        throw new Error(`Expected plain object for key ${key}`)
      }
    }
    setValue(value[key], keyParts, fieldValue)
  }
}

export default function (val, fieldName, fieldValue) {
  const value = cloneDeep(val)
  const keyParts = fieldName.split('.')

  if (isFunction(fieldValue)) {
    const oldValue = get(value, fieldName)
    const newValue = fieldValue(oldValue)
    setValue(value, keyParts, newValue)
  } else {
    setValue(value, keyParts, fieldValue)
  }

  return value
}
