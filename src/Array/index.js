/**
 * You can use this field as array field but the main purporse is to extend it
 * and create your own (like the material-ui fields do)
 */

import React from 'react'
import {propTypes as fieldTypePropTypes} from '../FieldType'
import isArray from 'lodash/isArray'
import without from 'lodash/without'
import PropTypes from 'prop-types'
import ObjectField from '../Object'
import Field from '../Field'
import {ParentFieldNameContext} from '../Contexts'

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
  renderItem: PropTypes.func,

  /**
   * Render children as render props giving the index to the child component.
   * This allows this component to be used in a controlled manner.
   */
  renderProps: PropTypes.bool,
}

const defaultProps = {
  addLabel: 'Add',
  removeLabel: 'Remove',
  showLabel: true,
  errorMessages: {},
  autoAddItem: false,
  showAddButton: true,
  showRemoveButton: true,
  renderProps: false,
}

export default class ArrayComponent extends React.Component {
  addItem(itemValue = {}) {
    var newArray = this.props.value
    if (isArray(newArray)) {
      newArray.push(itemValue)
    } else {
      newArray = [itemValue]
    }

    this.props.onChange(newArray)
  }

  getObjectField() {
    return ObjectField
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
    const button = this.props.showRemoveButton
      ? this.renderButton(() => this.removeItem(index), this.props.removeLabel, 'srf_removeButton')
      : null
    return (
      <div
        style={{marginTop: 20, marginBottom: 20, padding: 20}}
        key={`${this.props.fieldName}.${index}`}>
        {this.renderChildrenItemWithContext({index, children})}
        {button}
      </div>
    )
  }

  renderChildrenItemWithContext({index, children}) {
    return (
      <ParentFieldNameContext.Provider key={index} value={this.props.fieldName}>
        <Field fieldName={`${index}`} type={this.getObjectField()}>
          {this.props.renderChildren ? children(index) : children}
        </Field>
      </ParentFieldNameContext.Provider>
    )
  }

  renderButton(onClick, label, className) {
    return (
      <div style={{marginTop: 10}}>
        <button type="button" className={className} onClick={onClick}>
          {label}
        </button>
      </div>
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
      <div style={{marginTop: 20}}>
        <div>
          <b>{this.props.label}</b>
        </div>
        {this.renderErrorMessage()}
        {this.renderChildren()}
        {this.props.showAddButton
          ? this.renderButton(() => this.addItem(), this.props.addLabel, 'srf_addButton')
          : null}
      </div>
    )
  }
}

ArrayComponent.propTypes = propTypes
ArrayComponent.defaultProps = defaultProps
