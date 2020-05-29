

const ADD_TASK = "ADD_TASK"
const REMOVE_TASK = "REMOVE_TASK"

const SET_LOADING = "SET_LOADING" // for use after adding / loading a task
const SET_ERRORS = "SET_ERRORS"
const CLEAR_ERRORS = "CLEAR_ERRORS"



export const setErrors = (error) => ({
  type: SET_ERRORS,
  err: error.toString()
})
export const clearErrors = () => ({
  type: CLEAR_ERRORS
})

export const addTask = (taskData) => (dispatch) => {
  dispatch({ type: 'SET_LOADING' })

  // call to api

  dispatch({
    type: ADD_TASK,
    taskData
  })
}

export const removeTask = (taskId) => (dispatch) => {
  

  dispatch({
    type: REMOVE_TASK,
    id: taskId,
  })
}



const initialState = {
  tasks: [],
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