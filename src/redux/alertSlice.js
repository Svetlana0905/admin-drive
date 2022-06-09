import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
  name: 'alertSlice',
  initialState: {
    status: false,
    text: ''
  },
  reducers: {
    getStatusAlert: (state, data) => {
      if (data.payload) {
        state.status = true
        state.text = data.payload
      } else {
        state.status = false
        state.text = ''
      }
    }
  }
})
export const { getStatusAlert } = alertSlice.actions
export default alertSlice.reducer
