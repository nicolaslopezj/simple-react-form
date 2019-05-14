import React from 'react'
import {propTypes as fieldTypePropTypes} from '../FieldType'
import omit from 'lodash/omit'
import keys from 'lodash/keys'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import {
  ValueContext,
  ErrorMessagesContext,
  OnChangeContext,
  ParentFieldNameContext
} from '../Contexts'

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

  getFieldName(parentFieldName) {
    if (parentFieldName) {
      if (this.props.fieldName) {
        return `${parentFieldName}.${this.props.fieldName}`
      } else {
        return parentFieldName
      }
    } else {
      return this.props.fieldName
    }
  }

  focus = () => {
    if (!this.input.focus) {
      throw new Error("Field doesn't has a focus method")
    }
    this.input.focus()
  }

  getComponent() {
    return this.props.type
  }

  getErrorMessage(errorMessages, parentFieldName) {
    return (
      this.props.errorMessage ||
      errorMessages[this.getFieldName(parentFieldName)] ||
      get(errorMessages, this.getFieldName(parentFieldName))
    )
  }

  getChildProps({value, parentFieldName, onChange, errorMessages}) {
    /**
     * This gets the props that are defined in the propTypes of the registered component.
     */
    const fieldComponent = this.getComponent()
    const propOptions = omit(this.props, keys(Field.propTypes))
    const allowedKeys = keys({...fieldTypePropTypes, ...fieldComponent.propTypes})

    /**
     * Options that are not registered in the propTypes are passed also
     * in the passProps object
     */
    allowedKeys.push('type')
    const notDefinedOptions = omit(propOptions, allowedKeys)

    const props = {
      value: get(value || {}, this.props.fieldName),
      onChange: newValue => onChange(this.getFieldName(parentFieldName), newValue),
      errorMessage: this.getErrorMessage(errorMessages || {}, parentFieldName),
      fieldName: this.getFieldName(parentFieldName),
      passProps: notDefinedOptions,
      ...propOptions
    }

    return props
  }

  renderComponent(info) {
    const Component = this.getComponent()
    const props = this.getChildProps(info)
    const ref = Component.prototype.render ? {ref: input => (this.input = input)} : {}
    return (
      <ValueContext.Provider value={props.value}>
        <Component {...ref} {...props} />
      </ValueContext.Provider>
    )
  }

  render() {
    return (
      <ValueContext.Consumer>
        {value => (
          <ErrorMessagesContext.Consumer>
            {errorMessages => (
              <OnChangeContext.Consumer>
                {onChange => (
                  <ParentFieldNameContext.Consumer>
                    {parentFieldName =>
                      this.renderComponent({
                        value,
                        parentFieldName,
                        onChange,
                        errorMessages
                      })
                    }
                  </ParentFieldNameContext.Consumer>
                )}
              </OnChangeContext.Consumer>
            )}
          </ErrorMessagesContext.Consumer>
        )}
      </ValueContext.Consumer>
    )
  }
}
