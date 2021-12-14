import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react'
import omit from 'lodash/omit'
import isFunction from 'lodash/isFunction'
import getNewValue from './getNewValue'
import isReactNative from '../utility/isReactNative'
import {
  ValueContext,
  ErrorMessagesContext,
  OnChangeContext,
  ParentFieldNameContext
} from '../Contexts'
import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'
import {isNil} from 'lodash'

interface FormProps {
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
  onChange?: (newValue: object) => any
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

function Form(props: FormProps, ref) {
  const [state, setState] = useState(cloneDeep(props.state) || {})

  const resetState = () => {
    setState(cloneDeep(props.state))
  }

  useEffect(() => {
    if (!isNil(props.state) && !isEqual(state, props.state)) {
      resetState()
    }
  })

  const onChange = (fieldName: string, fieldValue: any) => {
    const value = getNewValue(state, fieldName, fieldValue)
    setState(value)
    if (props.onChange) {
      props.onChange(value)
    }
  }

  const submit = () => {
    if (!isFunction(props.onSubmit)) {
      console.warn('You should pass a onSubmit prop to this form')
      return
    }
    return props.onSubmit(state)
  }

  const onFormSubmit = (event: any) => {
    event.preventDefault()
    return submit()
  }

  useImperativeHandle(ref, () => ({
    submit
  }))

  const renderChild = () => {
    const domProps = omit(
      props,
      'children',
      'state',
      'onChange',
      'errorMessages',
      'useFormTag',
      'onSubmit'
    )
    if (isReactNative()) {
      return props.children
    }
    if (props.useFormTag !== false) {
      return (
        <form {...domProps} onSubmit={onFormSubmit}>
          {props.children}
        </form>
      )
    } else {
      return props.children
    }
  }

  return (
    <ParentFieldNameContext.Provider value={null}>
      <ErrorMessagesContext.Provider value={props.errorMessages}>
        <OnChangeContext.Provider value={onChange}>
          <ValueContext.Provider value={state}>{renderChild()}</ValueContext.Provider>
        </OnChangeContext.Provider>
      </ErrorMessagesContext.Provider>
    </ParentFieldNameContext.Provider>
  )
}

export default forwardRef(Form)
