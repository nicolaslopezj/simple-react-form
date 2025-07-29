import {fireEvent, render, screen} from '@testing-library/react'
import {act, useEffect, useState} from 'react'
import Field from './Field'
import Form from './Form'
import {FieldProps} from './types'
import '@testing-library/jest-dom'

jest.useFakeTimers()

// Mock TextInput component since it's external
interface TextInputProps {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
}

function MockTextInput(props: TextInputProps) {
  const {onChange} = props
  return (
    <input
      data-testid="number-input"
      value={props.value}
      onChange={e => onChange(e.target.value)}
      onBlur={props.onBlur}
    />
  )
}

// Mock remeda functions
const isNumber = (value: any): value is number => typeof value === 'number' && !Number.isNaN(value)
const round = (value: number, decimals: number): number => {
  return Math.round(value * 10 ** decimals) / 10 ** decimals
}

// NumberInput component (as provided by user)
type Props = Omit<TextInputProps, 'onChange'> & {
  onBlur?: (value: number) => any
  maxDecimals?: number
  inputClassName?: string
}

const locale = 'es-CL'

function format(value: number) {
  return value.toLocaleString(locale)
}

function unformat(text: string, props: FieldProps<number, Props>) {
  if (text === '-') return 0
  const parts = (1234.5).toLocaleString(locale).match(/(\D+)/g)
  let unformatted = text

  unformatted = unformatted.split(parts[0]).join('')
  unformatted = unformatted.split(parts[1]).join('.')

  const float = Number.parseFloat(unformatted)

  return round(float, isNumber(props.maxDecimals) ? props.maxDecimals : 8)
}

function NumberInput(props: FieldProps<number, Props>) {
  const value = Number(props.value)

  const [text, _setText] = useState<string>(
    !isNumber(props.value) || Number.isNaN(props.value) ? '' : format(value),
  )

  const setText = (text: string) => {
    _setText(text)
    if (!props.onChange) return

    if (text) {
      const unformatted = unformat(text, props)

      if (Number.isNaN(unformatted)) {
        _setText('')
      } else {
        const newValue = unformatted

        if (props.value !== newValue) {
          props.onChange(newValue)
        }
      }
    } else {
      if (isNumber(props.value)) {
        props.onChange(null)
      }
    }
  }

  const newText = !isNumber(props.value) || Number.isNaN(props.value) ? '' : format(value)

  useEffect(() => {
    if (newText !== text) {
      setText(newText)
    }
  }, [newText])

  return (
    <MockTextInput
      {...props}
      value={text}
      onChange={setText}
      onBlur={() => {
        const unformattedOnBlur = unformat(text, props)
        const formattedOnBlur = format(unformattedOnBlur)

        setText(formattedOnBlur)
        if (props.onBlur) {
          props.onBlur(unformattedOnBlur)
        }
      }}
    />
  )
}

describe('NumberInput', () => {
  test('should format numbers according to es-CL locale', () => {
    render(
      <Form state={{price: 1234.56}}>
        <Field fieldName="price" type={NumberInput} />
      </Form>,
    )

    const input = screen.getByTestId('number-input')
    expect(input).toHaveValue('1.234,56')
  })

  test('should handle empty/undefined values', () => {
    render(
      <Form state={{price: undefined}}>
        <Field fieldName="price" type={NumberInput} />
      </Form>,
    )

    const input = screen.getByTestId('number-input')
    expect(input).toHaveValue('')
  })

  test('should handle NaN values', () => {
    render(
      <Form state={{price: Number.NaN}}>
        <Field fieldName="price" type={NumberInput} />
      </Form>,
    )

    const input = screen.getByTestId('number-input')
    expect(input).toHaveValue('')
  })

  test('should unformat user input and update form state', async () => {
    let formState = {price: 0}

    function TestForm() {
      const [state, setState] = useState(formState)
      formState = state

      return (
        <Form state={state} onChange={setState}>
          <Field fieldName="price" type={NumberInput} />
        </Form>
      )
    }

    render(<TestForm />)
    const input = screen.getByTestId('number-input')

    await act(async () => {
      fireEvent.change(input, {target: {value: '1.500,75'}})
      jest.advanceTimersByTime(0)
    })

    expect(formState.price).toBe(1500.75)
  })

  test('should handle dash input as zero', async () => {
    let formState = {price: 0}

    function TestForm() {
      const [state, setState] = useState(formState)
      formState = state

      return (
        <Form state={state} onChange={setState}>
          <Field fieldName="price" type={NumberInput} />
        </Form>
      )
    }

    render(<TestForm />)
    const input = screen.getByTestId('number-input')

    await act(async () => {
      fireEvent.change(input, {target: {value: '-'}})
      jest.advanceTimersByTime(0)
    })

    expect(formState.price).toBe(0)
  })

  test('should clear invalid input and reset to empty', async () => {
    let formState = {price: 100}

    function TestForm() {
      const [state, setState] = useState(formState)
      formState = state

      return (
        <Form state={state} onChange={setState}>
          <Field fieldName="price" type={NumberInput} />
        </Form>
      )
    }

    render(<TestForm />)
    const input = screen.getByTestId('number-input')

    await act(async () => {
      fireEvent.change(input, {target: {value: 'invalid text'}})
      jest.advanceTimersByTime(0)
    })

    expect(input).toHaveValue('')
  })

  test('should set value to null when clearing input', async () => {
    let formState = {price: 100}

    function TestForm() {
      const [state, setState] = useState(formState)
      formState = state

      return (
        <Form state={state} onChange={setState}>
          <Field fieldName="price" type={NumberInput} />
        </Form>
      )
    }

    render(<TestForm />)
    const input = screen.getByTestId('number-input')

    await act(async () => {
      fireEvent.change(input, {target: {value: ''}})
      jest.advanceTimersByTime(0)
    })

    expect(formState.price).toBe(null)
  })

  test('should format value on blur', async () => {
    render(
      <Form state={{price: 0}}>
        <Field fieldName="price" type={NumberInput} />
      </Form>,
    )

    const input = screen.getByTestId('number-input')

    await act(async () => {
      fireEvent.change(input, {target: {value: '1500,5'}})
      jest.advanceTimersByTime(0)
    })

    await act(async () => {
      fireEvent.blur(input)
      jest.advanceTimersByTime(0)
    })

    expect(input).toHaveValue('1.500,5')
  })

  test('should call onBlur callback with numeric value', async () => {
    const onBlurMock = jest.fn()

    render(
      <Form state={{price: 0}}>
        <Field fieldName="price" type={NumberInput} onBlur={onBlurMock} />
      </Form>,
    )

    const input = screen.getByTestId('number-input')

    await act(async () => {
      fireEvent.change(input, {target: {value: '1.234,56'}})
      jest.advanceTimersByTime(0)
    })

    await act(async () => {
      fireEvent.blur(input)
      jest.advanceTimersByTime(0)
    })

    expect(onBlurMock).toHaveBeenCalledWith(1234.56)
  })

  test('should update display when value changes externally', async () => {
    function TestForm() {
      const [state, setState] = useState({price: 100})

      return (
        <div>
          <Form state={state} onChange={setState}>
            <Field fieldName="price" type={NumberInput} />
          </Form>
          <button
            type="button"
            onClick={() => setState({price: 2500.75})}
            data-testid="external-update"
          >
            Update Price
          </button>
        </div>
      )
    }

    render(<TestForm />)
    const input = screen.getByTestId('number-input')
    const button = screen.getByTestId('external-update')

    expect(input).toHaveValue('100')

    await act(async () => {
      fireEvent.click(button)
      jest.advanceTimersByTime(0)
    })

    expect(input).toHaveValue('2.500,75')
  })

  test('should handle decimal-only input', async () => {
    let formState = {price: 0}

    function TestForm() {
      const [state, setState] = useState(formState)
      formState = state

      return (
        <Form state={state} onChange={setState}>
          <Field fieldName="price" type={NumberInput} />
        </Form>
      )
    }

    render(<TestForm />)
    const input = screen.getByTestId('number-input')

    await act(async () => {
      fireEvent.change(input, {target: {value: ',75'}})
      jest.advanceTimersByTime(0)
    })

    expect(formState.price).toBe(0.75)
  })
})
