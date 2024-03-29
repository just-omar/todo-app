import React from 'react'
import './newTaskForm.css'
import PropTypes from 'prop-types'

const NewTaskForm = ({ addingTask }) => (
  <div>
    <h1 className="taskForm-title">todos</h1>
    <form
      onSubmit={(e) => {
        e.preventDefault()
        let min = Number(e.target[2].value)
        let sec = Number(e.target[3].value)
        while (sec > 60) {
          min += 1
          sec -= 60
        }
        addingTask(e.target[1].value, min, sec)
        e.target[1].value = ''
        e.target[2].value = ''
        e.target[3].value = ''
      }}
    >
      <input type="submit" hidden></input>
      <input className="new-todo" required placeholder="What needs to be done?" autoFocus></input>
      <input type={'number'} className="new-todo-form__timer" placeholder="Min"></input>
      <input type={'number'} className="new-todo-form__timer" placeholder="Sec"></input>
    </form>
  </div>
)

NewTaskForm.propTypes = {
  addingTask: PropTypes.func,
}

export default NewTaskForm
