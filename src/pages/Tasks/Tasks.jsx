import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { selectTasks, selectTasksLoading, selectTasksErrors } from '../../store/Tasks/selectors'
import { selectAuthToken } from '../../store/Auth/selectors'
import { getTasks, addTask, updateTask, removeTask, clearTaskErrors } from '../../store/Tasks'
import { ErrorText } from '../../components/ErrorText'

export const Tasks = ({
  token,
  tasks,
  loading,
  errors,
  getTasks,
  addTask,
  updateTask,
  removeTask,
  clearTaskErrors
}) => {

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = () => -getTasks(token);

  return (
    <StyledTasks className="section-container">
      <header className="section-header tasks-header">
        <h3 className="header-text is-size-3">Your Tasks</h3>
        {errors && <ErrorText message={errors} clearErrors={clearTaskErrors} /> }
      </header>
      <div className="tasks-inner">
        <section className="tasks-section current-tasks">
          <h5 className="is-size-5">Today's Tasks:</h5>
          {loading && (
            <div style={{display:'flex', justifyContent:'center',alignItems:'center',minHeight:50,textAlign:'center'}}>
              <p style={{marginBottom: 0, textAlign:'center',alignSelf:'center'}}>Loading...</p>
            </div>
          )}
          {tasks.length > 0 ? tasks.map(task => (
            <TaskItem className="task-item" key={task._id}>
              <p className="task-text task-title">{task.title}</p>
              {task.desc && <p className="task-text task-title">{task.desc}</p>}
              <p className="task-text task-duration">duration: {task.duration}</p>
              <p className="task-text task-priority">priority: {task.priority}</p>
              <p className="task-text task-order">order: {task.index}</p>
              {task.startTime && <p className="task-text task-start-time">{task.startTime}</p>}
            </TaskItem>
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
  token: selectAuthToken(state),
  tasks: selectTasks(state), // note: select the tasks in order
  loading: selectTasksLoading(state),
  errors: selectTasksErrors(state),
  // ...
})

export const ConnectedTasks = connect(
  mapStateToProps,
  { getTasks, addTask, updateTask, removeTask, clearTaskErrors }
)(Tasks)

const TaskItem = styled.div`
  &.task-item {
    padding-top: .7rem;
    padding-bottom: .7rem;
    border-bottom: 1px solid rgba(0,0,0,.1);

    .task-text {
      margin-top: .333em;
      margin-bottom: .333em;
    }
  }
`
const StyledTasks = styled.div`
  overflow-y: auto;
  // max-height: 100%;
  // position: relative;
  position: initial;
  height: 100%;

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
`