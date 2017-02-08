'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FieldType = require('./FieldType');

var _utility = require('./utility');

var _generateInputsForKeys = require('./utility/generateInputsForKeys');

var _generateInputsForKeys2 = _interopRequireDefault(_generateInputsForKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * You can use this field as array field but the main purporse is to extend it
 * and create your own (like the material-ui fields do)
 */

var propTypes = (0, _extends3.default)({}, _FieldType.propTypes, {
  /**
  * Each item component
  */
  children: _react2.default.PropTypes.any
});

var childContextTypes = {
  parentFieldName: _react2.default.PropTypes.string
};

var ObjectComponent = function (_React$Component) {
  (0, _inherits3.default)(ObjectComponent, _React$Component);

  function ObjectComponent() {
    (0, _classCallCheck3.default)(this, ObjectComponent);
    return (0, _possibleConstructorReturn3.default)(this, (ObjectComponent.__proto__ || Object.getPrototypeOf(ObjectComponent)).apply(this, arguments));
  }

  (0, _createClass3.default)(ObjectComponent, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        parentFieldName: this.props.fieldName
      };
    }
  }, {
    key: 'getChildrenComponents',
    value: function getChildrenComponents() {
      if (this.props.children) return this.props.children;
      if (!this.props.schema) throw new Error('You must pass children to the object field "' + this.props.fieldName + '"');
      var schemaFieldName = (0, _utility.replaceIndexKeys)(this.props.fieldName);
      var keys = this.props.schema.objectKeys(schemaFieldName);
      return (0, _generateInputsForKeys2.default)(keys, schemaFieldName, this.props.schema, this.props.omit);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { marginTop: 20, marginBottom: 20, padding: 20 } },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'b',
            null,
            this.props.label
          )
        ),
        _react2.default.createElement(
          'div',
          { style: { color: 'red' } },
          this.props.errorMessage
        ),
        this.getChildrenComponents()
      );
    }
  }]);
  return ObjectComponent;
}(_react2.default.Component);

exports.default = ObjectComponent;


ObjectComponent.propTypes = propTypes;
ObjectComponent.childContextTypes = childContextTypes;