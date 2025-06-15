import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Dialog from './Dialog'

describe('Dialog component', () => {
  const setup = (props = {}) => {
    const onConfirm = vi.fn()
    const onCancel = vi.fn()

    render(
      <Dialog
        title="Test Dialog"
        onConfirm={onConfirm}
        onCancel={onCancel}
        {...props}
      >
        <p>Dialog content goes here.</p>
      </Dialog>
    )

    return { onConfirm, onCancel }
  }

  it('renders title and children', () => {
    setup()

    expect(screen.getByText('Test Dialog')).toBeInTheDocument()
    expect(screen.getByText('Dialog content goes here.')).toBeInTheDocument()
  })

  it('renders default button labels', () => {
    setup()

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  it('renders custom button labels', () => {
    setup({ confirmLabel: 'Yes', cancelLabel: 'No' })

    expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
  })

  it('calls onConfirm when confirm button is clicked', () => {
    const { onConfirm } = setup()

    fireEvent.click(screen.getByRole('button', { name: 'Save' }))
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('calls onCancel when cancel button is clicked', () => {
    const { onCancel } = setup()

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('disables confirm button and shows "Saving..." when submitting', () => {
    setup({ submitting: true })

    const confirmButton = screen.getByRole('button', { name: 'Saving...' })
    expect(confirmButton).toBeDisabled()
  })
})
