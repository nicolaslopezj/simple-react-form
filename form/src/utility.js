// Taken from aldeed's autoform
const docToModifier = function (doc, options) {
  var modifier = {};
  var mDoc;
  var flatDoc;
  var nulls;
  options = options || {};
  mDoc = new MongoObject(doc);
  flatDoc = mDoc.getFlatObject({
    keepArrays: !!options.keepArrays,
  });
  nulls = reportNulls(flatDoc, !!options.keepEmptyStrings);
  flatDoc = cleanNulls(flatDoc, false, !!options.keepEmptyStrings);

  if (!_.isEmpty(flatDoc)) {
    modifier.$set = flatDoc;
  }

  if (!_.isEmpty(nulls)) {
    modifier.$unset = nulls;
  }

  return modifier;
};

const isBasicObject = function (obj) {
  return _.isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;
};

const cleanNulls = function (doc, isArray, keepEmptyStrings) {
  var newDoc = isArray ? [] : {};
  _.each(doc, (val, key) => {
    if (!_.isArray(val) && isBasicObject(val)) {
      val = cleanNulls(val, false, keepEmptyStrings); //Recurse into plain objects
      if (!_.isEmpty(val)) {
        newDoc[key] = val;
      }
    } else if (_.isArray(val)) {
      val = cleanNulls(val, true, keepEmptyStrings); //Recurse into non-typed arrays
      if (!_.isEmpty(val)) {
        newDoc[key] = val;
      }
    } else if (!isNullUndefinedOrEmptyString(val)) {
      newDoc[key] = val;
    } else if (keepEmptyStrings && typeof val === 'string' && val.length === 0) {
      newDoc[key] = val;
    }
  });

  return newDoc;
};

const reportNulls = function (flatDoc, keepEmptyStrings) {
  var nulls = {};

  // Loop through the flat doc
  _.each(flatDoc, (val, key) => {
    // If value is undefined, null, or an empty string, report this as null so it will be unset
    if (val === null) {
      nulls[key] = '';
    } else if (val === void 0) {
      nulls[key] = '';
    } else if (!keepEmptyStrings && typeof val === 'string' && val.length === 0) {
      nulls[key] = '';
    }

    // If value is an array in which all the values recursively are undefined, null, or an empty string, report this as null so it will be unset
    else if (_.isArray(val) && cleanNulls(val, true, keepEmptyStrings).length === 0) {
      nulls[key] = '';
    }
  });

  return nulls;
};

const isNullUndefinedOrEmptyString = function (val) {
  return (val === void 0 || val === null || (typeof val === 'string' && val.length === 0));
};

export {
  docToModifier,
  isBasicObject,
  cleanNulls,
  reportNulls,
  isNullUndefinedOrEmptyString
};
