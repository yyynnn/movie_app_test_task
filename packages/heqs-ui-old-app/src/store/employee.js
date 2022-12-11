import { createSlice } from '@reduxjs/toolkit'

import employeeService from '../services/employee.service'
import { setError } from './errors'

const initialState = { entities: [], isLoading: true }

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    received(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },

    loadEmployeeRequested(state) {
      state.isLoading = true
    },

    employeeRequestFailed(state, action) {
      state.isLoading = false
    }
  }
})

const { actions, reducer: employeeReducer } = employeeSlice
const { received, loadEmployeeRequested, employeeRequestFailed } = actions

export const loadEmployee = () => async (dispatch) => {
  dispatch(loadEmployeeRequested())
  try {
    const data = await employeeService.fetch()

    dispatch(received(data))
  } catch (error) {
    dispatch(employeeRequestFailed(error.message))
    dispatch(setError(error.message))
  }
}

export const getEmployee = () => (state) => state.employee.entities
export const getEmployeeLoadingStatus = () => (state) => state.employee.isLoading

export default employeeReducer
