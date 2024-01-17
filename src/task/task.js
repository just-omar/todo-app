import React from 'react'
import './task.css'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default class Task extends React.Component {
  static propTypes = {
    filtered: PropTypes.bool,
    completingTask: PropTypes.func,
    completed: PropTypes.bool,
    description: PropTypes.string,
    deletingTask: PropTypes.func,
    editingTask: PropTypes.func,
    min: PropTypes.number,
    sec: PropTypes.number,
  }

  static defaultProps = {
    description: 'text',
    filtered: false,
    completed: false,
    created: new Date(),
    id: 1,
  }

  state = {
    min: this.props.min,
    sec: this.props.sec,
    timer: null,
    formattedTime: '00:00:00',
    isEditing: false,
    inputValue: this.props.description,
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  startTimer = () => {
    if (!this.state.timer) {
      let totalSeconds = this.state.min * 60 + this.state.sec
      if (totalSeconds <= 0) {
        this.pauseTimer()
        return
      }
      const newTimer = setInterval(() => {
        console.log(this.state.min, this.state.sec)

        if (this.state.min * 60 + this.state.sec <= 0) {
          this.pauseTimer()
          return
        }
        if (this.state.sec >= 1) {
          this.setState(() => {
            return {
              sec: this.state.sec - 1,
            }
          })
        } else {
          this.setState(() => {
            return {
              min: this.state.min - 1,
              sec: this.state.sec + 59,
            }
          })
        }
      }, 1000)
      this.setState({ timer: newTimer })
    }
  }

  pauseTimer = () => {
    if (this.state.timer) {
      clearInterval(this.state.timer)
      this.setState({ timer: null })
    }
  }

  pad = (val) => {
    let valString = val + ''
    if (valString.length < 2) {
      return '0' + valString
    } else {
      return valString
    }
  }
  handleDescriptionChange = (event) => {
    const { value } = event.target
    this.setState({ inputValue: value })
  }

  handleDescriptionBlur = () => {
    const { inputValue } = this.state
    const { id, editingTask } = this.props
    editingTask(id, inputValue)
    this.setState({ isEditing: false })
  }

  handleEditClick = () => {
    console.log('eeddditt')
    this.setState({ isEditing: true })
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const { inputValue } = this.state
      const { id, editingTask } = this.props
      editingTask(id, inputValue)
      this.setState({ isEditing: false })
    }
  }

  render() {
    const { completingTask, completed, filtered } = this.props
    const checked = completed
    let classNamesTask = 'task'

    if (completed) {
      classNamesTask += ' completed'
    }

    if (filtered) {
      classNamesTask += ' filtered'
    }

    const { created, deletingTask } = this.props
    const { isEditing } = this.state

    return (
      <div className={classNamesTask}>
        <input className="toggle" type="checkbox" onChange={completingTask} checked={checked} />
        <label>
          {isEditing ? (
            <input
              type="text"
              autoFocus
              value={this.state.inputValue}
              onBlur={this.handleDescriptionBlur}
              onKeyPress={this.handleKeyPress}
              onChange={this.handleDescriptionChange}
            />
          ) : (
            <span className="description" onClick={completingTask}>
              {this.state.inputValue}
            </span>
          )}
          <div className="timer">
            <p id="timer">{`${this.pad(this.state.min)}:${this.pad(this.state.sec)}`}</p>
            <button id="startBtn" className="icon-timer icon-start" onClick={() => this.startTimer()} />
            <button id="pauseBtn" className="icon-timer icon-pause" onClick={() => this.pauseTimer()} />
          </div>
          <span className="created">{formatDistanceToNow(created)} ago</span>
        </label>
        <button className="icon icon-edit" onClick={this.handleEditClick}></button>
        <button className="icon icon-destroy" onClick={deletingTask}></button>
        {/* <input type="text" className="edit" onClick={this.handleEditClick} /> */}
      </div>
    )
  }
}
