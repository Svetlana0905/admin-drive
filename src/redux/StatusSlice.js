import { createSlice } from '@reduxjs/toolkit'

export const statusSlice = createSlice({
  name: 'status',
  initialState: {
    obj: {},
    statusId: ''
  },
  reducers: {
    getStatusData: (state, data) => {
      state.obj = data.payload
    },
    getStatusId: (state, data) => {
      data.payload.statusInput
        ? (state.statusId = data.payload.status.data.find(
            (item) => item.name === data.payload.statusInput
          ))
        : (state.statusId = '')
    }
  }
})
export const { getStatusData, getStatusId } = statusSlice.actions
export default statusSlice.reducer
