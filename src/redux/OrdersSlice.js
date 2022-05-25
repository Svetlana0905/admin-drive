import { createSlice } from '@reduxjs/toolkit'

export const ordersSlice = createSlice({
  name: 'ordersSlice',
  initialState: {
    data: {},
    status: '',
    error: ''
  },
  reducers: {
    getOrdersData: (state, data) => {
      // console.log(data.payload)
    }
  }
})
export const { getOrdersData } = ordersSlice.actions
export default ordersSlice.reducer
