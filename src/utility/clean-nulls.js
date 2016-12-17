import isObject from 'lodash/isObject'
import isEmpty from 'lodash/isEmpty'
import each from 'lodash/each'
import isArray from 'lodash/isArray'

const isBasicObject = function (obj) {
  return isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype
}

const isNullUndefinedOrEmptyString = function (val) {
  return (val === void 0 || val === null || (typeof val === 'string' && val.length === 0))
}

const cleanNulls = function (doc, docIsArray, keepEmptyStrings) {
  var newDoc = docIsArray ? [] : {}
  each(doc, (val, key) => {
    if (!isArray(val) && isBasicObject(val)) {
      val = cleanNulls(val, false, keepEmptyStrings) // Recurse into plain objects
      if (!isEmpty(val)) {
        newDoc[key] = val
      }
    } else if (isArray(val)) {
      val = cleanNulls(val, true, keepEmptyStrings) // Recurse into non-typed arrays
      if (!isEmpty(val)) {
        newDoc[key] = val
      }
    } else if (!isNullUndefinedOrEmptyString(val)) {
      newDoc[key] = val
    } else if (keepEmptyStrings && typeof val === 'string' && val.length === 0) {
      newDoc[key] = val
    }
  })

  return newDoc
}

export default cleanNulls
