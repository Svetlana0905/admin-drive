import { configureStore } from '@reduxjs/toolkit'
import authReduser from './authSlice'

export const store = configureStore({
  reducer: {
    authSlice: authReduser
  }
  // middleware: (getDefaultMiddlware) =>
  //   getDefaultMiddlware().concat(authSlice.middleware)
})
