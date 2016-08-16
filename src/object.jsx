/**
 * You can use this field as array field but the main purporse is to extend it
 * and create your own (like the material-ui fields do)
 */

import React from 'react'
import FieldType from './field-type'
import {replaceIndexKeys} from './utility'

const propTypes = {
  ...FieldType.propTypes,
  /**
   * Each item component
   */
  children: React.PropTypes.any
}

const childContextTypes = {
  parentFieldName: React.PropTypes.string
}

export default class ObjectComponent extends FieldType {

  getChildContext () {
    return {
      parentFieldName: this.props.fieldName
    }
  }

  getChildrenComponents () {
    if (this.props.children) return this.props.children
    if (!this.props.schema) throw new Error(`You must pass children to the object field "${this.props.fieldName}"`)
    const schemaFieldName = replaceIndexKeys(this.props.fieldName)
    const keys = this.props.schema.objectKeys(schemaFieldName)
    return this.props.form.generateInputsForKeys(keys, schemaFieldName)
  }

  render () {
    return (
      <div style={{ marginTop: 20, marginBottom: 20, padding: 20 }}>
        <div><b>{this.props.label}</b></div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        {this.getChildrenComponents()}
      </div>
    )
  }

}

ObjectComponent.propTypes = propTypes
ObjectComponent.childContextTypes = childContextTypes
