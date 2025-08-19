import TaskItem from './TaskItem'
import './TaskList.css'

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <h2>Your Tasks</h2>
        <div className="empty-state">
          <p>No tasks yet. Add one above to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="task-list">
      <h2>Your Tasks ({tasks.length})</h2>
      <div className="tasks">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  )
}

export default TaskList

