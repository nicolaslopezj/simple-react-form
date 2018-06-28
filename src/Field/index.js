import React from 'react'
import {propTypes as fieldTypePropTypes} from '../FieldType'
import omit from 'lodash/omit'
import keys from 'lodash/keys'
import pick from 'lodash/pick'
import get from 'lodash/get'
import autobind from 'autobind-decorator'
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

  @autobind
  focus() {
    if (!this.input.focus) {
      throw new Error("Field doesn't has a focus method")
    }
    this.input.focus()
  }

  getComponent() {
    return this.props.type
  }

  getErrorMessage(errorMessages) {
    return (
      this.props.errorMessage ||
      errorMessages[this.getFieldName()] ||
      get(errorMessages, this.getFieldName())
    )
  }

  getChildProps({value, parentFieldName, onChange, errorMessages}) {
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
      value: get(value || {}, this.props.fieldName),
      onChange: newValue => onChange(this.getFieldName(parentFieldName), newValue),
      errorMessage: this.getErrorMessage(errorMessages || {}),
      fieldName: this.getFieldName(parentFieldName),
      passProps: notDefinedOptions,
      ...onlyAllowedOptions
    }

    return props
  }

  renderComponent(info) {
    const Component = this.getComponent()
    const props = this.getChildProps(info)
    return (
      <ValueContext.Provider value={props.value}>
        <Component ref={input => (this.input = input)} {...props} />
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
