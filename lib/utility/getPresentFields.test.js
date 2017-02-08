'use strict';

var _getPresentFields = require('./getPresentFields');

var _getPresentFields2 = _interopRequireDefault(_getPresentFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Should return array of field names not including disabled', function () {
  var fields = [{
    field: 'present1',
    component: {
      props: {}
    }
  }, {
    field: 'present2',
    component: {
      props: {}
    }
  }, {
    field: 'notPresent1',
    component: {
      props: {
        disabled: true
      }
    }
  }];
  var expected = ['present1', 'present2'];
  var result = (0, _getPresentFields2.default)(fields);
  expect(result).toEqual(expected);
});