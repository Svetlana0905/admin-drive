import { configureStore } from '@reduxjs/toolkit'
import { adminApi } from './adminApi'
import authReducer from './adminSlice'
import pointsReducer from './PointsSlice'
import citiesReducer from './CitySlice'
import ordersRedducer from './OrdersSlice'
import statusRedducer from './StatusSlice'
import carRedducer from './CarSlise'

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    auth: authReducer,
    points: pointsReducer,
    cities: citiesReducer,
    orders: ordersRedducer,
    status: statusRedducer,
    car: carRedducer
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(adminApi.middleware)
})
