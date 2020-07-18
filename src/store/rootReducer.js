// src/store/rootReducer.js

import { combineReducers } from 'redux'
import authReducer from './Auth'
import tasksReducer from './Tasks'
import uiReducer from './UI'
import presetsReducer from './Presets'
import settingsReducer from './Settings'
import timetrackingReducer from './TimeTracking'

export const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  ui: uiReducer,
  presets: presetsReducer,
  settings: settingsReducer,
  timetracking: timetrackingReducer
})