import { startingTasks } from './tasks.data'

const ADD_TASK = "ADD_TASK"
const UPDATE_TASK = "UPDATE_TASK"
const REMOVE_TASK = "REMOVE_TASK"

const SET_LOADING = "SET_LOADING" // for use after adding / loading a task
const SET_ERRORS = "SET_ERRORS"
const CLEAR_ERRORS = "CLEAR_ERRORS"


export const getTasks = () => (dispatch) => {
  
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



const initialState = {
  tasks: startingTasks,
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