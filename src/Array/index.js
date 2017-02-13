/**
 * You can use this field as array field but the main purporse is to extend it
 * and create your own (like the material-ui fields do)
 */

import React from 'react'
import ArrayContextItem from './ArrayContextItem'
import {replaceIndexKeys} from '../utility'
import {propTypes as fieldTypePropTypes} from '../FieldType'
import generateInputsForKeys from '../utility/generateInputsForKeys'
import isArray from 'lodash/isArray'
import without from 'lodash/without'

const propTypes = {
  ...fieldTypePropTypes,
  /**
   * The add button label
   */
  addLabel: React.PropTypes.string,

  /**
   * Show the add button
   */
  showAddButton: React.PropTypes.bool,

  /**
   * Show the remove button
   */
  showRemoveButton: React.PropTypes.bool,

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
  showAddButton: true,
  showRemoveButton: true
}

const childContextTypes = {
  parentFieldName: React.PropTypes.string
}

export default class ArrayComponent extends React.Component {

  getChildContext () {
    return {
      parentFieldName: this.props.fieldName
    }
  }

  addItem (itemValue = {}) {
    var newArray = this.props.value
    if (isArray(newArray)) {
      newArray.push(itemValue)
    } else {
      newArray = [itemValue]
    }

    this.props.onChange(newArray)
  }

  removeItem (index) {
    const value = this.props.value || []
    var newArray = without(value, value[index])
    this.props.onChange(newArray)
  }

  getChildrenComponents (item, index) {
    if (this.props.renderItem) return this.props.renderItem(item, index)
    if (this.props.children) return this.props.children
    if (!this.props.schema) throw new Error(`You must pass children to the array field "${this.props.fieldName}"`)
    const schemaFieldName = replaceIndexKeys(this.props.fieldName)
    let keys = this.props.schema.objectKeys(`${schemaFieldName}.$`)
    if (keys.length) {
      // Array with objects, e.g. type: [Object]
      keys = keys.map((element) => (`${index}.${element}`))
      return generateInputsForKeys(keys, schemaFieldName, this.props.schema, this.props.omit)
    }
    // Array with primitives, e.g. type: [String]
    // Child field has no own fieldName (used as key for looking up values)
    return generateInputsForKeys([''], schemaFieldName, this.props.schema, this.props.omit)
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
        {this.props.showRemoveButton
          ? <div style={{ marginTop: 10, textAlign: 'right' }}>
            <button type='button' onClick={() => this.removeItem(index)}>
              {this.props.removeLabel}
            </button>
          </div>
          : null}
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
        {this.props.showAddButton
          ? <div style={{ marginTop: 10 }}>
            <button type='button' onClick={() => this.addItem()}>
              {this.props.addLabel}
            </button>
          </div>
          : null}
      </div>
    )
  }

}

ArrayComponent.propTypes = propTypes
ArrayComponent.defaultProps = defaultProps
ArrayComponent.childContextTypes = childContextTypes
