import React, { useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { TimeBlockForm, TimeBlockDisplay } from '../Forms'
import { ClockModal } from '../ClockModal'
import { Clock } from 'react-feather'
import { bulmaColors } from '../../styles/bulma.colors'


// TimeBlock should hold editing state and switch between Display and Form blocks

export const TimeBlock = ({
  taskData, // Title, Desc, startTime, duration, endTime
  isEditing,
  activeField = "title",
  onInputClick,
  onSave,
  // onClockClick,
  // onDrag,
}) => {
  const [dateActive, setDateActive] = useState(false) // perhaps make this a prop

  // toggle form
  const handleInputClick = (fieldName) => {
    console.log(fieldName, 'clicked')
    onInputClick(taskData, fieldName)
  }

  const handleClockClick = () => {
    // onClockClick() // pass task id if passing date as prop
    setDateActive(true)
  }

  const handleSave = ({ title, desc }) => {
    // update the information
    onSave({ title, desc })
    // toggle display view
  }

  const handleDateSave = (date) => {
    console.log('new date:', date)
    onSave({
      title: taskData.title,
      desc: taskData.desc,
      date: date
    })
  }

  return (
    <StyledTimeBlock className="time-block-container">
      <div className="block-left">
        <span className="icon dropdown-icon" onClick={(e) => handleClockClick()}>
          <Clock size={24} />
          {dateActive && (
            <ClockModal
              clockData={{
                date: moment(new Date()).format('YYYY-MM-DD'),
              }}
              onSubmit={handleDateSave}
            />
          )}
        </span>
      </div>
      <div className="block-right">
        {isEditing ? (
          <TimeBlockForm
            timeData={{
              title: taskData.title,
              desc: (taskData.desc ? taskData.desc : null)
              // other form options...
            }}
            handleSave={handleSave}
            activeField={activeField}
          />
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
  .block-right {
    flex: 1;

  }
  // .block-body {  }
`