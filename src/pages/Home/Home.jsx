import React from 'react'
import { Timeblocking } from '../../components/Timeblocking'
import { BottomBar } from '../../components/BottomBar'


export const Home = () => {
  return (
    <main style={{position:'relative'}}>
      <Timeblocking />
      <BottomBar />
    </main>
  )
}
