'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _paper = require('material-ui/lib/paper');

var _paper2 = _interopRequireDefault(_paper);

var _simpleReactForm = require('simple-react-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  label: {
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 5,
    fontSize: 12
  }
};

var MaterialObject = function (_ObjectComponent) {
  _inherits(MaterialObject, _ObjectComponent);

  function MaterialObject() {
    _classCallCheck(this, MaterialObject);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MaterialObject).apply(this, arguments));
  }

  _createClass(MaterialObject, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _paper2.default,
        { style: { marginTop: 20, marginBottom: 20, padding: 20 } },
        _react2.default.createElement(
          'div',
          { style: styles.label },
          this.getLabel()
        ),
        _react2.default.createElement(
          'div',
          { style: { color: 'red' } },
          this.props.errorMessage
        ),
        this.renderChildren()
      );
    }
  }]);

  return MaterialObject;
}(_simpleReactForm.ObjectComponent);

//MRF.Object = MaterialObject;


exports.default = MaterialObject;
_simpleReactForm.Form.defaultProps.objectComponent = MaterialObject;

//ObjectComponent = MaterialObject;