import React, { useState } from 'react'
import styled from 'styled-components'
import { OutsideAlerter } from '../../hoc/OutsideAlerter'
import { DateForm } from '../Forms/DateForm'
import { Clock } from 'react-feather'
import { bulmaColors } from '../../styles/bulma.colors'
import { boxShadows } from '../../styles/shadows.style'

export const ClockInput = ({
  type='clock',
  timeData, // or 'dateData', includes: startTime, duration, endTime,
  serverErrors, // could be undefined
  onSave, // aka 'onSubmit'
  onCancel,
}) => {
  const [showClock, setShowClock] = useState(false)

  const onSubmit = (clockData) => {
    onSave(clockData)
    setShowClock(false)
  }

  if(type==='duration') {
    return (
      <ClockInputStyled style={{position:'relative'}}>
        <DurationText
          className="duration-text-container"
          // priority={taskData.priority ? taskData.priority : -1}
          onClick={() => setShowClock(true)}
        >
          <span className="duration-text">{timeData.duration}</span>
        </DurationText>
        {showClock && (
          <div className="date-form-styles">
            <OutsideAlerter handleOutsideClick={() => setShowClock(false)}>
              <DateForm
                timeData={timeData} // startTime & duration
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
  return (
    <ClockInputStyled style={{position:'relative', zIndex:10000}}>

      <div className="clock-icon-container" onClick={() => setShowClock(true)} style={{position:'relative'}}>
        <span className="icon block-icon dropdown-icon">
          <Clock size={24} style={{color: serverErrors ? bulmaColors.danger : 'initial'}} />
        </span>
      </div>
      {showClock && (
        <div className="date-form-styles">
          <OutsideAlerter handleOutsideClick={() => setShowClock(false)}>
            <DateForm
              timeData={timeData} // startTime & duration
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
  // position: relative;
  // border: 1px solid rgba(0,0,0,.12);

  // &:hover {
  //   .block-icon {
  //     background-color: rgba(0,0,0,.07);
  //     border-radius: 50%;
  //     transition: background-color .15s ease-in-out;
  //   }
  // }

  .clock-icon-container {
    position: relative;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color .15s ease-in-out;

    &:hover {
      background-color: rgba(0,0,0,.07);
      border-radius: 50%;
      transition: background-color .15s ease-in-out;
    }
  }

  .date-form-styles {
    position: absolute;
    // right: calc(600% + 44px);
    margin-top: 12px;
    margin-left: 12px;
    padding: 10px 20px;
    background: #fff;
    color: #000;
    z-index: 1010;
    // border: 1px solid rgba(0,0,0,.04);
    border-radius: 2px;
    box-shadow: ${boxShadows.shadow3};
  }
  .block-icon {
    border-radius: 50%;
    // height: 44px;
    // width: 44px;
    // transition: background-color .2s ease-in-out;

    // &:hover {
    //   background-color: rgba(0,0,0,.07);
    //   border-radius: 50%;
    //   transition: background-color .15s ease-in-out;
    // }
  }
`
const DurationText = styled.div`
  &.duration-text-container {
    width: 54px;
    text-align: center;
    // padding-right: 10px;

    .duration-text {
      cursor: pointer;
      font-size: 16px;
      line-height: 20px;
      padding: 6px;
      text-align: center;
      align-self: center;
      margin: 0 auto;
      border-radius: 50%;
      border: 1px solid rgba(0,0,0,.3);
      // text-decoration: underline;

  }
`