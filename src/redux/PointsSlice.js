import { createSlice } from '@reduxjs/toolkit'

export const pointsSlice = createSlice({
  name: 'pointsSlice',
  initialState: {
    data: {},
    status: '',
    error: ''
  },
  reducers: {
    getPointsData: (state, data) => {
      // console.log(data.payload + 'state')
      state.name = data.payload
    }
  }
})
export const { getPointsData } = pointsSlice.actions
export default pointsSlice.reducer
