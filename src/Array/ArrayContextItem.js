import React from 'react'

const propTypes = {
  children: React.PropTypes.any,
  fieldName: React.PropTypes.string.isRequired
}

const childContextTypes = {
  parentFieldName: React.PropTypes.string
}

export default class ArrayContextItem extends React.Component {

  getChildContext () {
    return {
      parentFieldName: this.props.fieldName
    }
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }

}

ArrayContextItem.propTypes = propTypes
ArrayContextItem.childContextTypes = childContextTypes
