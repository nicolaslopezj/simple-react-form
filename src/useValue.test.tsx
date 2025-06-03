import {render, screen, fireEvent} from '@testing-library/react'
import React from 'react'
import {ValueContext} from './Contexts'
import useValue from './useValue'
import '@testing-library/jest-dom'

function DisplayValue() {
  const value = useValue()
  return <div data-testid="value">{String(value)}</div>
}

test('useValue returns the current context value', () => {
  render(
    <ValueContext.Provider value="context-value">
      <DisplayValue />
    </ValueContext.Provider>,
  )
  expect(screen.getByTestId('value')).toHaveTextContent('context-value')
})

test('useValue updates when the context value changes', () => {
  function Wrapper() {
    const [val, setVal] = React.useState('first')
    return (
      <ValueContext.Provider value={val}>
        <button onClick={() => setVal('second')}>change</button>
        <DisplayValue />
      </ValueContext.Provider>
    )
  }

  render(<Wrapper />)
  expect(screen.getByTestId('value')).toHaveTextContent('first')
  fireEvent.click(screen.getByText('change'))
  expect(screen.getByTestId('value')).toHaveTextContent('second')
})
