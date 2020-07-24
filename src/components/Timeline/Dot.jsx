import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
// import { boxShadows } from '../../styles/shadows.style'

export const Dot = ({
  dot,
  color
}) => {
  return (
    <TimelineDot to={`/tasks/${dot._id}`} className="dot-item" color={color} id={dot._id}>
      {/* {isHovering === dot.id && dotHoverData && (
        <DotHoverMenu className="dot-hover-menu">
          <h3 style={{wordBreak:'keep-all',wordWrap:'normal',overflowWrap:'normal',}}>{dotHoverData.title}</h3>
          {dotHoverData.desc && <p style={{opacity:1,fontSize:"1.1rem"}}>{dotHoverData.desc}</p>}
        </DotHoverMenu>
      )} */}
    </TimelineDot>
  )
}

// const DotHoverMenu = styled.div`
//   position: absolute;
//   top: 2px;
//   left: 20px;
//   padding: 14px 16px;
//   text-align: left;
//   background-color: #fff;
//   border: 1px solid rgba(0,0,0,.18);
//   border-radius: 6px;
//   box-shadow: ${boxShadows.shadow3};
//   width: 480px; // 120px * 4;  Note: needs update for responsiveness
// `

const TimelineDot = styled(Link)`
  background: ${props => props.color};

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