import { configureStore } from '@reduxjs/toolkit'
import authReduser from './authSlice'
import carReduser from './CarSlise'

export const store = configureStore({
  reducer: {
    authSlice: authReduser,
    carSlice: carReduser
  }
  // middleware: (getDefaultMiddlware) =>
  //   getDefaultMiddlware().concat(authSlice.middleware)
})
