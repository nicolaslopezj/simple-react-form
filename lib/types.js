'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFieldComponent = exports.getFieldTypeName = exports.getFieldType = exports.registerType = exports.Attributes = undefined;

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Attributes = exports.Attributes = {};

var registerType = exports.registerType = function registerType(_ref) {
  var type = _ref.type,
      component = _ref.component;

  Attributes[type] = { name: type, component: component };
};

var getFieldType = exports.getFieldType = function getFieldType(typeName, fieldName) {
  var type = Attributes[typeName];
  if (!type) {
    throw new Error('You have no registered field type "' + typeName + '" for "' + fieldName + '".');
  }

  return type;
};

var getFieldTypeName = exports.getFieldTypeName = function getFieldTypeName(_ref2) {
  var fieldName = _ref2.fieldName,
      schema = _ref2.schema;

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
    var arrayItemFieldType = schema.schema(fieldName + '.$').type;
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
  var fieldName = _ref3.fieldName,
      schema = _ref3.schema;

  var fieldSchema = schema.schema(fieldName);
  if (!fieldSchema) {
    throw new Error('There is no field "' + fieldName + '" in the schema.');
  }

  var typeName = getFieldTypeName({ fieldName: fieldName, fieldSchema: fieldSchema, schema: schema });
  if (!_underscore2.default.isString(typeName)) {
    return typeName;
  }
  if (typeName === 'object') {
    // throw new Error(`You should use ObjectComponent instead of Field for "${fieldName}".`)
  }
  if (typeName === 'array') {
    // throw new Error(`You should use ArrayComponent instead of Field for "${fieldName}".`)
  }
  var type = getFieldType(typeName, fieldName);
  if (!type) {
    throw new Error('No component for field "' + fieldName + '".');
  }

  if (type.allowedTypes) {
    var contains = false;
    type.allowedTypes.map(function (allowedType) {
      if (_underscore2.default.isEqual(fieldSchema.type, allowedType)) {
        contains = true;
      }
    });
    if (fieldSchema.type === Array) {
      // Field type checker disabled for arrays
      contains = true;
    }

    if (!contains) {
      throw new Error('Type of field "' + fieldName + '" is not allowed for "' + type.name + '".');
    }
  }

  return type.component;
};