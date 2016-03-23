'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _raisedButton = require('material-ui/lib/raised-button');

var _raisedButton2 = _interopRequireDefault(_raisedButton);

var _colors = require('material-ui/lib/styles/colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  accept: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  multi: _react2.default.PropTypes.bool,
  onUpload: _react2.default.PropTypes.func.isRequired,
  passBase64: _react2.default.PropTypes.bool
};

var defaultProps = {
  label: 'Upload image',
  multi: false,
  accept: null,
  passBase64: false
};

var Component = function (_React$Component) {
  _inherits(Component, _React$Component);

  function Component() {
    _classCallCheck(this, Component);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Component).apply(this, arguments));
  }

  _createClass(Component, [{
    key: 'openFileDialog',
    value: function openFileDialog() {
      var fileInputDom = _reactDom2.default.findDOMNode(this.refs.input);
      fileInputDom.click();
    }
  }, {
    key: 'handleFile',
    value: function handleFile(event) {
      var _this2 = this;

      _.keys(event.target.files).map(function (index) {
        var file = event.target.files[index];

        if (_this2.props.passBase64) {
          var reader = new FileReader();
          reader.onload = function (upload) {
            var base64 = upload.target.result;
            _this2.props.onUpload(file, base64);
          };

          reader.readAsDataURL(file);
        } else {
          _this2.props.onUpload(file);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_raisedButton2.default, {
          label: this.props.label,
          onClick: this.openFileDialog.bind(this) }),
        _react2.default.createElement('input', {
          type: 'file',
          multiple: this.props.multi,
          ref: 'input',
          style: { display: 'none' },
          accept: this.props.accept,
          onChange: this.handleFile.bind(this) })
      );
    }
  }]);

  return Component;
}(_react2.default.Component);

exports.default = Component;


Component.propTypes = propTypes;
Component.defaultProps = defaultProps;