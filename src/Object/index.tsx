import React from 'react'
import {FieldProps} from '../types'

/**
 * You can use this field as array field but the main purporse is to extend it
 * and create your own (like the material-ui fields do)
 */

export default class ObjectComponent extends React.Component<FieldProps<any, {}>> {
  getChildrenComponents() {
    return this.renderChildrenComponent()
  }

  renderChildrenComponent() {
    return <>{this.props.children}</>
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
      <div>
        <div>
          <b>{this.props.label}</b>
        </div>
        {this.renderErrorMessage()}
        {this.getChildrenComponents()}
      </div>
    )
  }
}
