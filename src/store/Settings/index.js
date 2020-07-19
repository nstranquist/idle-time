import { BASE_URL } from '../../api/api-utils'
import { getSettingsApiCall, updateSettingsApiCall } from '../../api/settings-api'

const SET_SETTINGS = 'SET_SETTINGS'
const SET_SETTINGS_SECTION = 'SET_SETTINGS_SECTION'
const SET_TIMESHIFT = 'SET_TIMESHIFT'

const SET_SETTINGS_LOADING = 'SET_SETTINGS_LOADING'
const SET_SETTINGS_ERRORS = 'SET_SETTINGS_ERRORS'
const CLEAR_ERRORS = 'CLEAR_ERRORS'
const RESET_SETTINGS = 'RESET_SETTINGS'


export const setSettings = (settings) => ({ type: SET_SETTINGS, settings })
const setSettingsSection = (sectionName, settingsSection) => ({ type: SET_SETTINGS_SECTION, sectionName, settingsSection })

const setLoading = () => ({ type: SET_SETTINGS_LOADING })
const setErrors = (err) => ({ type: SET_SETTINGS_ERRORS, err })
export const clearErrors = () => ({ type: CLEAR_ERRORS })
export const applyTimeshift = (timeshiftData) => ({ type: SET_TIMESHIFT, timeshift: timeshiftData })

export const getSettings = (token) => async (dispatch) => {
  let result;
  dispatch(setLoading())
  console.log('getting settings')
  try {
    result = await fetch(BASE_URL + '/settings', {
      method: 'GET',
      headers: { 'x-access-token': token },
    })
    console.log('result:', result, 'status:', result.status)
    const jsonresult = await result.json()
    if(jsonresult.status === "success" || result.status < 400) {
      console.log('jsonresult:', jsonresult)
      const settings = jsonresult.data.settings;
      dispatch(setSettings(settings))
    }
    else setErrors(jsonresult.message || "could not get settings")
  } catch(error) {
    console.log('error:', error)
    dispatch(setErrors(error.toString()))
  }

  // getSettingsApiCall(token, onSuccess, onServerError, onError)
}
export const getSettingsSection = (token, sectionName) => async (dispatch) => {
  let result;
  dispatch(setLoading())

  try {
    result = await fetch(BASE_URL + '/settings/' + sectionName, {
      method: 'GET',
      headers: { 'x-access-token': token }
    })
    console.log('result:', result, 'status:', result.status)
    const jsonresult = await result.json()
    if(result.status < 400 || jsonresult.status === "success") {
      const settingsSection = jsonresult.data.settingsSection;
      dispatch(setSettingsSection(sectionName, settingsSection))
    }
    else setErrors(jsonresult.message || "could not get settings")
  } catch (error) {
    console.log('error:', error)
    dispatch(setErrors(error.toString()))
  }
}
export const updateSettingsSection = (token, settingsData, sectionName=undefined) => async (dispatch) => {
  if(!sectionName) dispatch(setErrors("tried to update settings section without specifying a section name!"))

  let result;
  dispatch (setLoading()) // include "section" as paramter? store in state.meta { } section of state

  try {
    result = await fetch(BASE_URL + "/settings/" + sectionName, {
      method: 'PUT',
      headers: { 'x-access-token': token },
      body: JSON.stringify({ settings: settingsData })
    })
    const jsonresult = await result.json()
    if(result.status < 400 || jsonresult.status === "success")
      dispatch(setSettingsSection(sectionName, jsonresult.data.settingsSection))
    else dispatch(setErrors(jsonresult.message || "could not update your settings"))
  } catch (error) {
    console.log('error:', error)
    dispatch(setErrors(error.toString()))
  }
}
export const updateAllSettings = (token, settingsData) => async (dispatch) => {
  let result;
  dispatch(setLoading())

  try {
    result = await fetch(BASE_URL + '/settings', {
      method: 'PUT',
      headers: { 'x-access-token': token, "Accepts": "application/json" },
      body: JSON.stringify({ settings: settingsData })
    })
    console.log('result:', result, 'status:', result.status)
    const jsonresult = await result.json()
    if(jsonresult.status === "success" || result.status < 400) {
      const settings = jsonresult.data.settings;
      dispatch(setSettings(settings))
    }
    else setErrors(jsonresult.message || "could not update your settings")
  }
  catch (error) {
    console.log('error:', error)
    dispatch(setErrors(error.toString()))
  }
  // updateSettingsApiCall(token, settingsData, onSuccess, onServerError, onError);
}


// Reducer
const initialState = {
  work: null,
  timetracking: null,
  timeshift: null,
  general: null,
  ui: null,
  loading: true,
  errors: null,
  // message: null, // to show ui-updates, toast text, etc.
}

export default (
  state=initialState,
  action
) => {
  switch(action.type) {
    case SET_SETTINGS_LOADING: return { ...state, loading: true }
    case SET_SETTINGS:
      console.log('settings in redux:', action.settings)
      const { general, ui, timeshift, timetracking, work } = action.settings;
      console.log('work settings:', work)
      return {
        ...state,
        work: action.settings.work,
        timetracking,
        timeshift,
        general,
        ui,
        loading: false
      }
    case SET_SETTINGS_SECTION:
      const sectionName = action.sectionName;
      return {
        ...state,
        loading: false,
        settings: {
          ...state.settings,
          [sectionName]: action.settingsSection,
         }
          // or update a single field? or multiple fields? suppose it would just be all at once every time?
        // or perhaps there are "general settings" that can be bulk-updated.
        // or "sections" of settings that can be bulk-updated
      }
    case SET_TIMESHIFT:
      return {
        ...state,
        settings: {
          ...state.settings,
          timeshift: action.timeshift
        }
      }
    case SET_SETTINGS_ERRORS:
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
