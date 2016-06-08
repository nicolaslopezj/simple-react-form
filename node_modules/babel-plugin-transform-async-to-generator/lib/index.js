"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

exports.__esModule = true;

var _babelHelperRemapAsyncToGenerator = require("babel-helper-remap-async-to-generator");

var _babelHelperRemapAsyncToGenerator2 = _interopRequireDefault(_babelHelperRemapAsyncToGenerator);

exports["default"] = function () {
  return {
    inherits: require("babel-plugin-syntax-async-functions"),

    visitor: {
      Function: function Function(path, state) {
        if (!path.node.async || path.node.generator) return;

        _babelHelperRemapAsyncToGenerator2["default"](path, state.addHelper("asyncToGenerator"));
      }
    }
  };
};

module.exports = exports["default"];