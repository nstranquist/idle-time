import { BASE_URL, fetchUtil } from '../../utils/api'

const SET_PRESETS = 'SET_PRESETS'
const ADD_PRESET = 'ADD_PRESET'
const UPDATE_PRESET = 'UPDATE_PRESET'
const REMOVE_PRESET = 'REMOVE_PRESET'


const SET_PRESET_LOADING = 'SET_PRESET_LOADING'
const SET_PRESET_ERROR = 'SET_PRESET_ERROR'
const CLEAR_PRESET_ERRORS = 'CLEAR_PRESET_ERRORS'

const setPresets = (presets) => ({ type: SET_PRESETS, presets })
const addPresetAction = (preset) => ({ type: ADD_PRESET, preset })
const updatePresetAction = (preset) => ({ type: UPDATE_PRESET, preset })
const removePresetAction = (id) => ({ type: REMOVE_PRESET, id })

const setLoading = () => ({ type: 'SET_PRESET_LOADING' })
const setError = (err) => ({ type: 'SET_PRESET_ERROR', err })
export const clearErrors = () => ({ type: CLEAR_PRESET_ERRORS })

export const getPresets = (token) => async (dispatch) => {
  dispatch(setLoading())
  let result;
  try {
    result = await fetch(BASE_URL + "/presets", {
      method: "GET",
      headers: {
        'x-access-token': token
      }
    })
    console.log('result:', result, 'status:', result.status)
    const jsonresult = await result.json();
    if(result.status < 400 || jsonresult.status === "success") {
      const presets = jsonresult.data.presets;
      dispatch(setPresets(presets))
    }
    else dispatch(setError(result.message || "error getting your presets"))
  } catch (error) {
    console.log("error:", error);
    dispatch(setError(error.toString()))
  }
}

export const addPreset = (token, presetData) => async (dispatch) => {
  console.log('preset data to submit:', presetData)
  let result;
  try {
    result = await fetch(BASE_URL + '/presets', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({ preset: presetData })
    })
    console.log('result:', result, 'status:', result.status)
    const jsonresult = await result.json();
    console.log('json result:', jsonresult)
    if(result.status < 400 || jsonresult.status === "success") {
      const preset = jsonresult.data.preset;
      console.log('new preset added:', preset)
      dispatch(addPresetAction(preset))
    }
    else dispatch(setError(jsonresult.message || "error adding preset"))
  } catch (err) {
    console.log('error adding preset:', err)
    dispatch(setError(err.toString()))
  }
}

export const updatePreset = (token, presetData) => async (dispatch) => {
  let result;
  try {
    result = await fetch(BASE_URL + '/presets/' + presetData._id, {
      method: 'PUT',
      headers: { 'x-access-token': token },
      body: JSON.stringify({ preset: presetData })
    })
    console.log('result:', result, 'status:', result.status)
    const jsonresult = await result.json()
    if(result.status < 400 || jsonresult.status === "success") {
      console.log('received result:', jsonresult.data.preset)
      dispatch(updatePresetAction(result.data.preset))
    }
    else dispatch(setError(jsonresult.message || "error updating preset"))
  } catch (error) {
    console.log('error:', error)
    dispatch(setError(error.toString()))
  }
}

export const removePreset = (token, id) => async (dispatch) => {
  let result;
  try {
    result = await fetch(BASE_URL + '/presets/' + id, {
      method: 'DELETE',
      headers: { 'x-access-token': token }
    })
    console.log('result:', result, 'status:', result.status)
    const jsonresult = await result.json();
    if(result.status < 400 || jsonresult.status === "success") {
      const id = jsonresult.data.id;
      dispatch(removePresetAction(id))
    }
    else dispatch(setError(jsonresult.message || "error removing preset"))
  } catch (err) {
    console.log('error:', err)
    dispatch(setError(err.toString()))
  }
}

// export const removePresetByTaskId = (token, taskId) => async (dispatch) => {
//   let result;
//   try {
//     result = await fetch(BASE_URL + '/presets/task/' + taskId, {
//       method: 'DELETE',
//       headers: { 'x-access-token': token }
//     })
//     console.log('result:', result, 'status:', result.status)
//     const jsonresult = await result.json();
//     if(result.status < 400 || jsonresult.status === "success") {
//       const id = jsonresult.data.id;
//       dispatch(removePresetAction(id))
//     }
//     else dispatch(setError(jsonresult.message || "error removing preset"))
//   } catch (err) {
//     console.log('error:', err)
//     dispatch(setError(err.toString()))
//   }
// }


const initialState = {
  presets: [],
  loading: false,
  errors: null,
}

export default (
  state=initialState,
  action
) => {
  switch(action.type) {
    case SET_PRESETS:
      return {
        ...state,
        presets: action.presets,
        loading: false
      }
    case ADD_PRESET:
      return {
        ...state,
        presets: [
          ...state.presets,
          action.preset
        ],
        errors: null,
      }
    case UPDATE_PRESET:
      return {
        ...state,
        presets: state.presets.map(preset => {
          if(preset._id === action.preset._id)
            return {...preset, ...action.preset}
          return preset;
        })
      }
    case REMOVE_PRESET:
      return {
        ...state,
        presets: state.presets.filter(preset => preset._id !== action.id),
      }
    case SET_PRESET_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.err
      }
    case CLEAR_PRESET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null
      }
    case SET_PRESET_LOADING:
      return {
        ...state,
        loading: true,
      }
    default:
      return state;
  }
}