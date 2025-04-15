import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import isNil from 'lodash/isNil'
import omit from 'lodash/omit'
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useEffect,
  useMemo,
  useState,
} from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {
  ErrorMessagesContext,
  OnChangeContext,
  ParentFieldNameContext,
  ValueContext,
} from '../Contexts'
import {FormProps, FormRef} from '../types'
import isReactNative from '../utility/isReactNative'
import getNewValue from './getNewValue'

function Form(props: FormProps, ref: React.Ref<FormRef>) {
  const propsState = useMemo(() => cloneDeep(props.state || {}), [props.state])
  const [state, setState] = useState(propsState)

  const resetState = useCallback(() => {
    if (isEqual(propsState, state)) return
    setState(propsState)
  }, [propsState, state])

  // when the props state changes, we set the state to the new props.state
  useDeepCompareEffect(() => {
    if (!isNil(props.state)) {
      resetState()
    }
  }, [props.state || {}])

  // when the state of the form changes, we call the onChange function
  useEffect(() => {
    if (!props.onChange) return
    if (isEqual(propsState, state)) return
    props.onChange(state)
  }, [state])

  const onChange = useCallback((fieldName: string, fieldValue: any) => {
    setState(oldValue => getNewValue(oldValue, fieldName, fieldValue))
  }, [])

  const submit = useCallback(() => {
    props.onSubmit?.(state)
  }, [state, props.onSubmit])

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    return submit()
  }

  useImperativeHandle(
    ref,
    () => ({
      submit,
      getValue: () => state,
      reset: resetState,
    }),
    [resetState, state, submit],
  )

  const domProps = useMemo(
    () => omit(props, 'children', 'state', 'onChange', 'errorMessages', 'useFormTag', 'onSubmit'),
    [props],
  )

  const renderChild = () => {
    if (isReactNative()) {
      return props.children
    }

    if (props.useFormTag !== false) {
      return (
        <form {...domProps} onSubmit={onFormSubmit}>
          {props.children}
        </form>
      )
    }

    return props.children
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
