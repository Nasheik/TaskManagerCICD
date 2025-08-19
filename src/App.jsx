import { useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Set up CI/CD pipeline', completed: false, priority: 'high' },
    { id: 2, title: 'Write unit tests', completed: false, priority: 'medium' },
    { id: 3, title: 'Deploy to Azure', completed: false, priority: 'high' }
  ])

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      title: task.title,
      completed: false,
      priority: task.priority
    }
    setTasks([...tasks, newTask])
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const completedCount = tasks.filter(task => task.completed).length
  const totalCount = tasks.length

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="stats">
            <div className="stat-card">
              <h3>Total Tasks</h3>
              <span className="stat-number">{totalCount}</span>
            </div>
            <div className="stat-card">
              <h3>Completed</h3>
              <span className="stat-number">{completedCount}</span>
            </div>
            <div className="stat-card">
              <h3>Remaining</h3>
              <span className="stat-number">{totalCount - completedCount}</span>
            </div>
          </div>
          
          <TaskForm onAddTask={addTask} />
          <TaskList 
            tasks={tasks} 
            onToggleTask={toggleTask} 
            onDeleteTask={deleteTask} 
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App

