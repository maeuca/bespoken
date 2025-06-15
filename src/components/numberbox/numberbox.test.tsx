import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { NumberBox } from './NumberBox'

describe('NumberBox component', () => {
  it('renders with label and value', () => {
    render(<NumberBox value={42} label="Enter number" onChange={() => {}} />)

    const input = screen.getByLabelText('Enter number')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue(42)
  })

  it('calls onChange with number when input changes', () => {
    const handleChange = vi.fn()
    render(<NumberBox value={10} label="Qty" onChange={handleChange} />)

    const input = screen.getByLabelText('Qty')
    fireEvent.change(input, { target: { value: '25' } })

    expect(handleChange).toHaveBeenCalledWith(25)
  })

  it('renders correctly without a label', () => {
    render(<NumberBox value={99} onChange={() => {}} />)
    const input = screen.getByRole('spinbutton') // input[type="number"]
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue(99)
  })

  it('shows empty value when NaN or undefined passed', () => {
    const { rerender } = render(<NumberBox value={NaN} onChange={() => {}} />)
    let input = screen.getByRole('spinbutton')
    expect(input).toHaveValue(null) // empty string renders as null for number input

    rerender(<NumberBox value={undefined} onChange={() => {}} />)
    input = screen.getByRole('spinbutton')
    expect(input).toHaveValue(null)
  })
})
