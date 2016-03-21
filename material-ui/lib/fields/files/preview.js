'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _raisedButton = require('material-ui/lib/raised-button');

var _raisedButton2 = _interopRequireDefault(_raisedButton);

var _linearProgress = require('material-ui/lib/linear-progress');

var _linearProgress2 = _interopRequireDefault(_linearProgress);

var _circularProgress = require('material-ui/lib/circular-progress');

var _circularProgress2 = _interopRequireDefault(_circularProgress);

var _paper = require('material-ui/lib/paper');

var _paper2 = _interopRequireDefault(_paper);

var _colors = require('material-ui/lib/styles/colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  container: {
    marginBottom: 10,
    marginRight: 10,
    cursor: 'pointer',
    display: 'inline-block'
  },
  image: {
    maxHeight: 150,
    maxWidth: '100%',
    marginBottom: -5
  },
  imageLoading: {
    maxHeight: 150,
    maxWidth: '100%',
    marginBottom: -5,
    opacity: 0.5
  },
  progress: {
    margin: '0 auto',
    display: 'block',
    marginTop: -50
  }
};

var propTypes = {
  base64: _react2.default.PropTypes.string,
  url: _react2.default.PropTypes.string,
  isImage: _react2.default.PropTypes.bool,
  isUploading: _react2.default.PropTypes.bool,
  progress: _react2.default.PropTypes.number,
  onDelete: _react2.default.PropTypes.func,
  deleteLabel: _react2.default.PropTypes.string,
  confirmDeleteText: _react2.default.PropTypes.string
};

var FilesPreview = function (_React$Component) {
  _inherits(FilesPreview, _React$Component);

  function FilesPreview() {
    _classCallCheck(this, FilesPreview);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FilesPreview).apply(this, arguments));
  }

  _createClass(FilesPreview, [{
    key: 'askDelete',
    value: function askDelete() {
      if (confirm(this.props.confirmDeleteText)) {
        this.props.onDelete();
      }
    }
  }, {
    key: 'renderLoading',
    value: function renderLoading() {
      return _react2.default.createElement(
        'div',
        { style: { marginBottom: 10 } },
        _react2.default.createElement(_linearProgress2.default, { mode: 'determinate', value: this.props.progress * 100 })
      );
    }
  }, {
    key: 'renderBase64',
    value: function renderBase64() {
      return _react2.default.createElement(
        _paper2.default,
        { style: styles.container },
        _react2.default.createElement('img', { src: this.props.base64, style: styles.imageLoading }),
        _react2.default.createElement(_circularProgress2.default, { style: styles.progress, mode: 'determinate', value: this.props.progress * 100, size: 0.5 })
      );
    }
  }, {
    key: 'renderPreviewImage',
    value: function renderPreviewImage() {
      return _react2.default.createElement(
        _paper2.default,
        { style: styles.container, onClick: this.askDelete.bind(this) },
        _react2.default.createElement('img', { src: this.props.url, style: styles.image })
      );
    }
  }, {
    key: 'renderPreview',
    value: function renderPreview() {
      return _react2.default.createElement(
        'div',
        { style: { marginBottom: 10 } },
        _react2.default.createElement(
          'a',
          { style: { color: _colors2.default.blue400 }, href: this.props.url, target: '_blank' },
          this.props.url
        ),
        _react2.default.createElement(
          'span',
          { style: { color: _colors2.default.red400, marginLeft: 5, cursor: 'pointer' }, onClick: this.props.onDelete.bind(this) },
          this.props.deleteLabel
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.isUploading) {
        if (this.props.isImage) {
          return this.renderBase64();
        } else {
          return this.renderLoading();
        }
      } else {
        if (this.props.isImage) {
          return this.renderPreviewImage();
        } else {
          return this.renderPreview();
        }
      }
    }
  }]);

  return FilesPreview;
}(_react2.default.Component);

exports.default = FilesPreview;


FilesPreview.propTypes = propTypes;