'use strict';

var _reportNulls = require('./report-nulls');

var _reportNulls2 = _interopRequireDefault(_reportNulls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Should report null fields', function () {
  var doc = {
    present: 'hi',
    otherPresent: 'good morning',
    notPresent: null,
    presents: ['hi', 'hola'],
    emptyString: '',
    notDefined: undefined,
    anEmptyObject: {},
    notEmptyObject: {
      a: 1,
      b: null,
      c: undefined,
      d: 4
    }
  };
  var expected = {
    notPresent: '',
    emptyString: '',
    notDefined: ''
  };
  var result = (0, _reportNulls2.default)(doc, false);
  expect(result).toEqual(expected);
});

test('Should not detect empty strings if option enabled', function () {
  var doc = {
    present: 'hi',
    otherPresent: 'good morning',
    notPresent: null,
    emptyString: ''
  };
  var expected = {
    notPresent: ''
  };
  var result = (0, _reportNulls2.default)(doc, true);
  expect(result).toEqual(expected);
});