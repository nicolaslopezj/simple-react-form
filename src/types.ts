import React, {ComponentProps, Dispatch, ElementType, SetStateAction} from 'react'

export type FieldPropsBase = {
  /**
   * The name of the field in the object.
   */
  fieldName?: string

  /**
   * The type of the input. It should be a component
   */
  type?: ElementType<any>

  /**
   * The value of the parent object
   */
  parentValue?: any

  /**
   * Field label
   */
  label?: React.ReactNode

  /**
   * The error message if there is a error
   */
  errorMessage?: string

  /**
   * The schema for the field
   */
  fieldSchema?: object

  /**
   * The schema for the object
   */
  schema?: object

  /**
   * All the props that are not from simple-react-form
   */
  passProps?: object

  /**
   * Some fields can have children
   */
  children?: React.ReactNode
}

export type FieldProps<TValue = any, TTypeExtraProps = {}> = {
  /**
   * The current value of the field
   */
  value?: TValue

  /**
   * Call this function when the value changes
   */
  onChange?: Dispatch<SetStateAction<TValue>>
} & FieldPropsBase &
  TTypeExtraProps

/**
 * Field props with basic onChange. This is useful for fields that work with
 * onChange props that are no Dispatch<SetStateAction<TValue>>. (useState)
 */
export type FieldPropsWithBasicOnChange<TValue = any, TTypeExtraProps = {}> = {
  /**
   * The current value of the field
   */
  value?: TValue

  /**
   * Call this function when the value changes
   */
  onChange?: (value: TValue) => void
} & FieldPropsBase &
  TTypeExtraProps

export type FormFieldProps<TFieldType extends React.ElementType<any>> = {
  type: TFieldType
  fieldName: string
  errorMessage?: string
} & ComponentProps<TFieldType>

export const fieldPropsKeys = [
  'fieldName',
  'type',
  'value',
  'parentValue',
  'label',
  'errorMessage',
  'onChange',
  'fieldSchema',
  'schema',
  'passProps',
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
  onChange?: Function | Dispatch<SetStateAction<any>>
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
  reset: () => void
}
