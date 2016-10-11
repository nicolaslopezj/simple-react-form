import React from 'react'

export const propTypes = {
  /**
   * The current value of the field
   */
  value: React.PropTypes.any,

  /**
   * Field label
   */
  label: React.PropTypes.any,

  /**
   * The error message if there is a error
   */
  errorMessage: React.PropTypes.string,

  /**
   * Call this function when the value changes
   */
  onChange: React.PropTypes.func.isRequired,

  /**
   * If the input is disabled
   */
  disabled: React.PropTypes.bool,

  /**
   * The schema for the field
   */
  fieldSchema: React.PropTypes.object,

  /**
   * The schema for the object
   */
  schema: React.PropTypes.object,

  /**
   * Use hint instead of label
   */
  useHint: React.PropTypes.bool,

  /**
   * Form
   */
  form: React.PropTypes.object.isRequired,

  /**
   * The name of the field
   */
  fieldName: React.PropTypes.string.isRequired,

  /**
   * The props that must be passed to the child component
   */
  passProps: React.PropTypes.object
}

export default class FieldType extends React.Component {

  constructor (props) {
    super(props)
    console.warn('Now you don\'t have to extend FieldType to create components')
  }

}

FieldType.propTypes = propTypes
