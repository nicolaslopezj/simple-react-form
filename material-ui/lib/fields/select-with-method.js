'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _autoComplete = require('material-ui/lib/auto-complete');

var _autoComplete2 = _interopRequireDefault(_autoComplete);

var _menuItem = require('material-ui/lib/menus/menu-item');

var _menuItem2 = _interopRequireDefault(_menuItem);

var _colors = require('material-ui/lib/styles/colors');

var _colors2 = _interopRequireDefault(_colors);

var _simpleReactForm = require('simple-react-form');

var _styles = require('../styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  /**
   * Allow to select multiple items.
   */
  multi: _react2.default.PropTypes.bool,
  /**
   * Meteor method that recieves the search string and returns an array of items
   * with "label" and "value" attributes.
   */
  methodName: _react2.default.PropTypes.string.isRequired,
  /**
   * Meteor method that recieves the value and must return the label. If
   * ```multi``` is set to true, it will recieve an array and it must return an
   * with the labels in the same order.
   */
  labelMethodName: _react2.default.PropTypes.string.isRequired,
  /**
   * A Meteor connection.
   */
  connection: _react2.default.PropTypes.any,
  /**
   * Time with no changes that activates the search.
   */
  waitTime: _react2.default.PropTypes.number
};

var defaultProps = {
  multi: false,
  waitTime: 200
};

var SelectWithMethodComponent = function (_FieldType) {
  _inherits(SelectWithMethodComponent, _FieldType);

  function SelectWithMethodComponent(props) {
    _classCallCheck(this, SelectWithMethodComponent);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SelectWithMethodComponent).call(this, props));

    _this.state = {
      dataSource: [],
      selected: null,
      items: [],
      knownLabels: [],
      response: [],
      isCalling: false,
      hasTitleFor: null
    };

    _this.throttledSearch = _.throttle(_this.search.bind(_this), _this.props.waitTime, { leading: false });
    return _this;
  }

  _createClass(SelectWithMethodComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateLabel(this.props.value);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        this.updateLabel(nextProps.value);
      }
    }
  }, {
    key: 'updatedSelectedItems',
    value: function updatedSelectedItems(values) {
      var _this2 = this;

      var missingLabels = [];
      var selectedItems = [];
      var knownLabels = this.state.knownLabels;
      var valueArray = _.isArray(values) ? values : [values];

      if (!values) return;

      valueArray.map(function (value) {
        if (!_this2.state.knownLabels[value]) {
          missingLabels.push(value);
        }
      });

      if (missingLabels.length > 0) {
        var labelMethodName = this.props.labelMethodName;
        var connection = this.props.connection || Meteor;
        var labelsMethod = this.props.multi ? missingLabels : missingLabels[0];
        connection.call(labelMethodName, labelsMethod, function (error, response) {
          if (error) {
            console.log('[select-with-method] Recieved error from "' + labelMethodName + '"', error);
          } else {
            if (_this2.props.multi) {
              missingLabels.map(function (value, index) {
                knownLabels[value] = response[index];
              });
            } else {
              knownLabels[labelsMethod] = response;

              //console.log('setting to response', response);
              _this2.refs.input.setState({ searchText: response });
            }

            _this2.setState({ knownLabels: knownLabels });
          }
        });
      } else {
        if (!this.props.multi) {
          //console.log('setting to known label', knownLabels[values]);
          this.refs.input.setState({ searchText: knownLabels[values] });
        }
      }
    }
  }, {
    key: 'updateLabel',
    value: function updateLabel(value) {
      if (!this.props.multi && !value) {
        //console.log('clean on update');
        this.refs.input.setState({ searchText: '' });
        return;
      }

      this.updatedSelectedItems(value);
    }
  }, {
    key: 'search',
    value: function search(text) {
      var _this3 = this;

      //console.log('searching with text', text);
      this.setState({ selected: null, isCalling: true });

      if (!this.props.multi) {
        this.props.onChange(null);
      }

      var methodName = this.props.methodName;
      var connection = this.props.connection || Meteor;
      connection.call(methodName, text, function (error, response) {
        if (error) {
          console.log('[select-with-method] Recieved error from "' + methodName + '"', error);
        } else {
          response = response || [];
          _this3.setState({ response: response, isCalling: false });
          var dataSource = response.map(function (item) {
            return {
              text: item.value,
              value: _react2.default.createElement(_menuItem2.default, { primaryText: item.label })
            };
          });
          _this3.setState({ dataSource: dataSource });
        }
      });
    }
  }, {
    key: 'onUpdateText',
    value: function onUpdateText(text) {
      this.throttledSearch(text);
    }
  }, {
    key: 'onItemSelected',
    value: function onItemSelected(item, index) {
      var selected = this.state.response[index];
      if (this.props.multi) {
        //console.log('clean on item selected');
        this.refs.input.setState({ searchText: '' });
        if (_.contains(this.props.value || [], selected.value)) return;
        this.props.onChange(_.union(this.props.value || [], [selected.value]));
      } else {
        this.props.onChange(selected ? selected.value : null);
      }

      if (selected) {
        this.state.knownLabels[selected.value] = selected.label;
        this.setState({ knownLabels: this.state.knownLabels });
      }
    }
  }, {
    key: 'removeItem',
    value: function removeItem(value) {
      this.props.onChange(_.without(this.props.value || [], value));
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      //console.log('on focus');
      this.setState({ open: true });
      this.search('');
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      this.setState({ open: false });
      if (!this.props.value) {
        //This.refs.input.setState({ searchText: '' });
      }
    }
  }, {
    key: 'renderItems',
    value: function renderItems() {
      var _this4 = this;

      return (_.isArray(this.props.value) ? this.props.value : []).map(function (value, index) {
        var label = _this4.state.knownLabels[value] || 'Loading...';
        return _react2.default.createElement(
          'div',
          { onClick: function onClick() {
              return _this4.removeItem(value);
            }, key: value, style: _styles2.default.tag },
          label
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_autoComplete2.default, _extends({
          ref: 'input',
          fullWidth: true,
          searchText: '',
          dataSource: this.state.dataSource,
          filter: _autoComplete2.default.noFilter,
          onUpdateInput: this.onUpdateText.bind(this),
          floatingLabelText: this.props.useHint ? null : this.props.label,
          hintText: this.props.useHint ? this.props.label : null,
          onNewRequest: this.onItemSelected.bind(this),
          errorText: this.props.errorMessage,
          onFocus: this.onFocus.bind(this),
          onBlur: this.onBlur.bind(this),
          open: this.state.open,
          triggerUpdateOnFocus: true,
          disabled: this.props.disabled
        }, this.passProps)),
        _react2.default.createElement(
          'div',
          null,
          this.renderItems()
        )
      );
    }
  }]);

  return SelectWithMethodComponent;
}(_simpleReactForm.FieldType);

SelectWithMethodComponent.propTypes = propTypes;
SelectWithMethodComponent.defaultProps = defaultProps;

(0, _simpleReactForm.registerType)({
  type: 'select-with-method',
  component: SelectWithMethodComponent,
  description: 'A select input that connects to a Meteor Method to fetch data.'
});