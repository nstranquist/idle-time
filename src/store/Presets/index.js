

const GET_PRESETS = 'GET_PRESETS'
const ADD_PRESET = 'ADD_PRESET'
const UPDATE_PRESET = 'UPDATE_PRESET'
const REMOVE_PRESET = 'REMOVE_PRESET'

const SET_ERROR = 'SET_ERROR'
const CLEAR_ERRORS = 'CLEAR_ERRORS'


// export const getPresets = (presets) => (dispatch) => dispatch({ type: GET_PRESETS, presets })

export const addPreset = (presetData, presetType = 'blocks') => (dispatch, getState) => {
  const presets = getState()[presetType];
  if(presets) {
    console.log('preset chosen:', presetType, 'of length:', presets.length);
    const item = presets.find(preset => preset.name === presetData.name)
    if(!item) {
      dispatch({
        type: ADD_PRESET,
        presetData,
        presetType, // or 'category'
      })
    }
    else {
      console.log('Could not add preset. Preset with name', presetData.name, 'already exists.')
      dispatch({
        type: SET_ERROR,
        err: "Could not add preset. Preset with name " + presetData.name + " already exists."
      })
    }
  }
  else {
    console.log('preset', presetType, 'not found')
    dispatch({
      type: SET_ERROR,
      err: "preset " + presetType + " not found"
    })
  }
}

// export const updatePreset = (presetData, presetType = 'blocks') => (dispatch) => dispatch({ type: UPDATE_PRESET, presetData, presetType })

export const removePreset = (presetName, presetType = 'blocks') => (dispatch) => {
  dispatch({
    type: REMOVE_PRESET,
    presetName,
    presetType
  })
}

export const setError = (err) => (dispatch) => dispatch({ type: SET_ERROR, err })
export const clearErrors = (err) => (dispatch) => dispatch({ type: CLEAR_ERRORS })


const initialState = {
  blocks: [],
  timeshift: [],
  schedules: [], // with field: (type: 'week' or 'day')
  errors: null,
}

export default (
  state=initialState,
  action
) => {
  switch(action.type) {
    // case GET_PRESETS:
    case ADD_PRESET:
      return {
        ...state,
        [action.presetType]: [
          ...state[action.presetType],
          action.presetData
        ],
        errors: null,
      }
    // case UPDATE_PRESET:
    case REMOVE_PRESET:
      return {
        ...state,
        [action.presetType]: state[action.presetType].filter(preset => preset.name !== action.presetName),
        errors: null,
      }
    case SET_ERROR:
      return {
        ...state,
        errors: action.err
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null
      }
    default:
      return state;
  }
}