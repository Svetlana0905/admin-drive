import { createSlice } from '@reduxjs/toolkit'

export const authSlise = createSlice({
  name: 'authSlice',
  initialState: {},
  reducers: {
    first: (state, data) => {
      console.log(data.payload)
    }
  }
})

export const { first } = authSlise.actions
export default authSlise.reducer
