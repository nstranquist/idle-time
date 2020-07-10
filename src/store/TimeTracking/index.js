import { BASE_URL } from '../../api/api-utils'

// types: Add_Log, Remove_Log, Update_Log, (later) Get_Logs,
const SET_LOGS = 'SET_LOGS'
const SET_LOG_DETAILS = 'SET_LOG_DETAILS' // sets the active log id
const CLEAR_LOG_DETAILS = 'CLEAR_LOG_DETAILS'
const ADD_LOG = 'ADD_LOG'
const UPDATE_LOG = 'UPDATE_LOG'
const REMOVE_LOG = 'REMOVE_LOG'

// todo: look into enums for redux state
const SET_LOADING = 'SET_LOADING'
const SET_ERRORS = 'SET_ERRORS'
const CLEAR_ERRORS = 'CLEAR_ERRORS'


const setLogs = (timelogs) => ({ type: SET_LOGS, timelogs })
const setLogDetails = (timelogData) => ({ type: SET_LOG_DETAILS, timelogData })
export const clearLogDetails = () => ({ type: CLEAR_LOG_DETAILS })
const addLogAction = (timelog) => ({ type: ADD_LOG, timelog })
const updateLogAction = (timelogData) => ({ type: UPDATE_LOG, timelogData })
const removeLogAction = (timelogId) => ({ type: REMOVE_LOG, timelogId })

const setLoading = () => ({ type: SET_LOADING })
const setErrors = (err) => ({ type: SET_ERRORS, err })
export const clearErrors = () => ({ type: CLEAR_ERRORS })

// actions: all the above, setError, clear Error, setLoading,
export const getTimeLogs = (token) => (dispatch) => {
  dispatch(setLoading())

  fetch(BASE_URL + '/timetracking', {
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
        if(data.data.timelogs)
          dispatch(setLogs(data.data.timelogs))
        else
          dispatch(setErrors('error: your time logs were not found'));
      }
    })
    .catch(err => {
      console.log('received error while getting your time logs:', err)
      dispatch(setErrors(err.toString()))
    })
}

export const getOneTimeLog = (token, timelogId) => (dispatch) => {
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

export const addTimeLog = (token, timelogData) => (dispatch) => {
  console.log('adding a new log with data:', timelogData)
  fetch(BASE_URL + '/timetracking/add', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify({timelog: timelogData})
  })
  .then(async res => ({ data: await res.json(), status: res.status }))
  .then(object => {
    const { data, status } = object;
    console.log('response object:', object)

    if(status >= 400 || data.status==='error')
      dispatch(setErrors(`${status} error: ${data.message}`))
    else {
      if(data.data.timelog)
        dispatch(addLogAction(data.data.timelog))
      else
        dispatch(setErrors('error: your time log was not found'));
    }
  })
  .catch(err => {
    console.log('received error while getting your time log:', err)
    dispatch(setErrors(err.toString()))
  })
}

export const updateTimeLog = (token, timelogData) => (dispatch) => {
  console.log('called update time log. Nothing here yet!')
}

export const removeTimeLog = (token, timelogId) => (dispatch) => {
  // update ui first, only undo the update if the log does not actually get deleted
  // dispatch(removeLogAction(data.data.timelogId)) // would need to store the log data somewhere first (find log data by id before delete)
  console.log('removing with timelogId:', timelogId)
  fetch(BASE_URL + "/timetracking/delete/" + timelogId, {
    method: 'DELETE',
    headers: {
      'x-access-token': token,
    }
  })
    .then(async res => ({ data: await res.json(), status: res.status }))
    .then(object => {
      const { data, status } = object;
      console.log('response object from delete:', object)

      if(data.status === "success" || status < 400) {
        console.log('task deleted successfully');
        dispatch(removeLogAction(timelogId))
      }
      else {
        dispatch(setErrors(`${status} error: ${data.message}` || "error removing log" ))
      }
    })
    .catch(err => {
      console.log('error removing log:', err);
      dispatch(setErrors(err.toString() || "error removing log"))
    })
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
    case SET_LOADING: return { ...state, loading: true }
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
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.err
      }
    case CLEAR_ERRORS: { return { ...state, errors: null }}
    default:
      return state;
  }
}