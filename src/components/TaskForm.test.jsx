import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskForm from './TaskForm'

describe('TaskForm Component', () => {
  const mockOnAddTask = vi.fn()

  beforeEach(() => {
    mockOnAddTask.mockClear()
  })

  it('renders form elements correctly', () => {
    render(<TaskForm onAddTask={mockOnAddTask} />)
    
    expect(screen.getByText('Add New Task')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter task title...')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Medium Priority')).toBeInTheDocument()
    expect(screen.getByText('Add Task')).toBeInTheDocument()
  })

  it('calls onAddTask with correct data when form is submitted', async () => {
    const user = userEvent.setup()
    render(<TaskForm onAddTask={mockOnAddTask} />)
    
    const input = screen.getByPlaceholderText('Enter task title...')
    const select = screen.getByDisplayValue('Medium Priority')
    const button = screen.getByText('Add Task')
    
    await user.type(input, 'Test task')
    await user.selectOptions(select, 'high')
    await user.click(button)
    
    expect(mockOnAddTask).toHaveBeenCalledWith({
      title: 'Test task',
      priority: 'high'
    })
  })

  it('does not submit empty task', async () => {
    const user = userEvent.setup()
    render(<TaskForm onAddTask={mockOnAddTask} />)
    
    const button = screen.getByText('Add Task')
    await user.click(button)
    
    expect(mockOnAddTask).not.toHaveBeenCalled()
  })

  it('trims whitespace from task title', async () => {
    const user = userEvent.setup()
    render(<TaskForm onAddTask={mockOnAddTask} />)
    
    const input = screen.getByPlaceholderText('Enter task title...')
    const button = screen.getByText('Add Task')
    
    await user.type(input, '  Test task  ')
    await user.click(button)
    
    expect(mockOnAddTask).toHaveBeenCalledWith({
      title: 'Test task',
      priority: 'medium'
    })
  })

  it('resets form after successful submission', async () => {
    const user = userEvent.setup()
    render(<TaskForm onAddTask={mockOnAddTask} />)
    
    const input = screen.getByPlaceholderText('Enter task title...')
    const select = screen.getByDisplayValue('Medium Priority')
    const button = screen.getByText('Add Task')
    
    await user.type(input, 'Test task')
    await user.selectOptions(select, 'high')
    await user.click(button)
    
    expect(input.value).toBe('')
    expect(select.value).toBe('medium')
  })

  it('has all priority options available', () => {
    render(<TaskForm onAddTask={mockOnAddTask} />)
    
    expect(screen.getByText('Low Priority')).toBeInTheDocument()
    expect(screen.getByText('Medium Priority')).toBeInTheDocument()
    expect(screen.getByText('High Priority')).toBeInTheDocument()
  })
})

