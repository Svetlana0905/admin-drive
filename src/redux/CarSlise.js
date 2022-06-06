import { createSlice } from '@reduxjs/toolkit'

export const carSlice = createSlice({
  name: 'car',
  initialState: {
    obj: {},
    carId: ''
  },
  reducers: {
    getCarData: (state, data) => {
      state.obj = data.payload
      console.log(state.obj)
    },
    getCarId: (state, data) => {
      data.payload.carInput
        ? (state.carId = data.payload.car.data.find(
            (item) => item.name === data.payload.carInput
          ))
        : (state.carId = '')
    }
  }
})
export const { getCarData, getCarId } = carSlice.actions
export default carSlice.reducer
