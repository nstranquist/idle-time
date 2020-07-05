/* src/store/Auth/index.js */

const BASE_URL = "http://localhost:8080"

// Auth Types
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
const SIGNUP_LOADING = 'SIGNUP_LOADING'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGIN_LOADING = 'LOGIN_LOADING'

const LOGOUT = 'LOGOUT'
const CLEAR_ERRORS = 'CLEAR_ERRORS'

const RESET_SIGNUP_SUCCESS = 'RESET_SIGNUP_SUCCESS'

const loginError = (err) => ({
  type: LOGIN_FAILURE,
  err,
})

const signupError = (err) => ({
  type: SIGNUP_FAILURE,
  err,
})

// Auth Action Creators
export const login = (email, password) => (dispatch) => {
  dispatch({ type: LOGIN_LOADING })

  // run api call, to validate login
  fetch(BASE_URL + '/auth/login', {
    method : 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/x-www-form-urlencoded'
    },
    body: `email=${email}&password=${password}`
  })
    .then(async (res) => {
      return {data: await res.json(), status: res.status }
    })
    .then((object) => {
      const { data, status } = object;
      console.log('response data:', object)
      if(data.type === "success" || status < 400)
        dispatch({ type: LOGIN_SUCCESS, userData: data.data.user, token: data.data.token })
      else
        dispatch({ type: LOGIN_FAILURE, err: `${status} error: ${data.message}` })
      // should be: user, token
    })
    .catch(err => {
      console.log('error logging in:', err)
      dispatch({ type: LOGIN_FAILURE, err: err.message || "error logging in from server" })
    })
}

export const signup = (name, email, password) => (dispatch) => {
  dispatch({ type: SIGNUP_LOADING })

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
      if(data.type && data.type==="success")
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

export const logout = () => ({
  type: LOGOUT
})
export const clearErrors = () => ({
  type: CLEAR_ERRORS
})
export const resetSignupSuccess = () => ({
  type: RESET_SIGNUP_SUCCESS
})


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
    case SIGNUP_LOADING || LOGIN_LOADING:
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