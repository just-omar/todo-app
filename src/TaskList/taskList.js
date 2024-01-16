import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task'
import './taskList.css'

export default class TaskList extends React.Component {
  static propTypes = {
    todos: PropTypes.array,
    deletingTask: PropTypes.func,
    completingTask: PropTypes.func,
    editingTask: PropTypes.func,
  }

  render() {
    const { todos, deletingTask, completingTask, editingTask } = this.props
    const elements = todos.map((item) => {
      const { id, ...itemsProps } = item
      return (
        <Task
          key={id}
          {...itemsProps}
          deletingTask={() => {
            deletingTask(id)
          }}
          completingTask={() => {
            completingTask(id)
          }}
          editingTask={() => {
            editingTask(id)
          }}
        />
      )
    })

    return <div className="todo-list main">{elements}</div>
  }
}
