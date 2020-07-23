import { fetchUtil } from '../../api/api-utils'

const SET_PROJECTS = 'SET_PROJECTS'
const ADD_PROJECT = 'ADD_PROJECT'
const UPDATE_PROJECT = 'UPDATE_PROJECT'
const DELETE_PROJECT = 'DELETE_PROJECT'

const PROJECT_LOADING = 'PROJECT_LOADING'
const PROJECT_ERROR = 'PROJECT_ERROR'
const CLEAR_PROJECT_ERRORS = 'CLEAR_PROJECT_ERRORS'

const setProjects = (projects) => ({ type: SET_PROJECTS, projects })
const addProjectAction = (project) => ({ type: ADD_PROJECT, project })
const updateProjectAction = (project) => ({ type: UPDATE_PROJECT, project })
const deleteProjectAction = (id) => ({ type: DELETE_PROJECT, id })

const setLoading = () => ({ type: PROJECT_LOADING })
const setErrors = (err) => ({ type: PROJECT_ERROR, err })
export const clearErrors = () => ({ type: CLEAR_PROJECT_ERRORS })

export const getProjects = (token) => async (dispatch) => {
  dispatch(setLoading())
  try {
    const response = await fetchUtil(token, "/projects", "GET")
    if(!response.ok) dispatch(setErrors("error in gettting projects"))
    else {
      const { jsonresult } = response;
      console.log('response json:', jsonresult)
      dispatch(setProjects(jsonresult.data.projects))
    }
  } catch (error) {
    console.log('error:', error)
    dispatch(setErrors(error.toString()))
  }
}

// export const getOneProject = (token, id) => async (dispatch) => {}

export const addProject = (token, project) => async (dispatch) => {
  console.log('adding project with data:', project)
  try {
    const response = await fetchUtil(token, "/projects", "POST", project, "project")
    if(!response.ok) dispatch(setErrors("error in adding project"))
    else {
      const { jsonresult } = response;
      console.log('response json:', jsonresult)
      dispatch(addProjectAction(jsonresult.data.project))
    }
  } catch (error) {
    console.log('error:', error)
    dispatch(setErrors(error.toString()))
  }
}

export const updateProject = (token, projectId, project) => async (dispatch) => {
  try {
    const response = await fetchUtil(token, `/projects/${projectId}`, "PUT", project, "project")
    if(!response.ok) dispatch(setErrors("error in updating project"))
    else {
      const { jsonresult } = response;
      console.log('response json:', jsonresult)
      dispatch(updateProjectAction(jsonresult.data.project))
    }
  } catch (error) {
    console.log('error:', error)
    dispatch(setErrors(error.toString()))
  }
}

export const deleteProject = (token, projectId) => async (dispatch) => {
  const response = await fetchUtil(token, `/projects/${projectId}`, "DELETE")
  if(!response.ok) dispatch(setErrors("error in updating project"))
  else {
    const { jsonresult } = response;
    console.log('response json:', jsonresult)
    dispatch(deleteProjectAction(projectId))
  }
}


const initialState = {
  projects: [],
  loading: false,
  errors: null
}

export default (
  state=initialState,
  action
) => {
  switch(action.type) {
    case SET_PROJECTS:
      return {...state, projects: action.projects, loading: false }
    case ADD_PROJECT:
      return { ...state, projects: [...state.projects, action.project]}
    case UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map(project => {
          if(project._id === action.project._id)
            project = action.project;
          return project;
        })
      }
    case DELETE_PROJECT:
      return {...state, projects: state.projects.filter(project => project._id !== action.id)}
    case PROJECT_LOADING: return {...state, loading: true, errors: null }
    case PROJECT_ERROR: return {...state, errors: action.err, loading: false }
    case CLEAR_PROJECT_ERRORS: return {...state, errors: null}
    default:
      return state;
  }
}