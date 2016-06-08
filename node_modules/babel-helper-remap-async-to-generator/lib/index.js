/* @noflow */

"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _babelHelperFunctionName = require("babel-helper-function-name");

var _babelHelperFunctionName2 = _interopRequireDefault(_babelHelperFunctionName);

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var buildWrapper = _babelTemplate2["default"]("\n  (() => {\n    var ref = FUNCTION;\n    return function NAME(PARAMS) {\n      return ref.apply(this, arguments);\n    };\n  })\n");

var namedBuildWrapper = _babelTemplate2["default"]("\n  (() => {\n    var ref = FUNCTION;\n    function NAME(PARAMS) {\n      return ref.apply(this, arguments);\n    }\n    return NAME;\n  })\n");

var awaitVisitor = {
  ArrowFunctionExpression: function ArrowFunctionExpression(path) {
    if (!path.node.async) {
      path.arrowFunctionToShadowed();
    }
  },

  AwaitExpression: function AwaitExpression(_ref) {
    var node = _ref.node;

    node.type = "YieldExpression";
  }
};

function classOrObjectMethod(path, callId) {
  var node = path.node;
  var body = node.body;

  node.async = false;

  var container = t.functionExpression(null, [], t.blockStatement(body.body), true);
  container.shadow = true;
  body.body = [t.returnStatement(t.callExpression(t.callExpression(callId, [container]), []))];
}

function plainFunction(path, callId) {
  var node = path.node;
  var isDeclaration = path.isFunctionDeclaration();
  var asyncFnId = node.id;
  var wrapper = buildWrapper;

  if (path.isArrowFunctionExpression()) {
    path.arrowFunctionToShadowed();
  } else if (!isDeclaration && asyncFnId) {
    wrapper = namedBuildWrapper;
  }

  node.async = false;
  node.generator = true;

  node.id = null;

  if (isDeclaration) {
    node.type = "FunctionExpression";
  }

  var built = t.callExpression(callId, [node]);
  var container = wrapper({
    NAME: asyncFnId,
    FUNCTION: built,
    PARAMS: node.params.map(function () {
      return path.scope.generateUidIdentifier("x");
    })
  }).expression;

  if (isDeclaration) {
    var declar = t.variableDeclaration("let", [t.variableDeclarator(t.identifier(asyncFnId.name), t.callExpression(container, []))]);
    declar._blockHoist = true;

    path.replaceWith(declar);
  } else {
    var retFunction = container.body.body[1].argument;
    if (!asyncFnId) {
      _babelHelperFunctionName2["default"]({
        node: retFunction,
        parent: path.parent,
        scope: path.scope
      });
    }

    if (!retFunction || retFunction.id || node.params.length) {
      // we have an inferred function id or params so we need this wrapper
      path.replaceWith(t.callExpression(container, []));
    } else {
      // we can omit this wrapper as the conditions it protects for do not apply
      path.replaceWith(built);
    }
  }
}

exports["default"] = function (path, callId) {
  var node = path.node;
  if (node.generator) return;

  path.traverse(awaitVisitor);

  if (path.isClassMethod() || path.isObjectMethod()) {
    return classOrObjectMethod(path, callId);
  } else {
    return plainFunction(path, callId);
  }
};

module.exports = exports["default"];