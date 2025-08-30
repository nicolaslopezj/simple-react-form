import React from 'react'
import isReactNative from '../utility/isReactNative'

interface FormInnerProps {
  domProps: any
  children: React.ReactNode
  onFormSubmit: (event: React.FormEvent) => void
  useFormTag: boolean
}

function FormInner({domProps, children, onFormSubmit, useFormTag}: FormInnerProps) {
  if (isReactNative()) {
    return <>{children}</>
  }

  if (useFormTag !== false) {
    return (
      <form {...domProps} onSubmit={onFormSubmit}>
        {children}
      </form>
    )
  }

  return <>{children}</>
}

export default FormInner
