import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer Component', () => {
  it('renders copyright text', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2024 DevOps Task Manager/)).toBeInTheDocument()
  })

  it('renders deployment information', () => {
    render(<Footer />)
    expect(screen.getByText('Deployed via Azure CI/CD Pipeline')).toBeInTheDocument()
  })

  it('has correct footer structure', () => {
    render(<Footer />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass('footer')
  })

  it('contains technology stack information', () => {
    render(<Footer />)
    expect(screen.getByText(/Built with Vite \+ React/)).toBeInTheDocument()
  })
})

