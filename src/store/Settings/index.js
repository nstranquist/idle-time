import { getSettingsApiCall, updateSettingsApiCall } from '../../api/settings-api'

const SET_SETTINGS = 'SET_SETTINGS'

const SET_LOADING = 'SET_LOADING'
const SET_ERRORS = 'SET_ERRORS'
const CLEAR_ERRORS = 'CLEAR_ERRORS'
const RESET_SETTINGS = 'RESET_SETTINGS'


const setLoading = () => ({ type: SET_LOADING })
const setSettings = (settingsData) => ({
  type: SET_SETTINGS,
  settingsData,
})
const setErrors = (err) => ({
  type: SET_ERRORS,
  err
})
export const clearErrors = () => ({ type: CLEAR_ERRORS })


// const onSuccess = (settingsData) => {
//   console.log("success getting settings! Data received:", settingsData)
//   dispatch(setSettings(settingsData))
// }
// const onServerError = (message, code=undefined) => {
//   const errorCode = code ? code : "unkown";
//   console.log(`${errorCode} error: ${message}`)
//   dispatch(setErrors(`${errorCode} error: ${message}`))
// }
// const onError = (err) => {
//   console.log('error:', err)
//   dispatch(setErrors(err.message || err.toString()))
// }


export const getSettings = (token) => (dispatch) => {
  dispatch(setLoading())
  const onSuccess = (settingsData) => {
    console.log("success getting settings! Data received:", settingsData)
    dispatch(setSettings(settingsData))
  }
  const onServerError = (message, code=undefined) => {
    const errorCode = code ? code : "unkown";
    console.log(`${errorCode} error: ${message}`)
    dispatch(setErrors(`${errorCode} error: ${message}`))
  }
  const onError = (err) => {
    console.log('error:', err)
    dispatch(setErrors(err.message || err.toString()))
  }

  getSettingsApiCall(token, onSuccess, onServerError, onError)
}

export const updateSettings = (token, settingsData) => (dispatch) => {
  // dispatch(setLoading())
  dispatch(setSettings(settingsData)) // update on client before server confirms

  const onSuccess = (settingsData) => {
    console.log("success updating settings! Data received:", settingsData)
    dispatch(setSettings(settingsData))
  }
  const onServerError = (message, code=undefined) => {
    const errorCode = code ? code : "unkown";
    console.log(`${errorCode} error: ${message}`)
    dispatch(setErrors(`${errorCode} error: ${message}`))
  }
  const onError = (err) => {
    console.log('error:', err)
    dispatch(setErrors(err.message || err.toString()))
  }

  updateSettingsApiCall(token, settingsData, onSuccess, onServerError, onError);

  // if server cannot confirm, just how the user a popup or something, still let them change on client
  
}


const defaultSettings = {
  showTime: true,
  timeshiftActive: false,
  alarmsActive: true,
}

// Reducer
const initialState = {
  settings: defaultSettings, // note: replace with 'defaultSettings' object
  loading: false,
  errors: null
}

export default (
  state=initialState,
  action
) => {
  switch(action.type) {
    case SET_LOADING: return { ...state, loading: true }
    case SET_SETTINGS:
      return {
        ...state,
        loading: false,
        settings: action.settings,
      }
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.err,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null
      }
    case RESET_SETTINGS:
      return initialState;
    default:
      return state
  }
}
