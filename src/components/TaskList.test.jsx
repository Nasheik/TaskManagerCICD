import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TaskList from './TaskList'

describe('TaskList Component', () => {
  const mockOnToggleTask = vi.fn()
  const mockOnDeleteTask = vi.fn()

  const mockTasks = [
    { id: 1, title: 'Task 1', completed: false, priority: 'high' },
    { id: 2, title: 'Task 2', completed: true, priority: 'medium' },
    { id: 3, title: 'Task 3', completed: false, priority: 'low' }
  ]

  beforeEach(() => {
    mockOnToggleTask.mockClear()
    mockOnDeleteTask.mockClear()
  })

  it('renders task list with correct count', () => {
    render(
      <TaskList 
        tasks={mockTasks} 
        onToggleTask={mockOnToggleTask} 
        onDeleteTask={mockOnDeleteTask} 
      />
    )
    
    expect(screen.getByText('Your Tasks (3)')).toBeInTheDocument()
    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
    expect(screen.getByText('Task 3')).toBeInTheDocument()
  })

  it('renders empty state when no tasks', () => {
    render(
      <TaskList 
        tasks={[]} 
        onToggleTask={mockOnToggleTask} 
        onDeleteTask={mockOnDeleteTask} 
      />
    )
    
    expect(screen.getByText('Your Tasks')).toBeInTheDocument()
    expect(screen.getByText('No tasks yet. Add one above to get started!')).toBeInTheDocument()
  })

  it('renders all tasks with correct props', () => {
    render(
      <TaskList 
        tasks={mockTasks} 
        onToggleTask={mockOnToggleTask} 
        onDeleteTask={mockOnDeleteTask} 
      />
    )
    
    // Check that all tasks are rendered
    mockTasks.forEach(task => {
      expect(screen.getByText(task.title)).toBeInTheDocument()
      expect(screen.getByText(task.priority)).toBeInTheDocument()
    })
    
    // Check that correct number of checkboxes and delete buttons are rendered
    expect(screen.getAllByRole('checkbox')).toHaveLength(3)
    expect(screen.getAllByLabelText('Delete task')).toHaveLength(3)
  })

  it('passes correct props to TaskItem components', () => {
    render(
      <TaskList 
        tasks={mockTasks} 
        onToggleTask={mockOnToggleTask} 
        onDeleteTask={mockOnDeleteTask} 
      />
    )
    
    // Check that completed task has correct styling
    const completedTaskCheckbox = screen.getAllByRole('checkbox')[1] // Task 2 is completed
    expect(completedTaskCheckbox).toBeChecked()
  })
})

