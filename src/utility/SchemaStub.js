import keys from 'lodash/keys'

export default class SchemaStub {
  constructor (schema) {
    this._schema = schema
    this._firstLevelSchemaKeys = keys(schema)
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
