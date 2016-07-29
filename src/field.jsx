import React from 'react'
import _ from 'underscore'
import DotObject from './dot'

import {
  getFieldType,
  getFieldComponent,
  getFieldOptionsError,
  getFieldTypeName
} from './types'

const propTypes = {
  /**
   * The label of the field.
   */
  label: React.PropTypes.string,

  /**
   * The name of the field in the object.
   */
  fieldName: React.PropTypes.string.isRequired,

  /**
   * Should show label
   */
  showLabel: React.PropTypes.bool,

  /**
   * Use hint instead of label.
   */
  useHint: React.PropTypes.bool,

  /**
   * The field should be read only mode.
   */
  disabled: React.PropTypes.bool,

  /**
   * The type of the input.
   */
  type: React.PropTypes.string,

  /**
   * Pass a error message
   */
  errorMessage: React.PropTypes.string
}

const defaultProps = {
  showLabel: true,
  useHint: false,
  disabled: false
}

const contextTypes = {
  schema: React.PropTypes.object,
  doc: React.PropTypes.object,
  onChange: React.PropTypes.func.isRequired,
  errorMessages: React.PropTypes.object,
  form: React.PropTypes.any.isRequired,
  parentFieldName: React.PropTypes.string
}

export default class Field extends React.Component {

  constructor (props) {
    super(props)
    /* if (!this.context.schema && !props.type) {
      throw new Error(`You must set the type for the field "${props.fieldName}" or pass a schema to the form`)
    }*/

    this.onChange = this.onChange.bind(this)
  }

  getFieldName () {
    if (this.context.parentFieldName) {
      return `${this.context.parentFieldName}.${this.props.fieldName}`
    } else {
      return this.props.fieldName
    }
  }

  onChange (value) {
    this.context.onChange(this.getFieldName(), value)
  }

  getSchema () {
    return this.context.schema
  }

  getFieldSchema () {
    return this.getSchema() ? this.getSchema().schema(this.getFieldName()) : null
  }

  getLabel () {
    if (_.has(this.props, 'label')) {
      return this.props.label
    } else if (this.getSchema()) {
      return this.getSchema().label(this.getFieldName())
    } else {
      return ''
    }
  }

  getComponent () {
    var component = null
    if (this.props.type) {
      component = getFieldType(this.props.type).component
    } else {
      component = getFieldComponent({
        fieldName: this.getFieldName(),
        schema: this.getSchema()
      })
    }

    return React.createElement(component, this.getChildProps())
  }

  getValue () {
    return this.context.doc ? DotObject.pick(this.getFieldName(), this.context.doc) : undefined
  }

  getErrorMessage () {
    const errorMessages = this.context.errorMessages || {}
    return this.props.errorMessage || errorMessages[this.getFieldName()]
  }

  getChildProps () {
    var typeName = this.props.type
    if (!typeName) {
      typeName = getFieldTypeName({ fieldName: this.getFieldName(), fieldSchema: this.getFieldSchema(), schema: this.getSchema() })
    }

    /**
     * This gets the props that are defined in the propTypes of the registered component.
     */
    const type = getFieldType(typeName)
    const propOptions = _.omit(this.props, _.keys(propTypes))
    const schemaOptions = (this.getFieldSchema() && (this.getFieldSchema().srf || this.getFieldSchema().mrf)) || {}
    const totalOptions = _.extend(schemaOptions, propOptions)
    const allowedKeys = _.keys(type.component.propTypes || {})
    const onlyAllowedOptions = _.pick(totalOptions, allowedKeys)

    const error = getFieldOptionsError({ type, options: onlyAllowedOptions })
    if (error) {
      throw new Error(`Options for field "${this.getFieldName()}" are not allowed for field type "${type.name}": ${error.message}`)
    }

    /**
     * Options that are not registered in the propTypes are passed separatly.
     * This options are in the variable this.passProps of the component, they should be
     * passed to the main component of it.
     */
    const notDefinedOptions = _.omit(totalOptions, allowedKeys)

    const props = {
      value: this.getValue(),
      label: this.props.showLabel ? this.getLabel() : null,
      useHint: this.props.useHint,
      onChange: this.onChange,
      errorMessage: this.getErrorMessage(),
      fieldSchema: this.getFieldSchema(),
      fieldName: this.getFieldName(),
      schema: this.getSchema(),
      form: this.context.form,
      disabled: this.props.disabled,
      passProps: notDefinedOptions,
      ref: 'input',
      ...onlyAllowedOptions
    }

    return props
  }

  render () {
    return this.getComponent()
  }
}

Field.propTypes = propTypes
Field.defaultProps = defaultProps
Field.contextTypes = contextTypes
