'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _Object = require('./Object');

var _Object2 = _interopRequireDefault(_Object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('should render correctly', function () {
  var component = (0, _enzyme.mount)(_react2.default.createElement(
    _Form2.default,
    null,
    _react2.default.createElement(
      _Field2.default,
      { fieldName: 'object', type: _Object2.default },
      _react2.default.createElement('div', { className: 'children' })
    )
  ));
  expect(component.find('ObjectComponent').length).toBe(1);
});

it('should show an error if it has one', function () {
  var component = (0, _enzyme.mount)(_react2.default.createElement(
    _Form2.default,
    null,
    _react2.default.createElement(
      _Field2.default,
      { fieldName: 'object', type: _Object2.default, errorMessage: 'I AM AN ERROR' },
      _react2.default.createElement('div', { className: 'children' })
    )
  ));

  expect(component.find('div').first().childAt(1).text()).toBe('I AM AN ERROR');
});

it('should render the label', function () {
  var component = (0, _enzyme.mount)(_react2.default.createElement(
    _Form2.default,
    null,
    _react2.default.createElement(
      _Field2.default,
      { fieldName: 'object', type: _Object2.default, label: 'I AM A LABEL!' },
      _react2.default.createElement('div', { className: 'children' })
    )
  ));
  expect(component.find('b').text()).toBe('I AM A LABEL!');
});