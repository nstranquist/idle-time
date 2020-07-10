import React from 'react'
import styled from 'styled-components'
import { Timeblocking } from '../../components/Timeblocking'
import { BottomBar } from '../../components/BottomBar'


export const Home = () => {
  return (
    <HomePage>
      <Timeblocking />
      <BottomBar />
    </HomePage>
  )
}

const HomePage = styled.div`
  position: relative;
  height: 100%;
  height: calc(100% - 85px);
  max-height: calc(100% - 85px);
`