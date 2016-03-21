'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _object = require('./object');

var _object2 = _interopRequireDefault(_object);

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
   * The add label
   */
  addLabel: _react2.default.PropTypes.string,

  /**
   * The remove label
   */
  removeLabel: _react2.default.PropTypes.string,

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
  addLabel: 'Add',
  removeLabel: 'Remove',
  showLabel: true
};

var ArrayComponent = function (_ObjectComponent) {
  _inherits(ArrayComponent, _ObjectComponent);

  function ArrayComponent() {
    _classCallCheck(this, ArrayComponent);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ArrayComponent).apply(this, arguments));
  }

  _createClass(ArrayComponent, [{
    key: 'onValueChange',
    value: function onValueChange(fieldName, newValue) {
      var withoutSelf = fieldName.replace(this.props.fieldName + '.', '');
      var index = withoutSelf.split('.')[0];
      var plainFieldName = withoutSelf.replace(index + '.', '');

      if (!this.props.value[index]) {
        this.props.value[index] = {};
      }

      this.props.value[index][plainFieldName] = newValue;
      this.props.onChange(this.props.fieldName, this.props.value);
    }
  }, {
    key: 'addItem',
    value: function addItem() {
      var newArray = this.props.value;
      if (_.isArray(newArray)) {
        newArray.push({});
      } else {
        newArray = [{}];
      }

      this.props.onChange(this.props.fieldName, newArray);
    }
  }, {
    key: 'removeItem',
    value: function removeItem(index) {
      var newArray = _.without(this.props.value, this.props.value[index]);
      this.props.onChange(this.props.fieldName, newArray);
    }
  }, {
    key: 'renderChildrenComponent',
    value: function renderChildrenComponent(children, index) {
      var _this2 = this;

      return _react2.default.Children.map(children, function (child) {
        var fieldName = child.props.fieldName;
        var options = {};
        if (child.type.recieveMRFData) {
          options = {
            fieldName: _this2.props.fieldName + '.' + index + '.' + fieldName,
            schema: _this2.getSchema(),
            value: _this2.props.value[index] ? _this2.props.value[index][fieldName] : undefined,
            onChange: _this2.onValueChange.bind(_this2),
            errorMessage: _this2.props.errorMessages ? _this2.props.errorMessages[_this2.props.fieldName + '.' + index + '.' + fieldName] : undefined,
            errorMessages: _this2.props.errorMessages,
            form: _this2.props.form
          };
        } else if (child.props) {
          options = {
            children: _this2.renderChildrenComponent(child.props.children, index)
          };
        }

        return _react2.default.cloneElement(child, options);
      });
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _this3 = this;

      var value = this.props.value || [];
      return value.map(function (item, index) {
        var component = _this3.renderChildrenComponent(_this3.props.children, index);
        return _this3.renderChildrenItem({ index: index, component: component });
      });
    }
  }, {
    key: 'renderChildrenItem',
    value: function renderChildrenItem(_ref) {
      var _this4 = this;

      var index = _ref.index;
      var component = _ref.component;

      return _react2.default.createElement(
        'div',
        { style: { marginTop: 20, marginBottom: 20, padding: 20 }, key: this.props.fieldName + '.' + index },
        component,
        _react2.default.createElement(
          'div',
          { style: { marginTop: 10, textAlign: 'right' } },
          _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                return _this4.removeItem(index);
              } },
            this.props.removeLabel
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { marginTop: 20 } },
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
        this.renderChildren(),
        _react2.default.createElement(
          'div',
          { style: { marginTop: 10 } },
          _react2.default.createElement(
            'button',
            { onClick: this.addItem.bind(this) },
            this.props.addLabel
          )
        )
      );
    }
  }]);

  return ArrayComponent;
}(_object2.default);

exports.default = ArrayComponent;


ArrayComponent.propTypes = propTypes;
ArrayComponent.defaultProps = defaultProps;