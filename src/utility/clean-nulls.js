import _ from 'underscore'

const isBasicObject = function (obj) {
  return _.isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype
}

const isNullUndefinedOrEmptyString = function (val) {
  return (val === void 0 || val === null || (typeof val === 'string' && val.length === 0))
}

const cleanNulls = function (doc, isArray, keepEmptyStrings) {
  var newDoc = isArray ? [] : {}
  _.each(doc, (val, key) => {
    if (!_.isArray(val) && isBasicObject(val)) {
      val = cleanNulls(val, false, keepEmptyStrings) // Recurse into plain objects
      if (!_.isEmpty(val)) {
        newDoc[key] = val
      }
    } else if (_.isArray(val)) {
      val = cleanNulls(val, true, keepEmptyStrings) // Recurse into non-typed arrays
      if (!_.isEmpty(val)) {
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
