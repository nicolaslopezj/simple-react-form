'use strict';

var _cleanNulls = require('./clean-nulls');

var _cleanNulls2 = _interopRequireDefault(_cleanNulls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Should remove null fields', function () {
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
    present: 'hi',
    presents: ['hi', 'hola'],
    otherPresent: 'good morning',
    notEmptyObject: {
      a: 1,
      d: 4
    }
  };
  var result = (0, _cleanNulls2.default)(doc, false, false);
  expect(result).toEqual(expected);
});

test('Should remove null fields on arrays', function () {
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
    present: 'hi',
    presents: ['hi', 'hola'],
    otherPresent: 'good morning',
    notEmptyObject: {
      a: 1,
      d: 4
    }
  };
  // send an array of objects, expect a cleaned array
  var result = (0, _cleanNulls2.default)([doc, doc], true, false);
  expect(result).toEqual([expected, expected]);
});

test('Should keep empty strings if option enabled', function () {
  var doc = {
    present: 'hi',
    otherPresent: 'good morning',
    notPresent: null,
    emptyString: ''
  };
  var expected = {
    present: 'hi',
    otherPresent: 'good morning',
    emptyString: ''
  };
  var result = (0, _cleanNulls2.default)(doc, false, true);
  expect(result).toEqual(expected);
});