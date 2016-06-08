'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  /**
   * Value of the object.
   */
  value: _react2.default.PropTypes.any,

  /**
   * The simple schema
   */
  schema: _react2.default.PropTypes.object,

  /**
   * Error message for the object, if there is one.
   */
  errorMessage: _react2.default.PropTypes.string,

  /**
   * Children error messages.
   */
  errorMessages: _react2.default.PropTypes.object,

  /**
   * Field name of the object in the parent object.
   */
  fieldName: _react2.default.PropTypes.string.isRequired,

  /**
   * Call this function when the value changes.
   */
  onChange: _react2.default.PropTypes.func,
  /**
   * Show the container label
   */
  showLabel: _react2.default.PropTypes.bool,

  /**
   * The field should be read only mode
   */
  disabled: _react2.default.PropTypes.bool
};

var defaultProps = {
  showLabel: true,
  errorMessages: {}
};

var ObjectComponent = function (_React$Component) {
  _inherits(ObjectComponent, _React$Component);

  function ObjectComponent(props) {
    _classCallCheck(this, ObjectComponent);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ObjectComponent).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ObjectComponent, [{
    key: 'getSchema',
    value: function getSchema() {
      return this.props.schema;
    }
  }, {
    key: 'getFieldSchema',
    value: function getFieldSchema() {
      return this.getSchema().schema(this.props.fieldName);
    }
  }, {
    key: 'getLabel',
    value: function getLabel() {
      if (this.props.showLabel === false) return;
      if (this.props.label) return this.props.label;
      return this.getSchema().label(this.props.fieldName);
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren(children) {
      var _this2 = this;

      return _react2.default.Children.map(children, function (child) {
        var options = null;
        if (_.isObject(child) && child.type && child.type.recieveMRFData) {
          var fieldName = child.props.fieldName;
          options = {
            fieldName: _this2.props.fieldName + '.' + fieldName,
            schema: _this2.getSchema(),
            value: _this2.props.value ? _this2.props.value[fieldName] : undefined,
            onChange: _this2.props.onChange,
            errorMessage: child.props.errorMessage || _this2.props.errorMessages[_this2.props.fieldName + '.' + fieldName],
            errorMessages: _this2.props.errorMessages,
            form: _this2.props.form
          };
        } else if (_.isObject(child) && child.props) {
          options = {
            children: _this2.renderChildren(child.props.children)
          };
        }

        return options ? _react2.default.cloneElement(child, options) : child;
      });
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
            this.getLabel()
          )
        ),
        _react2.default.createElement(
          'div',
          { style: { color: 'red' } },
          this.props.errorMessage
        ),
        this.renderChildren(this.props.children)
      );
    }
  }]);

  return ObjectComponent;
}(_react2.default.Component);

exports.default = ObjectComponent;


ObjectComponent.propTypes = propTypes;
ObjectComponent.defaultProps = defaultProps;
ObjectComponent.recieveMRFData = true;