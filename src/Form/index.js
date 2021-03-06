import React from 'react'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import keys from 'lodash/keys'
import isFunction from 'lodash/isFunction'
import getNewValue from './getNewValue'
import isReactNative from '../utility/isReactNative'
import {
  ValueContext,
  ErrorMessagesContext,
  OnChangeContext,
  ParentFieldNameContext
} from '../Contexts'
import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'

export default class Form extends React.Component {
  static propTypes = {
    /**
     * The fields of the form
     */
    children: PropTypes.node,
    /**
     * The object that has the values of the form.
     */
    state: PropTypes.object,
    /**
     * A callback that fires when the form value changes.
     * The argument will be the state with the updated field value.
     */
    onChange: PropTypes.func,
    /**
     * Pass error messages in a object
     */
    errorMessages: PropTypes.object,
    /**
     * Use form tag as a container
     */
    useFormTag: PropTypes.bool,
    /**
     * Adds a button for automatic submitting
     */
    addSubmitButton: PropTypes.bool,
    /**
     * A function that is called when the form is submitted.
     */
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    errorMessages: null,
    useFormTag: true,
    addSubmitButton: true
  }

  constructor(props) {
    super(props)
    this.state = {value: cloneDeep(props.state)}
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevProps.state, this.props.state)) {
      this.resetState()
    }
  }

  resetState() {
    this.setState({value: cloneDeep(this.props.state)}) // will reset state because state prop has changed
  }

  getValue = () => {
    return this.state.value || {}
  }

  onChange = (fieldName, fieldValue) => {
    const value = getNewValue(this.getValue(), fieldName, fieldValue)
    this.setState({value})
    this.props.onChange(value)
  }

  onFormSubmit = event => {
    event.preventDefault()
    return this.submit()
  }

  submit = () => {
    if (!isFunction(this.props.onSubmit)) {
      console.warn('You should pass a onSubmit prop to this form')
      return
    }
    return this.props.onSubmit(this.getValue())
  }

  renderChild() {
    const domProps = omit(this.props, keys(Form.propTypes))
    if (isReactNative()) {
      return this.props.children
    }
    if (this.props.useFormTag) {
      return (
        <form {...domProps} ref="form" onSubmit={this.onFormSubmit}>
          {this.props.children}
          {this.props.addSubmitButton ? <button type="submit" style={{display: 'none'}} /> : null}
        </form>
      )
    } else {
      return <div {...domProps}>{this.props.children}</div>
    }
  }

  render() {
    return (
      <ParentFieldNameContext.Provider value={null}>
        <ErrorMessagesContext.Provider value={this.props.errorMessages}>
          <OnChangeContext.Provider value={this.onChange}>
            <ValueContext.Provider value={this.getValue()}>
              {this.renderChild()}
            </ValueContext.Provider>
          </OnChangeContext.Provider>
        </ErrorMessagesContext.Provider>
      </ParentFieldNameContext.Provider>
    )
  }
}
