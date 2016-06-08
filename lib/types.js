'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFieldOptionsError = exports.getFieldComponent = exports.getFieldTypeName = exports.getFieldType = exports.registerType = exports.Attributes = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Attributes = exports.Attributes = {};

var registerType = exports.registerType = function registerType(_ref) {
  var type = _ref.type;
  var component = _ref.component;

  Attributes[type] = { name: type, component: component };
};

var getFieldType = exports.getFieldType = function getFieldType(typeName) {
  var type = Attributes[typeName];
  if (!type) {
    throw new Error('The is no registered field type "' + typeName + '".');
  }

  return type;
};

var getFieldTypeName = exports.getFieldTypeName = function getFieldTypeName(_ref2) {
  var fieldName = _ref2.fieldName;
  var schema = _ref2.schema;

  var fieldSchema = schema.schema(fieldName);
  var srf = fieldSchema.srf || fieldSchema.mrf;
  var typeName = null;
  if (srf && srf.type) {
    typeName = srf.type;
  } else if (fieldSchema.type === String) {
    typeName = 'string';
  } else if (fieldSchema.type === Number) {
    typeName = 'number';
  } else if (fieldSchema.type === Boolean) {
    typeName = 'boolean';
  } else if (fieldSchema.type === Date) {
    typeName = 'date';
  } else if (fieldSchema.type === Object) {
    typeName = 'object';
  } else if (fieldSchema.type === Array) {
    arrayItemFieldType = schema.schema(fieldName + '.$').type;
    if (arrayItemFieldType === String) {
      typeName = 'string-array';
    } else if (arrayItemFieldType === Number) {
      typeName = 'number-array';
    } else if (arrayItemFieldType === Boolean) {
      typeName = 'boolean-array';
    } else if (arrayItemFieldType === Date) {
      typeName = 'date-array';
    } else {
      typeName = 'array';
    }
  }

  return typeName;
};

var getFieldComponent = exports.getFieldComponent = function getFieldComponent(_ref3) {
  var fieldName = _ref3.fieldName;
  var schema = _ref3.schema;

  var fieldSchema = schema.schema(fieldName);
  if (!fieldSchema) {
    throw new Error('There is no field "' + fieldName + '" in the schema.');
  }

  var typeName = getFieldTypeName({ fieldName: fieldName, fieldSchema: fieldSchema, schema: schema });
  if (typeName == 'object') {
    throw new Error('You should use ObjectComponent instead of Field for "' + fieldName + '".');
  }
  if (typeName == 'array') {
    throw new Error('You should use ArrayComponent instead of Field for "' + fieldName + '".');
  }
  var type = getFieldType(typeName);
  if (!type) {
    throw new Error('No component for field "' + fieldName + '".');
  }

  if (type.allowedTypes) {
    var contains = false;
    type.allowedTypes.map(function (allowedType) {
      if (_.isEqual(fieldSchema.type, allowedType)) {
        contains = true;
      }
    });
    if (fieldSchema.type === Array) {
      // Field type checker disabled for arrays
      contains = true;
    }

    var options = fieldSchema.srf || fieldSchema.mrf || {};
    /*
    const error = getFieldOptionsError({ type, options });
    if (error) {
      throw new Error(`MRF options of field "${fieldName}" are not allowed for "${type.name}". ${error.message}`);
    }
    */
    if (!contains) {
      throw new Error('Type of field "' + fieldName + '" is not allowed for "' + type.name + '".');
    }
  }

  return type.component;
};

var getFieldOptionsError = exports.getFieldOptionsError = function getFieldOptionsError(_ref4) {
  var type = _ref4.type;
  var options = _ref4.options;

  if (type.optionsDefinition) {
    var optionsDefinition = _.clone(type.optionsDefinition);
    /*optionsDefinition.type = Match.Optional(String);
    optionsDefinition.passProps = Match.Optional(Object);
    optionsDefinition.omit = Match.Optional(Boolean)*/
    try {
      /*check(options, optionsDefinition);*/
      return null;
    } catch (e) {
      return e;
    }
  }
};