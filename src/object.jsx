import React from 'react'

const propTypes = {
  /**
   * Field name of the object in the parent object.
   */
  fieldName: React.PropTypes.string.isRequired,

  /**
   * Show the container label
   */
  showLabel: React.PropTypes.bool,

  /**
   * The field should be read only mode
   */
  disabled: React.PropTypes.bool,

  /**
   * The label for the field
   */
  label: React.PropTypes.string,

  /**
   * The child components
   */
  children: React.PropTypes.any,

  /**
   * Pass a error message
   */
  errorMessage: React.PropTypes.string
}

const defaultProps = {
  showLabel: true,
  errorMessages: {}
}

const contextTypes = {
  schema: React.PropTypes.object,
  parentFieldName: React.PropTypes.string,
  errorMessages: React.PropTypes.object
}

const childContextTypes = {
  parentFieldName: React.PropTypes.string
}

export default class ObjectComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  getFieldName () {
    if (this.context.parentFieldName) {
      return `${this.context.parentFieldName}.${this.props.fieldName}`
    } else {
      return this.props.fieldName
    }
  }

  getChildContext () {
    return {
      parentFieldName: this.getFieldName()
    }
  }

  getSchema () {
    return this.context.schema
  }

  getFieldSchema () {
    return this.getSchema().schema(this.getFieldName())
  }

  getLabel () {
    if (this.props.showLabel === false) return
    if (this.props.label) return this.props.label
    return this.getSchema().label(this.getFieldName())
  }

  getErrorMessage () {
    const errorMessages = this.context.errorMessages || {}
    return this.props.errorMessage || errorMessages[this.getFieldName()]
  }

  render () {
    return (
      <div style={{ marginTop: 20, marginBottom: 20, padding: 20 }}>
        <div><b>{this.getLabel()}</b></div>
        <div style={{ color: 'red' }}>{this.getErrorMessage()}</div>
        {this.props.children}
      </div>
    )
  }
}

ObjectComponent.propTypes = propTypes
ObjectComponent.defaultProps = defaultProps
ObjectComponent.contextTypes = contextTypes
ObjectComponent.childContextTypes = childContextTypes
