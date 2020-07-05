import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { selectTasks, selectTasksLoading, selectTasksErrors } from '../../store/selectors/tasks'
import { getTasks, addTask, updateTask, removeTask, } from '../../store/Tasks'
import { ErrorText } from '../../components/ErrorText'

export const Tasks = ({
  tasks,
  loading,
  errors,
  getTasks,
  addTask,
  updateTask,
  removeTask,
}) => {
  return (
    <StyledTasks className="section-container">
      <header className="section-header tasks-header">
        <h3 className="header-text is-size-3">Your Tasks</h3>
        {errors && <ErrorText message={errors} /> }
      </header>
      <div className="tasks-inner">
        <section className="tasks-section current-tasks">
          <h5>Today's Tasks</h5>
          {loading && (
            <div style={{display:'flex', justifyContent:'center',alignItems:'center',minHeight:50,textAlign:'center'}}>
              <p style={{marginBottom: 0, textAlign:'center',alignSelf:'center'}}>Loading...</p>
            </div>
          )}
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
  tasks: selectTasks(state),
  loading: selectTasksLoading(state),
  errors: selectTasksErrors(state),
  // ...
})

export const ConnectedTasks = connect(
  mapStateToProps,
  { getTasks, addTask, updateTask, removeTask }
)(Tasks)

const StyledTasks = styled.div`
  

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