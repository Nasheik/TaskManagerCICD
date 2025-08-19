import { useState } from 'react'
import './TaskForm.css'

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onAddTask({ title: title.trim(), priority })
      setTitle('')
      setPriority('medium')
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="task-input"
          required
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button type="submit" className="add-button">
          Add Task
        </button>
      </div>
    </form>
  )
}

export default TaskForm

