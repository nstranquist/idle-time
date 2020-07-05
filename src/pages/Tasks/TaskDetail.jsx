import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { selectTasks } from '../../store/selectors/tasks'

const TaskDetail = ({
  route,
  match,
  tasks,
}) => {
  const [taskData, setTaskData] = useState(undefined)

  useEffect(() => {
    // find task by id, then set the taskData
    async function findTaskById() {
      const taskId = match.params.taskId;
      if(taskId) {
        const activeTask = await tasks.find(task => task.id === taskId)
        setTaskData(activeTask)
      }
    }

    findTaskById();
  }, [match.params.taskId])

  return (
    <TaskDetailStyled className="section-container large-padding">
      {taskData ? (
        <div className="">
          <header className="task-header">
            <h1>{taskData.title}</h1>
            <h5>{taskData.desc && taskData.desc}</h5>
          </header>
          <div className="task-body">
            <p>other information about the task...</p>
          </div>
        </div>
      ) : (
        <div className="loading-container">loading task detail...</div>
      )}
    </TaskDetailStyled>
  )
}

const mapStateToProps = (state) => ({
  tasks: selectTasks(state),
})

export const ConnectedTaskDetail = connect(
  mapStateToProps,
  {  }
)(TaskDetail)

export default ConnectedTaskDetail

const TaskDetailStyled = styled.main`
  text-align: left;

  .task-header {
    margin-bottom: 35px;
  }
  .task-body {

  }
  .loading-container {
    text-align: center;
    margin: 20px;
    font-size: 22px;
    font-family: sans-serif;
  }
`
