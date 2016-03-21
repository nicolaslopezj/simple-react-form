'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _colors = require('material-ui/lib/styles/colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = styles = {
  label: {
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 5,
    fontSize: 12
  },
  mirrorLabel: {
    color: 'rgba(0,0,0,0.5)',
    marginBottom: -6,
    fontSize: 12
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 10,
    color: _colors2.default.red500
  },
  fieldContainer: {
    paddingTop: 10,
    paddingBottom: 10
  },
  tag: {
    background: _colors2.default.grey300,
    padding: '5px 10px',
    display: 'inline-block',
    borderRadius: 20,
    marginRight: 5,
    marginTop: 3,
    marginBottom: 2,
    cursor: 'pointer'
  }
};