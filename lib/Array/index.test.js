'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Form = require('../Form');

var _Form2 = _interopRequireDefault(_Form);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('should render correctly', function () {
  var component = (0, _enzyme.mount)(_react2.default.createElement(
    _Form2.default,
    null,
    _react2.default.createElement(_Field2.default, { fieldName: 'array', type: _index2.default })
  ));

  expect(component.find('ArrayComponent').length).toBe(1);
});

it('addItem should add an item', function () {
  var component = (0, _enzyme.mount)(_react2.default.createElement(
    _Form2.default,
    null,
    _react2.default.createElement(
      _Field2.default,
      { fieldName: 'array', type: _index2.default },
      _react2.default.createElement('div', { className: 'children' })
    )
  ));

  var beforePress = component.find('.children').length;
  expect(beforePress).toBe(0);
  component.find('button').simulate('click');
  var afterPress = component.find('.children').length;

  expect(afterPress).toBe(beforePress + 1);
});

it('removeItem should remove the item', function () {
  var component = (0, _enzyme.mount)(_react2.default.createElement(
    _Form2.default,
    null,
    _react2.default.createElement(
      _Field2.default,
      { fieldName: 'array', type: _index2.default },
      _react2.default.createElement('div', { className: 'children' })
    )
  ));
  // add the first component
  component.find('button').simulate('click');
  var beforePress = component.find('.children').length;
  expect(beforePress).toBe(1);
  // press the remove button
  component.find('ArrayContextItem').parent().find('button').simulate('click');
  var afterPress = component.find('.children').length;

  expect(afterPress).toBe(beforePress - 1);
});

it('should render an error if there is one', function () {
  var component = (0, _enzyme.mount)(_react2.default.createElement(
    _Form2.default,
    null,
    _react2.default.createElement(_Field2.default, { fieldName: 'array', type: _index2.default, errorMessage: 'I AM AN ERROR' })
  ));
  expect(component.find('div').first().childAt(1).text()).toBe('I AM AN ERROR');
});