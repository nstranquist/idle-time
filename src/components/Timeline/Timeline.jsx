import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export const Timeline = () => {
  const [viewHeight, setViewHeight] = useState("0px");  

  useEffect(() => {
    // on mount, calculate the height (?)
    const newViewHeight = 85 + 52 + 56 + 12 + 16;
    console.log('new view height:', newViewHeight)
    setViewHeight(newViewHeight)
  }, [])

  return (
    <StyledTimeline className="timeline-1">
      <div className="timeline-line"></div>
    </StyledTimeline>
  )
}

const StyledTimeline = styled.div`
  &.timeline-1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 52px;
    padding-bottom: 12px;

    .timeline-line {
      width: 2px; // or 1px, test which one looks best
      // background: rgba(0,0,0,.88);
      background: #363636;
      height: calc(100vh - 86px - 52px - 56px - 12px - 16px);
    }
  }
`