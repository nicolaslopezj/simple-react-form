import React from 'react'
import isReactNative from '../utility/isReactNative'

const propTypes = {
  children: React.PropTypes.any,
  index: React.PropTypes.number.isRequired,
  fieldName: React.PropTypes.string.isRequired
}

const childContextTypes = {
  parentFieldName: React.PropTypes.string
}

export default class ArrayContextItem extends React.Component {
  getChildContext() {
    return {
      parentFieldName: `${this.props.fieldName}.${this.props.index}`
    }
  }

  render() {
    if (isReactNative()) {
      throw new Error('You must create a custom ArrayContextItem for React Native')
    }
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

ArrayContextItem.propTypes = propTypes
ArrayContextItem.childContextTypes = childContextTypes
