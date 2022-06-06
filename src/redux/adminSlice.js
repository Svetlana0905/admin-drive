import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, data) => {
      state.user = data.payload.user
      state.token = data.payloadtoken
    }
  }
})

export const { setCredentials } = authSlice.actions
export default authSlice.reducer