/* src/store/Auth/index.js */
import { BASE_URL, fetchUtil } from '../../utils/api'

// Auth Types
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
const SIGNUP_LOADING = 'SIGNUP_LOADING'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGIN_LOADING = 'LOGIN_LOADING'

const LOGOUT = 'LOGOUT'
const CLEAR_ERRORS = 'CLEAR_ERRORS'

const USER_LOADING = "USER_LOADING"
const USER_SUCCESS = 'USER_SUCCESS'
const USER_ERROR = "USER_ERROR"

const RESET_SIGNUP_SUCCESS = 'RESET_SIGNUP_SUCCESS'

export const setLoginLoading = () => ({ type: LOGIN_LOADING });
const setSignupLoading = () => ({ type: SIGNUP_LOADING });

export const onLoginSuccess = (token, userData) => ({ type: LOGIN_SUCCESS, userData, token })
export const onLoginFailure = (err) => ({ type: LOGIN_FAILURE, err });

export const logout = () => ({ type: LOGOUT });
export const clearErrors = () => ({ type: CLEAR_ERRORS });
export const resetSignupSuccess = () => ({ type: RESET_SIGNUP_SUCCESS });

// Auth Action Creators
// export const login = (email, password) => (dispatch) => {
//   dispatch(setLoginLoading())

//   // run api call, to validate login
//   fetch(BASE_URL + '/auth/login', {
//     method : 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type':'application/x-www-form-urlencoded'
//     },
//     body: `email=${email}&password=${password}`
//   })
//     .then(async (res) => {
//       return {data: await res.json(), status: res.status }
//     })
//     .then((object) => {
//       const { data, status } = object;
//       console.log('response data:', object)
//       if(data.ok || status < 400)
//         dispatch({ type: LOGIN_SUCCESS, userData: data.data.user, token: data.data.token })
//       else
//         dispatch({ type: LOGIN_FAILURE, err: `${status} error: ${data.message}` })
//       // should be: user, token
//     })
//     .catch(err => {
//       console.log('error logging in:', err)
//       dispatch({ type: LOGIN_FAILURE, err: err.message || "error logging in from server" })
//     })
// }

export const signup = (name, email, password) => (dispatch) => {
  dispatch(setSignupLoading())

  // run api call, to validate login
  fetch(BASE_URL + '/auth/signup', {
    method : 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `name=${name}&email=${email}&password=${password}`
  })
    .then(async (res) =>{
      return {data: await res.json(), status: res.status }
    })
    .then((object) => {
      const { data, status } = object;
      console.log('response data:', object)
      // const data = JSON.stringify(resData)
      if(data.ok)
        dispatch({ type: SIGNUP_SUCCESS })
      else
        dispatch({ type: SIGNUP_FAILURE, err: `${status} error: ${data.message}` })
    })
    .catch(err => {
      console.log('error:', err)
      dispatch({ type: SIGNUP_FAILURE, err: err.message || "error signing up from server" })
    })
}

export const resetPassword = (email, password) => (dispatch) => {
  console.log('resetting password')

}

export const updateName = (newName) => (dispatch) => {
  console.log('updating name to new name:', newName);
  dispatch({ type: USER_LOADING })

  fetch(BASE_URL + '/auth/updateName', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({newName})
  })
    .then(async (res) =>{
      return {data: await res.json(), status: res.status }
    })
    .then(object => {
      const { data, status } = object;
      console.log('response data:', object)

      // TODO: add in error status codes
      if(data.ok) {
        dispatch({ type: USER_SUCCESS, data: data.data })
      }
      else {
        if(status && data.message)
          dispatch({ type: USER_ERROR, err: `${status} error: ${data.message}`})
        else
          dispatch({ type: USER_ERROR, err: 'error updating user'})
      }
    })
    .catch(err => {
      console.log('error:', err)
      dispatch({ type: USER_ERROR, err: err.message || "error updating user name"})
    })
}


// Auth Reducer
const initialState = {
  signedIn: false,
  userData: null,
  token: null,
  loading: false,
  errors: null,
  signupSuccess: false,
}

export default (
  state=initialState,
  action
) => {
  switch(action.type) {
    case SIGNUP_LOADING: case LOGIN_LOADING: case USER_LOADING:
      return {
        ...state,
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        signedIn: true,
        userData: action.userData,
        token: action.token,
        loading: false,
        errors: null
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.err
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupSuccess: true,
        loading: false,
        errors: null
      }
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.err
      }
    case LOGOUT:
      return {
        ...state,
        signedIn: false,
        token: null,
        userData: null,
        signupSuccess: false,
        loading: false,
        errors: null
      }
    case RESET_SIGNUP_SUCCESS:
      return {
        ...state,
        signupSuccess: false,
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