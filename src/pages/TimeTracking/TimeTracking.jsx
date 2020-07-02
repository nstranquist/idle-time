import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { selectTasks } from '../../store/selectors'

export const TimeTracking = ({
  tasks,
}) => {
  return (
    <div>
      Timetracking
    </div>
  )
}

const mapStateToProps = (state) => ({
  tasks: selectTasks(state),
})

export const ConnectedTimeTracking = connect(
  mapStateToProps,
  {  }
)(TimeTracking)