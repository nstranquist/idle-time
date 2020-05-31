import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'
import { Play, Pause, Square, Plus, PlusCircle, Clock, Check, X } from 'react-feather'
import { bulmaColors } from '../../styles/bulma.colors'
import { Timeline } from '../Timeline'
import { TimeBlock } from './TimeBlock'
import { ErrorText } from '../ErrorText'
import { ClockModal } from '../ClockModal'
import { boxShadows } from '../../styles/shadows.style'


const pageOptions = {
  sidebarWidth: "20%",
  timelineWidth: "120px",
  topbarHeight: "85px", // includes padding
  bottombarHeight: "56px", // includes 8px top/bot padding
  toolbarHeight: "40px",
}

const startingTasks = [
  {
    id: 'a', 
    title: "Card Title",
    note: "Card Note",
    date: new Date(),
    duration: "3:15", // 3 hours 15 minutes
  },
  {
    id: 'b',
    title: "Card Title",
    desc: "Card Description"
  },
  {
    id: 'c',
    title: "Card Title",
    desc: "Card Description"
  },
  {
    id: 'd',
    title: "Card Title",
    desc: "Card Description"
  },
  {
    id: 'e',
    title: "Card Title",
    desc: "Card Description"
  },
]

const emptyNewTask = {
  title: "",
  desc: "",
  startTime: moment(new Date()).format('YYYY-MM-DD')
}

export const Timeblocking = ({
  // tasks,
}) => {
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [tasks, setTasks] = useState(startingTasks)
  const [newTask, setNewTask] = useState(undefined)
  const [formErrors, setFormErrors] = useState(null)

  const [timer, setTimer] = useState(undefined)

  const [activeTask, setActiveTask] = useState(undefined)

  // const [clockClicked, setClockClicked] = useState(false)
  const [activeClockId, setActiveClockId] = useState(undefined)

  const handleAddToggle = () => {
    setNewTask(emptyNewTask)
    setIsAdding(true)
  }

  const handleClockClick = () => {
    // toggle clock
  }
  const handleClockSubmit = (e) => {
    // handle clock submit
    e.preventDefault()
  }

  const handleKeyDown = (e) => {
    e = e || window.event; 
    const charCode = e.charCode || e.keyCode, 
      character = String.fromCharCode(charCode);

    if(e.keyCode === 13)
      handleAddSubmit();
    else
      setNewTask({ ...newTask, title: newTask.title + character })
  }

  const handleAddSubmit = () => { // submits new task

    if(!newTask)
      setFormErrors("Task is not defined")
    else if(newTask.title.length < 1)
      setFormErrors("Task title is required")
    // else if()
    // else if()
    else {
      console.log('new task:', newTask, 'id:', tasks.length.toString())
      // add task
      setTasks([
        ...tasks,
        {
          ...newTask,
          id: tasks.length.toString()
        }
      ])
      setIsAdding(false)
      setNewTask(undefined)
    }
  }

  const handleAddCancel = () => {
    setFormErrors(null)
    setIsAdding(false)
    setNewTask(undefined)
  }

  const startTimer = () => {
    setTimer(0)
  }

  const formatTime = (time) => {


    return time;
  }

  const onInputClick = (taskData, fieldName) => {
    if(isEditing && taskData) {
      // submit existing form, switch active editing id
      onSave(activeTask)
      setActiveTask({
        ...taskData,
        activeField: fieldName
      })
    }
    else {
      setIsEditing(true)
      setActiveTask({
        ...taskData,
        activeField: fieldName
      })
    }
  }

  const onSave = (taskData) => {
    // save data in the state
    if(taskData) {
      setTasks(
        tasks.map(task => {
          if(task.id === taskData.id)
            task = taskData;
          return task;
        })
      )
      setIsEditing(false)
      setActiveTask(undefined)
    }
    else
      console.log('task was not found')
  }

  return (
    <StyledTimeblocking className="idle-time-page">

      {/* Content-Left */}
      <div className="section-left">

        {/* Timeline */}
        <div className="timeline">
          <Timeline />
        </div>
      </div>

      {/* Content-Right */}
      <div className="section-right">

        {/* Toolbar */}
        <div className="toolbar bar">
          <div className="bar-left">
            {timer && (
              <span className="timer-text">
                {formatTime(timer)}
              </span>
            )}
            <span className="icon toolbar-icon play-icon"
              onClick={startTimer}>
              <Play size={24} />
            </span>
            <span className="icon toolbar-icon disabled">
              <Pause size={24} />
            </span>
            <span className="icon toolbar-icon disabled">
              <Square size={24} />
            </span>
          </div>
          <div className="bar-right">
            <span className="icon toolbar-icon">
              <Plus size={24} />
            </span>
            <span className="icon toolbar-icon">
              <Clock size={24} />
            </span>
          </div>
        </div>

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
            />
          ))}

          {formErrors && <ErrorText message={formErrors} />}
          {isAdding && (
            <div className="add-task-card task-card">
              <div className="task-left">
                <span style={{position: "relative"}} className="icon" onClick={() => handleClockClick("form")}>
                  <Clock size={24} />
                  {activeClockId && activeClockId==="form" && (
                    <ClockModal onSubmit={handleClockSubmit} />
                  )}
                </span>
              </div>
              <div className="task-body">
                <h3 className="task-card-title is-size-4"
                  contentEditable
                  style={{background:"#fff",paddingLeft:8,paddingRight:8,paddingTop:3,paddingBottom:3, border:"1px solid rgba(0,0,0,.12)",borderRadius:1,minHeight:40}}
                  // onInput={(e) => {
                  //   console.log('value:', e.currentTarget.textContent)
                  //   if(isEditing)
                  //     setNewTask({ ...newTask, title: e.currentTarget.textContent })
                  // }}
                  // autoFocus
                  onKeyDown={handleKeyDown}
                >
                  {/* <input type="text" className="is-size-4" style={{display:'inline-block',width:'100%',border:0,outline:0,opacity:.88}}/> */}
                </h3>
                <p className="task-card-note has-gray-text is-size-6"
                  contentEditable
                  style={{background:"#fff",paddingLeft:8,paddingRight:8,paddingTop:3,paddingBottom:3, border:"1px solid rgba(0,0,0,.12)",borderRadius:1,minHeight:32}}
                  onInput={(e) => setNewTask({ ...newTask, note: e.currentTarget.textContent })}
                >
                  
                </p>
              </div>
              <div className="task-right"></div>
              
            </div>
          )}
        </div>

        {/* Add Task / Submit Task Button */}
        {!isAdding ? (
          <div className="add-button-container">
            <button className="button add-task-button is-primary is-regular"
              onClick={handleAddToggle}>
              <span className="icon is-large">
                <PlusCircle size={24} />
              </span>
              <span style={{fontSize:20,fontWeight:800,marginLeft:6}}>Add</span>
            </button>
          </div>
        ) : (
          <div className="submit-button-container">
            <button className="button submit-task-button is-regular" style={{marginRight:16}}
              onClick={handleAddCancel}>
              <span className="icon is-large">
                <X size={24} />
              </span>
              <span style={{fontSize:20,fontWeight:800,marginLeft:6}}>Cancel</span>
            </button>
            <button className="button submit-task-button is-success is-regular"
              onClick={handleAddSubmit}>
              <span className="icon is-large">
                <Check size={24} />
              </span>
              <span style={{fontSize:20,fontWeight:800,marginLeft:6}}>Submit</span>
            </button>
          </div>
        )}
      </div>
      {/* <BottomBar /> */}
    </StyledTimeblocking>
  )
}

const mapStateToProps = (state) => ({
  timer: state.timer
})

const StyledTaskCard = styled.div`
`
const StyledToolbar = styled.div`
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
    // height: 100%;
    padding-left: 20px;
    padding-right: 20px; // remove if using overflow side-scroll for kanban
    // overflow-y: auto;

    .toolbar {
      border: 1px solid rgba(0,0,0,.17);
      // margin-bottom: 12px;
      margin-bottom: 6px;
      padding: 6px 12px;
      height: ${pageOptions.toolbarHeight};

      .icon {
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;
        height: 36px;
        width: 36px;
        padding: 6px;
        background-color: #fff;
        color: initial;
        transition: background-color .2s ease-in-out;

        &:hover {
          background-color: rgba(0,0,0,.07);
          border-radius: 50%;
          transition: background-color .15s ease-in-out;
        }
      }
      .icon.play-icon {
        // transition: color .2s ease-in-out;

        // &:hover {
        //   color: ${bulmaColors.success};
        //   transition: color .05s ease-in-out;
        // }
      }
      .icon.disabled {
        cursor: initial;

        &:hover {
          transition: none;
          color: rgba(0,0,0,.88);
          background-color: #fff;
        }
      }
      .timer-text {

      }
    }
    .task-cards {
      // bottombar: 56px, toolbar: 40px + 12px margin, addButton: 40px + 12px margin, topbar: 85px, containerPadding: 16px
      // = 56px + 52px + 52px + 85px + 16px
      max-height: calc(100vh - 56px - 104px - 85px - 10px);
      padding-top: 6px;
      // border-top: 1px solid rgba(0,0,0,.12);
      overflow-y: auto;
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
        .task-right {

        }
        
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

/*  <div className="task-card" key={index}>
      <div className="task-left">
        <span style={{position: "relative"}} className="icon" onClick={(e) => handleClockClick(e, task.id)}>
          <Clock size={24} />
          {activeClockId && activeClockId === task.id && (
            <ClockModal onSubmit={handleClockSubmit} />
          )}
        </span>
      </div>
      <div className="task-body">
        <h3
          className="task-card-title is-size-4"
          id={task.id}
          contentEditable={!isEditing}
          onFocus={(e) => handleFocus(e, "title")}
          // onKeyDown={handleKeyDown}
          onBlur={(e) => handleBlur(e, "title")}
        >
          {task.title}
        </h3>
        {task.note && task.note.length > 0 && (
          <p
            className="task-card-note has-gray-text is-size-6"
            id={task.id}
            contentEditable={!isEditing}
            onFocus={(e) => handleFocus(e, "note")}
            // onKeyDown={handleKeyDown}
            onBlur={(e) => handleBlur(e, "note")}
          >
            {task.note}
          </p>
        )}
      </div>
      <div className="task-right">

      </div>
      
    </div> */