import React, { useState, useEffect } from 'react'
import './task.css'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

const Task = ({
  id,
  filtered,
  completingTask,
  completed,
  description,
  deletingTask,
  editingTask,
  min,
  sec,
  created,
}) => {
  const [timer, setTimer] = useState(null)
  const [minState, setMin] = useState(min)
  const [secState, setSec] = useState(sec)
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(description)

  useEffect(() => {
    if (timer) {
      const interval = setInterval(() => {
        if (minState === 0 && secState === 0) {
          clearInterval(interval)
          setTimer(null)
        } else if (secState === 0) {
          setMin((prevMin) => prevMin - 1)
          setSec(59)
        } else {
          setSec((prevSec) => prevSec - 1)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [timer, minState, secState])

  const startTimer = () => {
    if (!timer && (minState > 0 || secState > 0)) {
      setTimer(true)
    }
  }

  const pauseTimer = () => {
    if (timer) {
      clearInterval(timer)
      setTimer(null)
    }
  }

  const pad = (val) => {
    let valString = val + ''
    if (valString.length < 2) {
      return '0' + valString
    } else {
      return valString
    }
  }

  const handleDescriptionChange = (event) => {
    const { value } = event.target
    setInputValue(value)
  }

  const handleDescriptionBlur = () => {
    editingTask(id, inputValue)
    setIsEditing(false)
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      editingTask(id, inputValue)
      setIsEditing(false)
    }
  }

  const checked = completed
  let classNamesTask = 'task'

  if (completed) {
    classNamesTask += ' completed'
  }

  if (filtered) {
    classNamesTask += ' filtered'
  }

  return (
    <div className={classNamesTask}>
      <input className="toggle" type="checkbox" onChange={completingTask} checked={checked} />
      <label>
        {isEditing ? (
          <input
            type="text"
            autoFocus
            value={inputValue}
            onBlur={handleDescriptionBlur}
            onKeyPress={handleKeyPress}
            onChange={handleDescriptionChange}
          />
        ) : (
          <span className="description" onClick={completingTask}>
            {inputValue}
          </span>
        )}
        <div className="timer">
          <p id="timer">{`${pad(minState)}:${pad(secState)}`}</p>
          <button id="startBtn" className="icon-timer icon-start" onClick={startTimer} />
          <button id="pauseBtn" className="icon-timer icon-pause" onClick={pauseTimer} />
        </div>
        <span className="created">{formatDistanceToNow(created)} ago</span>
      </label>
      <button className="icon icon-edit" onClick={handleEditClick}></button>
      <button className="icon icon-destroy" onClick={deletingTask}></button>
    </div>
  )
}

Task.propTypes = {
  completingTask: PropTypes.func,
  completed: PropTypes.bool,
  description: PropTypes.string,
  deletingTask: PropTypes.func,
  editingTask: PropTypes.func,
  min: PropTypes.number,
  sec: PropTypes.number,
  created: PropTypes.instanceOf(Date),
}

Task.defaultProps = {
  description: 'text',
  completed: false,
  created: new Date(),
  id: 1,
}

export default Task
