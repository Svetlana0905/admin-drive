import { createSlice } from '@reduxjs/toolkit'

export const pointsSlice = createSlice({
  name: 'pointsSlice',
  initialState: {
    data: {}
  },
  reducers: {
    getPointsData: (state, data) => {
      state.data = data.payload
    }
  }
})
export const { getPointsData } = pointsSlice.actions
export default pointsSlice.reducer
