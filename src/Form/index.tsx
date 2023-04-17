import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react'
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
import cloneDeep from 'lodash/cloneDeep'
import isNil from 'lodash/isNil'
import {FormProps, FormRef} from '../types'
import useDeepCompareEffect from 'use-deep-compare-effect'

function Form(props: FormProps, ref: React.Ref<FormRef>) {
  const [state, setState] = useState(cloneDeep(props.state) || {})
  const omitOnChangeEvent = useRef(true)

  const resetState = () => {
    setState(cloneDeep(props.state))
  }

  useDeepCompareEffect(() => {
    if (!isNil(props.state)) {
      resetState()
    }
  }, [props.state || {}])

  useDeepCompareEffect(() => {
    if (omitOnChangeEvent.current) {
      omitOnChangeEvent.current = false
      return
    }
    if (isFunction(props.onChange)) {
      props.onChange(state)
    }
  }, [state])

  const onChange = (fieldName: string, fieldValue: any) => {
    setState(oldValue => getNewValue(oldValue, fieldName, fieldValue))
  }

  const submit = () => {
    if (!isFunction(props.onSubmit)) return
    return props.onSubmit(state)
  }

  const onFormSubmit = (event: any) => {
    event.preventDefault()
    return submit()
  }

  useImperativeHandle(ref, () => ({
    submit,
    getValue: () => state,
    reset: resetState
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
