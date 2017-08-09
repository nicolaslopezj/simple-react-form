import React from 'react'
import PropTypes from 'prop-types'

export const propTypes = {
  /**
   * The current value of the field
   */
  value: PropTypes.any,

  /**
   * Field label
   */
  label: PropTypes.any,

  /**
   * The error message if there is a error
   */
  errorMessage: PropTypes.string,

  /**
   * Call this function when the value changes
   */
  onChange: PropTypes.func.isRequired,

  /**
   * If the input is disabled
   */
  disabled: PropTypes.bool,

  /**
   * The schema for the field
   */
  fieldSchema: PropTypes.object,

  /**
   * The schema for the object
   */
  schema: PropTypes.object,

  /**
   * Use hint instead of label
   */
  useHint: PropTypes.bool,

  /**
   * Form
   */
  form: PropTypes.object.isRequired,

  /**
   * The name of the field
   */
  fieldName: PropTypes.string.isRequired,

  /**
   * The props that must be passed to the child component
   */
  passProps: PropTypes.object
}

export default class FieldType extends React.Component {
  constructor(props) {
    super(props)
    console.warn("Now you don't have to extend FieldType to create components")
  }
}

FieldType.propTypes = propTypes
