import React from 'react'

export interface FieldProps<TValue = any> {
  /**
   * The name of the field in the object.
   */
  fieldName?: string

  /**
   * The type of the input. It can be a component
   */
  type?: any
  /**
   * The current value of the field
   */
  value?: TValue

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
  onChange?: (newValue: TValue) => any

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

  /**
   * Any other prop defined in the field
   **/
  [key: string]: any
}

type WithRequired<T, K extends keyof T> = T & {[P in K]-?: T[P]}

export type FormFieldProps = WithRequired<FieldProps, 'fieldName' | 'type'>

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
export type FormProps = Omit<React.HTMLProps<HTMLFormElement>, 'onChange'> & {
  /**
   * The fields of the form
   */
  children: React.ReactNode
  /**
   * The object that has the values of the form.
   */
  state?: object
  /**
   * A callback that fires when the form value changes.
   * The argument will be the state with the updated field value.
   */
  onChange?: Function
  /**
   * Pass error messages in a object
   */
  errorMessages?: object
  /**
   * Use form tag as a container
   */
  useFormTag?: boolean
  /**
   * A function that is called when the form is submitted.
   */
  onSubmit?: (value: object) => any
}

export interface FormRef {
  submit: () => any
  getValue: () => object
}
