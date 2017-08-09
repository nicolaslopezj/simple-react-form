import React from 'react'
import {propTypes as fieldTypePropTypes} from './FieldType'
import PropTypes from 'prop-types'

/**
 * You can use this field as array field but the main purporse is to extend it
 * and create your own (like the material-ui fields do)
 */

const propTypes = {
  ...fieldTypePropTypes,
  /**
  * Each item component
  */
  children: PropTypes.any
}

const childContextTypes = {
  parentFieldName: PropTypes.string
}

export default class ObjectComponent extends React.Component {
  getChildContext() {
    return {
      parentFieldName: this.props.fieldName
    }
  }

  getChildrenComponents() {
    return this.props.children
  }

  render() {
    return (
      <div style={{marginTop: 20, marginBottom: 20, padding: 20}}>
        <div>
          <b>
            {this.props.label}
          </b>
        </div>
        <div style={{color: 'red'}}>
          {this.props.errorMessage}
        </div>
        {this.getChildrenComponents()}
      </div>
    )
  }
}

ObjectComponent.propTypes = propTypes
ObjectComponent.childContextTypes = childContextTypes
