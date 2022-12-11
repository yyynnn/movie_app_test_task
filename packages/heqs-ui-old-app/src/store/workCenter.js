import { createSlice } from '@reduxjs/toolkit'

import workCenterService from '../services/workCenter.service'
import { setError } from './errors'

const initialState = { entities: [], isLoading: true }

const workCenterSlice = createSlice({
  name: 'workCenter',
  initialState,
  reducers: {
    received(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },

    loadWorkCenterRequested(state) {
      state.isLoading = true
    },

    workCenterRequestFailed(state, action) {
      state.isLoading = false
    }
  }
})

const { actions, reducer: workCenterReducer } = workCenterSlice
const { received, loadWorkCenterRequested, workCenterRequestFailed } = actions

export const loadWorkCenter = () => async (dispatch) => {
  dispatch(loadWorkCenterRequested())
  try {
    const data = await workCenterService.fetch()

    dispatch(received(data))
  } catch (error) {
    dispatch(workCenterRequestFailed(error.message))
    dispatch(setError(error.message))
  }
}

export const getWorkCenter = () => (state) => state.workCenter.entities
export const getWorkCenterLoadingStatus = () => (state) => state.workCenter.isLoading

export default workCenterReducer
