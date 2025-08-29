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
  useRef,
  useState,
  startTransition,
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

  // Track if changes are coming from internal field updates
  const isUpdatingFromField = useRef(false)

  const resetState = useCallback(() => {
    if (isEqual(propsState, state)) return
    // Only reset if we're not currently processing a field update
    if (!isUpdatingFromField.current) {
      // Use startTransition for form resets as they're typically not urgent
      startTransition(() => {
        setState(propsState)
      })
    }
  }, [propsState, state])

  // when the props state changes, we set the state to the new props.state
  useDeepCompareEffect(() => {
    if (!isNil(props.state)) {
      resetState()
    }
  }, [props.state || {}])

  // Notify parent *only* when our internal state changed and *not* immediately
  // after the parent has just provided us with a new `props.state`.  We detect
  // an external change by keeping the previous `props.state` (cloned into
  // `propsState`) in a ref and comparing it to the current one. This prevents
  // a feedback-loop where the form sends its stale value back to the parent
  // right after the parent updated it (see failing test case).
  const prevPropsStateRef = useRef(propsState)

  useEffect(() => {
    const propsStateChanged = !isEqual(prevPropsStateRef.current, propsState)

    // Update ref for next render cycle
    prevPropsStateRef.current = propsState

    if (!props.onChange) return
    if (isEqual(propsState, state)) return // nothing changed
    if (propsStateChanged) return // skip, change came from parent

    // Internal change → notify parent
    startTransition(() => {
      props.onChange(state)
    })
  }, [state, props.onChange, propsState])

  const onChange = useCallback((fieldName: string, fieldValue: any) => {
    isUpdatingFromField.current = true
    setState(oldValue => {
      const newValue = getNewValue(oldValue, fieldName, fieldValue)
      // Reset the flag after state update
      Promise.resolve().then(() => {
        isUpdatingFromField.current = false
      })
      return newValue
    })
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

  console.log('[simple-react-form] state', state)
  console.log('[simple-react-form] props', props)

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
