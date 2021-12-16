import React from 'react'
import PropTypes from 'prop-types'
import {ValueContext} from '../Contexts'

interface WithValueProps {
  children: (value: any) => React.ReactNode
}

export default class WithValue extends React.Component<WithValueProps> {
  static propTypes = {
    children: PropTypes.func
  }

  render() {
    return <ValueContext.Consumer>{value => this.props.children(value)}</ValueContext.Consumer>
  }
}
