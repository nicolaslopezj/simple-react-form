import _ from 'underscore'

export default class SchemaStub {
  constructor (schema) {
    this._schema = schema
    this._firstLevelSchemaKeys = _.keys(schema)
  }

  schema (key) {
    return this._schema[key] || {}
  }

  label (key) {
    return key
  }

  newContext () {
    return this
  }
}
