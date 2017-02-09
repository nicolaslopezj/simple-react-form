import cleanNulls from './clean-nulls'
import each from 'lodash/each'
import isArray from 'lodash/isArray'

export default function (flatDoc, keepEmptyStrings) {
  var nulls = {}

  // Loop through the flat doc
  each(flatDoc, (val, key) => {
    // If value is undefined, null, or an empty string, report this as null so it will be unset
    if (val === null) {
      nulls[key] = ''
    } else if (val === void 0) {
      nulls[key] = ''
    } else if (!keepEmptyStrings && typeof val === 'string' && val.length === 0) {
      nulls[key] = ''
    } else if (isArray(val) && cleanNulls(val, true, keepEmptyStrings).length === 0) {
      // If value is an array in which all the values recursively are undefined, null, or an empty string, report this as null so it will be unset
      nulls[key] = ''
    }
  })

  return nulls
}
