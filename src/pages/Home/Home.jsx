import React from 'react'
import styled from 'styled-components'
import { Timeblocking } from '../../components/Timeblocking'
import { BottomBar } from '../../components/BottomBar'


export const Home = () => {
  return (
    <StyledHome>
      <Timeblocking />
      <BottomBar />
    </StyledHome>
  )
}

const StyledHome = styled.div`
  position: relative;
  // width: 100%;
`