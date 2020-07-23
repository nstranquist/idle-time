import React, { useState } from 'react'
import styled from 'styled-components'
import { OutsideAlerter } from '../../hoc/OutsideAlerter'
import { bulmaColors } from '../../styles/bulma.colors'
import { boxShadows } from '../../styles/shadows.style'

const colorOptions = [
  {
    code : "#fff", // white (or blue)
    priority: 4,
  },
  {
    code: "#48C774", // green
    priority: 3,
  },
  {
    code: "#FFDD57", // yellow
    priority: 2,
  },
  {
    code: "#FF3860", // danger
    priority: 1,
  },
]
const colorOptionsObject = {
  1: "#FF3860",
  2: "#FFDD57",
  3: "#48C774",
  4: "#FFF"
}

export const ColorPicker = ({
  priority,
  selectColor, // params: priority
}) => {
  const [showColors, setShowColors] = useState(false)

  const handleSelectColor = (colorPriority) => {
    selectColor(colorPriority)
    setShowColors(false)
  }

  return (
    <div style={{position: 'relative'}}>
      <ColorPickerContainer className="color-picker-container" onClick={() => setShowColors(true)}>
        <PriorityColor color={colorOptionsObject[priority]} className="icon circle"></PriorityColor>
      </ColorPickerContainer>
      
      {showColors && (
        <OutsideAlerter handleOutsideClick={() => setShowColors(false)}>
          <ColorPickerMenu className="color-picker">
            {colorOptions.map(color => (
              <ColorOption key={color.priority} color={color.code} onClick={() => handleSelectColor(color.priority)} />
            ))}
          </ColorPickerMenu>
        </OutsideAlerter>
      )}
    </div>
  )
}

const ColorPickerContainer = styled.div`
  &.color-picker-container {
    position: relative;
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

    .circle {
      flex: 1;
      border-radius: 50%;
      background-color: ${props => props.color};
      border-width: 1px;
      border-style: solid;
      border-color: rgba(0,0,0,.14);
    }
  }
`
const ColorPickerMenu = styled.div`
&.color-picker {
  position: absolute;
  left: 3px;
  right: 3px;
  padding-left: 3px;
  padding-right: 3px;
  border: 1px solid rgba(0,0,0,.08);
  border-radius: 4px;
  background: #f9f9f9;
  text-align: center;
  box-shadow: ${boxShadows.shadow3};
  z-index: 1000;
}
`
const ColorOption = styled.div`
  background: ${props => props.color};
  width: 1.3rem;
  height: 1.3rem;
  margin-top: 3px;
  margin-bottom: 3px;
  border: 1px solid rgba(0,0,0,.3);
  border-radius: 50%;
  cursor: pointer;
  // z-index: 12001;

  &:hover {
    border: 1px solid rgba(0,0,0,.7);
  }
`
const PriorityColor = styled.div`
  background: ${props => props.color};
`