import React from 'react'
import { Timeblocking } from '../../components/Timeblocking'
import { BottomBar } from '../../components/BottomBar'


export const Home = () => {
  return (
    <div style={{position:'relative', height:'100%'}}>
      <Timeblocking />
      <BottomBar />
    </div>
  )
}
