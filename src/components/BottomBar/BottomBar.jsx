import React, { useState } from 'react'
import styled from 'styled-components'

export const BottomBar = () => {
  const [showTime, setShowTime] = useState(true)
  const [selectAll, setSelectAll] = useState(false)
  // NOTE: select this from redux instead of local state
  const [selectedText, setSelectedText] = useState(undefined)

  return (
    <StyledBottomBar className="bottom-bar bar container">
      <div className="bar-left">
        {showTime && <p className="time-text no-select">8:20 am</p>}
        <p className="checkbox-with-text" style={{marginLeft:8}}
          onClick={() => setShowTime(!showTime)}>
          <input
            type="checkbox"
            checked={showTime}
            onChange={() => setShowTime(!showTime)}  
          />
          <span className="no-select" style={{marginLeft:8}}>
            show time
          </span>
        </p>
      </div>
      <div className="bar-right">
        {selectedText && <p style={{marginBottom:0, marginRight:6}}>{selectedText}</p> }
        <p className="checkbox-with-text"
          onClick={() => setSelectAll(!selectAll)}>
          <span className="no-select" style={{marginRight:4}}>all</span>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={() => setSelectAll(!selectAll)}  
          />
        </p>
      </div>
    </StyledBottomBar>
  )
}

const StyledBottomBar = styled.div`
  height: 56px;
  // position: absolute;
  z-index: 1050;
  background: #fff;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid rgba(0,0,0,.09);
  // layout
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;

  p, p.time-text {
    margin-bottom: 0;
    display: inline-block;
    color: rgba(0,0,0,.88);
  }

  .bar-left, .bar-right {
    height: 56px;
  }

  .checkbox-with-text {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 2px;
    padding-right: 2px;

    input {
      cursor: pointer;
    }
  }

  @media(min-width: 1672px) {
    border-left: 1px solid rgba(0,0,0,.09);
    border-right: 1px solid rgba(0,0,0,.09);
  }
`

// NOTE: import redux