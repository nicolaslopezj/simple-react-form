'use strict';

var _cleanFields = require('./clean-fields');

var _cleanFields2 = _interopRequireDefault(_cleanFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Should remove simple not present fields', function () {
  var doc = {
    present: 'hi',
    otherPresent: 'good morning',
    notPresent: 'hello',
    presents: ['hi', 'hola']
  };
  var fields = ['present', 'otherPresent', 'presents'];
  var expected = {
    present: 'hi',
    presents: ['hi', 'hola'],
    otherPresent: 'good morning'
  };
  var result = (0, _cleanFields2.default)(doc, fields);
  expect(result).toEqual(expected);
});

test('Should remove object not present fields', function () {
  var doc = {
    'present.hi': 'hola',
    'present.bye': 'adios',
    notPresent: 'i am not present'
  };
  var fields = ['present'];
  var expected = {
    'present.hi': 'hola',
    'present.bye': 'adios'
  };
  var result = (0, _cleanFields2.default)(doc, fields);
  expect(result).toEqual(expected);
});

test('Should remove array not present fields', function () {
  var doc = {
    'presents.0.userId': '123',
    'presents.0.name': 'fdfd',
    'presents.1.userId': 'f34',
    'presents.1.name': 'erg3',
    notPresent: 'i am not present'
  };
  var fields = ['presents'];
  var expected = {
    'presents.0.userId': '123',
    'presents.0.name': 'fdfd',
    'presents.1.userId': 'f34',
    'presents.1.name': 'erg3'
  };
  var result = (0, _cleanFields2.default)(doc, fields);
  expect(result).toEqual(expected);
});

test('Should remove array not present fields with deep array fields', function () {
  var doc = {
    'presents.0.userId': '123',
    'presents.0.name': 'fdfd',
    'presents.1.userId': 'f34',
    'presents.1.name': 'erg3',
    notPresent: 'i am not present'
  };
  var fields = ['presents.0.userId', 'presents.0.name', 'presents.1.userId', 'presents.1.name'];
  var expected = {
    'presents.0.userId': '123',
    'presents.0.name': 'fdfd',
    'presents.1.userId': 'f34',
    'presents.1.name': 'erg3'
  };
  var result = (0, _cleanFields2.default)(doc, fields);
  expect(result).toEqual(expected);
});

test('Should remove array not present fields keeping arrays', function () {
  var doc = {
    presents: [{ userId: '1234', name: '123' }, { userId: '4321', name: '321' }],
    notPresent: 'i am not present'
  };
  var fields = ['presents'];
  var expected = {
    presents: [{ userId: '1234', name: '123' }, { userId: '4321', name: '321' }]
  };
  var result = (0, _cleanFields2.default)(doc, fields);
  expect(result).toEqual(expected);
});