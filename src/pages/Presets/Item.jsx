import React, { useState } from 'react'
import { pure } from 'recompose'
import styled from 'styled-components'
// components
import { Plus, Edit2, Trash, ChevronsDown, ChevronsUp } from 'react-feather'
import { TimeBlock } from '../Timeblocking/Task'
import { boxShadows } from '../../styles/shadows.style'
import { deepEqual } from '../../utils/deepEqual'

// Add Project to Preset??

export const Item = ({
  preset,
  color,
  handleAdd, // adds to task/timeshift/schedule
  handleEdit,
  handleDelete,
  isEditing=false,
  setIsEditing
}) => {
  const [showDetails, setShowDetails] = useState(preset.taskData ? true : false)

  const toggleEditing = () => setIsEditing(preset._id)

  const toggleDetails = () => setShowDetails(showDetails => !showDetails)

  const addToPreset = () => console.log('user wants to add data to preset')

  // for when updating preset details only
  // const handleSave = (presetData) => handleEdit(presetData)

  // for when task data gets changed
  const handleSaveTaskData = (taskData) => {
    console.log('taskData after update:', taskData)
    if(deepEqual(taskData, preset.taskData)) {
      const presetData = {...preset, taskData }
      handleEdit(presetData)
    }
    else {
      console.log('no changes were made to preset task data')
      toggleEditing();
    }
  }

  return (
    <Preset className="preset-item noselect" >
      <PresetTopBar className="top-bar" color={color}>
        {/* Preset Title */}
        <p style={{flex:1, marginBottom:0}}>{preset.title}</p>
        {/* Icon Bar */}
        <div style={{display:'flex',alignItems:'center'}}>
          <span className="icon has-text-success">
            <Plus onClick={addToPreset} />
          </span>
          <span className="icon has-text-info">
            <Edit2 onClick={toggleEditing} />
          </span>
          <span className="icon has-text-danger">
            <Trash onClick={() => handleDelete(preset._id)} />
          </span>
          {showDetails
            ? <span className="icon"><ChevronsUp style={{opacity:.86}} onClick={toggleDetails} /></span>
            : <span className="icon"><ChevronsDown style={{opacity:.86}} onClick={toggleDetails} /></span>
          }
        </div>
      </PresetTopBar>

      {/* Display Task data, timeshift data, schedule data in the body */}
      {showDetails && (
        <div className="preset-body">
          {preset.taskData ? (
            <div className="preset-section">
              <TaskPreset editing={isEditing}>
                {/* in a task, there is a: title, desc, duration, priority, ... */}
                <TimeBlock
                  taskData={{ ...preset.taskData, duration: preset.taskData.duration || 10 }}
                  isEditing={isEditing}
                  onInputClick={toggleEditing}
                  isCollapsed={true}
                  onSave={handleSaveTaskData}
                  // onCancel={onCancel}
                />
              </TaskPreset>
            </div>
          ) : <p style={{opacity:.75,fontSize:14}}>(No task data for this preset)</p>}

          {preset.timeshiftData && (
            <div className="preset-section">
              <TimeshiftPreset editing={isEditing}>

              </TimeshiftPreset>
            </div>
          )}
          
          {preset.scheduleData && (
            <div className="preset-section">
              <SchedulePreset editing={isEditing}>

              </SchedulePreset>
            </div>
          )}
        </div>
      )}
    </Preset>
  )
}

export const PresetItem = pure(Item);

const TaskPreset = styled.div`

`
const TimeshiftPreset = styled.div`

`
const SchedulePreset = styled.div`

`
const PresetTopBar = styled.div`
  padding: .7rem;
  border: 1px solid rgba(0,0,0,.08);
  border-left: ${props => "3px solid " + props.color};
  box-shadow: ${boxShadows.shadow1};

  display: flex;
  align-items: center;
  justify-content: space-between;

  .icon {
    cursor: pointer;
    margin-left: .7rem;
  }
`
const Preset = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: .7rem;


  .preset-body {
    padding-top: .7rem;
    padding-left: .7rem;
    padding-right: .7rem;
    flex: 1;
  }
`