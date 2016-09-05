/**
 * You can use this field as array field but the main purporse is to extend it
 * and create your own (like the material-ui fields do)
 */

import React from 'react'
import FieldType from './field-type'
import _ from 'underscore'
import ArrayContextItem from './array-context-item'
import {replaceIndexKeys} from './utility'

const propTypes = {
  ...FieldType.propTypes,
  /**
   * The add button label
   */
  addLabel: React.PropTypes.string,

  /**
   * Show the add button
   */
  showAddButton: React.PropTypes.bool,

  /**
   * The remove label
   */
  removeLabel: React.PropTypes.string,

  /**
   *
   */
  autoAddItem: React.PropTypes.bool,

  /**
   * The label for the field
   */
  label: React.PropTypes.string,

  /**
   * Each item component
   */
  children: React.PropTypes.any,

  /**
   * Pass a function that returns the children components for the current item.
   * The inputs of the function will be value and index.
   * This is useful when you want to change the view of a item in the array depending
   * on the current value.
   */
  renderItem: React.PropTypes.func
}

const defaultProps = {
  addLabel: 'Add',
  removeLabel: 'Remove',
  showLabel: true,
  errorMessages: {},
  autoAddItem: false,
  showAddButton: true
}

const childContextTypes = {
  parentFieldName: React.PropTypes.string
}

export default class ArrayComponent extends FieldType {

  constructor (props) {
    super(props)
  }

  getChildContext () {
    return {
      parentFieldName: this.props.fieldName
    }
  }

  addItem (itemValue = {}) {
    var newArray = this.props.value
    if (_.isArray(newArray)) {
      newArray.push(itemValue)
    } else {
      newArray = [itemValue]
    }

    this.props.onChange(newArray)
  }

  removeItem (index) {
    const value = this.props.value || []
    var newArray = _.without(value, value[index])
    this.props.onChange(newArray)
  }

  getChildrenComponents (item, index) {
    if (this.props.renderItem) return this.props.renderItem(item, index)
    if (this.props.children) return this.props.children
    if (!this.props.schema) throw new Error(`You must pass children to the array field "${this.props.fieldName}"`)
    const schemaFieldName = replaceIndexKeys(this.props.fieldName)
    const keys = this.props.schema.objectKeys(`${schemaFieldName}.$`)
    return this.props.form.generateInputsForKeys(keys, `${schemaFieldName}.$`)
  }

  renderChildren () {
    const value = this.props.value || []
    if (this.props.autoAddItem && !this.props.disabled && value.length === 0) {
      value.push({})
    }
    return value.map((item, index) => {
      const children = this.getChildrenComponents(item, index)
      return this.renderChildrenItem({ index, children })
    })
  }

  renderChildrenItem ({ index, children }) {
    return (
      <div style={{ marginTop: 20, marginBottom: 20, padding: 20 }} key={`${this.props.fieldName}.${index}`}>
        {this.renderChildrenItemWithContext({index, children})}
        <div style={{ marginTop: 10, textAlign: 'right' }}>
          <button type='button' onClick={() => this.removeItem(index)}>
            {this.props.removeLabel}
          </button>
        </div>
      </div>
    )
  }

  renderChildrenItemWithContext ({index, children}) {
    return (
      <ArrayContextItem index={index} fieldName={this.props.fieldName}>
        {children}
      </ArrayContextItem>
    )
  }

  render () {
    return (
      <div style={{ marginTop: 20 }}>
        <div><b>{this.props.label}</b></div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        {this.renderChildren()}
        <div style={{ marginTop: 10 }}>
          <button type='button' onClick={() => this.addItem()}>
            {this.props.addLabel}
          </button>
        </div>
      </div>
    )
  }

}

ArrayComponent.propTypes = propTypes
ArrayComponent.defaultProps = defaultProps
ArrayComponent.childContextTypes = childContextTypes
