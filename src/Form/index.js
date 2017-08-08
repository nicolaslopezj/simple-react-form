import React from 'react'
import ArrayComponent from '../Array'
import ObjectComponent from '../Object'
import DotObject from 'dot-object'
import getPresentFields from '../utility/getPresentFields'
import cleanFields from '../utility/clean-fields'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import isFunction from 'lodash/isFunction'
import omit from 'lodash/omit'
import keys from 'lodash/keys'
import findIndex from 'lodash/findIndex'

const propTypes = {
  /**
   * The object that has the values of the form.
   */
  state: React.PropTypes.object,
  /**
   * Alias of state
   */
  doc: React.PropTypes.object,

  /**
   * A callback that fires when the form value changes.
   * The argument will be the value.
   */
  onChange: React.PropTypes.func,

  /**
   * A function that is called when the form action finished with success.
   */
  onSuccess: React.PropTypes.func,

  /**
   * A function that is called when the form is submitted.
   */
  onSubmit: React.PropTypes.func,

  /**
   * The component for the array wrapper
   */
  arrayComponent: React.PropTypes.any,

  /**
   * The component for the object wrapper
   */
  objectComponent: React.PropTypes.any,

  /**
   * The child components
   */
  children: React.PropTypes.any,

  /**
   * Render form tag
   */
  useFormTag: React.PropTypes.bool,

  /**
   * Pass error messages
   */
  errorMessages: React.PropTypes.object
}

const defaultProps = {
  arrayComponent: ArrayComponent,
  objectComponent: ObjectComponent,
  useFormTag: true,
  errorMessages: {}
}

const childContextTypes = {
  doc: React.PropTypes.object,
  onChange: React.PropTypes.func.isRequired,
  errorMessages: React.PropTypes.object,
  form: React.PropTypes.any.isRequired
}

export default class Form extends React.Component {
  getChildContext() {
    return {
      doc: this.state.doc,
      onChange: this.onValueChange,
      errorMessages: this.state.errorMessages,
      form: this
    }
  }

  componentWillReceiveProps(nextProps) {
    const state = this.props.state || this.props.doc || {}
    const nextState = nextProps.state || nextProps.doc || {}
    if (!isEqual(state, nextState)) {
      this.setState({doc: cloneDeep(nextState), changes: {}})
    }
  }

  onFormSubmit(event) {
    event.preventDefault()
    return this.submit()
  }

  /*
     * This is necesarry to allow the form to filter the fields when updating
     */
  registerComponent({field, component}) {
    this.fields.push({field, component})
  }

  unregisterComponent(fieldName) {
    const index = findIndex(this.fields, ({field}) => field === fieldName)
    this.fields.splice(index, 1)
  }

  submit() {
    if (!isFunction(this.props.onSubmit)) {
      throw new Error('You must pass a onSubmit function or set the form type to insert or update')
    }
    const presentFields = getPresentFields(this.fields)
    const cleanDoc = cleanFields(DotObject.dot(data), presentFields)
    return this.props.onSubmit(DotObject.object(DotObject.dot(cleanDoc)))
  }

  cleanErrorMessages() {
    this.errorMessages = {}
    this.setState({errorMessages: {}})
  }

  clearForm() {
    this.setState({doc: {}, changes: {}})
  }

  setErrorMessage(fieldName, message) {
    const errorMessages = cloneDeep(this.errorMessages)
    errorMessages[fieldName] = message
    this.errorMessages = errorMessages
    this.setState({errorMessages})
  }

  isRN() {
    return typeof navigator !== 'undefined' && navigator.product === 'ReactNative'
  }

  onValueChange(fieldName, newValue) {
    //  newValue = typeof newValue === 'undefined' ? null : newValue
    DotObject.del(fieldName, this.state.doc)
    var doc = DotObject.str(`val.${fieldName}`, newValue, {val: this.state.doc}).val
    DotObject.del(fieldName, this.state.changes)
    var changes = DotObject.str(`val.${fieldName}`, newValue, {val: this.state.changes}).val
    this.setState({doc, changes})

    if (isFunction(this.props.onChange)) {
      this.props.onChange(this.state.doc, this.state.changes)
    }
  }

  render() {
    const domProps = omit(this.props, keys(propTypes))
    if (this.props.useFormTag && !this.isRN()) {
      return (
        <form {...domProps} onSubmit={this.onFormSubmit}>
          {this.props.children}
        </form>
      )
    } else if (this.isRN()) {
      return this.props.children
    } else {
      return (
        <div>
          {this.props.children}
        </div>
      )
    }
  }
}

Form.propTypes = propTypes
Form.defaultProps = defaultProps
Form.childContextTypes = childContextTypes
