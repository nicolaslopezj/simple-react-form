import React from 'react'
import _ from 'underscore'
import DotObject from './dot'

const propTypes = {
  /**
   * Error message for the object, if there is one.
   */
  errorMessage: React.PropTypes.string,

  /**
   * Field name of the object in the parent object.
   */
  fieldName: React.PropTypes.string.isRequired,

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
   * Show the container label
   */
  showLabel: React.PropTypes.bool,

  /**
   * The field should be read only mode
   */
  disabled: React.PropTypes.bool,

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

const contextTypes = {
  schema: React.PropTypes.object,
  doc: React.PropTypes.object,
  onChange: React.PropTypes.func.isRequired,
  parentFieldName: React.PropTypes.string,
  errorMessages: React.PropTypes.object
}

const childContextTypes = {
  parentFieldName: React.PropTypes.string
}

export default class ArrayComponent extends React.Component {

  getSchema () {
    return this.context.schema
  }

  getLabel () {
    if (this.props.showLabel === false) return
    if (this.props.label) return this.props.label
    return this.getSchema().label(this.getFieldName())
  }

  getFieldName () {
    if (this.context.parentFieldName) {
      return `${this.context.parentFieldName}.${this.props.fieldName}`
    } else {
      return this.props.fieldName
    }
  }

  getChildContext () {
    return {
      parentFieldName: this.getFieldName()
    }
  }

  getValue () {
    return this.context.doc ? DotObject.pick(this.getFieldName(), this.context.doc) : undefined
  }

  getErrorMessage () {
    const errorMessages = this.context.errorMessages || {}
    console.log(errorMessages)
    return this.props.errorMessage || errorMessages[this.getFieldName()]
  }

  onValueChange (fieldName, newValue) {
    const withoutSelf = fieldName.replace(`${this.getFieldName()}.`, '')
    const index = withoutSelf.split('.')[0]
    const plainFieldName = withoutSelf.replace(`${index}.`, '')
    let value = _.clone(this.getValue())

    if (!value) {
      value = []
    }

    if (!value[index]) {
      value[index] = {}
    }

    value[index][plainFieldName] = newValue
    this.context.onChange(this.getFieldName(), value)
  }

  addItem (itemValue = {}) {
    var newArray = this.getValue()
    if (_.isArray(newArray)) {
      newArray.push(itemValue)
    } else {
      newArray = [itemValue]
    }

    this.context.onChange(this.getFieldName(), newArray)
  }

  removeItem (index) {
    const value = this.getValue() || []
    var newArray = _.without(value, value[index])
    this.context.onChange(this.getFieldName(), newArray)
  }

  renderChildren () {
    const value = this.getValue() || []
    if (this.props.autoAddItem && !this.props.disabled && value.length === 0) {
      value.push({})
    }
    return value.map((item, index) => {
      const children = this.props.renderItem ? this.props.renderItem(item, index) : this.props.children
      // const component = this.renderChildrenComponent(children, index)
      return this.renderChildrenItem({ index, children })
    })
  }

  renderChildrenItem ({ index, children }) {
    return (
      <div style={{ marginTop: 20, marginBottom: 20, padding: 20 }} key={`${this.getFieldName()}.${index}`}>
        {this.renderChildrenItemWithContext({index, children})}
        <div style={{ marginTop: 10, textAlign: 'right' }}>
          <button onClick={() => this.removeItem(index)}>
            {this.props.removeLabel}
          </button>
        </div>
      </div>
    )
  }

  renderChildrenItemWithContext ({index, children}) {
    return (
      <ArrayContextItem index={index} fieldName={this.getFieldName()}>
        {children}
      </ArrayContextItem>
    )
  }

  render () {
    return (
      <div style={{ marginTop: 20 }}>
        <div><b>{this.getLabel()}</b></div>
        <div style={{ color: 'red' }}>{this.getErrorMessage()}</div>
        {this.renderChildren()}
        <div style={{ marginTop: 10 }}>
          <button onClick={this.addItem.bind(this)}>
            {this.props.addLabel}
          </button>
        </div>
      </div>
    )
  }
}

ArrayComponent.propTypes = propTypes
ArrayComponent.defaultProps = defaultProps
ArrayComponent.contextTypes = contextTypes
ArrayComponent.childContextTypes = childContextTypes

const arrayContextItemPropTypes = {
  children: React.PropTypes.any,
  index: React.PropTypes.number.isRequired,
  fieldName: React.PropTypes.string.isRequired
}

const arrayContextItemChildContextTypes = {
  parentFieldName: React.PropTypes.string
}

class ArrayContextItem extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  getChildContext () {
    return {
      parentFieldName: `${this.props.fieldName}.${this.props.index}`
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

ArrayContextItem.propTypes = arrayContextItemPropTypes
ArrayContextItem.childContextTypes = arrayContextItemChildContextTypes
