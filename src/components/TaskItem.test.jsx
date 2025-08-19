import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskItem from './TaskItem'

describe('TaskItem Component', () => {
  const mockOnToggle = vi.fn()
  const mockOnDelete = vi.fn()

  const mockTask = {
    id: 1,
    title: 'Test task',
    completed: false,
    priority: 'high'
  }

  beforeEach(() => {
    mockOnToggle.mockClear()
    mockOnDelete.mockClear()
  })

  it('renders task information correctly', () => {
    render(
      <TaskItem 
        task={mockTask} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    )
    
    expect(screen.getByText('Test task')).toBeInTheDocument()
    expect(screen.getByText('high')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('renders completed task with correct styling', () => {
    const completedTask = { ...mockTask, completed: true }
    render(
      <TaskItem 
        task={completedTask} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    )
    
    const taskItem = screen.getByText('Test task').closest('.task-item')
    expect(taskItem).toHaveClass('completed')
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls onToggle when checkbox is clicked', async () => {
    const user = userEvent.setup()
    render(
      <TaskItem 
        task={mockTask} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    )
    
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    
    expect(mockOnToggle).toHaveBeenCalledWith(1)
  })

  it('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <TaskItem 
        task={mockTask} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    )
    
    const deleteButton = screen.getByLabelText('Delete task')
    await user.click(deleteButton)
    
    expect(mockOnDelete).toHaveBeenCalledWith(1)
  })

  it('displays correct priority badge styling', () => {
    const { rerender } = render(
      <TaskItem 
        task={{ ...mockTask, priority: 'high' }} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    )
    
    expect(screen.getByText('high')).toHaveClass('priority-high')
    
    rerender(
      <TaskItem 
        task={{ ...mockTask, priority: 'medium' }} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    )
    
    expect(screen.getByText('medium')).toHaveClass('priority-medium')
    
    rerender(
      <TaskItem 
        task={{ ...mockTask, priority: 'low' }} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    )
    
    expect(screen.getByText('low')).toHaveClass('priority-low')
  })
})

