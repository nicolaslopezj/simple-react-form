import React from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import dot from 'dot-object'

export default class Form extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    state: PropTypes.object,
    doc: PropTypes.object,
    onChange: PropTypes.func,
    errorMessages: PropTypes.object
  }

  static defaultProps = {
    onChange: () => {},
    errorMessages: null,
    state: {}
  }

  static childContextTypes = {
    doc: PropTypes.object,
    onChange: React.PropTypes.func.isRequired,
    errorMessages: PropTypes.object,
    form: PropTypes.any
  }

  state = {}

  getChildContext() {
    return {
      doc: this.getValue(),
      onChange: this.onChange,
      errorMessages: this.props.errorMessages,
      form: this
    }
  }

  handlesState() {
    return !!this.props.doc
  }

  @autobind
  getValue() {
    if (this.handlesState()) {
      return this.state.value || this.props.doc
    } else {
      return this.props.state
    }
  }

  @autobind
  onChange(fieldName, newValue) {
    const inDot = dot.dot(this.getValue())
    inDot[fieldName] = newValue
    const value = dot.object(inDot)
    if (this.handlesState()) {
      this.setState({value})
    }
    console.log('form on change', fieldName, newValue, value)
    this.props.onChange(value)
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
