'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  state: _react2.default.PropTypes.object.isRequired,
  onChange: _react2.default.PropTypes.func.isRequired,
  errorMessages: _react2.default.PropTypes.object
};

var defaultProps = {
  errorMessages: {}
};

var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form() {
    _classCallCheck(this, Form);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Form).apply(this, arguments));
  }

  _createClass(Form, [{
    key: 'onValueChange',
    value: function onValueChange(fieldName) {
      var _this2 = this;

      return function (newValue) {
        var doc = _underscore2.default.clone(_this2.props.state);
        doc[fieldName] = newValue;
        _this2.props.onChange(doc);
      };
    }
  }, {
    key: 'getValueForField',
    value: function getValueForField(fieldName) {
      return this.state[fieldName];
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren(children) {
      var _this3 = this;

      return _react2.default.Children.map(children, function (child) {
        var options = null;
        if (child.type && child.type.recieveFormData) {
          var fieldName = child.props.name;
          options = {
            value: _this3.getValueForField(fieldName),
            onChange: _this3.onValueChange(fieldName),
            form: _this3
          };
        } else if (child.props) {
          options = {
            children: _this3.renderChildren(child.props.children)
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
        null,
        'im the form',
        this.renderChildren(this.props.children)
      );
    }
  }]);

  return Form;
}(_react2.default.Component);

exports.default = Form;


Form.propTypes = propTypes;
Form.defaultProps = defaultProps;