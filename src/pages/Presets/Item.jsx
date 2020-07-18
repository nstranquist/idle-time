import React from 'react'
import { pure } from 'recompose'
import styled from 'styled-components'
// components
import { Trash, Edit2 } from 'react-feather'
import { TimeBlock } from '../../components/Timeblocking/TimeBlock'
import { boxShadows } from '../../styles/shadows.style'

export const Item = ({
  preset,
  color,
  handleAdd, // adds to task/timeshift/schedule
  handleEdit,
  handleDelete,
  isEditing=false,
  setIsEditing
}) => {
  return (
    <Preset className="preset-item noselect" >
      <PresetTopBar className="top-bar" color={color}>
        {/* Preset Title */}
        <p style={{flex:1, marginBottom:0}}>{preset.title}</p>
        {/* Icon Bar */}
        <div style={{display:'flex',alignItems:'center'}}>
          <span className="icon has-text-info">
            <Edit2 onClick={() => handleEdit(preset._id)} />
          </span>
          <span className="icon has-text-danger">
            <Trash onClick={() => handleDelete(preset._id)} />
          </span>
        </div>
      </PresetTopBar>

      {/* Display Task data, timeshift data, schedule data in the body */}
      <div className="preset-body">
        {preset.taskData && <div className="preset-section">
          <TaskPreset editing={isEditing}>
            {/* in a task, there is a: title, desc, duration, priority, ... */}
            <TimeBlock
              taskData={{ ...preset.taskData, duration: preset.taskData.duration || 10 }}
              isEditing={isEditing}
              onInputClick={() => setIsEditing(true)}
            />
          </TaskPreset>
        </div>}

        {preset.timeshiftData && <div className="preset-section">
          <TimeshiftPreset editing={isEditing}>

          </TimeshiftPreset>
        </div>}
        
        {preset.scheduleData && <div className="preset-section">
          <SchedulePreset editing={isEditing}>

          </SchedulePreset>
        </div>}
      </div>
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

  .icon { cursor: pointer; margin-left: .7rem; }
`
const Preset = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: .7rem;


  .preset-body {
    flex: 1;
    border-left: 3px solid rgba(0,0,0,.08);
    border-right: 1px solid rgba(0,0,0,.08);
    border-bottom: 1px solid rgba(0,0,0,.08);
  }
`