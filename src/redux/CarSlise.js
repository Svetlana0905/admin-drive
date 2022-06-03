import { createSlice } from '@reduxjs/toolkit'

export const carSlice = createSlice({
  name: 'car',
  initialState: {
    obj: {},
    carId: '',
    priceMax: 4000,
    priceMin: 8000,
    name: '',
    thumbnail: {},
    description: '',
    categoryId: {},
    colors: [],
    number: 'N148WV'
  },
  reducers: {
    getCarData: (state, data) => {
      state.obj = data.payload
    },
    getCarId: (state, data) => {
      data.payload.carInput
        ? (state.carId = data.payload.car.data.find(
            (item) => item.name === data.payload.carInput
          ))
        : (state.carId = '')
    },
    getNameCar: (state, data) => {
      state.name = data.payload
      // console.log(state.name)
    },
    getColorsCar: (state, data) => {
      state.colors = data.payload
      // console.log(state.colors)
    },
    getCategoryId: (state, data) => {
      state.categoryId = { name: `${data.payload}`, description: '' }
      // console.log(state.categoryId)
    },
    getThumbnail: (state, data) => {
      state.thumbnail = data.payload
      // console.log(data.payload)
    },
    getDescription: (state, data) => {
      state.description = data.payload
      // console.log(data.payload)
    }
  }
})
export const {
  getCarData,
  getCarId,
  getNameCar,
  getColorsCar,
  getCategoryId,
  getThumbnail,
  getDescription
} = carSlice.actions
export default carSlice.reducer
