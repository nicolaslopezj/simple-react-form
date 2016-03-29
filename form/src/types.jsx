import React from 'react';

export var Attributes = {};

export const registerType = function ({ type, component, description, optionsDefinition, optionsDescription, defaultOptions, allowedTypes }) {
  Attributes[type] = { name: type, component, description, optionsDefinition, optionsDescription, allowedTypes, defaultOptions };
};

export const getFieldType = function (typeName) {
  const type = Attributes[typeName];
  if (!type) {
    throw new Error(`The is no registered field type "${typeName}".`);
  }

  return type;
};

export const getFieldTypeName = function ({ fieldName, schema }) {
  const fieldSchema = schema.schema(fieldName);
  const srf = fieldSchema.srf || fieldSchema.mrf;
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

export const getFieldComponent = function ({ fieldName, schema }) {
  const fieldSchema = schema.schema(fieldName);
  if (!fieldSchema) {
    throw new Error(`There is no field "${fieldName}" in the schema.`);
  }

  const typeName = getFieldTypeName({ fieldName, fieldSchema, schema });
  const type = getFieldType(typeName);
  if (!type) {
    throw new Error(`No component for field "${fieldName}".`);
  }

  if (type.allowedTypes) {
    var contains = false;
    type.allowedTypes.map((allowedType) => {
      if (_.isEqual(fieldSchema.type, allowedType)) {
        contains = true;
      }
    });
    if (fieldSchema.type === Array) {
      // Field type checker disabled for arrays
      contains = true;
    }

    var options = fieldSchema.srf || fieldSchema.mrf || {};
    /*
    const error = getFieldOptionsError({ type, options });
    if (error) {
      throw new Error(`MRF options of field "${fieldName}" are not allowed for "${type.name}". ${error.message}`);
    }
    */
    if (!contains) {
      throw new Error(`Type of field "${fieldName}" is not allowed for "${type.name}".`);
    }
  }

  return type.component;
};

export const getFieldOptionsError = function ({ type, options }) {
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
