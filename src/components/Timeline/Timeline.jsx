import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bulmaColors } from '../../styles/bulma.colors'
import { boxShadows } from '../../styles/shadows.style'
import { selectActiveItem, selectUpcomingTasks, selectDots } from '../../store/selectors'
import { selectTasks, selectTasksErrors, selectTasksLoading } from '../../store/selectors/tasks'

import TimerContext from '../../context/IdleTimer'

// note: get static image asset for hours / numbers display
// then, need that blue line to update with the timer
// and update the dots

// I think... best to wait until redux is managing the timer state,
// before implementing the timer functionality here

const startingDotSettings = {
  colors: ['green', 'blue', 'yellow', 'red'],
  // ...
}

export const Timeline = ({
  dots,
  timer,
  tasks,
  loading,
  errors,
  upcomingTasks,
  activeTask
}) => {
  const timerContext = useContext(TimerContext)

  // const [viewHeight, setViewHeight] = useState("0px");
  // const [dots, setDots] = useState(startingDots)
  const [dotSettings, setDotSettings] = useState(startingDotSettings)
  const [isHovering, setIsHovering] = useState(undefined)
  const [dotHoverData, setDotHoverData] = useState(undefined)
  const [time, setTime] = useState(timer.getTime())
  const [timerId, setTimerId] = useState(undefined)

  useEffect(() => {
    if(isHovering) {
      // get the new hovering data
      const dotId = isHovering;
      const dot = tasks.find(task => task.id === dotId)
      if(dot)
        setDotHoverData(dot)
    }
    if(timerContext || timerContext.time)
      console.log("time from context:", timerContext.time/*'timerContext:', timerContext, */)
    else
      console.log('timer context is undefined')
  }, [isHovering])

  // const drawDotsOnTimeline = () => {
  //   // can draw either colored or transparent <span> every 20 minutes (20px)
  //   // 20px * 3 = 60px/hour 60*24 = 1440px;
  //   // 60px * 12 = 720px;
  // }

  // const handleDotHover = async taskId => {
  //   // set the necessary data for dot hover
  //   const dotData = tasks.find(task => task.id === taskId)
  // }

  const handleMouseOver = (e) => {
    if(e.target.id) {
      console.log('mouse over event:', e, 'currentTarget:', e.currentTarget, 'target:', e.target)
      console.log('id of currentTarget:', e.currentTarget.id)
      console.log('id of target:', e.target.id)
      setIsHovering(e.target.id)
    }
  }
  const handleMouseOut = (e) => {
    if(e.target.id) {
      console.log('mouse out event:', e, 'currentTarget:', e.currentTarget)
      setIsHovering(undefined)
      setDotHoverData(undefined)
    }
  }

  return (
    <StyledTimeline className="timeline-1">

      <span className="timeline-time" style={{display:'flex',alignItems:"center",justifyContent:"center",height:40}}>{time}</span>

      <div className="timeline-line">

        <div className="dots-container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          {dots && dots.map((dot, index) => {
            return (
              <Dot to={`/tasks/${dot.id}`} className="dot-item" key={index} priority={dot.priority} id={dot.id}>
                {isHovering === dot.id && dotHoverData && (
                  <DotHoverMenu className="dot-hover-menu">
                    <h3 style={{wordBreak:'keep-all',wordWrap:'normal',overflowWrap:'normal',}}>{dotHoverData.title}</h3>
                    {dotHoverData.desc && <p style={{opacity:1,fontSize:"1.1rem"}}>{dotHoverData.desc}</p>}
                  </DotHoverMenu>
                )}
              </Dot>
            )
          })}
        </div>
      </div>
    </StyledTimeline>
  )
}

const mapStateToProps = (state) => ({
  dots: selectDots(state),
  tasks: selectTasks(state),
  errors: selectTasksErrors(state),
  loading: selectTasksLoading(state),
  upcomingTasks: selectUpcomingTasks(state),
  activeTask: selectActiveItem(state),
})

export const ConnectedTimeline = connect(
  mapStateToProps,
  {  }
)(Timeline)

const DotHoverMenu = styled.div`
  position: absolute;
  top: 2px;
  left: 20px;
  padding: 14px 16px;
  text-align: left;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.18);
  border-radius: 6px;
  box-shadow: ${boxShadows.shadow3};
  width: 480px; // 120px * 4;  Note: needs update for responsiveness
`

const Dot = styled(Link)`
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
        return "initial";
    }
  }};

  // remove default link styles
  text-decoration: inherit;
  color: inherit;
  font-size: inherit;

  &:active, &:focus, &:focused {
    outline: 0;
    border: none;
    -mox-outline-style: none;
  }
`

const StyledTimeline = styled.div`
  &.timeline-1 {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    // margin-top: 16px;
    padding-bottom: 12px;
    background: transparent;

    .timeline-line {
      width: 2px; // or 1px, test which one looks best
      // background: rgba(0,0,0,.88);
      background: #363636;
      height: calc(100vh - 86px - 52px - 56px - 12px);
      z-index: 1012;
      margin-top: 12px;
      // height: 100%;
    }
    .timeline-time {

    }
    .dots-container {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin-top: 54px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      z-index: 1011;

      
      .dot-item {
        position: relative;
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        margin: 3px 0;
        z-index: 999;
        border: 1px solid rgba(0,0,0,.3);

        &:hover {
          border: 1px solid rgba(0,0,0,.8);
        }

        // .dot-image {
        //   // display: inline-block;
        //   border-radius: 50%;
        //   width: 16px;
        //   height: 16px;
        //   z-index: 1000;
        //   opacity: .97; // 1;

          // &.dot-red {
          //   background: ${bulmaColors.danger};
          // }
          // &.dot-yellow {
          //   background: ${bulmaColors.warning};
          // }
          // &.dot-green {
          //   background: ${bulmaColors.success};
          // }
          // &.dot-blue {
          //   background: ${bulmaColors.link};
          // }

          
        // }
      }
    }
  }

  .menu-loading {
    font-size: 18px;
    margin: 20px;
    text-align: center;
  }

  // .dot-hover-menu {
  //   position: absolute;
  // }
`