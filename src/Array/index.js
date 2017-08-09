/**
 * You can use this field as array field but the main purporse is to extend it
 * and create your own (like the material-ui fields do)
 */

import React from 'react'
import ArrayContextItem from './ArrayContextItem'
import {propTypes as fieldTypePropTypes} from '../FieldType'
import isArray from 'lodash/isArray'
import without from 'lodash/without'
import PropTypes from 'prop-types'

const propTypes = {
  ...fieldTypePropTypes,
  /**
   * The add button label
   */
  addLabel: PropTypes.string,

  /**
   * Show the add button
   */
  showAddButton: PropTypes.bool,

  /**
   * Show the remove button
   */
  showRemoveButton: PropTypes.bool,

  /**
   * The remove label
   */
  removeLabel: PropTypes.string,

  /**
   *
   */
  autoAddItem: PropTypes.bool,

  /**
   * The label for the field
   */
  label: PropTypes.string,

  /**
   * Each item component
   */
  children: PropTypes.any,

  /**
   * Pass a function that returns the children components for the current item.
   * The inputs of the function will be value and index.
   * This is useful when you want to change the view of a item in the array depending
   * on the current value.
   */
  renderItem: PropTypes.func
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
  parentFieldName: PropTypes.string
}

export default class ArrayComponent extends React.Component {
  getChildContext() {
    return {
      parentFieldName: this.props.fieldName
    }
  }

  addItem(itemValue = {}) {
    var newArray = this.props.value
    if (isArray(newArray)) {
      newArray.push(itemValue)
    } else {
      newArray = [itemValue]
    }

    this.props.onChange(newArray)
  }

  removeItem(index) {
    const value = this.props.value || []
    var newArray = without(value, value[index])
    this.props.onChange(newArray)
  }

  getChildrenComponents(item, index) {
    if (this.props.renderItem) return this.props.renderItem(item, index)
    if (this.props.children) return this.props.children
  }

  renderChildren() {
    const value = this.props.value || []
    if (this.props.autoAddItem && !this.props.disabled && value.length === 0) {
      value.push({})
    }
    return value.map((item, index) => {
      const children = this.getChildrenComponents(item, index)
      return this.renderChildrenItem({index, children})
    })
  }

  renderChildrenItem({index, children}) {
    return (
      <div
        style={{marginTop: 20, marginBottom: 20, padding: 20}}
        key={`${this.props.fieldName}.${index}`}
      >
        {this.renderChildrenItemWithContext({index, children})}
        {this.props.showRemoveButton
          ? this.renderButton(() => this.removeItem(index), this.props.removeLabel)
          : null}
      </div>
    )
  }

  renderChildrenItemWithContext({index, children}) {
    return (
      <ArrayContextItem index={index} fieldName={this.props.fieldName}>
        {children}
      </ArrayContextItem>
    )
  }

  renderButton(onClick, label) {
    return (
      <div style={{marginTop: 10}}>
        <button type="button" onClick={onClick}>
          {label}
        </button>
      </div>
    )
  }

  render() {
    return (
      <div style={{marginTop: 20}}>
        <div>
          <b>
            {this.props.label}
          </b>
        </div>
        <div style={{color: 'red'}}>
          {this.props.errorMessage}
        </div>
        {this.renderChildren()}
        {this.props.showAddButton
          ? this.renderButton(() => this.addItem(), this.props.addLabel)
          : null}
      </div>
    )
  }
}

ArrayComponent.propTypes = propTypes
ArrayComponent.defaultProps = defaultProps
ArrayComponent.childContextTypes = childContextTypes
