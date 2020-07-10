// import { startingTasks, startingTasksOrder } from '../../data/tasks.data'

const BASE_URL = "http://localhost:8080"

// Action Types
const SET_TASKS = "SET_TASKS"
const ADD_TASK = "ADD_TASK"
const UPDATE_TASK = "UPDATE_TASK"
const REMOVE_TASK = "REMOVE_TASK"

const SET_TASKS_ORDER = "SET_TASKS_ORDER"
const SET_SORTING_ERROR = 'SET_SORTING_ERROR'

const SET_LOADING = "SET_LOADING" // for use after adding / loading a task
const SET_ERRORS = "SET_ERRORS"
const CLEAR_ERRORS = "CLEAR_ERRORS"


// Action Creators
const setLoading = () => ({ type: SET_LOADING })

const setTasks = (tasks) => ({ type: SET_TASKS, tasks })
const setTasksOrder = (tasksOrder) => ({ type: SET_TASKS_ORDER, tasksOrder })

const addTaskAction = (task) => ({ type: ADD_TASK, taskData: task })
const updateTaskAction = (task) => ({ type: UPDATE_TASK, taskData: task })
const removeTaskAction = (id) => ({ type: REMOVE_TASK, id })


// note: can add better logic for error handling here
export const setErrors = (err) => {
  
  return {
    type: SET_ERRORS,
    err: err.toString()
  }
}
export const clearErrors = () => ({ type: CLEAR_ERRORS })

const setSortingError = (err) => ({ type: SET_SORTING_ERROR, err })


// Thunk Actions
export const getTasks = (token) => (dispatch) => {
  dispatch(setLoading())

  fetch(BASE_URL + '/tasks', {
    method : 'GET',
    headers: {
      // 'Accept': 'application/json',
      'x-access-token': token,
    },
  })
    .then(async (res) => ({ data: await res.json(), status: res.status }))
    .then((object) => {
      const { data, status } = object;
      console.log('response data:', object)
      if((data.status === "success" || status < 400)) {
        if(data.data.tasks)
          dispatch(setTasks(data.data.tasks))
        else
          dispatch(setErrors('error: tasks undefined coming from server'))
        // fetch(BASE_URL + '/tasks/order', {
        //   method: 'GET',
        //   headers: {
        //     'x-access-token': token,
        //   }
        // })        
        //   .then(async res => ({ data: await res.json(), status: res.status }))
        //   .then(object => {
        //     const { data, status } = object;
        //     console.log('response object:', object)
        //     if((data.staus === 'success' || status < 400) && data.data.tasksOrder) {
        //       dispatch(setTasksOrder(data.data.tasksOrder))
        //       dispatch(setTasks(newTasks))
        //     }
        //     else
        //       dispatch(setErrors(`${status} error: ${data.message}` || 'error getting tasks order'))
        //   })
        //   .catch(err => {
        //     console.error('err:', err)
        //     dispatch(setErrors(err.message || 'error with tasksOrder'))
        //   })
      }
      else
        dispatch(setErrors(`${status} error: ${data.message}` || 'error getting tasks'))
    })
    .catch(err => {
      console.log('error logging in:', err)
      dispatch(setErrors(err.message || "error getting tasks from server"))
    })
}

// export const getTasksOrder = (token) => (dispatch) => {
//   dispatch(setLoading())
  
//   fetch(BASE_URL + '/tasks/order', {
//     method: 'GET',
//     headers: {
//       'x-access-token': token,
//     }
//   })
//     .then(async res => ({data: await res.json(), status: res.status}))
//     .then(object => {
//       const { data, status } = object;
//       console.log('response object:', object)
//       if((data.status === 'success' || status < 400) && data.data.tasksOrder)
//         dispatch(setTasksOrder(data.data.tasksOrder))
//       else
//         dispatch(setErrors(data.message || 'error getting tasks order from server'))
//     })
//     .catch(err => {
//       console.error('error getting ordered tasks from server:', err)
//       dispatch(setErrors(err.message || err))
//     })
// }

export const addTask = (token, taskData, bottom=true) => (dispatch) => {
  console.log('taskData in thunk:', taskData)


  fetch(BASE_URL + '/tasks/add', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify({taskData}),
  })
    .then(async res => ({ data: await res.json(), status: res.status }))
    .then(object => {
      console.log('response data:', object)
      const { data, status } = object;
      console.log('taskData:', data.data.taskData)
      if(data.status === "success" || status < 400) {
        if(data.data.taskData) {
          console.log('task added successfully with response:', data.data.taskData);
          dispatch(addTaskAction(data.data.taskData))        
        }
        // if(!bottom) {
        //   // update the tasksOrder

        //   // and run another fetch request to update the database's tasksOrder

        // }
        // else
        else
          dispatch(setErrors("task data came back undefined"))
      }
      else {
        dispatch(setErrors(`${status} error: ${data.message}` || "error adding task" ))
        // dispatch(removeTaskAction(taskData.id))
      }
    })
    .catch(err => {
      console.log('error adding task:', err)
      dispatch(setErrors(err.message || "error adding task"))
    })
}

export const updateTask = (token, taskId, taskData) => (dispatch) => {
  dispatch(updateTaskAction(taskData))

  fetch(BASE_URL + '/tasks/update/' + taskData.id, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify({taskData: taskData})
  })
    .then(async res => ({ data: await res.json(), status: res.status }))
    .then(object => {
      console.log('response object:', object)
      const { data, status } = object

      if((data.status === 'success' || status < 400) && data.data.taskData )
        dispatch(updateTaskAction(data.data.taskData))
      else {
        dispatch(setErrors(`${status} error: ${data.message}` || "error updating task"))
        dispatch(updateTaskAction(taskData))
      }

    })
    .catch(err => {
      console.log('error updating task:', err)
      dispatch(setErrors(err.message || "error updating task" ))
      dispatch(updateTaskAction(taskData))
    })
}

export const removeTask = (token, taskId) => (dispatch, getState) => {
  const tempTask = getState().tasks.tasks.find(task => task.id === taskId);

  dispatch(removeTaskAction(taskId))

  fetch(BASE_URL + "/tasks/delete/" + taskId, {
    method: 'DELETE',
    headers: {
      'x-access-token': token,
    }
  })
    .then(async res => {
      console.log('response:', res)
      return { data: await res.json(), status: res.status }
    })
    .then(object => {
      const { data, status } = object;
      console.log("response object:", object);

      if(data.status === "success" || status < 400) {
        // if(!data.data.taskId)
          // dispatch(setErrors('taskId from server undefined'))
        // else {
          // console.log('task deleted successfully by id:', data.data.taskId);
          // dispatch(removeTaskAction(data.data.taskId))
          // remove id from tasks array
          // const newTasksOrder = getState().tasks.tasksOrder.filter(id => id !== data.data.taskId);
          // update local
          // dispatch(setTasksOrder(newTasksOrder))
        // }
        console.log('success')
      }
      else {
        dispatch(setErrors(`${status} error:` || "error removing task" ))
        if(tempTask) dispatch(addTaskAction(tempTask))
      }
    })
    .catch(err => {
      console.log('error removing task:', err);
      dispatch(setErrors(err.message || "error removing task"))
    })
}

export const updateTasksOrder = (token, taskId, sourceIndex, destinationIndex) => async (dispatch, getState) => {
  // todo: move the sorting code from the reducer, and use here to update the task on the server as well
  console.log('setting task index. source:', sourceIndex, 'destination:', destinationIndex)
  // const tasks = getState().tasks.tasks;
  const tasksOrder = getState().tasks.tasksOrder;
  console.log('tasksOrder:', tasksOrder)
  // Steps to resolve:
  // need to update the index at taskId with action.destinationIndex;

  // but, all ids after it must be incremented,

  const newTasksOrder = await tasksOrder.map((id, index) => {
    let order = index;
    if(index > sourceIndex && index <= destinationIndex) {
      order--;
    }
    else if(index < sourceIndex && index >= destinationIndex) {
      order++;
    }
    if(id === taskId) {
      order = destinationIndex;
    }

    return order;
  })

  // basically, updating task in mongodb.
  // should definitely update asynchronously, and let ui update without database updating
  // dispatch({ type: SORTING_TASKS })
  dispatch(setTasksOrder(newTasksOrder))
  
  // update taskOrder in API
  fetch(BASE_URL + '/tasks/order', {
    method: 'PUT',
    headers: {
      'x-access-token': token,
    },
    body: JSON.stringify({ tasksOrder: newTasksOrder })
  })
    .then(async res => ({ data: await res.json(), status: res.status }))
    .then(object => {
      console.log('response object:', object)
      const { data, status } = object;

      if(data.status === "success" || status < 400)
        console.log('successfully updated tasks')
      else {
        dispatch(setSortingError(`${data.status} error: ${data.message}` || "error updating tasks sort order" ));
        dispatch(setTasksOrder(tasksOrder)) // reset the order of tasks
      }
      // dispatch({ type: STOP_SORTING_TASKS })
    })
    .catch(err => {
      console.log('error updating tasks order:', err)
      dispatch(setSortingError(err.message || "error updating tasks sort order"));
      dispatch(setTasksOrder(tasksOrder)) // reset the order of tasks
      // dispatch({ type: STOP_SORTING_TASKS })
    })
}


// Reducer
const initialState = {
  tasks: [], // for one day only, for now(?)
  tasksOrder: [], // an object/map of index:id (key:value) to order the tasks by
  loading: false,
  errors: null,
  sortingErrors: null,
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
    case SET_TASKS:
      return {
        ...state,
        loading: false,
        tasks: action.tasks,
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
    case SET_TASKS_ORDER:
      return {
        ...state,
        loading: false,
        tasksOrder: action.tasksOrder,
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
    case SET_SORTING_ERROR:
      return {
        ...state,
        loading: false,
        sortingErrors: action.err
      }
    default:
      return state;
  }
}

// Old Code:
// and all ids before it don't need any tweaking
// const newTasksOrder = await tasksOrder.map((id, index) => { // 
//   // source index = 4
//   // destination index = 0
//   // for given task at index 0:
//   // 0 > 4 && ... FALSE
//   // 0 < 4 && 0 > 0 ... FALSE... but change to >= and you're good
//   if(task.order > sourceIndex && task.order <= destinationIndex) {
//     task.order--;
//   }
//   else if(task.order < sourceIndex && task.order >= destinationIndex) {
//     task.order++;
//   }
//   if(task.id === taskId) {
//     task.order = destinationIndex;
//   }
//   return task;
// })