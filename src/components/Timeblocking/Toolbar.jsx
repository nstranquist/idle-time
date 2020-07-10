import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Play, Pause, Square, Plus, Clock, Maximize2, Minimize2, Settings } from 'react-feather'
import { bulmaColors } from '../../styles/bulma.colors'


export const Toolbar = ({
  height,
  timer,
  startTimer,
  pauseTimer,
  stopTimer,
  handleAddTask,
  areTasksCollapsed,
  handleCollapse,
}) => {
  const [timeActive, setTimeActive] = useState(false)
  const [pauseActive, setPauseActive] = useState(false)
  const [time, setTime] = useState(timer.getTime())
  const [timerId, setTimerId] = useState(undefined)

  // const getFormattedTime = () => { return time; }

  const getTimeInterval = () => {
    const newTimerId = setInterval(() => {
      console.log('toolbar called interval')
      setTime(timer.getTime())
    }, 1000)

    setTimerId(newTimerId)
  }

  const addNewTask = () => {
    console.log('user wants to create a new task')
    // auto-create a new event, position it at index: 0 (top of list)
    const newTaskData = {
      title: "New Task",
      duration: 10, // set to the newTask default settings
      priority: 3,
      // need to set order to tasks.length
    }
    // default setting is 'isEditing={true}' with the title text highlighted and the description text 'undefined'

    // defaults to 5, 15, 30, or 60 minutes. Todo: Change this option in settings (clock settings or regular settings??)
    handleAddTask(newTaskData);
  }

  const handleStartTimer = () => {
    console.log('timer started')
    if(pauseActive) setPauseActive(false)
    setTimeActive(true)
    startTimer()
    getTimeInterval()
  }

  const handlePauseTimer = () => {
    clearInterval(timerId)
    setTimerId(undefined)

    pauseTimer()
    setPauseActive(true)
  }

  const handleStopTimer = () => {
    stopTimer()
    clearInterval(timerId)
    setTimerId(undefined)
    setTimeActive(false)
    setTime("00:00")
    if(pauseActive) setPauseActive(false)
  }

  const openSettings = () => {
    console.log('user wants to open settings')
    // local state or ???

    // ... I like the idea of a centered modal on the page... React portals??
  }

  const openClockSettings = () => {
    console.log('user wants to open clock settings')

    // This could be a nice, local dropdown type of modal
    
  }

  return (
    <ToolbarStyled className="toolbar bar" style={{height: height}}>
      <div className="bar-left">
        <span className={(!timeActive || pauseActive) ? "icon play-icon" : "icon play-icon disabled"} onClick={(!timeActive || pauseActive)
          ? () => handleStartTimer()
          : () => console.log('skipping start timer')
        }>
          <Play size={24} />
        </span>
        <span className={(timeActive && !pauseActive) ? "icon" : "icon disabled"} onClick={(timeActive || !pauseActive) ? () => {
          handlePauseTimer()
        } : () => null}>
          <Pause size={24} />
        </span>
        <span className={timeActive ? "icon" : "icon disabled"} onClick={timeActive ? () => {
          handleStopTimer()
        } : () => null}>
          <Square size={24} />
        </span>

        {timeActive && (
          <span className="icon timer-text" style={{marginLeft:18,fontFamily:'sans-serif',opacity:.8}}>
            {time}
          </span>
        )}
      </div>
      <div className="bar-right">
        <span className="icon toolbar-icon" onClick={addNewTask}>
          <Plus size={24} />
        </span>

        {areTasksCollapsed ? (
          <span className="icon toolbar-icon" onClick={handleCollapse}>
            <Maximize2 size={24} />
          </span>
        ) : (
          <span className="icon toolbar-icon" onClick={handleCollapse}>
            <Minimize2 size={24} />
          </span>
        )}
        
        <span className="icon toolbar-icon" onClick={openClockSettings}>
          <Clock size={24} />
        </span>
        <span className="icon toolbar-icon" onClick={openSettings}>
          <Settings size={24} />
        </span>
      </div>
    </ToolbarStyled>
  )
}

const mapStateToProps = (state) => ({
  timer: state.timer
})

export const ConnectedToolbar = connect(
  mapStateToProps,
  {  }
)(Toolbar)

const ToolbarStyled = styled.div`
  &.toolbar {
    border-bottom: 1px solid rgba(0,0,0,.17);
    // border: 1px solid rgba(0,0,0,.17);
    // margin-bottom: 12px;
    // margin-bottom: 6px;
    padding: 6px 12px;

    .icon {
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      height: 36px;
      width: 36px;
      padding: 4px;
      background-color: #fff;
      color: initial;
      opacity: .9;
      transition: background-color .2s ease-in-out;

      &:hover {
        background-color: rgba(0,0,0,.07);
        border-radius: 50%;
        transition: background-color .15s ease-in-out;
      }
    }
    .toolbar-icon {
      // padding-left: 8px;
      // padding-right: 8px;
      margin-left: 2px;
      margin-right: 2px;
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
      opacity: .6;

      &:hover {
        transition: none;
        color: initial;
        opacity: .6;
        background-color: #fff;
      }
    }
    .timer-text {
      padding-left: 5px;
      padding-right: 5px;
      font-size: 20px;
      font-family: montserrat, sans-serif;
      font-style: normal;
      font-weight: 400;
      color: #000;
    }
  }
`