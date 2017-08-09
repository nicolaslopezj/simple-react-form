import React from 'react'
import isReactNative from '../utility/isReactNative'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.any,
  index: PropTypes.number.isRequired,
  fieldName: PropTypes.string.isRequired
}

const childContextTypes = {
  parentFieldName: PropTypes.string
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
