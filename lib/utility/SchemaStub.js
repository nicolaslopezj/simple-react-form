'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _keys = require('lodash/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SchemaStub = function () {
  function SchemaStub(schema) {
    (0, _classCallCheck3.default)(this, SchemaStub);

    this._schema = schema;
    this._firstLevelSchemaKeys = (0, _keys2.default)(schema);
  }

  (0, _createClass3.default)(SchemaStub, [{
    key: 'schema',
    value: function schema(key) {
      return this._schema[key] || {};
    }
  }, {
    key: 'label',
    value: function label(key) {
      return key;
    }
  }, {
    key: 'newContext',
    value: function newContext() {
      return this;
    }
  }]);
  return SchemaStub;
}();

exports.default = SchemaStub;