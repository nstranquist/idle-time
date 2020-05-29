import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Play, Pause, Square, Plus, PlusCircle, Clock, Check, X } from 'react-feather'
import { bulmaColors } from '../../styles/bulma.colors'
import { Timeline } from '../Timeline'
import { ErrorText } from '../ErrorText'


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
    note: "Card Note"
  },
  {
    id: 'b',
    title: "Card Title",
    note: "Card Note"
  },
  {
    id: 'c',
    title: "Card Title",
    note: "Card Note"
  },
  {
    id: 'd',
    title: "Card Title",
    note: "Card Note"
  },
  {
    id: 'a',
    title: "Card Title",
    note: "Card Note"
  },
]

const emptyNewTask = {
  title: "",
  note: ""
}

export const Timeblocking = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [tasks, setTasks] = useState(startingTasks)
  const [newTask, setNewTask] = useState(undefined)
  const [formErrors, setFormErrors] = useState(null)

  const handleEdit = () => {
    setNewTask(emptyNewTask)
    setIsEditing(true)
  }

  const handleKeyDown = (e) => {
    e = e || window.event; 
    const charCode = e.charCode || e.keyCode, 
      character = String.fromCharCode(charCode);

    if(e.keyCode === 13)
      handleSubmit();
    else
      setNewTask({ ...newTask, title: newTask.title + character })
  }

  const handleSubmit = () => {

    if(!newTask)
      setFormErrors("Task is not defined")
    else if(newTask.title.length < 1)
      setFormErrors("Task title is required")
    // else if()
    // else if()
    else {
      setNewTask({
        ...newTask,
        id: tasks.length.toString()
      })
      // add task
      setTasks([
        ...tasks,
        newTask
      ])
      setIsEditing(false)
      setNewTask(undefined)
    }
  }

  const handleFocus = (e, name) => {
    let title = "", note = "";

    console.log("target id:", e.currentTarget.id, "text content:", e.currentTarget.textContent)
    // find item by id
    const activeItem = tasks.find(task => task.id === e.currentTarget.id)
    if(activeItem) {
      // setIsEditing(true)

      if(name === "title")
        title = e.currentTarget.textContent
      else if(name === "note")
        note = e.currentTarget.textContent

      setNewTask({ title, note })
    }
  }

  // Save textContent of contentEditable after it loses focus
  const handleBlur = (e, name) => {
    const text = e.currentTarget.textContent;
    const id = e.currentTarget.id;

    if(id && text) {
      console.log('searching for task with id', id)
      setTasks(
        tasks.map(task => {
          if(task.id === id)
            name === "title" ? task.title = text : task.note = text;
          return task;
        })
      )
    }
    else
      console.log('task with id:', id, 'was not found')
  }

  const handleClockClick = (e) => {
    // show clock timer
    console.log('clicked clock icon for task')
  }

  const handleCancel = () => {
    setFormErrors(null)
    setIsEditing(false)
    setNewTask(undefined)
  }

  // Utility function for dev testing only
  const printTasks = () => {
    console.log('Tasks:')
    console.log(tasks)
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
            <span className="icon">
              <Play size={24} />
            </span>
            <span className="icon disabled">
              <Pause size={24} />
            </span>
            <span className="icon disabled">
              <Square size={24} />
            </span>
          </div>
          <div className="bar-right">
            <span className="icon">
              <Plus size={24} />
            </span>
            <span className="icon">
              <Clock size={24} />
            </span>
          </div>
        </div>

        {/* Task Cards */}
        <div className="task-cards">
          {tasks.length > 0 && tasks.map(task => (
            <div className="task-card" key={task.id}>
              <div className="task-left">
                <span className="icon"
                  onClick={handleClockClick}>
                  <Clock size={24} />
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
              
            </div>
          ))}

          {formErrors && <ErrorText message={formErrors} />}
          {isEditing && (
            <div className="add-task-card task-card">
              <div className="task-left">
                <span className="icon">
                  <Clock size={24} />
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
                  {/* <input type="text" style={{display:'inline-block',width:'100%'}}/> */}
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
        {!isEditing ? (
          <div className="add-button-container">
            <button className="button add-task-button is-primary is-regular"
              onClick={handleEdit}>
              <span className="icon is-large">
                <PlusCircle size={24} />
              </span>
              <span style={{fontSize:20,fontWeight:800,marginLeft:6}}>Add</span>
            </button>
          </div>
        ) : (
          <div className="submit-button-container">
            <button className="button submit-task-button is-regular" style={{marginRight:16}}
              onClick={handleCancel}>
              <span className="icon is-large">
                <X size={24} />
              </span>
              <span style={{fontSize:20,fontWeight:800,marginLeft:6}}>Cancel</span>
            </button>
            <button className="button submit-task-button is-success is-regular"
              onClick={handleSubmit}>
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
        // border-radius: 50%;
        height: 36px;
        width: 36px;
        padding: 6px;
        background-color: #fff;
        transition: background-color .2s ease-in-out;

        &:hover {
          background-color: rgba(0,0,0,.07);
          transition: background-color .15s ease-in-out;
        }
      }
      .icon.play-icon {
        &:hover {
          color: ${bulmaColors.success};
          transition: color .2s ease-in-out;
        }
      }
      .icon.disabled {
        cursor: initial;

        &:hover { transition: none; color: rgba(0,0,0,.88); background-color: #fff; }
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
      }
    }
    .add-button-container {
      border-top: 1px solid rgba(0,0,0,.1);
    }
  }
`