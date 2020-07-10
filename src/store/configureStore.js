import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { rootReducer } from './rootReducer'
import { createLogger } from 'redux-logger'

const middlewares = [thunkMiddleware/*, createLogger()*/]

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f // IF DEV ONLY
    ),
  )

  return store
}
