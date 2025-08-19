import './TaskItem.css'

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
        />
        <span className="task-title">{task.title}</span>
        <span className={`priority-badge priority-${task.priority}`}>
          {task.priority}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="delete-button"
        aria-label="Delete task"
      >
        ✕
      </button>
    </div>
  )
}

export default TaskItem

