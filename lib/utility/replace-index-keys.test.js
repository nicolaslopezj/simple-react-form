'use strict';

var _replaceIndexKeys = require('./replace-index-keys');

var _replaceIndexKeys2 = _interopRequireDefault(_replaceIndexKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Should replace indexes to $', function () {
  var key = 'foo.0.bar.1.fuu.2.baz';
  var expected = 'foo.$.bar.$.fuu.$.baz';
  var result = (0, _replaceIndexKeys2.default)(key);
  expect(result).toEqual(expected);
});

test('Should not replace if the fieldName is a number', function () {
  var key = 'foo.0.bar.2';
  var expected = 'foo.$.bar.2';
  var result = (0, _replaceIndexKeys2.default)(key);
  expect(result).toEqual(expected);
});