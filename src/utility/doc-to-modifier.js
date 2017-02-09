import cleanFields from './clean-fields'
import cleanNulls from './clean-nulls'
import reportNulls from './report-nulls'
import isEmpty from 'lodash/isEmpty'

export default function (doc, options) {
  var modifier = {}
  var mDoc
  var flatDoc
  var nulls
  options = options || {}
  mDoc = new MongoObject(doc)
  flatDoc = mDoc.getFlatObject({
    keepArrays: !!options.keepArrays
  })
  nulls = reportNulls(flatDoc, !!options.keepEmptyStrings)
  nulls = cleanFields(nulls, options.fields)
  flatDoc = cleanNulls(flatDoc, false, !!options.keepEmptyStrings)
  flatDoc = cleanFields(flatDoc, options.fields)

  if (!isEmpty(flatDoc)) {
    modifier.$set = flatDoc
  }

  if (!isEmpty(nulls)) {
    modifier.$unset = nulls
  }

  return modifier
}
