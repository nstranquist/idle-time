import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

export const Tasks = ({
  tasks
}) => {
  return (
    <StyledTasks>
      <header className="tasks-header">
        <h3>Your Tasks</h3>
      </header>
      <div className="tasks-inner">
        <section className="tasks-section current-tasks">
          <h5>Today's Tasks</h5>
          {tasks.length > 0 ? tasks.map((task, index) => (
            <div className="task-item">
              task here
            </div>
          )) : (
            <p style={{padding:8}}>No tasks to show</p>
          )}
        </section>

        <section className="tasks-section">
          <h5>Upcoming Tasks</h5>
          <p style={{padding:8}}>No tasks to show</p>
        </section>

        <section className="tasks-section">
          <h5>Previous Tasks</h5>
          <p style={{padding:8}}>No tasks to show</p>
        </section>
      </div>
    </StyledTasks>
  )
}

const mapStateToProps = (state) => ({
  tasks: state.tasks
})

export const ConnectedTasks = connect(
  mapStateToProps,
  {  }
)(Tasks)

const StyledTasks = styled.div`
  padding-left: 20px;
  padding-right: 20px;

  .tasks-header {

  }
  .tasks-inner {

  }
  .tasks-section {
    margin-top: 3%;
    margin-bottom: 3%;

    h5 {
      margin-bottom: 4px;
    }
  }
  .task-item {

  }
`