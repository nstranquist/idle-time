import React, { useState } from 'react'
import styled from 'styled-components'
import { OutsideAlerter } from '../../hoc/OutsideAlerter'
import { DateForm } from '../Forms/DateForm'
import { Clock } from 'react-feather'
import { bulmaColors } from '../../styles/bulma.colors'

export const ClockInput = ({
  timeData, // or 'dateData', includes: startTime, duration, endTime,
  serverErrors, // could be undefined
  onSubmit, // aka 'onSubmit'
  onCancel,
}) => {
  const [showClock, setShowClock] = useState(false)

  return (
    <ClockInputStyled style={{position:'relative'}}>
      <span className="icon block-icon dropdown-icon" onClick={() => setShowClock(true)}>
        <Clock size={24} style={{color: serverErrors ? bulmaColors.danger : 'initial'}} />
      </span>
      {showClock && (
        <div className="date-form-styles">
          <OutsideAlerter handleOutsideClick={() => setShowClock(false)}>
            <DateForm
              timeData={timeData}
              serverErrors={serverErrors}
              onSubmit={onSubmit}
              onCancel={onCancel}
            />
          </OutsideAlerter>
        </div>
      )}
    </ClockInputStyled>
  )
}

const ClockInputStyled = styled.div`
  position: relative;
  // border: 1px solid rgba(0,0,0,.12);

  .date-form-styles {
    position: absolute;
    padding: 10px 20px;
    background: #fff;
    color: #000;
    z-index: 1010;
    border: 1px solid rgba(0,0,0,.16);
  }
`