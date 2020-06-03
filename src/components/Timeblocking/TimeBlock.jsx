import React from 'react'
import styled from 'styled-components'
import { TimeBlockForm } from '../Forms'
import TimeBlockDisplay from './TimeBlockDisplay'
import { OutsideAlerter } from '../../hoc/OutsideAlerter'
import { ClockInput } from '../../components/Inputs'
import { bulmaColors } from '../../styles/bulma.colors'


// TimeBlock should hold editing state and switch between Display and Form blocks

export const TimeBlock = ({
  taskData, // Title, Desc, startTime, duration, endTime
  isEditing,
  activeField = "title",
  onInputClick,
  onSave,
  onCancel,
  // onClockClick,
  // onDrag,
}) => {

  // toggle form
  const handleInputClick = (fieldName) => {
    console.log(fieldName, 'clicked')
    onInputClick(taskData, fieldName)
  }

  const handleOutsideClick = () => {
    // toggle back to display, save data(?)
    onSave() // will toggle editing and clear the active changes
  }

  const handleSave = ({ title, desc }, finished = true) => {
    // update the information
    onSave({
      ...taskData,
      title,
      desc
    }, finished)
    // toggle display view
  }

  const handleDateSave = (date) => {
    console.log('new date:', date)
    onSave({
      ...taskData,
      date: date
    })
  }

  const onSubmit = (timeData) => {
    console.log('submitting this time data:', timeData, 'and other data:', taskData)

    if(timeData) {
      onSave({
        ...taskData,
        ...timeData
      })
    }
  }

  return (
    <StyledTimeBlock className="time-block-container">
      <div className="block-left" style={{position: 'relative'}}>
        <ClockInput
          timeData={{
            startTime: taskData.startTime,
            duration: taskData.duration,
          }}
          handleDateSave={handleDateSave}
          onSave={handleDateSave}
          onCancel={onCancel}
        />
      </div>
      <div className="block-right">
        {isEditing ? (
          <OutsideAlerter handleOutsideClick={handleOutsideClick}>
            <TimeBlockForm
              timeData={{
                title: taskData.title,
                desc: (taskData.desc ? taskData.desc : null)
                // other form options...
              }}
              activeField={activeField}
              handleSave={handleSave}
              handleCancel={onCancel}
            />
          </OutsideAlerter>
        ) : (
          <TimeBlockDisplay
            title={taskData.title}
            desc={taskData.desc}
            handleInputClick={handleInputClick}
          />
        )}
      </div>

      {/* No save / cancel button? */}
    </StyledTimeBlock>
  )
}

const StyledTimeBlock = styled.div`
  // container styles:
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

  .block-left {
    padding-right: 8px;

    .block-icon {
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
  .block-right {
    flex: 1;

  }
  // .block-body {  }
`