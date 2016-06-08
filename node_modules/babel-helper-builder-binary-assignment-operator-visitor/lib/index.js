"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _babelHelperExplodeAssignableExpression = require("babel-helper-explode-assignable-expression");

var _babelHelperExplodeAssignableExpression2 = _interopRequireDefault(_babelHelperExplodeAssignableExpression);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

exports["default"] = function (opts) {
  var visitor = {};

  function isAssignment(node) {
    return node.operator === opts.operator + "=";
  }

  function buildAssignment(left, right) {
    return t.assignmentExpression("=", left, right);
  }

  visitor.ExpressionStatement = function (path, file) {
    // hit the `AssignmentExpression` one below
    if (path.isCompletionRecord()) return;

    var expr = path.node.expression;
    if (!isAssignment(expr)) return;

    var nodes = [];
    var exploded = _babelHelperExplodeAssignableExpression2["default"](expr.left, nodes, file, path.scope, true);

    nodes.push(t.expressionStatement(buildAssignment(exploded.ref, opts.build(exploded.uid, expr.right))));

    path.replaceWithMultiple(nodes);
  };

  visitor.AssignmentExpression = function (path, file) {
    var node = path.node;
    var scope = path.scope;

    if (!isAssignment(node)) return;

    var nodes = [];
    var exploded = _babelHelperExplodeAssignableExpression2["default"](node.left, nodes, file, scope);
    nodes.push(buildAssignment(exploded.ref, opts.build(exploded.uid, node.right)));
    path.replaceWithMultiple(nodes);
  };

  visitor.BinaryExpression = function (path) {
    var node = path.node;

    if (node.operator === opts.operator) {
      path.replaceWith(opts.build(node.left, node.right));
    }
  };

  return visitor;
};

module.exports = exports["default"];