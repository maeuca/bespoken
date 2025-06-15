import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TextBox } from './Textbox'

describe('TextBox component', () => {
  it('renders with label and value', () => {
    render(<TextBox value="Hello" label="Name" onChange={() => {}} />)

    // Checks label
    expect(screen.getByText('Name')).toBeInTheDocument()

    // Check input value by role
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('Hello')
  })

  it('calls onChange when user types', () => {
    const handleChange = vi.fn()
    render(<TextBox value="" label="Email" onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    expect(handleChange).toHaveBeenCalledWith('test@example.com')
  })

  it('renders without label when not provided', () => {
    render(<TextBox value="No label" onChange={() => {}} />)

    expect(screen.getByRole('textbox')).toHaveValue('No label')
    // Ensure no <label> exists
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument()
  })
})
