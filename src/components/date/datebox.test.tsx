import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DateBox } from './DateBox'

describe('DateBox component', () => {
  it('renders with a label and date input', () => {
    render(
      <DateBox value="2025-06-15" label="Select Date" onChange={() => {}} />
    )

    expect(screen.getByLabelText('Select Date')).toBeInTheDocument()
    expect(screen.getByLabelText('Select Date')).toHaveValue('2025-06-15')
  })

  it('calls onChange with new date value', () => {
    const handleChange = vi.fn()

    render(
      <DateBox value="2025-06-15" label="Pick a date" onChange={handleChange} />
    )

    const input = screen.getByLabelText('Pick a date')
    fireEvent.change(input, { target: { value: '2025-07-01' } })

    expect(handleChange).toHaveBeenCalledWith('2025-07-01')
  })
    it('handles empty date value', () => {
        const handleChange = vi.fn()
    
        render(<DateBox value="" label="Select Date" onChange={handleChange} />)
    
        const input = screen.getByLabelText('Select Date')
        expect(input).toHaveValue('')
        
        fireEvent.change(input, { target: { value: '2025-08-01' } })
        expect(handleChange).toHaveBeenCalledWith('2025-08-01')
    })
})
