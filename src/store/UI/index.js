

const OPEN_SIDEBAR = "OPEN_SIDEBAR"
const CLOSE_SIDEBAR = "CLOSE_SIDEBAR"



export const openSidebar = () => ({
  type: OPEN_SIDEBAR
})
export const closeSidebar = () => ({
  type: CLOSE_SIDEBAR
})



const initialState = {
  sidebarOpen: true
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
    default:
      return state;
  }
}