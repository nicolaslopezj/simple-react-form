import get from 'lodash/get'
import omit from 'lodash/omit'
import {JSXElementConstructor, forwardRef, useContext, useMemo} from 'react'
import {
  ErrorMessagesContext,
  OnChangeContext,
  ParentFieldNameContext,
  ValueContext,
} from '../Contexts'
import {FormFieldProps, fieldPropsKeys} from '../types'

function FieldInner<TFieldType extends JSXElementConstructor<any>>(
  props: FormFieldProps<TFieldType>,
  ref: any,
) {
  const parentValue = useContext(ValueContext)
  const errorMessages = useContext(ErrorMessagesContext) || {}
  const onChange = useContext(OnChangeContext)
  const parentFieldName = useContext(ParentFieldNameContext)

  const fieldName = useMemo(() => {
    if (parentFieldName) {
      if (props.fieldName) {
        return `${parentFieldName}.${props.fieldName}`
      }
      return parentFieldName
    }
    return props.fieldName
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
      passProps,
    }
  }, [props, parentValue, fieldName, errorMessage])

  const Component = props.type

  // Only pass ref if Component is a class component
  const componentRef =
    typeof Component === 'function' && Component.prototype && Component.prototype.isReactComponent
      ? ref
      : null

  return (
    <ValueContext.Provider value={childProps.value}>
      <ParentFieldNameContext.Provider value={childProps.fieldName}>
        <Component {...childProps} ref={componentRef} />
      </ParentFieldNameContext.Provider>
    </ValueContext.Provider>
  )
}

const Field = forwardRef(FieldInner) as <
  TFieldType extends JSXElementConstructor<any> | undefined = undefined,
>(
  props: FormFieldProps<TFieldType> & {ref?: any},
) => ReturnType<typeof FieldInner>

export default Field
