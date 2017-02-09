'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (doc, options) {
  var modifier = {};
  var mDoc;
  var flatDoc;
  var nulls;
  options = options || {};
  mDoc = new MongoObject(doc);
  flatDoc = mDoc.getFlatObject({
    keepArrays: !!options.keepArrays
  });
  nulls = (0, _reportNulls2.default)(flatDoc, !!options.keepEmptyStrings);
  nulls = (0, _cleanFields2.default)(nulls, options.fields);
  flatDoc = (0, _cleanNulls2.default)(flatDoc, false, !!options.keepEmptyStrings);
  flatDoc = (0, _cleanFields2.default)(flatDoc, options.fields);

  if (!(0, _isEmpty2.default)(flatDoc)) {
    modifier.$set = flatDoc;
  }

  if (!(0, _isEmpty2.default)(nulls)) {
    modifier.$unset = nulls;
  }

  return modifier;
};

var _cleanFields = require('./clean-fields');

var _cleanFields2 = _interopRequireDefault(_cleanFields);

var _cleanNulls = require('./clean-nulls');

var _cleanNulls2 = _interopRequireDefault(_cleanNulls);

var _reportNulls = require('./report-nulls');

var _reportNulls2 = _interopRequireDefault(_reportNulls);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }