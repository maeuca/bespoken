import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { Drawer, DrawerItem } from './Drawer'

const items: DrawerItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
]

describe('Drawer component', () => {
  it('renders the title', () => {
    render(
      <MemoryRouter>
        <Drawer items={items} title="Main Menu" />
      </MemoryRouter>
    )
    expect(screen.getByText('Main Menu')).toBeInTheDocument()
  })

  it('renders the default title if none is provided', () => {
    render(
      <MemoryRouter>
        <Drawer items={items} />
      </MemoryRouter>
    )
    expect(screen.getByText('Navigation')).toBeInTheDocument()
  })

  it('renders all drawer items with correct labels', () => {
    render(
      <MemoryRouter>
        <Drawer items={items} />
      </MemoryRouter>
    )

    items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    })
  })

  it('renders icons if provided', () => {
    const itemsWithIcons: DrawerItem[] = [
      { label: 'Dashboard', path: '/dashboard', icon: <span data-testid="icon" /> }
    ]

    render(
      <MemoryRouter>
        <Drawer items={itemsWithIcons} />
      </MemoryRouter>
    )

    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('applies the "active" class to the current route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Drawer items={items} />
      </MemoryRouter>
    )

    const aboutLink = screen.getByText('About').closest('a')
    expect(aboutLink).toHaveClass('active')
  })
})
