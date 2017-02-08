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

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

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
      var _this2 = this;

      return _react2.default.createElement('input', {
        value: this.props.value || '',
        onChange: function onChange(e) {
          return _this2.props.onChange(e.target.value);
        } });
    }
  }]);
  return DummyInput;
}(_react2.default.Component);

test('Should render by default a <form>', function () {
  var component = (0, _enzyme.shallow)(_react2.default.createElement(
    _index2.default,
    null,
    _react2.default.createElement(
      'div',
      null,
      'dummy'
    )
  ));
  expect(component.find('form').length).toBe(1);
});

test('Should not render a <form> if useFormTag is false', function () {
  var component = (0, _enzyme.shallow)(_react2.default.createElement(
    _index2.default,
    { useFormTag: false },
    _react2.default.createElement(
      'div',
      null,
      'dummy'
    )
  ));
  expect(component.find('form').length).toBe(0);
});

test('onChange should dispatch on changes', function () {
  var calls = void 0;
  var mockFn = jest.fn();
  var component = (0, _enzyme.mount)(_react2.default.createElement(
    _index2.default,
    { onChange: mockFn },
    _react2.default.createElement(_Field2.default, { fieldName: 'foo', type: DummyInput })
  ));

  component.find('input').simulate('change', { target: { value: 'foobar' } });
  calls = mockFn.mock.calls[0];
  expect(mockFn.mock.calls[0][0]).toEqual({ foo: 'foobar' });

  component.find('input').simulate('change', { target: { value: 'barfoo' } });
  calls = mockFn.mock.calls[0];
  expect(calls[calls.length - 1]).toEqual({ foo: 'barfoo' });

  component.find('Form').get(0).onValueChange('bar', 'test');
  calls = mockFn.mock.calls[0];
  expect(calls[calls.length - 1]).toEqual({ bar: 'test', foo: 'barfoo' });
});

test('should render the form correctly', function () {
  var component = (0, _enzyme.mount)(_react2.default.createElement(
    _index2.default,
    null,
    _react2.default.createElement(_Field2.default, { fieldName: 'foo', type: DummyInput })
  ));

  it('should render a <form>', function () {
    expect(component.find('form').length).toBe(1);
  });

  it('should render the <Field>', function () {
    expect(component.find('Field').length).toBe(1);
  });

  it('should render the <DummyInput>', function () {
    expect(component.find('DummyInput').length).toBe(1);
  });
});