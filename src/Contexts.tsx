import React from 'react'

const ValueContext = React.createContext({})
const ParentFieldNameContext = React.createContext(null)
const ErrorMessagesContext = React.createContext({})
const OnChangeContext = React.createContext((fieldName: string, fieldValue: any) => {})

export {ValueContext, ErrorMessagesContext, OnChangeContext, ParentFieldNameContext}
