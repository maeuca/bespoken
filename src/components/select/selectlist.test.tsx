import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SelectList } from './SelectList'

describe('SelectList component', () => {
  const items = [
    { id: 1, name: 'Option A' },
    { id: 2, name: 'Option B' },
    { id: 3, name: 'Option C' }
  ]

  it('renders label and all options', () => {
    render(
      <SelectList
        label="Choose one"
        items={items}
        selectedItem={2}
        onSelect={() => {}}
      />
    )

    expect(screen.getByText('Choose one')).toBeInTheDocument()

    items.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })

    expect(screen.getByRole('combobox')).toHaveValue('2')
  })

  it('calls onSelect with correct value on change', () => {
    const onSelect = vi.fn()

    render(
      <SelectList
        label="Pick item"
        items={items}
        selectedItem={1}
        onSelect={onSelect}
      />
    )

    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: '3' } })

    expect(onSelect).toHaveBeenCalledWith(3)
  })

  it('handles undefined as selected item', () => {
    render(
      <SelectList
        label="Select something"
        items={items}
        selectedItem={undefined}
        onSelect={() => {}}
      />
    )

    const select = screen.getByRole('combobox')
    expect(select).toHaveValue('') // empty string for undefined value
  })
})
