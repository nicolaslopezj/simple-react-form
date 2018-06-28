import React from 'react'
import {propTypes as fieldTypePropTypes} from '../FieldType'
import PropTypes from 'prop-types'
import {ParentFieldNameContext} from '../Contexts'

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

export default class ObjectComponent extends React.Component {
  getChildrenComponents() {
    return this.renderChildrenComponent()
  }

  renderChildrenComponent() {
    return (
      <ParentFieldNameContext.Provider value={this.props.fieldName}>
        {this.props.children}
      </ParentFieldNameContext.Provider>
    )
  }

  renderErrorMessage() {
    if (!this.props.errorMessage) return
    return (
      <div style={{color: 'red'}} className="srf_errorMessage">
        {this.props.errorMessage}
      </div>
    )
  }

  render() {
    return (
      <div style={{marginTop: 20, marginBottom: 20, padding: 20}}>
        <div>
          <b>{this.props.label}</b>
        </div>
        {this.renderErrorMessage()}
        {this.getChildrenComponents()}
      </div>
    )
  }
}

ObjectComponent.propTypes = propTypes
