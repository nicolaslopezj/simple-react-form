import _ from 'underscore'

export var Attributes = {}

export const registerType = function ({type, component}) {
  Attributes[type] = {name: type, component}
}

export const getFieldType = function (typeName, fieldName) {
  const type = Attributes[typeName]
  if (!type) {
    throw new Error(`You have no registered field type "${typeName}" for "${fieldName}".`)
  }

  return type
}

export const getFieldTypeName = function ({ fieldName, schema }) {
  const fieldSchema = schema.schema(fieldName)
  const srf = fieldSchema.srf || fieldSchema.mrf
  var typeName = null
  if (srf && srf.type) {
    typeName = srf.type
  } else if (fieldSchema.type === String) {
    typeName = 'string'
  } else if (fieldSchema.type === Number) {
    typeName = 'number'
  } else if (fieldSchema.type === Boolean) {
    typeName = 'boolean'
  } else if (fieldSchema.type === Date) {
    typeName = 'date'
  } else if (fieldSchema.type === Object) {
    typeName = 'object'
  } else if (fieldSchema.type === Array) {
    const arrayItemFieldType = schema.schema(fieldName + '.$').type
    if (arrayItemFieldType === String) {
      typeName = 'string-array'
    } else if (arrayItemFieldType === Number) {
      typeName = 'number-array'
    } else if (arrayItemFieldType === Boolean) {
      typeName = 'boolean-array'
    } else if (arrayItemFieldType === Date) {
      typeName = 'date-array'
    } else {
      typeName = 'array'
    }
  }

  return typeName
}

export const getFieldComponent = function ({ fieldName, schema }) {
  const fieldSchema = schema.schema(fieldName)
  if (!fieldSchema) {
    throw new Error(`There is no field "${fieldName}" in the schema.`)
  }

  const typeName = getFieldTypeName({ fieldName, fieldSchema, schema })
  if (!_.isString(typeName)) {
    return typeName
  }
  if (typeName === 'object') {
    // throw new Error(`You should use ObjectComponent instead of Field for "${fieldName}".`)
  }
  if (typeName === 'array') {
    // throw new Error(`You should use ArrayComponent instead of Field for "${fieldName}".`)
  }
  const type = getFieldType(typeName, fieldName)
  if (!type) {
    throw new Error(`No component for field "${fieldName}".`)
  }

  if (type.allowedTypes) {
    var contains = false
    type.allowedTypes.map((allowedType) => {
      if (_.isEqual(fieldSchema.type, allowedType)) {
        contains = true
      }
    })
    if (fieldSchema.type === Array) {
      // Field type checker disabled for arrays
      contains = true
    }

    if (!contains) {
      throw new Error(`Type of field "${fieldName}" is not allowed for "${type.name}".`)
    }
  }

  return type.component
}
