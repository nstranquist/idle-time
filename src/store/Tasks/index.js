import { startingTasks } from '../../data/tasks.data'

const ADD_TASK = "ADD_TASK"
const UPDATE_TASK = "UPDATE_TASK"
const REMOVE_TASK = "REMOVE_TASK"

const SET_TASK_INDEX = "SET_TASK_INDEX"
const SORTING_TASKS = "SORTING_TASKS"
const STOP_SORTING_TASKS = "STOP_SORTING_TASKS"

const SET_LOADING = "SET_LOADING" // for use after adding / loading a task
const SET_ERRORS = "SET_ERRORS"
const CLEAR_ERRORS = "CLEAR_ERRORS"


export const getTasks = () => (dispatch) => {
  // make api call & set loading to true

  // after successful get data, set Tasks to the user's tasks stored in the database

}

export const addTask = (taskData) => (dispatch) => {
  dispatch({
    type: ADD_TASK,
    taskData
  })
}
export const updateTask = (taskData) => (dispatch) => {
  dispatch({
    type: UPDATE_TASK,
    taskData,
  })
}
export const removeTask = (taskId) => (dispatch) => {
  dispatch({
    type: REMOVE_TASK,
    id: taskId,
  })
}

export const setErrors = (error) => ({
  type: SET_ERRORS,
  err: error.toString()
})
export const clearErrors = () => ({
  type: CLEAR_ERRORS
})

export const setTaskIndex = (taskId, sourceIndex, destinationIndex) => (dispatch) => {
  dispatch({ type: SORTING_TASKS })
  dispatch({
    type: SET_TASK_INDEX,
    taskId,
    sourceIndex,
    destinationIndex,
  })
  dispatch({ type: STOP_SORTING_TASKS })
}



const initialState = {
  tasks: startingTasks,
  sortingTasks: false,
  loading: false,
  errors: null,
}

export default (
  state=initialState,
  action
) => {
  switch(action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case ADD_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          action.taskData
        ],
        loading: false,
        errors: null
      }
    case UPDATE_TASK:
      console.log('taskData id:', action.taskData.id)
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if(task.id === action.taskData.id)
            task = action.taskData // note: may be more elegant to only change the modified fields
          return task;
        })
      }
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.id)
      }
    case SET_TASK_INDEX:
      console.log('setting task index. source:', action.sourceIndex, 'destination:', action.destinationIndex)
      
      // Steps to resolve:
      // need to update the index at taskId with action.destinationIndex;

      // but, all ids after it must be incremented,

      // and all ids before it don't need any tweaking
      const newTasksOrder = state.tasks.map((task) => {
        // source index = 4
        // destination index = 0
        // for given task at index 0:
        // 0 > 4 && ... FALSE
        // 0 < 4 && 0 > 0 ... FALSE... but change to >= and you're good
        if(task.index > action.sourceIndex && task.index <= action.destinationIndex) {
          task.index--;
        }
        else if(task.index < action.sourceIndex && task.index >= action.destinationIndex) {
          task.index++;
        }
        if(task.id === action.taskId) {
          task.index = action.destinationIndex;
        }
        return task;
      })

      return {
        ...state,
        tasks: newTasksOrder
      }
    case SORTING_TASKS:
      return {
        ...state,
        sortingTasks: true,
      }
    case STOP_SORTING_TASKS:
      return {
        ...state,
        sortingTasks: false,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null
      }
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.err
      }
    default:
      return state;
  }
}