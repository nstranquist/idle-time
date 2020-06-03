import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { UnstyledLink } from '../../styles/components/link.styled'
import { bulmaColors } from '../../styles/bulma.colors'
import { selectActiveItem, selectUpcomingTasks } from '../../store/selectors'

// note: get static image asset for hours / numbers display
// then, need that blue line to update with the timer
// and update the dots


const startingDots = [
  {
    id: 'a',
    status: 1, // 1 is 'urgent', 2 is 'neutral' (yellow), 3 is 'not urgent'
  },
  {
    id: 'b',
    status: 2,
  },
  {
    id: 'c',
    status: 3,
  },
  {
    id: 'd',
    status: 1,
  },
  {
    id: 'e',
    status: 4,
  },
];

const startingDotSettings = {
  colors: ['green', 'blue', 'yellow'],

}

export const Timeline = ({
  timer,
  tasksState,
  upcomingTasks,
  activeTask
}) => {
  // const [viewHeight, setViewHeight] = useState("0px");
  const [dots, setDots] = useState(startingDots)
  const [dotSettings, setDotSettings] = useState(startingDotSettings)
  const [isHovering, setIsHovering] = useState(false)
  const [dotHoverData, setDotHoverData] = useState(undefined)
  const [time, setTime] = useState(0)

  useEffect(() => {
    console.log("timer time changed to:", timer.getTime())
    setTime(timer.getTime())
  }, [timer.time])

  const drawDotsOnTimeline = () => {
    // can draw either colored or transparent <span> every 20 minutes (20px)
    // 20px * 3 = 60px/hour 60*24 = 1440px;
    // 60px * 12 = 720px;

  }

  const handleDotHover = async taskId => {
    // set the necessary data for dot hover
    const dotData = tasksState.tasks.find(task => task.id === taskId)
  }

  const handleMouseOver = (e) => {
    console.log('mouse over event:', e, 'currentTarget:', e.currentTarget)
    console.log('id of currentTarget:', e.currentTarget.id)
    console.log('id of target:', e.target.id)
    console.log('key of target:', e.target.key)
  }
  const handleMouseOut = (e) => {
    console.log('mouse out event:', e, 'currentTarget:', e.currentTarget)
  }

  return (
    <StyledTimeline className="timeline-1">
      <span>{time}</span>
      <div className="timeline-line">

        <div className="dots-container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          {dots && dots.map((dot, index) => {
            return (
              <UnstyledLink to={`/tasks/${dot.id}`} className="dot-item" key={index} id={dot.id}>
                {dot.status === 1 && (
                  <span className="dot-image dot-red"></span>
                )}
                {dot.status === 2 && (
                  <span className="dot-image dot-yellow"></span>
                )}
                {dot.status === 3 && (
                  <span className="dot-image dot-green"></span>
                )}
                {dot.status === 4 && (
                  <span className="dot-image dot-blue"></span>
                )}

                {isHovering && (
                  <div className="dot-hover-menu">
                    {dotHoverData ? (
                      <>

                      </>
                    ) : (
                      <div className="menu-loading">loading...</div>
                    )}
                  </div>
                )}
              </UnstyledLink>
            )
          })}
        </div>
      </div>
    </StyledTimeline>
  )
}

const mapStateToProps = (state) => ({
  tasksState: state.tasks,
  upcomingTasks: selectUpcomingTasks(state),
  activeTask: selectActiveItem(state),
})

export const ConnectedTimeline = connect(
  mapStateToProps,
  {  }
)(Timeline)

const StyledTimeline = styled.div`
  &.timeline-1 {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 52px;
    padding-bottom: 12px;
    background: transparent;

    .timeline-line {
      width: 2px; // or 1px, test which one looks best
      // background: rgba(0,0,0,.88);
      background: #363636;
      height: calc(100vh - 86px - 52px - 56px - 12px - 16px);
      z-index: 1012;
      // height: 100%;
    }
    .dots-container {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin-top: 24px;
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

        .dot-image {
          display: inline-block;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          z-index: 1000;

          &.dot-red {
            background: ${bulmaColors.danger};
          }
          &.dot-yellow {
            background: ${bulmaColors.warning};
          }
          &.dot-green {
            background: ${bulmaColors.success};
          }
          &.dot-blue {
            background: ${bulmaColors.link};
          }

          &:hover {
            border: 1px solid rgba(0,0,0,.8);
          }
        }
      }
    }
  }

  .menu-loading {
    font-size: 18px;
    margin: 20px;
    text-align: center;
  }
`