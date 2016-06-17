import React from 'react'
import _ from 'underscore'

const propTypes = {
  /**
   * Value of the object.
   */
  value: React.PropTypes.any,

  /**
   * The simple schema
   */
  schema: React.PropTypes.object,

  /**
   * Error message for the object, if there is one.
   */
  errorMessage: React.PropTypes.string,

  /**
   * Children error messages.
   */
  errorMessages: React.PropTypes.object,

  /**
   * Field name of the object in the parent object.
   */
  fieldName: React.PropTypes.string.isRequired,

  /**
   * Call this function when the value changes.
   */
  onChange: React.PropTypes.func,
  /**
   * Show the container label
   */
  showLabel: React.PropTypes.bool,

  /**
   * The field should be read only mode
   */
  disabled: React.PropTypes.bool,

  /**
   * Form
   */
  form: React.PropTypes.object.isRequired,

  /**
   * The label for the field
   */
  label: React.PropTypes.string,

  /**
   * The child components
   */
  children: React.PropTypes.any
}

const defaultProps = {
  showLabel: true,
  errorMessages: {}
}

export default class ObjectComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  getSchema () {
    return this.props.schema
  }

  getFieldSchema () {
    return this.getSchema().schema(this.props.fieldName)
  }

  getLabel () {
    if (this.props.showLabel === false) return
    if (this.props.label) return this.props.label
    return this.getSchema().label(this.props.fieldName)
  }

  renderChildren (children) {
    return React.Children.map(children, (child) => {
      var options = null
      if (_.isObject(child) && child.type && child.type.recieveMRFData) {
        var fieldName = child.props.fieldName
        options = {
          fieldName: `${this.props.fieldName}.${fieldName}`,
          schema: this.getSchema(),
          value: this.props.value ? this.props.value[fieldName] : undefined,
          onChange: this.props.onChange,
          errorMessage: child.props.errorMessage || this.props.errorMessages[`${this.props.fieldName}.${fieldName}`],
          errorMessages: this.props.errorMessages,
          form: this.props.form
        }
      } else if (_.isObject(child) && child.props) {
        options = {
          children: this.renderChildren(child.props.children)
        }
      }

      return options ? React.cloneElement(child, options) : child
    })
  }

  render () {
    return (
      <div style={{ marginTop: 20, marginBottom: 20, padding: 20 }}>
        <div><b>{this.getLabel()}</b></div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        {this.renderChildren(this.props.children)}
      </div>
    )
  }
}

ObjectComponent.propTypes = propTypes
ObjectComponent.defaultProps = defaultProps
ObjectComponent.recieveMRFData = true
