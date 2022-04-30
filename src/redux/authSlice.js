import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../redux/Api/Api'

export const postAuth = createAsyncThunk(
  'auth/login',
  async ({ mail, password }) => {
    try {
      const authToken = btoa(`1211128:4cbcea96de`)
      const response = await API.post(
        '/auth/login',
        {
          username: mail,
          password: password
        },
        {
          headers: { Authorization: `Basic ${authToken}` }
        }
      )
      const data = await response.data
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    accessToken: '',
    refreshToken: '',
    res: [],
    status: null,
    error: null
  },
  reducers: {
    first: (state, data) => {
      console.log(data.payload)
    }
  },
  extraReducers: {
    [postAuth.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [postAuth.fulfilled]: (state, action) => {
      state.status = 'resolved'
      console.log(action.payload)
      state.res = action.payload
      console.log(state.res)

      // state.accessToken = actions.payload.data.access_token
      // state.refreshToken = actions.payload.data.refresh_token
    },
    [postAuth.rejected]: (state, actions) => {
      state.status = 'error'
      state.error = null
    }
  }
})

export const { first } = authSlice.actions
export default authSlice.reducer
