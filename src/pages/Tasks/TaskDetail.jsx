import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { selectTasks } from '../../store/Tasks/selectors'

const TaskDetail = ({
  route,
  match,
  tasks,
}) => {
  const [taskData, setTaskData] = useState(undefined)
  const [nextTaskId, setNextTaskId] = useState(undefined)
  const [prevTaskId, setPrevTaskId] = useState(undefined)

  useEffect(() => {
    // find task by id, then set the taskData
    async function findTaskById() {
      const taskId = match.params.taskId;
      if(taskId) {
        const activeTask = await tasks.find(task => task._id === taskId)
        console.log('found task:', activeTask)
        if(activeTask.order || activeTask.order === 0) findTasksByOrder(activeTask.order)
        else console.log("the task did not have an order")
        setTaskData(activeTask)
      }
    }

    findTaskById();
  }, [match.params.taskId])

  async function findTasksByOrder(order) {
    if(order > 0) {
      const prevOrder = order - 1;
      const prevTask = await tasks.find(task => task.order === prevOrder)
      if(prevTask) {setPrevTaskId(prevTask._id)
        console.log('prev task id:', prevTask._id)}
    }
    if(order < tasks.length) {
      const nextOrder = order + 1;
      const nextTask = await tasks.find(task => task.order === nextOrder)
      if(nextTask) {setNextTaskId(nextTask._id)
        console.log('next task id:', nextTask._id)}

    }
  }

  return (
    <TaskDetailStyled className="section-container large-padding">
      {/* Next Task, Previous Task toolbar */}
      
      {taskData ? (
        <>
          <div className="task-navigation-toolbar">
            {prevTaskId ? (
              <Link
                to={"/tasks/" + prevTaskId}
                className="button is-small is-ghost is-light"
              >
                <span className="icon" style={{marginRight:4}}><ArrowLeft /></span>
                Previous Task
              </Link>
            ) : (
              <button
                className="button is-small is-ghost is-light"
                disabled
              >
                <span className="icon" style={{marginRight:4}}><ArrowLeft /></span>
                Previous Task
              </button>
            )}

            <p className="no-formatting">#{(taskData.order + 1)} of {tasks.length}</p>

            {nextTaskId ? (
              <Link
                to={"/tasks/" + nextTaskId}
                className="button is-small is-ghost is-info"
              >
                Next Task
                <span className="icon" style={{marginLeft:4}}><ArrowRight /></span>
              </Link>
            ) : (
              <button
                className="button is-small is-ghost is-info"
                disabled
              >
                Next Task
                <span className="icon" style={{marginLeft:4}}><ArrowRight /></span>
              </button>
            )}
          </div>
          <div className="">
            <header className="task-header">
              <h1>{taskData.title}</h1>
              <h5>{taskData.desc && taskData.desc}</h5>
            </header>
            <div className="task-body">
              <p className="is-size-5"><strong>{taskData.duration}</strong> minutes</p>
              <p className="is-size-5"><strong>{taskData.priority}</strong> - priority level</p>
              {taskData.createdAt && (<p className="is-size-5"><strong>{moment(taskData.createdAt).format('h:mm a  M-DD-YYYY')}</strong> - date created</p>)}
            </div>
          </div>
        </>
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

  .task-navigation-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
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
