import React from 'react'
import PropTypes from 'prop-types'
import {ValueContext} from '../Contexts'

export default class WithValue extends React.Component {
  static propTypes = {
    children: PropTypes.func
  }

  render() {
    return <ValueContext.Consumer>{value => this.props.children(value)}</ValueContext.Consumer>
  }
}
