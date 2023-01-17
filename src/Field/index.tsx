import React, {forwardRef, JSXElementConstructor, useContext, useMemo} from 'react'
import omit from 'lodash/omit'
import get from 'lodash/get'
import {
  ValueContext,
  ErrorMessagesContext,
  OnChangeContext,
  ParentFieldNameContext
} from '../Contexts'
import {fieldPropsKeys, FormFieldProps} from '../types'

// Redecalare forwardRef
declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null
}

function FieldInner<TFieldType extends JSXElementConstructor<any>>(
  props: FormFieldProps<TFieldType>,
  ref: any
) {
  const parentValue = useContext(ValueContext)
  const errorMessages = useContext(ErrorMessagesContext) || {}
  const onChange = useContext(OnChangeContext)
  const parentFieldName = useContext(ParentFieldNameContext)

  const fieldName = useMemo(() => {
    if (parentFieldName) {
      if (props.fieldName) {
        return `${parentFieldName}.${props.fieldName}`
      } else {
        return parentFieldName
      }
    } else {
      return props.fieldName
    }
  }, [parentFieldName, props.fieldName])

  const errorMessage = useMemo(() => {
    return props.errorMessage || errorMessages[fieldName] || get(errorMessages, fieldName)
  }, [fieldName, props.errorMessage, errorMessages])

  const childProps = useMemo(() => {
    const propOptions = omit(props, ['fieldName', 'type', 'errorMessage']) as any
    const allowedKeys = [...fieldPropsKeys, 'type']
    const passProps = omit(propOptions, allowedKeys)

    return {
      ...propOptions,
      value: get(parentValue || {}, props.fieldName),
      parentValue: parentValue || {},
      onChange: newValue => {
        return onChange(fieldName, newValue)
      },
      errorMessage,
      fieldName,
      passProps
    }
  }, [props, parentValue, fieldName, errorMessage])

  const Component = props.type

  const componentRef = Component.prototype.render ? ref : null

  return (
    <ValueContext.Provider value={childProps.value}>
      <ParentFieldNameContext.Provider value={childProps.fieldName}>
        <Component {...childProps} ref={componentRef} />
      </ParentFieldNameContext.Provider>
    </ValueContext.Provider>
  )
}

const Field = forwardRef(FieldInner)

export default Field
