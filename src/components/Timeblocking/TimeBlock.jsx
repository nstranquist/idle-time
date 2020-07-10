import React, { useState } from 'react'
import styled from 'styled-components'
import { TimeBlockForm } from '../Forms'
import { MoreVertical } from 'react-feather'
import TimeBlockDisplay from './TimeBlockDisplay'
import { OutsideAlerter } from '../../hoc/OutsideAlerter'
import { ClockInput } from '../../components/Inputs'
import { bulmaColors } from '../../styles/bulma.colors'
import { boxShadows } from '../../styles/shadows.style'

// <Icon name="more-vertical" /> another good alternative to place on the top-right of the cards. show all the time
// <Icon name="maximize-2" />  is a good shortcut for going to item page view. Position absolute top-right, show onHover
    // <Icon name="minimize-2" />  is a good follow up for the expand icon to toggle to

// options for dragging icon: "grid", "move", "align-justify", "menu", 

// [x] TimeBlock should hold editing state and switch between Display and Form blocks

// [x] I like... "Fit to Screen" and "Show to scale" checkbox feature to toggle display settings

const colorOptions = [
  {
    code : "#3273DC", // blue
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

export const TimeBlock = ({
  taskData, // Title, Desc, startTime, duration, priority
  isEditing,
  activeField = "title",
  onInputClick,
  onSave,
  onCancel,
  onDelete,
  onUpdatePriority,
  // dragHandleProps,
  isCollapsed,
  // onClockClick,
}) => {
  const [showColors, setShowColors] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const handleInputClick = (fieldName) => {
    onInputClick(taskData, fieldName)
  }

  const handleOutsideClick = () => {
    // toggle back to display, save data(?)
    onSave() // will toggle editing and clear the active changes
  }

  const handleSave = ({ title, desc }, finished = true) => {
    onSave({
      ...taskData,
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

  const handleSelectColor = (priority) => {
    // update task with the new priority
    onUpdatePriority(priority, taskData.id)
  }

  const handleDelete = () => {
    onDelete(taskData.id);
    setShowOptions(false);
  }

  return (
    <StyledTimeBlock
      className="time-block-container noselect"
      style={{position: 'relative'}}
      id={taskData.id}
    >

      {taskData.duration && (
        <DurationText className="duration-text-container" priority={taskData.priority ? taskData.priority : -1}>
          <span className="duration-text">{taskData.duration}</span>
        </DurationText>
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
              <OutsideAlerter handleOutsideClick={handleOutsideClick}>
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
              </OutsideAlerter>
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
            
            {/* Color Picker / Priority Picker */}
            <div style={{position: 'relative'}}>
              <div className="color-picker-container" onClick={() => setShowColors(true)}>
                <PriorityColor priority={taskData.priority} className="icon circle"></PriorityColor>
              </div>
              
              {showColors && (
                <OutsideAlerter handleOutsideClick={() => setShowColors(false)}>
                  <ColorPicker className="color-picker">
                    {colorOptions.map(color => (
                      <ColorOption color={color.code} onClick={() => handleSelectColor(color.priority)}>

                      </ColorOption>
                    ))}
                  </ColorPicker>
                </OutsideAlerter>
              )}
            </div>


            <BlockMenu style={{position:'relative'}}>
              <div style={{position:'relative'}} className="drag-icon-container" onClick={() => setShowOptions(true)}>
                <span className="icon drag-icon">
                  <MoreVertical size={20} color={bulmaColors.black}  />
                </span>
              {showOptions && (
                <OutsideAlerter handleOutsideClick={() => setShowOptions(false)}>
                  <div className="options-menu">
                    <p className="option" onClick={handleDelete}>Delete</p>
                    <p className="option">Add Below</p>
                  </div>
                </OutsideAlerter>
              )}
              </div>

            </BlockMenu>
          </div>
        </div>
      </BlockSpacer>
    </StyledTimeBlock>
  )
}

const BlockMenu = styled.div`
  position: relative;
  z-index: 11000;

  .options-menu {
    text-align: center;
    position: absolute;
    left: calc(-100% - 3rem - 17px);
    // left: -300%;
    top: 0;
    min-width: 100px;
    background: #fff;
    color: #000;
    z-index: 1010;
    // border: 1px solid rgba(0,0,0,.04);
    border-radius: 2px;
    box-shadow: ${boxShadows.shadow2};
    color: ${bulmaColors.dark};

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
const ColorPicker = styled.div`
  position: absolute;
  // bottom: -30px;
  left: 0;
  right: 0;
  padding: 10px;
  background: #fff;
  box-shadow: 
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
  background: ${props => {
    switch(props.priority) {
      case 1:
        return bulmaColors.danger;
      case 2:
        return bulmaColors.warning;
      case 3:
        return bulmaColors.success;
      case 4:
        return bulmaColors.link;
      default:
        return "#AAA";
    }
  }}
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
  .color-picker-container {
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
      background-color: black;
    }
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

      // border-color: ${props => {
      //   switch(props.priority) {
      //     case 1:
      //       return bulmaColors.danger;
      //     case 2:
      //       return bulmaColors.warning;
      //     case 3:
      //       return bulmaColors.success;
      //     case 4:
      //       return bulmaColors.link;
      //     default:
      //       return "rgba(0,0,0,.3)";
      //   }
      // }}
    }
  }
`