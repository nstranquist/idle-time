

const OPEN_SIDEBAR = "OPEN_SIDEBAR"
const CLOSE_SIDEBAR = "CLOSE_SIDEBAR"

const SET_TIMEFRAME = 'SET_TIMEFRAME'

const SET_UI_ERRORS = 'SET_UI_ERRORS'
const SET_UI_LOADING = 'SET_UI_LOADING'


const setLoading = () => ({ type: SET_UI_LOADING })
const setErrors = (err) => ({ type: SET_UI_ERRORS, err })
export const openSidebar = () => ({ type: OPEN_SIDEBAR })
export const closeSidebar = () => ({ type: CLOSE_SIDEBAR })
export const setTimeframe = (timeframe) => ({ type: SET_TIMEFRAME, timeframe })


const initialState = {
  sidebarOpen: true,
  timeframe: "day",
  loading: false,
  errors: null,
}

export default (
  state=initialState,
  action
) => {
  switch(action.type) {
    case OPEN_SIDEBAR:
      return {
        ...state,
        sidebarOpen: true
      }
    case CLOSE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: false
      }
    case SET_TIMEFRAME:
      return {
        ...state,
        timeframe: action.timeframe
      }
    case SET_UI_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.err
      }
    case SET_UI_LOADING:
      return {
        ...state,
        loading: true,
      }
    default:
      return state;
  }
}