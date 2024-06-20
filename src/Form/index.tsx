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
  const initialPropsState = useMemo(() => cloneDeep(props.state || {}), [props.state])
  const [state, setState] = useState(initialPropsState)

  const resetState = useCallback(() => {
    if (isEqual(state, initialPropsState)) return
    setState(initialPropsState)
  }, [initialPropsState, state])

  useDeepCompareEffect(() => {
    if (!isNil(props.state)) {
      resetState()
    }
  }, [props.state || {}])

  const onChange = useCallback((fieldName: string, fieldValue: any) => {
    setState(oldValue => getNewValue(oldValue, fieldName, fieldValue))
  }, [])

  useEffect(() => {
    if (!props.onChange) return
    if (isEqual(initialPropsState, state)) return
    props.onChange(state)
  }, [state])

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

  const renderChild = () => {
    const domProps = omit(
      props,
      'children',
      'state',
      'onChange',
      'errorMessages',
      'useFormTag',
      'onSubmit',
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
