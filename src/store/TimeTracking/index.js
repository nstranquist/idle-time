import { BASE_URL, fetchUtil } from '../../api/api-utils'

// types: Add_Log, Remove_Log, Update_Log, (later) Get_Logs,
const SET_LOGS = 'SET_LOGS'
const SET_LOG_DETAILS = 'SET_LOG_DETAILS' // sets the active log id
const CLEAR_LOG_DETAILS = 'CLEAR_LOG_DETAILS'
const ADD_LOG = 'ADD_LOG'
const UPDATE_LOG = 'UPDATE_LOG'
const REMOVE_LOG = 'REMOVE_LOG'

// todo: look into enums for redux state
const SET_TIMELOGS_LOADING = 'SET_TIMELOGS_LOADING'
const SET_TIMELOGS_ERRORS = 'SET_TIMELOGS_ERRORS'
const CLEAR_TIMELOGS_ERRORS = 'CLEAR_TIMELOGS_ERRORS'


const setLogs = (timelogs) => ({ type: SET_LOGS, timelogs })
const setLogDetails = (timelogData) => ({ type: SET_LOG_DETAILS, timelogData })
export const clearLogDetails = () => ({ type: CLEAR_LOG_DETAILS })
const addLogAction = (timelog) => ({ type: ADD_LOG, timelog })
const updateLogAction = (timelogData) => ({ type: UPDATE_LOG, timelogData })
const removeLogAction = (timelogId) => ({ type: REMOVE_LOG, timelogId })

const setLoading = () => ({ type: SET_TIMELOGS_LOADING })
const setErrors = (err) => ({ type: SET_TIMELOGS_ERRORS, err })
export const clearErrors = () => ({ type: CLEAR_TIMELOGS_ERRORS })

// actions: all the above, setError, clear Error, setLoading,
export const getTimeLogs = (token) => async (dispatch) => {
  let result;
  dispatch(setLoading())

  try {
    result = await fetch(BASE_URL + '/timetracking', {
      method: 'GET',
      headers: {
        'x-access-token': token,
      }
    })
    const jsonresult = await result.json();
    console.log('jsonresult:', jsonresult)
    if(jsonresult.status === "success" || result.status < 400) {
      const timelogs = jsonresult.data.timelogs;
      dispatch(setLogs(timelogs))
    }
    else dispatch(setErrors(`${result.status} error: ${jsonresult.message}` || "error getting your timelogs"))
  } catch (error) {
    console.log('error:', error)
    dispatch(setErrors(error.toString()))
  }
}

export const getOneTimeLog = (token, timelogId) => async (dispatch) => {
  dispatch(setLoading())

  fetch(BASE_URL + '/timetracking/' + timelogId, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    }
  })
    .then(async res => ({ data: await res.json(), status: res.status }))
    .then(object => {
      const { data, status } = object;
      console.log('response object:', object)
      if(status >= 400 || data.status==='error')
        dispatch(setErrors(`${status} error: ${data.message}`))
      else {
        if(data.data.logs)
          dispatch(setLogDetails(data.data.log))
        else
          dispatch(setErrors('error: your time log was not found'));
      }
    })
    .catch(err => {
      console.log('received error while getting your time log:', err)
      dispatch(setErrors(err.toString()))
    })
}

export const addTimeLog = (token, timelogData) => async (dispatch) => {
  let result;
  try {
    result = await fetch(BASE_URL + '/timetracking', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({timelog: timelogData})
    })
    const jsonresult = await result.json();
    if(jsonresult.status === "success" || result.status < 400) {
      const timelog = jsonresult.data.timelog;
      dispatch(addLogAction(timelog))
    }
    else dispatch(setErrors(`${result.status} error: ${jsonresult.message}` || "error adding your timelog"))
  } catch (error) {
    console.log('error:', error)
    dispatch(setErrors(error.toString()))
  }
}

export const updateTimeLog = (token, timelogId, timelogData) => async (dispatch) => {
  console.log('called update time log. Nothing here yet!')

  let result;
  try {
    result = await fetch(BASE_URL + "/timetracking/" + timelogId, {
      method: 'PUT',
      headers: { 'x-access-token': token },
      body: JSON.stringify({ timelog: timelogData })
    })
    console.log('result:', result, 'status:', result.status)
    const jsonresult = await result.json();
    if(jsonresult.status === "success" || result.status < 400) {
      const timelog = jsonresult.data.timelog;
      dispatch(updateLogAction(timelog))
    }
    else dispatch(setErrors(`${result.status} error: ${jsonresult.message}` || "error updating your time log"))
  } catch (error) {
    console.log('error:', error)
    dispatch(setErrors(error.toString()))
  }
}

export const removeTimeLog = (token, timelogId) => async (dispatch) => {
  // update ui first, only undo the update if the log does not actually get deleted
  // dispatch(removeLogAction(data.data.timelogId)) // would need to store the log data somewhere first (find log data by id before delete)

  let result;
  try {
    result = await fetch(BASE_URL + "/timetracking/" + timelogId, {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      }
    })
    console.log('result:', result, 'status:', result.status)
    const jsonresult = await result.json();
    if(jsonresult.status === "success" || result.status < 400) {
      dispatch(removeLogAction(timelogId))
    }
    else dispatch(setErrors(`${result.status} error: ${jsonresult.message}` || "error removing your timelog"))
  } catch (error) {
    console.log('error:', error)
    dispatch(setErrors(error.toString()))
  }
}


// Reducer
const initialState = {
  logs: [],
  loading: false,
  errors: null,
  logDetail: undefined
}

export default (
  state = initialState,
  action
) => {
  switch(action.type) {
    case SET_TIMELOGS_LOADING: return { ...state, loading: true }
    case SET_LOGS:
      return {
        ...state,
        loading: false,
        logs: action.timelogs
      }
    case SET_LOG_DETAILS:
      return {
        ...state,
        loading: false,
        logDetail: action.timelog
      }
    case CLEAR_LOG_DETAILS: return { ...state, logDetail: undefined }
    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.timelog]
      }
    case UPDATE_LOG:
      if(!action.timelogData.id) {
        console.log('id not provided. error')
        return;
      }
      return {
        ...state,
        logs: state.logs.map(log => {
          if(log.id === action.timelogData.id)
            log = {...log, ...action.timelogData};
          return log;
        })
      }
    case REMOVE_LOG:
      return {
        ...state,
        logs: state.logs.filter(log => log.id !== action.timelogId)
      }
    case SET_TIMELOGS_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.err
      }
    case CLEAR_TIMELOGS_ERRORS: { return { ...state, errors: null }}
    default:
      return state;
  }
}

// .then(async res => ({ data: await res.json(), status: res.status }))
// .then(object => {
//   const { data, status } = object;
//   console.log('response object from delete:', object)

  
//   else {
//     dispatch(setErrors(`${status} error: ${data.message}` || "error removing log" ))
//   }
// })
// .catch(err => {
//   console.log('error removing log:', err);
//   dispatch(setErrors(err.toString() || "error removing log"))
// })

// .then(object => {
//   const { data, status } = object;
//   console.log('response object:', object)

//   if(status >= 400 || data.status==='error')
//     dispatch(setErrors(`${status} error: ${data.message}`))
//   else {
//     if(data.data.timelog)
//       dispatch(addLogAction(data.data.timelog))
//     else
//       dispatch(setErrors('error: your time log was not found'));
//   }
// })
// .catch(err => {
//   console.log('received error while getting your time log:', err)
//   dispatch(setErrors(err.toString()))
// })