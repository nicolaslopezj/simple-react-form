"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

exports.__esModule = true;

var _babelHelperBuilderBinaryAssignmentOperatorVisitor = require("babel-helper-builder-binary-assignment-operator-visitor");

var _babelHelperBuilderBinaryAssignmentOperatorVisitor2 = _interopRequireDefault(_babelHelperBuilderBinaryAssignmentOperatorVisitor);

exports["default"] = function (_ref) {
  var t = _ref.types;

  return {
    inherits: require("babel-plugin-syntax-exponentiation-operator"),

    visitor: _babelHelperBuilderBinaryAssignmentOperatorVisitor2["default"]({
      operator: "**",

      build: function build(left, right) {
        return t.callExpression(t.memberExpression(t.identifier("Math"), t.identifier("pow")), [left, right]);
      }
    })
  };
};

module.exports = exports["default"];