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

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _ArrayContextItem = require('./ArrayContextItem');

var _ArrayContextItem2 = _interopRequireDefault(_ArrayContextItem);

var _utility = require('../utility');

var _FieldType = require('../FieldType');

var _generateInputsForKeys = require('../utility/generateInputsForKeys');

var _generateInputsForKeys2 = _interopRequireDefault(_generateInputsForKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * You can use this field as array field but the main purporse is to extend it
 * and create your own (like the material-ui fields do)
 */

var propTypes = (0, _extends3.default)({}, _FieldType.propTypes, {
  /**
   * The add button label
   */
  addLabel: _react2.default.PropTypes.string,

  /**
   * Show the add button
   */
  showAddButton: _react2.default.PropTypes.bool,

  /**
   * Show the remove button
   */
  showRemoveButton: _react2.default.PropTypes.bool,

  /**
   * The remove label
   */
  removeLabel: _react2.default.PropTypes.string,

  /**
   *
   */
  autoAddItem: _react2.default.PropTypes.bool,

  /**
   * The label for the field
   */
  label: _react2.default.PropTypes.string,

  /**
   * Each item component
   */
  children: _react2.default.PropTypes.any,

  /**
   * Pass a function that returns the children components for the current item.
   * The inputs of the function will be value and index.
   * This is useful when you want to change the view of a item in the array depending
   * on the current value.
   */
  renderItem: _react2.default.PropTypes.func
});

var defaultProps = {
  addLabel: 'Add',
  removeLabel: 'Remove',
  showLabel: true,
  errorMessages: {},
  autoAddItem: false,
  showAddButton: true,
  showRemoveButton: true
};

var childContextTypes = {
  parentFieldName: _react2.default.PropTypes.string
};

var ArrayComponent = function (_React$Component) {
  (0, _inherits3.default)(ArrayComponent, _React$Component);

  function ArrayComponent() {
    (0, _classCallCheck3.default)(this, ArrayComponent);
    return (0, _possibleConstructorReturn3.default)(this, (ArrayComponent.__proto__ || Object.getPrototypeOf(ArrayComponent)).apply(this, arguments));
  }

  (0, _createClass3.default)(ArrayComponent, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        parentFieldName: this.props.fieldName
      };
    }
  }, {
    key: 'addItem',
    value: function addItem() {
      var itemValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var newArray = this.props.value;
      if (_underscore2.default.isArray(newArray)) {
        newArray.push(itemValue);
      } else {
        newArray = [itemValue];
      }

      this.props.onChange(newArray);
    }
  }, {
    key: 'removeItem',
    value: function removeItem(index) {
      var value = this.props.value || [];
      var newArray = _underscore2.default.without(value, value[index]);
      this.props.onChange(newArray);
    }
  }, {
    key: 'getChildrenComponents',
    value: function getChildrenComponents(item, index) {
      if (this.props.renderItem) return this.props.renderItem(item, index);
      if (this.props.children) return this.props.children;
      if (!this.props.schema) throw new Error('You must pass children to the array field "' + this.props.fieldName + '"');
      var schemaFieldName = (0, _utility.replaceIndexKeys)(this.props.fieldName);
      var keys = this.props.schema.objectKeys(schemaFieldName + '.$');
      if (keys.length) {
        // Array with objects, e.g. type: [Object]
        keys = keys.map(function (element) {
          return index + '.' + element;
        });
        return (0, _generateInputsForKeys2.default)(keys, schemaFieldName, this.props.schema, this.props.omit);
      }
      // Array with primitives, e.g. type: [String]
      return (0, _generateInputsForKeys2.default)([String(index)], schemaFieldName, this.props.schema, this.props.omit);
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _this2 = this;

      var value = this.props.value || [];
      if (this.props.autoAddItem && !this.props.disabled && value.length === 0) {
        value.push({});
      }
      return value.map(function (item, index) {
        var children = _this2.getChildrenComponents(item, index);
        return _this2.renderChildrenItem({ index: index, children: children });
      });
    }
  }, {
    key: 'renderChildrenItem',
    value: function renderChildrenItem(_ref) {
      var _this3 = this;

      var index = _ref.index,
          children = _ref.children;

      return _react2.default.createElement(
        'div',
        { style: { marginTop: 20, marginBottom: 20, padding: 20 }, key: this.props.fieldName + '.' + index },
        this.renderChildrenItemWithContext({ index: index, children: children }),
        this.props.showRemoveButton ? _react2.default.createElement(
          'div',
          { style: { marginTop: 10, textAlign: 'right' } },
          _react2.default.createElement(
            'button',
            { type: 'button', onClick: function onClick() {
                return _this3.removeItem(index);
              } },
            this.props.removeLabel
          )
        ) : null
      );
    }
  }, {
    key: 'renderChildrenItemWithContext',
    value: function renderChildrenItemWithContext(_ref2) {
      var index = _ref2.index,
          children = _ref2.children;

      return _react2.default.createElement(
        _ArrayContextItem2.default,
        { fieldName: this.props.fieldName },
        children
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      if (!this.props.value) return null;
      return _react2.default.createElement(
        'div',
        { style: { marginTop: 20 } },
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
        this.renderChildren(),
        this.props.showAddButton ? _react2.default.createElement(
          'div',
          { style: { marginTop: 10 } },
          _react2.default.createElement(
            'button',
            { type: 'button', onClick: function onClick() {
                return _this4.addItem();
              } },
            this.props.addLabel
          )
        ) : null
      );
    }
  }]);
  return ArrayComponent;
}(_react2.default.Component);

exports.default = ArrayComponent;


ArrayComponent.propTypes = propTypes;
ArrayComponent.defaultProps = defaultProps;
ArrayComponent.childContextTypes = childContextTypes;