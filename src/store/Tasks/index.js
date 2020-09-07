// import { startingTasks, startingTasksOrder } from '../../data/tasks.data'

import { BASE_URL, fetchUtil } from '../../utils/api';

// Action Types
const SET_TASKS = 'SET_TASKS';
const ADD_TASK = 'ADD_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const REMOVE_TASK = 'REMOVE_TASK';

const UPDATE_TASKS_ORDER = 'UPDATE_TASKS_ORDER';
const SET_TASKS_ORDER = 'SET_TASKS_ORDER';

const SET_TASKS_LOADING = 'SET_TASKS_LOADING'; // for use after adding / loading a task
const SET_TASKS_ERRORS = 'SET_TASKS_ERRORS';
const CLEAR_TASK_ERRORS = 'CLEAR_TASK_ERRORS';

// Action Creators
const setTasks = (tasks, order) => ({ type: SET_TASKS, tasks, order });
const setTasksOrder = (order) => ({ type: SET_TASKS_ORDER, order });

const addTaskAction = (task, order) => ({ type: ADD_TASK, task, order });
const updateTaskAction = (task) => ({ type: UPDATE_TASK, taskData: task });
const removeTaskAction = (id, order) => ({ type: REMOVE_TASK, id, order });

const setLoadingTasks = () => ({ type: SET_TASKS_LOADING });
export const setErrors = (err) => ({ type: SET_TASKS_ERRORS, err: err.toString() });
export const clearTaskErrors = () => ({ type: CLEAR_TASK_ERRORS });

// Thunk Actions
export const getTasks = (token) => (dispatch) => {
  dispatch(setLoadingTasks());

  fetch(`${BASE_URL}/tasks`, {
    method: 'GET',
    headers: {
      // 'Accept': 'application/json',
      'x-access-token': token,
    },
  })
    .then(async (res) => ({ data: await res.json(), status: res.status }))
    .then((object) => {
      const { data, status } = object;
      console.log('response data:', object);
      if ((data.ok || status < 400)) {
        if (data.data.tasks || data.data.order) {
          const { tasks, order } = data.data;
          dispatch(setTasks(tasks, order));
        } else { dispatch(setErrors('error: tasks undefined coming from server')); }
      } else { dispatch(setErrors(`${status} error: ${data.message}` || 'error getting tasks')); }
    })
    .catch((err) => {
      console.log('error logging in:', err);
      dispatch(setErrors(err.message || 'error getting tasks from server'));
    });
};

export const addTask = (token, taskData, bottom = true) => (dispatch) => {
  console.log('taskData in thunk:', taskData);

  fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify({ taskData }),
  })
    .then(async (res) => ({ data: await res.json(), status: res.status }))
    .then((object) => {
      console.log('response data:', object);
      const { data, status } = object;
      if (data.ok || status < 400) {
        const { task, order } = data.data;
        if (task && order) {
          console.log('task added successfully with response:', task);
          dispatch(addTaskAction(task, order));
        } else { dispatch(setErrors('task data and/or task order came back undefined')); }
        // if(!bottom) {
        //   // update the tasksOrder

        //   // and run another fetch request to update the database's tasksOrder

        // }
        // else
      } else {
        dispatch(setErrors(`${status} error: ${data.message}` || 'error adding task'));
        // dispatch(removeTaskAction(taskData._id))
      }
    })
    .catch((err) => {
      console.log('error adding task:', err);
      dispatch(setErrors(err.message || 'error adding task'));
    });
};

export const updateTask = (token, taskId, taskData) => (dispatch, getState) => {
  // dispatch(updateTaskAction(taskData))
  const ogtask = getState().tasks.tasks.find((task) => task._id === taskId);
  console.log('updating task with data:', taskData);
  console.log('original task data:', ogtask);
  if (taskData.order) delete taskData.order;

  fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify({ taskData }), // may not include the task id
  })
    .then(async (res) => ({ data: await res.json(), status: res.status }))
    .then((object) => {
      console.log('response object in updateTask:', object);
      const { data, status } = object;

      if (data.ok || status < 400) {
        console.log('data:', data.data.taskData, 'data:', data);
        dispatch(updateTaskAction(data.data.taskData));
      } else { dispatch(setErrors(`${status} error: ${data.message}` || 'error updating task')); }
    })
    .catch((err) => {
      console.log('error updating task:', err);
      dispatch(setErrors(err.message || 'error updating task'));
    });
};

export const removeTask = (token, taskId) => (dispatch) => {
  fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'x-access-token': token,
    },
  })
    .then(async (res) => {
      console.log('response:', res);
      return { data: await res.json(), status: res.status };
    })
    .then((object) => {
      const { data, status } = object;
      console.log('response object:', object);

      if (data.ok || status < 400) {
        const { order } = data.data;
        dispatch(removeTaskAction(taskId, order));
        // if(!data.data.taskId)
        // dispatch(setErrors('taskId from server undefined'))
        // else {
        // console.log('task deleted successfully by id:', data.data.taskId);
        // dispatch(removeTaskAction(data.data.taskId))
        // remove id from tasks array
        // const newTasksOrder = getState().tasks.order.filter(id => id !== data.data.taskId);
        // update local
        // dispatch(setTasksOrder(newTasksOrder))
        // }
      } else {
        dispatch(setErrors(`${status} error:` || 'error removing task'));
        // if(tempTask) dispatch(addTaskAction(tempTask))
      }
    })
    .catch((err) => {
      console.log('error removing task:', err);
      dispatch(setErrors(err.message || 'error removing task'));
    });
};

export const updateTasksOrder = (token, taskId, sourceIndex, destinationIndex) => async (dispatch, getState) => {
  // todo: move the sorting code from the reducer, and use here to update the task on the server as well
  // const tasks = getState().tasks.tasks;
  const tasksOrder = await getState().tasks.order;
  if (!tasksOrder) dispatch(setErrors('task order is undefined'));
  else {
    // Steps to resolve:
    // need to update the index at taskId with action.destinationIndex;

    // but, all ids after it must be incremented,

    const newTasksOrder = await tasksOrder.map((id, index) => {
      let order = index;
      if (index > sourceIndex && index <= destinationIndex) {
        order--;
      } else if (index < sourceIndex && index >= destinationIndex) {
        order++;
      }
      if (id === taskId) {
        order = destinationIndex;
      }
      return { order, id };
    });
    const tasksOrderSorted = await newTasksOrder.sort((a, b) => a.order - b.order);
    const tasksOrderArray = await tasksOrderSorted.map((obj) => obj.id);

    // basically, updating task in mongodb.
    // should definitely update asynchronously, and let ui update without database updating
    dispatch(setTasksOrder(tasksOrderArray));
    console.log('new tasks order in thunk, before db call:', tasksOrderArray);

    // update taskOrder in API
    fetch(`${BASE_URL}/tasks/order`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({ order: tasksOrderArray }),
    })
      .then(async (res) => ({ data: await res.json(), status: res.status }))
      .then((object) => {
        console.log('response object:', object);
        const { data, status } = object;

        if (data.ok || status < 400) {
          const { order } = data.data;
          dispatch(setTasksOrder(order));
        } else {
          dispatch(setErrors(`${status} error: ${data.message}` || 'error updating tasks sort order'));
          dispatch(setTasksOrder(tasksOrder)); // reset the order of tasks
        }
      })
      .catch((err) => {
        console.log('error updating tasks order:', err);
        dispatch(setErrors(err.message || 'error updating tasks sort order'));
        dispatch(setTasksOrder(tasksOrder)); // reset the order of tasks
      });
  }
};

// Reducer
const initialState = {
  tasks: [], // for one day only, for now(?)
  order: [], // an array of ordered task id's
  loading: false,
  errors: null,
};

export default (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case SET_TASKS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_TASKS:
      return {
        ...state,
        loading: false,
        tasks: action.tasks,
        order: action.order,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.task],
        order: action.order,
        loading: false,
        errors: null,
      };
    case UPDATE_TASK:
      console.log('taskData id:', action.taskData._id);
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task._id === action.taskData._id) { task = action.taskData; } // note: may be more elegant to only change the modified fields
          return task;
        }),
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.id),
        order: action.order,
      };
    case SET_TASKS_ORDER: case UPDATE_TASKS_ORDER:
      return {
        ...state,
        loading: false,
        order: action.order,
      };
    case SET_TASKS_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.err,
      };
    case CLEAR_TASK_ERRORS:
      return { ...state, errors: null };
    default:
      return state;
  }
};

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
//   if(task._id === taskId) {
//     task.order = destinationIndex;
//   }
//   return task;
// })

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
//       if((data.ok || status < 400) && data.data.tasksOrder)
//         dispatch(setTasksOrder(data.data.tasksOrder))
//       else
//         dispatch(setErrors(data.message || 'error getting tasks order from server'))
//     })
//     .catch(err => {
//       console.error('error getting ordered tasks from server:', err)
//       dispatch(setErrors(err.message || err))
//     })
// }
