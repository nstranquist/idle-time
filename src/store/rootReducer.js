// src/store/rootReducer.js

import { combineReducers } from 'redux'
import authReducer from './Auth'
import timeshiftReducer from './Timeshift'
import tasksReducer from './Tasks'
import uiReducer from './UI'

export const rootReducer = combineReducers({
  auth: authReducer,
  timeshift: timeshiftReducer,
  tasks: tasksReducer,
  ui: uiReducer,
})