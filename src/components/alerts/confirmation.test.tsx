import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Confirmation from './Confirmation'

describe('Confirmation component', () => {
  it('renders with title and message', () => {
    render(
      <Confirmation
        title="Delete Item"
        message="Are you sure you want to delete this?"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    )

    expect(screen.getByText('Delete Item')).toBeInTheDocument()
    expect(screen.getByText('Are you sure you want to delete this?')).toBeInTheDocument()
  })

  it('renders default button labels', () => {
    render(
      <Confirmation
        title="Confirm"
        message="Confirm action?"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  it('renders custom button labels', () => {
    render(
      <Confirmation
        title="Custom Labels"
        message="Choose an option"
        onConfirm={() => {}}
        onCancel={() => {}}
        confirmLabel="Yes"
        cancelLabel="No"
      />
    )

    expect(screen.getByText('Yes')).toBeInTheDocument()
    expect(screen.getByText('No')).toBeInTheDocument()
  })

  it('calls onConfirm when confirm button is clicked', () => {
    const handleConfirm = vi.fn()
    render(
      <Confirmation
        title="Confirm"
        message="Confirm action?"
        onConfirm={handleConfirm}
        onCancel={() => {}}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }))
    expect(handleConfirm).toHaveBeenCalledTimes(1)
  })

  it('calls onCancel when cancel button is clicked', () => {
    const handleCancel = vi.fn()
    render(
      <Confirmation
        title="Confirm"
        message="Confirm action?"
        onConfirm={() => {}}
        onCancel={handleCancel}
      />
    )

     fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(handleCancel).toHaveBeenCalledTimes(1)
  })
})
