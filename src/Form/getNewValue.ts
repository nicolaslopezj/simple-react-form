import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import isFunction from 'lodash/isFunction'
import isNil from 'lodash/isNil'
import isPlainObject from 'lodash/isPlainObject'

const setValue = (value: any, keyParts: string[], fieldValue: any) => {
  const key = keyParts.shift()
  // it reached the leaf
  if (keyParts.length === 0) {
    value[key] = fieldValue
  } else {
    if (Number.isInteger(Number.parseInt(keyParts[0]))) {
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

export default function (val: object, fieldName: string, fieldValue: any) {
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
