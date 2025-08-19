import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header Component', () => {
  it('renders the logo text', () => {
    render(<Header />)
    expect(screen.getByText('DevOps Task Manager')).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Header />)
    expect(screen.getByText('A CI/CD Pipeline Demo Application')).toBeInTheDocument()
  })

  it('has correct header structure', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('header')
  })
})

