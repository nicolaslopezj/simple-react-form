import React from 'react'

const ValueContext = React.createContext({})
const ParentFieldNameContext = React.createContext(null)
const ErrorMessagesContext = React.createContext({})
const OnChangeContext = React.createContext(() => {})

export {ValueContext, ErrorMessagesContext, OnChangeContext, ParentFieldNameContext}
