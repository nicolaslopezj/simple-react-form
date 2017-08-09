import React from 'react'
import {propTypes as fieldTypePropTypes} from './FieldType'
import omit from 'lodash/omit'
import keys from 'lodash/keys'
import pick from 'lodash/pick'
import get from 'lodash/get'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'

export default class Field extends React.Component {
  static propTypes = {
    /**
     * The name of the field in the object.
     */
    fieldName: PropTypes.string.isRequired,

    /**
     * The type of the input. It can be a component
     */
    type: PropTypes.any,

    /**
     * Pass a error message
     */
    errorMessage: PropTypes.string
  }

  static contextTypes = {
    doc: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    errorMessages: PropTypes.object,
    form: PropTypes.any.isRequired,
    parentFieldName: PropTypes.string
  }

  getFieldName() {
    if (this.context.parentFieldName) {
      if (this.props.fieldName) {
        return `${this.context.parentFieldName}.${this.props.fieldName}`
      } else {
        return this.context.parentFieldName
      }
    } else {
      return this.props.fieldName
    }
  }

  @autobind
  onChange(value) {
    this.context.onChange(this.getFieldName(), value)
  }

  getComponent() {
    return this.props.type
  }

  getValue() {
    const doc = this.context.doc || {}
    return get(doc, this.getFieldName())
  }

  getErrorMessage() {
    const errorMessages = this.context.errorMessages || {}
    return (
      this.props.errorMessage ||
      errorMessages[this.getFieldName()] ||
      get(errorMessages, this.getFieldName())
    )
  }

  getChildProps() {
    /**
     * This gets the props that are defined in the propTypes of the registered component.
     */
    const fieldComponent = this.getComponent()
    const propOptions = omit(this.props, keys(Field.propTypes))
    const allowedKeys = keys({...fieldTypePropTypes, ...fieldComponent.propTypes})
    const onlyAllowedOptions = pick(propOptions, allowedKeys)

    /**
     * Options that are not registered in the propTypes are passed separatly.
     * This options are in the variable this.passProps of the component, they should be
     * passed to the main component of it.
     */
    allowedKeys.push('type')
    const notDefinedOptions = omit(propOptions, allowedKeys)

    const props = {
      value: this.getValue(),
      onChange: this.onChange,
      errorMessage: this.getErrorMessage(),
      fieldName: this.getFieldName(),
      form: this.context.form,
      passProps: notDefinedOptions,
      ref: 'input',
      ...onlyAllowedOptions
    }

    return props
  }

  render() {
    const component = this.getComponent()
    this.element = React.createElement(component, this.getChildProps())
    return this.element
  }
}
