import { configureStore, combineReducers } from '@reduxjs/toolkit'
import errorReducer from './errors'
import taskReducer from './task'
import ticketReducer from './tickets'
import workCenterReducer from './workCenter'
import employeeReducer from './employee'

const rootReducer = combineReducers({
  errors: errorReducer,
  tasks: taskReducer,
  tickets: ticketReducer,
  workCenter: workCenterReducer,
  employee: employeeReducer
})

export function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}

export default createStore
