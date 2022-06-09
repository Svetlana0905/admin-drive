import { createSlice } from '@reduxjs/toolkit'

export const carPageSlice = createSlice({
  name: 'carPageslice',
  initialState: {
    data: {},
    filterCarHeader: ''
  },
  reducers: {
    getDataCarFromredux: (state, data) => {
      state.data = data.payload
    },
    getNameCar: (state, data) => {
      state.data.name = data.payload
    },
    getNumberCar: (state, data) => {
      state.data.number = data.payload
    },
    getDescriptionCar: (state, data) => {
      state.data.description = data.payload
    },
    getTankCar: (state, data) => {
      state.data.tank = +data.payload
    },
    getMinPriceCar: (state, data) => {
      state.data.priceMin = +data.payload
    },
    getMaxPriceCar: (state, data) => {
      state.data.priceMax = +data.payload
    },
    getCategoryCar: (state, data) => {
      data.payload
        ? (state.data.categoryId = data.payload)
        : (state.data.categoryId = {})
    },
    getColorsCar: (state, data) => {
      state.data.colors = data.payload
    },
    getThumbnail: (state, data) => {
      state.data.thumbnail = data.payload
    }
  }
})
export const {
  getNameCar,
  getThumbnail,
  getNumberCar,
  getDescriptionCar,
  getTankCar,
  getMinPriceCar,
  getMaxPriceCar,
  getCategoryCar,
  getColorsCar,
  getDataCarFromredux
} = carPageSlice.actions
export default carPageSlice.reducer
