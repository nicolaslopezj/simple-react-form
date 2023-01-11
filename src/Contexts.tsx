import React, {useContext} from 'react'

const ValueContext = React.createContext({})
const ParentFieldNameContext = React.createContext<string>(null)
const ErrorMessagesContext = React.createContext({})
const OnChangeContext = React.createContext((fieldName: string, fieldValue: any) => {})

export function useFormValueContext() {
  return useContext(ValueContext)
}
export function useFormParentFieldNameContext() {
  return useContext(ParentFieldNameContext)
}
export function useErrorMessagesContext() {
  return useContext(ErrorMessagesContext)
}
export function useFormOnChangeContext() {
  return useContext(OnChangeContext)
}

export {ValueContext, ErrorMessagesContext, OnChangeContext, ParentFieldNameContext}
