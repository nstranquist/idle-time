

const SET_ACTIVE = "SET_ACTIVE"
const SET_INACTIVE = "SET_INACTIVE"


export const activateTimeshift = () => ({
  type: SET_ACTIVE
})
export const deactivateTimeshift = () => ({
  type: SET_INACTIVE
})


const initialState = {
  active: false
}

export default (
  state=initialState,
  action
) => {
  switch(action.type) {
    case SET_ACTIVE:
      return {
        ...state,
        active: true
      }
    case SET_INACTIVE:
      return {
        ...state,
        active: false
      }
    default:
      return state;
  }
}