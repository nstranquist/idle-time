// src/components/Timeblocking/Timeblocking.jsx

// library imports
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// import moment from 'moment'

// import components
import { Toolbar } from './Toolbar'
import { ConnectedTimeline as Timeline } from '../Timeline'
import { TimeBlock } from './TimeBlock'
import { ErrorText } from '../ErrorText'
import { Timer } from './Timer'
import { AddButton } from '../Buttons'
import { NewBlock } from '../Blocks'
import { DragIconBar } from './DragIconBar'

// import redux actions
import { addTask, updateTask, removeTask, setTaskIndex } from '../../store/Tasks'
import { selectOrderedTasks } from '../../store/selectors'

// import styles, other components
import { pageOptions } from '../../styles/pageOptions'
import { boxShadows } from '../../styles/shadows.style'
import { bulmaColors } from '../../styles/bulma.colors'
import { selectTasksLoading, selectTasksErrors } from '../../store/selectors/tasks'
// import { emptyNewTask } from '../../constants'


const Timeblocking = ({
  tasks,
  loading,
  errors,
  addTask,
  updateTask,
  removeTask,
  setTaskIndex,
}) => {

  const [timer, setTimer] = useState(new Timer())
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formErrors, setFormErrors] = useState(null)
  const [activeTask, setActiveTask] = useState(undefined)
  const [areTasksCollapsed, setAreTasksCollapsed] = useState(true)

  const [isDragging, setIsDragging] = useState(false)
  const [dropId, setDropId] = useState(undefined)

  useEffect(() => {
    console.log('tasks updated:', tasks)
  }, [tasks])

  const handleAddToggle = () => {
    // clean up previous editing state
    if(isEditing) {
      onSave(activeTask)
      setIsEditing(false)
    }
    setActiveTask(undefined)

    // then toggle the adding block
    setIsAdding(true)
  }

  const handleAddSubmit = (newTaskData) => { // submits new task
    console.log('new task:', newTaskData)
    if(newTaskData) {
      console.log('new task:', newTaskData, 'id:', tasks.length.toString())
      // add task
      addTask({
        ...newTaskData,
        id: tasks.length.toString()
      })
      setIsAdding(false)
    }
  }

  const handleAddCancel = () => {
    console.log('add cancelled')
    setFormErrors(null)
    setIsAdding(false)
  }

  const startTimer = () => {
    // start timer and adjust / align time blocks
    timer.startTimer();
  }
  
  const onInputClick = (taskData, fieldName) => {
    if(isEditing && taskData)
      // submit existing form, switch active editing id
      onSave(activeTask)
    else
      setIsEditing(true)

    setActiveTask({
      ...taskData,
      activeField: fieldName
    })
  }

  const onSave = (taskData = undefined, finished = true) => {
    console.log('called onSave')
    // save data in the state
    if(taskData)
      updateTask(taskData)

    if(finished) {
      setIsEditing(false)
      setActiveTask(undefined)
    }
  }

  const onCancel = () => {
    setIsEditing(false)
    setActiveTask(undefined)
  }

  const dragStart = (event, id) => {
    // set isDragging to true
    setIsDragging(true)
    event.originalEvent.dataTransfer.effectAllowed = 'move'
    event.originalEvent.dataTransfer.setData('text/plain', id)
    console.log('drag has started with event:', event, 'currentTarget:', event.currentTarget.id)
  }

  const dragEnd = (event) => {
    // set isDragging to true
    console.log('drag has stopped with event:', event, 'target:', event.target, 'id:', event.target.id, 'currentTarget id:', event.currentTarget.id)
    console.log('event srcElement:', event.srcElement)

    if(dropId) {
      const elementId = event.target.id;

      console.log('target id:', elementId, 'currentTarget id:', event.currentTarget.id)

      if(elementId) {
        // if(elementId === "trashIcon") {
          // delete the item with id
          removeTask(elementId);
        // }
        // else if(elementId === 'saveIcon') {
          // add to archives or some shit
          // console.log('attempted to save the element')
        // }
      }
    }
    else
      console.log('drop id was undefined, so no action was taken')

    setIsDragging(false)

  }

  const handleDrop = (e, action) => {
    const id = e.dataTransfer.getData("id")

    if(action === 'trash') {
      console.log('id to remove:', id)
      removeTask(id)
    }
    else if(action === 'save') {
      console.log('save item with id', id, 'to presets')
    }
  }

  const onDragStart = (start) => {
    console.log('on drag start')

  }
  const onDragUpdate = (update) => {
    console.log('on drag update')

  }
  const onDragEnd = (result) => {
    console.log('on drag end. result:', result)
    // new index: result.destination.index / droppableId
    // old index: result.source.index / droppableId
    const { destination, source, draggableId, type } = result;

    if(!destination)
      return;

    if(destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if(type === 'day') {
      // const newTasksOrder = Array.from(tasks);
      // newTasksOrder.splice(source.index, 1)
      // const foundTask = tasks.find(task => task.id === draggableId)
      // newTasksOrder.splice(destination.index, 0, foundTask)

      setTaskIndex(draggableId, source.index, destination.index)
      return;
    }
  }

  return (
    <StyledTimeblocking className="idle-time-page container" style={{position:'relative'}}>
      <DragDropContext
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        {/* After inline-styles, make its own styled-component called TrashStyled */}
        {isDragging === true && (
          <DragIconBar

          />
        )}

        {/* Content-Left */}
        <div className="section-left">

          {/* Timeline */}
          <div className="timeline">
            <Timeline
              timer={timer}
            />
          </div>
        </div>

        {/* Content-Right */}
        <div className="section-right">

          {/* Toolbar */}
          <Toolbar
            height={pageOptions.toolbarHeight}
            timer={timer}
            startTimer={() => timer.startTimer()}
            pauseTimer={() => timer.pauseTimer()}
            stopTimer={() => timer.stopTimer()}
            areTasksCollapsed={areTasksCollapsed}
            handleCollapse={() => setAreTasksCollapsed(!areTasksCollapsed)}
          />

          <div className="section-right-inner">
          
            {/* Task Cards */}
            <div className="task-cards">

              <Droppable
                droppableId={"monday"} // todo: get the day from "new Date()" using moment
                direction="vertical"
                type="day"
              >
                {(provided, snapshot) => (
                  <div
                    className="task-cards-inner"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {tasks.length > 0 && tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        type="timeblock"
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <TimeBlock
                              // dragging props
                              isDragging={snapshot.isDragging}
                              // other props
                              taskData={task}
                              activeField={activeTask ? activeTask.activeField : undefined}
                              isEditing={activeTask && task.id === activeTask.id}
                              onInputClick={onInputClick}
                              onSave={onSave}
                              onCancel={onCancel}
                              handleDragStart={dragStart}
                              handleDragEnd={dragEnd}
                              isCollapsed={areTasksCollapsed}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              {formErrors && <ErrorText message={formErrors} />}
              
              {isAdding && (
                <NewBlock
                  onSubmit={handleAddSubmit}
                  onCancel={handleAddCancel}
                />
              )}
            </div>

            {/* Add Task / Submit Task Button */}
            {!isAdding && (
              <div className="add-button-container">
                <AddButton handleClick={handleAddToggle} />
              </div>
            )}
          </div>
        </div>
      </DragDropContext>
    </StyledTimeblocking>
  )
}

const mapStateToProps = (state) => ({
  tasks: selectOrderedTasks(state),
  loading: selectTasksLoading(state),
  errors: selectTasksErrors(state),
})

export const ConnectedTimeblocking = connect(
  mapStateToProps,
  { addTask, updateTask, removeTask, setTaskIndex }
)(Timeblocking)

const StyledTaskCard = styled.div`
`

const StyledTimeblocking = styled.div`
  position: relative;
  height: calc(100% - 56px);
  // overflow-y: auto;
  // padding-top: 16px;
  // padding-bottom: -16px;
  // height: calc(100vh - 85px - 16px - 56px); // 85px for topbar, 16px for top padding, 56px for bottom bar

  .section-left {
    width: ${pageOptions.timelineWidth};
    // height: 100%;
    float: left;
    border-right: 1px solid rgba(0,0,0,.09);
    // padding-top: 16px;
  }
  .section-right {
    margin-left: ${pageOptions.timelineWidth};
    dislay: flex;
    flex-direction: column;

    .section-right-inner {
      padding-left: 20px;
      padding-right: 20px; // remove if using overflow side-scroll for kanban
      padding-top: 6px;
      height: calc(100vh - 85px - 40px - 56px); // topbar, toolbar, bottombar
      overflow-y: auto;
    }
    
    .task-cards {
      // bottombar: 56px, toolbar: 40px + 12px margin, addButton: 40px + 12px margin, topbar: 85px, containerPadding: 16px
      // = 56px + 52px + 52px + 85px + 16px
      // height: calc(100vh - 56px - 104px - 85px - 10px);
      padding-top: 6px;
      padding-bottom: 6px;
      // border-top: 1px solid rgba(0,0,0,.12);
      // overflow-y: auto;
      padding-right: 8px;
      // height: 100%;

      .task-card {
        padding: 12px 20px; // NOTE: adjust the padding to make responsive
        background: ${bulmaColors.light};
        border: 1px solid rgba(0,0,0,.15);
        border-radius: 8px;
        margin-bottom: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // box-shadow: ${boxShadows.shadow};

        h3 {
          margin-bottom: 0;
        }
        p {
          margin-top: .6666em;
        }

        .task-left {
          padding-right: 8px;

          .icon {
            cursor: pointer;
            padding: 16px;
            border-radius: 50%;
            height: 44px;
            width: 44px;
            padding: 6px;
            transition: background-color .2s ease-in-out;

            &:hover {
              background-color: rgba(0,0,0,.07);
              border-radius: 50%;
              transition: background-color .15s ease-in-out;
            }
          }
        }
        .task-body {
          flex: 1;

          .task-card-title {
            font-size: 26px;
            line-height: 32px;
            font-weight: 500;
            color: #000;
          }
          .task-card-note {
            font-size: 20px;
            line-height: 24px;
            color: #000;
            font-weight: normal;
          }
        }
        .task-right {  }
      }
    }
    .add-button-container,
    .submit-button-container {
      padding-top: 6px;
      margin-bottom: 6px;
      text-align: center;

      .add-task-button,
      .submit-task-button {
        // border-radius: 0;
        font-family: montserrat, sans-serif;
        font-style: normal;
        box-shadow: ${boxShadows.shadow2};
      }
    }
    .add-button-container {
      // border-top: 1px solid rgba(0,0,0,.1);
    }
  }

  @media(min-width: 1672px) {
    &.container {
      border-left: 1px solid rgba(0,0,0,.09);
      border-right: 1px solid rgba(0,0,0,.09);

      .timeline {
        border-left: 1px solid rgba(0,0,0,.09);
      }
  }
`
