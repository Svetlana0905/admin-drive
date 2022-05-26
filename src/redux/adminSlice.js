import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, data) => {
      console.log(data.payload.data + 'from stor')
      state.user = data.payload.user
      state.token = data.payloadtoken
    }
  }
})

export const { setCredentials } = authSlice.actions
export default authSlice.reducer
