import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App Component', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByText('DevOps Task Manager')).toBeInTheDocument()
    expect(screen.getByText('A CI/CD Pipeline Demo Application')).toBeInTheDocument()
  })

  it('displays initial task statistics correctly', () => {
    render(<App />)
    expect(screen.getByText('Your Tasks (3)')).toBeInTheDocument() // More specific assertion
    // Check for completed tasks count of 0
    const completedSection = screen.getByText('Completed').closest('.stat-card')
    expect(completedSection).toHaveTextContent('0')
  })

  it('displays initial tasks', () => {
    render(<App />)
    expect(screen.getByText('Set up CI/CD pipeline')).toBeInTheDocument()
    expect(screen.getByText('Write unit tests')).toBeInTheDocument()
    expect(screen.getByText('Deploy to Azure')).toBeInTheDocument()
  })

  it('adds a new task when form is submitted', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const input = screen.getByPlaceholderText('Enter task title...')
    const addButton = screen.getByText('Add Task')
    
    await user.type(input, 'New test task')
    await user.click(addButton)
    
    expect(screen.getByText('New test task')).toBeInTheDocument()
    expect(screen.getByText('Your Tasks (4)')).toBeInTheDocument() // More specific assertion
  })

  it('toggles task completion status', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const checkboxes = screen.getAllByRole('checkbox')
    const firstCheckbox = checkboxes[0]
    
    expect(firstCheckbox).not.toBeChecked()
    
    await user.click(firstCheckbox)
    
    expect(firstCheckbox).toBeChecked()
    // Check that completed count in stats increased
    const statCards = screen.getAllByText('1')
    expect(statCards.length).toBeGreaterThan(0) // Should find the completed count
  })

  it('deletes a task when delete button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const deleteButtons = screen.getAllByLabelText('Delete task')
    const initialTaskCount = screen.getByText('Your Tasks (3)')
    
    expect(initialTaskCount).toBeInTheDocument()
    
    await user.click(deleteButtons[0])
    
    expect(screen.getByText('Your Tasks (2)')).toBeInTheDocument()
  })

  it('clears input field after adding a task', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const input = screen.getByPlaceholderText('Enter task title...')
    const addButton = screen.getByText('Add Task')
    
    await user.type(input, 'Test task')
    expect(input.value).toBe('Test task')
    
    await user.click(addButton)
    
    expect(input.value).toBe('')
  })

  it('renders footer with correct text', () => {
    render(<App />)
    expect(screen.getByText(/© 2024 DevOps Task Manager/)).toBeInTheDocument()
    expect(screen.getByText('Deployed via Azure CI/CD Pipeline')).toBeInTheDocument()
  })
})

