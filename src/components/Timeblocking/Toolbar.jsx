import React from 'react'
import styled from 'styled-components'
import { Play, Pause, Square, Plus, Clock } from 'react-feather'
import { bulmaColors } from '../../styles/bulma.colors'


export const Toolbar = ({
  height,
  timer,
  startTimer,

  // handlePause,
  // handleStop,
  // handlePlus,
  // handleClock,
}) => {

  const formatTime = (time) => {

    return time;
  }

  return (
    <ToolbarStyled className="toolbar bar" style={{height: height}}>
      <div className="bar-left">
        <span className="icon toolbar-icon play-icon"
          onClick={startTimer}>
          <Play size={24} />
        </span>

        {timer && (
          <span className="icon timer-text">
            hey
          </span>
        )}

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
    </ToolbarStyled>
  )
}

const ToolbarStyled = styled.div`
  &.toolbar {
    border: 1px solid rgba(0,0,0,.17);
    // margin-bottom: 12px;
    margin-bottom: 6px;
    padding: 6px 12px;

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