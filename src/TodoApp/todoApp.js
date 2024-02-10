import React, { useState } from 'react'

import NewTaskForm from '../NewTaskForm/newTaskForm'
import TaskList from '../TaskList/taskList'
import Footer from '../Footer/footer'
import './todoApp.css'

const TodoApp = () => {
  const [todos, setTodos] = useState([])
  let maxId = 100

  const createTask = (text, min, sec) => {
    const date = new Date()
    maxId += 1
    return {
      description: text,
      filtered: false,
      completed: false,
      created: date,
      id: maxId,
      min: min,
      sec: sec,
    }
  }

  const deletingTask = (id) => {
    setTodos((prevTodos) => prevTodos.filter((el) => el.id !== id))
  }

  const addingTask = (text, min, sec) => {
    const newItem = createTask(text, min, sec)
    setTodos((prevTodos) => [...prevTodos, newItem])
  }

  const completingTask = (id) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const clearingTaskList = () => {
    setTodos((prevTodos) => prevTodos.filter((el) => !el.completed))
  }

  const addFilterAll = () => {
    setTodos((prevTodos) => prevTodos.map((todo) => ({ ...todo, filtered: false })))
  }

  const addFilterActive = () => {
    setTodos((prevTodos) => prevTodos.map((todo) => ({ ...todo, filtered: todo.completed })))
  }

  const addFilterComplete = () => {
    setTodos((prevTodos) => prevTodos.map((todo) => ({ ...todo, filtered: !todo.completed })))
  }

  const editingTask = (id, newText) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, description: newText } : todo)))
  }

  const itemsLeftCount = todos.filter((el) => !el.completed).length

  return (
    <section className="todoapp">
      <NewTaskForm addingTask={addingTask} />
      <TaskList todos={todos} deletingTask={deletingTask} completingTask={completingTask} editingTask={editingTask} />
      <Footer
        itemsLeftCount={itemsLeftCount}
        clearingTaskList={clearingTaskList}
        addFilterAll={addFilterAll}
        addFilterActive={addFilterActive}
        addFilterComplete={addFilterComplete}
      />
    </section>
  )
}

export default TodoApp
