'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Form = require('../Form');

var _Form2 = _interopRequireDefault(_Form);

var _SchemaStub = require('./SchemaStub');

var _SchemaStub2 = _interopRequireDefault(_SchemaStub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DummyInput = function (_React$Component) {
  (0, _inherits3.default)(DummyInput, _React$Component);

  function DummyInput() {
    (0, _classCallCheck3.default)(this, DummyInput);
    return (0, _possibleConstructorReturn3.default)(this, (DummyInput.__proto__ || Object.getPrototypeOf(DummyInput)).apply(this, arguments));
  }

  (0, _createClass3.default)(DummyInput, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('input', { name: this.props.fieldName });
    }
  }]);
  return DummyInput;
}(_react2.default.Component);

test('Should generate input keys correctly based on the schema', function () {
  var schema = new _SchemaStub2.default({
    name: {
      type: String,
      srf: {
        type: DummyInput
      }
    },
    ignoreMeSenpai: {
      type: Number,
      srf: {
        type: DummyInput,
        omit: true
      }
    }
  });
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Form2.default, { schema: schema }));
  var result = wrapper.html();
  var expected = '<form><input name="name"></form>';
  expect(result).toBe(expected);
});