import React from 'react'

import NewTaskForm from '../NewTaskForm/newTaskForm'
import TaskList from '../TaskList/taskList'
import Footer from '../footer/footer'
import './todoApp.css'

export default class TodoApp extends React.Component {
  maxId = 100

  createTask = (text, min, sec) => {
    const date = new Date()
    this.maxId += 1
    const newItem = {
      description: text,
      filtered: false,
      completed: false,
      created: date,
      id: this.maxId,
      min: min,
      sec: sec,
    }
    return newItem
  }

  state = {
    todos: [],
  }

  deletingTask = (id) => {
    this.setState(({ todos }) => {
      const newTodos = todos.filter((el) => el.id !== id)

      return {
        todos: newTodos,
      }
    })
  }

  addingTask = (text, min, sec) => {
    this.setState(({ todos }) => {
      const newItem = this.createTask(text, min, sec)
      return {
        todos: [...todos, newItem],
      }
    })
  }

  completingTask = (id) => {
    this.setState(() => {
      const { todos } = this.state
      const idx = todos.findIndex((el) => el.id === id)
      const oldItem = todos[idx]
      const newItem = { ...oldItem, completed: !oldItem.completed }
      const newTodos = todos
      newTodos[idx] = newItem
      return {
        todos: newTodos,
      }
    })
  }

  clearingTaskList = () => {
    this.setState(({ todos }) => {
      const newTodos = todos.filter((el) => el.completed === false)
      return {
        todos: newTodos,
      }
    })
  }

  addFilterAll = () => {
    const newArr = this.state.todos.map((elem) => {
      const result = { ...elem, filtered: false }
      return result
    })

    this.setState(() => ({
      todos: newArr,
    }))
  }

  addFilterActive = () => {
    const newArr = this.state.todos.map((elem) => {
      let result
      if (elem.completed) {
        result = { ...elem, filtered: true }
      } else {
        result = { ...elem, filtered: false }
      }
      return result
    })

    this.setState(() => ({
      todos: newArr,
    }))
  }

  addFilterComplete = () => {
    const newArr = this.state.todos.map((elem) => {
      let result
      if (elem.completed) {
        result = { ...elem, filtered: false }
      } else {
        result = { ...elem, filtered: true }
      }
      return result
    })

    this.setState(() => ({
      todos: newArr,
    }))
  }

  editingTask = (id, newText) => {
    this.setState(({ todos }) => {
      const newTodos = todos.map((el) => {
        if (el.id === id) {
          return { ...el, description: newText }
        }
        return el
      })

      return {
        todos: newTodos,
      }
    })
  }

  render() {
    const itemsLeftCount = this.state.todos.filter((el) => el.completed === false).length
    return (
      <section className="todoapp">
        <NewTaskForm addingTask={this.addingTask} />

        <TaskList
          todos={this.state.todos}
          deletingTask={this.deletingTask}
          completingTask={this.completingTask}
          editingTask={this.editingTask}
        />

        <Footer
          itemsLeftCount={itemsLeftCount}
          clearingTaskList={this.clearingTaskList}
          addFilterAll={this.addFilterAll}
          addFilterActive={this.addFilterActive}
          addFilterComplete={this.addFilterComplete}
        />
      </section>
    )
  }
}
