import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'
import { bulmaColors } from '../../styles/bulma.colors'
import { Toolbar } from './Toolbar'
import { Timeline } from '../Timeline'
import { TimeBlock } from './TimeBlock'
import { ErrorText } from '../ErrorText'
import { boxShadows } from '../../styles/shadows.style'
import { pageOptions } from '../../styles/pageOptions'
import { addTask, updateTask, removeTask } from '../../store/Tasks'
import { AddButton, SubmitButton, CancelButton } from '../Buttons'
import { NewBlock } from '../Blocks'
import { Timer } from './Timer'


const emptyNewTask = {
  title: "",
  desc: "",
  startTime: moment(new Date()).format('YYYY-MM-DD')
}

const Timeblocking = ({
  timerState,
  tasks: {
    tasks,
    tasksLoading: loading,
    tasksErrors: errors
  },
  addTask,
  updateTask,
  removeTask
}) => {

  const timer = new Timer();

  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  // const [tasks, setTasks] = useState(startingTasks)
  const [formErrors, setFormErrors] = useState(null)
  const [activeTask, setActiveTask] = useState(undefined)

  
  const handleAddToggle = () => {
    // clean up previous editing state
    if(isEditing) {
      onSave(activeTask)
      setIsEditing(false)
    }
    setActiveTask(undefined)
    
    // then toggle the adding block
    setIsAdding(true)
  }

  const handleAddSubmit = (newTaskData) => { // submits new task
    console.log('new task:', newTaskData)
    if(!newTaskData)
      setFormErrors("Task is not defined")
    else if(newTaskData.title.length < 1)
      setFormErrors("Task title is required")
    else {
      console.log('new task:', newTaskData, 'id:', tasks.length.toString())
      // add task
      addTask({
        ...newTaskData,
        id: tasks.length.toString()
      })
      setIsAdding(false)
    }
  }

  const handleAddCancel = () => {
    setFormErrors(null)
    setIsAdding(false)
  }

  const startTimer = () => {
    // adjust time blocks when this gets clicked
    timer.startTimer();
  }
  
  const pauseTimer = () => timer.pauseTimer()

  const resumeTimer = () => timer.resumeTimer()

  const stopTimer = () => timer.stopTimer()

  const onInputClick = (taskData, fieldName) => {
    if(isEditing && taskData)
      // submit existing form, switch active editing id
      onSave(activeTask)
    else
      setIsEditing(true)

    setActiveTask({
      ...taskData,
      activeField: fieldName
    })
  }

  const onSave = (taskData = undefined, finished = true) => {
    console.log('called onSave')
    // save data in the state
    if(taskData)
      updateTask(taskData)

    if(finished) {
      setIsEditing(false)
      setActiveTask(undefined)
    }
  }

  const onCancel = () => {
    setIsEditing(false)
    setActiveTask(undefined)
  }

  return (
    <StyledTimeblocking className="idle-time-page">

      {/* Content-Left */}
      <div className="section-left">

        {/* Timeline */}
        <div className="timeline">
          <Timeline
            timer={timer}
          />
        </div>
      </div>

      {/* Content-Right */}
      <div className="section-right">

        {/* Toolbar */}
        <Toolbar
          height={pageOptions.toolbarHeight}
          time={timer.getTime()}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          stopTimer={stopTimer}
        />

        {/* Task Cards */}
        <div className="task-cards">
          {tasks.length > 0 && tasks.map((task, index) => (
            <TimeBlock
              key={index}
              taskData={task}
              activeField={activeTask ? activeTask.activeField : undefined}
              isEditing={activeTask && task.id === activeTask.id}
              onInputClick={onInputClick}
              onSave={onSave}
              onCancel={onCancel}
            />
          ))}

          {formErrors && <ErrorText message={formErrors} />}
          {isAdding && (
            <NewBlock
              onSubmit={handleAddSubmit}
              onCancel={handleAddCancel}
            />
          )}
        </div>

        {/* Add Task / Submit Task Button */}
        {!isAdding ? (
          <div className="add-button-container">
            <AddButton handleClick={handleAddToggle} />
          </div>
        ) : (
          <div className="submit-button-container">
            <CancelButton handleClick={handleAddCancel} />
            <SubmitButton handleClick={handleAddSubmit} />
          </div>
        )}
      </div>
      {/* <BottomBar /> */}
    </StyledTimeblocking>
  )
}

const mapStateToProps = (state) => ({
  timerState: state.timer,
  tasks: state.tasks,
})

export const ConnectedTimeblocking = connect(
  mapStateToProps,
  { addTask, updateTask, removeTask, }
)(Timeblocking)

const StyledTaskCard = styled.div`
`

const StyledTimeblocking = styled.div`
  position: relative;
  height: calc(100vh - 85px - 16px);

  .section-left {
    width: ${pageOptions.timelineWidth};
    // height: 100%;
    float: left;
    border-right: 1px solid rgba(0,0,0,.09);
  }
  .section-right {
    margin-left: ${pageOptions.timelineWidth};
    dislay: flex;
    flex-direction: column;
    height: 100%;
    padding-left: 20px;
    padding-right: 20px; // remove if using overflow side-scroll for kanban
    overflow-y: auto;

    
    .task-cards {
      // bottombar: 56px, toolbar: 40px + 12px margin, addButton: 40px + 12px margin, topbar: 85px, containerPadding: 16px
      // = 56px + 52px + 52px + 85px + 16px
      // max-height: calc(100vh - 56px - 104px - 85px - 10px);
      padding-top: 6px;
      // border-top: 1px solid rgba(0,0,0,.12);
      // overflow-y: auto;
      padding-right: 8px;

      .task-card {
        padding: 12px 20px; // NOTE: adjust the padding to make responsive
        background: ${bulmaColors.light};
        border: 1px solid rgba(0,0,0,.15);
        border-radius: 8px;
        margin-bottom: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // box-shadow: ${boxShadows.shadow};

        h3 {
          margin-bottom: 0;
        }
        p {
          margin-top: .6666em;
        }

        .task-left {
          padding-right: 8px;

          .icon {
            cursor: pointer;
            padding: 16px;
            border-radius: 50%;
            height: 44px;
            width: 44px;
            padding: 6px;
            transition: background-color .2s ease-in-out;

            &:hover {
              background-color: rgba(0,0,0,.07);
              border-radius: 50%;
              transition: background-color .15s ease-in-out;
            }
          }
        }
        .task-body {
          flex: 1;

          .task-card-title {
            font-size: 26px;
            line-height: 32px;
            font-weight: 500;
            color: #000;
          }
          .task-card-note {
            font-size: 20px;
            line-height: 24px;
            color: #000;
            font-weight: normal;
          }
        }
        .task-right {  }
      }
    }
    .add-button-container,
    .submit-button-container {
      padding-top: 6px;
      margin-bottom: 6px;
      text-align: center;

      .add-task-button,
      .submit-task-button {
        // border-radius: 0;
        font-family: montserrat, sans-serif;
        font-style: normal;
        box-shadow: ${boxShadows.shadow2};
      }
    }
    .add-button-container {
      // border-top: 1px solid rgba(0,0,0,.1);
    }
  }
`
