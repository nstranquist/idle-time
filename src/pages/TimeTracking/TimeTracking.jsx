import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { selectTasks } from '../../store/selectors/tasks'

export const TimeTracking = ({
  tasks,
}) => {
  return (
    <div className="section-container">
      <header className="section-header">
        <h3 className="header-text is-size-3">Timetracking</h3>
      </header>
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

const StyledTimetracking = styled.div`

`