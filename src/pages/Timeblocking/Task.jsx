import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { pure } from 'recompose'
import styled from 'styled-components'
import { MoreVertical, Folder, FolderPlus } from 'react-feather'
import { TimeBlockForm } from './TaskForm'
import TimeBlockDisplay from './TaskDisplay'
import { ClockInput, ColorPicker } from '../../components/Inputs'
import { SelectProject } from './components/SelectProject'
import { TaskOptions } from './components/TaskOptions'
// import { colorOptions, colorOptionsObject } from '../../constants/colors'
import { bulmaColors } from '../../styles/bulma.colors'
import { boxShadows } from '../../styles/shadows.style'

// <Icon name="more-vertical" /> another good alternative to place on the top-right of the cards. show all the time
// <Icon name="maximize-2" />  is a good shortcut for going to item page view. Position absolute top-right, show onHover
    // <Icon name="minimize-2" />  is a good follow up for the expand icon to toggle to

// options for dragging icon: "grid", "move", "align-justify", "menu", 

// [x] TimeBlock should hold editing state and switch between Display and Form blocks

// [x] I like... "Fit to Screen" and "Show to scale" checkbox feature to toggle display settings

const TimeBlockUI = ({
  taskData, // Title, Desc, startTime, duration, priority
  isEditing,
  activeField = "title",
  isCollapsed,
  onInputClick,
  onSave,
  onCancel,
  onDelete,
  onUpdatePriority,
  savePreset,
  removePreset,
  // dragHandleProps,
  // onClockClick,
}) => {
  const [showColors, setShowColors] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [showProjects, setShowProjects] = useState(false)

  const handleInputClick = (fieldName) => {
    onInputClick(taskData, fieldName)
  }

  const handleOutsideClick = () => {
    // toggle back to display, save data(?)
    onSave() // will toggle editing and clear the active changes
  }

  const handleSave = ({ title, desc }, finished = true) => {
    onSave({
      _id: taskData._id,
      title,
      desc
    }, finished)
  }

  const handleSubmitClock = (clockData) => {
    console.log('new clock data:', clockData)
    onSave({
      ...taskData,
      ...clockData,
    })
  }

  const selectColor = (priority) => {
    // update task with the new priority
    onUpdatePriority(priority, taskData._id)
    setShowColors(false)
  }

  const handleDelete = () => {
    onDelete(taskData._id);
    setShowOptions(false);
  }

  const handleSavePreset = () => {
    savePreset(taskData)
    setShowOptions(false)
  }

  const onProjectSelect = () => setShowProjects(true)
  const onProjectCancel = () => setShowProjects(false)

  const assignProject = (id, title) => { // project id, project title
    // add project id to task, add task id to project
    setShowProjects(false)
    onSave({_id: taskData._id, project: {_id: id, title}})
  }

  const handleCompleteTask = () => {
    console.log('user wishes to complete task with id:', taskData._id)
  }

  const hideOptions = () => setShowOptions(false)

  return (
    <StyledTimeBlock
      className="time-block-container noselect"
      style={{position: 'relative'}}
      id={taskData._id}
    >

      {taskData.duration && (
        <ClockInput
          type="duration"
          timeData={{
            startTime: taskData.startTime,
            duration: taskData.duration,
          }}
          serverErrors={null}
          onSave={handleSubmitClock}
          onCancel={onCancel}
        />
      )}

      {/* Holds the padding, layout, and stuff */}
      <BlockSpacer className={isCollapsed ? "time-block-spacer" : "time-block-spacer expanded"}
        isCollapsed={isCollapsed} duration={taskData.duration} hasDesc={taskData.desc ? true : false}
        isEditing={isEditing} >
        <div className="time-block-inner">
          {/* <div className="block-left" style={{position: 'relative'}}>
            <ClockInput
              timeData={{
                startTime: taskData.startTime,
                duration: taskData.duration,
              }}
              serverErrors={null}
              onSave={handleSubmitClock}
              onCancel={onCancel}
            />
          </div> */}
          <div className="block-body" style={{paddingLeft:8}}>
            {isEditing ? (
              <TimeBlockForm
                timeData={{
                  title: taskData.title,
                  desc: (taskData.desc ? taskData.desc : null)
                  // other form options... like a ToDo list
                }}
                activeField={activeField}
                handleSave={handleSave}
                handleCancel={onCancel}
              />
            ) : (
              <TimeBlockDisplay
                title={taskData.title}
                desc={taskData.desc}
                handleInputClick={handleInputClick}
              />
            )}
          </div>
          <div className="block-right">
            {/* <div className="" style={{position: 'relative', marginRight:2}}>
              <ClockInput
                timeData={{
                  startTime: taskData.startTime,
                  duration: taskData.duration,
                }}
                serverErrors={null}
                onSave={handleSubmitClock}
                onCancel={onCancel}
              />
            </div> */}
            <BlockMenu style={{position:'relative'}}>
              <div style={{position:'relative'}}>
                {taskData.project
                  ? (
                    <p className="no-formatting text-center text-item" style={{cursor:'pointer',opacity:'.85'}} onClick={onProjectSelect}>
                      <Folder size={17} fillOpacity={.9} style={{marginRight:3}} /> {taskData.project.title}
                    </p>
                  ) : (
                  <p className="no-formatting text-center text-item text-item-icon" style={{cursor:'pointer',opacity:'.7',display:'flex',alignItems:'center'}} onClick={onProjectSelect}>
                    <FolderPlus />
                  </p>
                  )
                }
                
                {showProjects && (
                  <SelectProject
                    assignProject={assignProject}
                    onCancel={onProjectCancel}
                  />
                )}
              </div>
            </BlockMenu>
            
            {/* Color Picker / Priority Picker */}
            <ColorPicker
              priority={taskData.priority}
              selectColor={selectColor}
            />

            <BlockMenu style={{position:'relative'}}>
              <div style={{position:'relative'}} className="drag-icon-container" onClick={() => setShowOptions(true)}>
                <span className="icon drag-icon">
                  <MoreVertical size={20} color={bulmaColors.black}  />
                </span>
              </div>
                {showOptions && (
                  <TaskOptions
                    taskId={taskData._id}
                    handleSavePreset={handleSavePreset}
                    handleOutsideClick={hideOptions}
                    handleDelete={handleDelete}
                    handleCompleteTask={handleCompleteTask}
                  />
                )}
            </BlockMenu>
          </div>
        </div>
      </BlockSpacer>
    </StyledTimeBlock>
  )
}

TimeBlockUI.propTypes = {
  taskData: PropTypes.object, // Title, Desc, startTime, duration, priority
  isEditing: PropTypes.bool,
  isCollapsed: PropTypes.bool,
  activeField: PropTypes.string,
  onInputClick: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onUpdatePriority: PropTypes.func,
  savePreset: PropTypes.func,
  removePreset: PropTypes.func,
  // dragHandleProps,
  // onClockClick,
}

TimeBlockUI.defaultProps = {
  activeField: "title"
}

export const TimeBlock = pure(TimeBlockUI)


const BlockMenu = styled.div`
  position: relative;
  // z-index: 10000;

  .text-item {
    cursor: pointer;
    padding: 2px 4px;
    margin-right: 3px !important;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      text-decoration: underline;
    }

    &.text-item-icon {
      border-radius: 50%;
      padding: .4rem;
      transition: background-color .08s ease;

      &:hover {
        background-color: rgba(0,0,0,.08);
        transition: background-color .08s ease;
      }
    }
  }

  .options-menu {
    text-align: center;
    position: absolute;
    // left: -300%;
    right: 38px;
    width: 200px;
    top: 0;
    min-width: 100px;
    background: #fff;
    color: #000;
    z-index: 10010;
    // border: 1px solid rgba(0,0,0,.04);
    border-radius: 2px;
    box-shadow: ${boxShadows.shadow2};
    color: ${bulmaColors.dark};

    &.text-options-menu {
      top: calc(1.2rem + 6px);
      right: 0;
      left: initial;
      width: 200px;
    }

    .option {
      padding-left: 10px;
      padding-right: 10px;
      margin-top: 0;
      margin-bottom: 0;
      padding-top: .666em;
      padding-bottom: .666em;
      // margin-top: 
      cursor: pointer;

      &:hover {
        background: ${bulmaColors.light};
        border
      }
    }
  }
  
`

const BlockSpacer = styled.div`
  height: initial;
  min-height: 51px;
  
  // transition: .25s ease-in-out;

  &.expanded {
    height: ${props => props.duration * 3}px;
    min-height: ${props => props.isEditing ? 102 : 51}px;
    // ${props => props.isEditing}
    // transition: .23s ease-in-out;

    .block-desc,
    .add-form-item {
      display: ${props => props.duration < 40 && !props.isEditing ? "none" : "block"};
      // transition: .23s ease-in-out;
    }
    .desc-container {
      // display: ${props => props.duration < 40 && !props.isEditing ? "none" : "flex"};
      display: flex;
    }

    &:hover {
      height: ${props => (props.duration < 40) && props.hasDesc ? "100%" : props.duration * 3 + "px"};
      transition: .23s ease-in-out;

      .block-desc,
      .add-form-item {
        display: block;
      }
      .desc-container { display: flex; }
    }
  }
`

const StyledTimeBlock = styled.div`
  // container styles:
  margin-bottom: 8px;
  display: flex;
  align-items: center;

  .time-block-spacer {
    flex: 1;
    background: ${bulmaColors.light};
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,.15);
    // overflow-y: auto;
    // transition: .25s ease-in-out;
  }
  .time-block-inner {
    // flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 6px 0 8px; // note: adjust the padding to make responsive
    // background-color: ${props => props.isCollapsed ? "none" : bulmaColors.light};
    // border-radius: ${props => props.isCollapsed ? "0" : "8px"};
    // border: ${props => props.isCollapsed ? "none" : "1px solid rgba(0,0,0,.15)"};
    // transition: .25s ease-in-out;
  }

  h3 {
    margin-bottom: 0;
  }
  p {
    margin-top: .6666em;
  }

  .block-left {
    padding-top: 12px;
    padding-bottom: 12px;
    padding-right: 8px;
  }
  
  .block-body {
    flex: 1;
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 4px;
  }
  .block-right {
    display: flex;
    flex-direction: row;
    align-items: center;

  }
  

  .drag-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    border-radius: 50%;
    cursor: pointer;
    background-color: inherit;
    transition: background-color .2s ease-in-out;

    &:hover {
      background-color: rgba(0,0,0,.06);
      transition: background-color .2s ease-in-out;
    }
  }
`

