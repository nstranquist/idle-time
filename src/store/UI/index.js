

const OPEN_SIDEBAR = "OPEN_SIDEBAR"
const CLOSE_SIDEBAR = "CLOSE_SIDEBAR"

const SET_TIMEFRAME = 'SET_TIMEFRAME'



export const openSidebar = () => ({
  type: OPEN_SIDEBAR
})
export const closeSidebar = () => ({
  type: CLOSE_SIDEBAR
})

export const setTimeframe = (timeframe) => ({
  type: SET_TIMEFRAME,
  timeframe
})



const initialState = {
  sidebarOpen: true,
  timeframe: "W"
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
    default:
      return state;
  }
}