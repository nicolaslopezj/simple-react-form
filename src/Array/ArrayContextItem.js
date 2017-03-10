import React from 'react'

const propTypes = {
  children: React.PropTypes.any,
  index: React.PropTypes.number.isRequired,
  fieldName: React.PropTypes.string.isRequired
}

const childContextTypes = {
  parentFieldName: React.PropTypes.string
}

export default class ArrayContextItem extends React.Component {

  getChildContext () {
    return {
      parentFieldName: `${this.props.fieldName}.${this.props.index}`
    }
  }

  isRN () {
    return navigator.product === 'ReactNative'
  }

  render () {
    if (this.isRN()) {
      const {View} = require('react-native');
      return (
        <View>
          {this.props.children}
        </View>
      )
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
