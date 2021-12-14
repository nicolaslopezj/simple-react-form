import React from 'react'

export interface FieldProps {
  /**
   * The name of the field in the object.
   */
  fieldName: string

  /**
   * The type of the input. It can be a component
   */
  type: any

  /**
   * The current value of the field
   */
  value?: any

  /**
   * Field label
   */
  label?: React.ReactNode

  /**
   * The error message if there is a error
   */
  errorMessage?: string

  /**
   * Call this function when the value changes
   */
  onChange?: (newValue: any) => {}

  /**
   * If the input is disabled
   */
  disabled?: boolean

  /**
   * The schema for the field
   */
  fieldSchema?: object

  /**
   * The schema for the object
   */
  schema?: object

  /**
   * The props that must be passed to the child component
   */
  passProps?: object
}

export const fieldPropsKeys = [
  'fieldName',
  'type',
  'value',
  'label',
  'errorMessage',
  'onChange',
  'disabled',
  'fieldSchema',
  'schema',
  'passProps'
]
