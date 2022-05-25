import { createSlice } from '@reduxjs/toolkit'

export const carPage = createSlice({
  name: 'carPage',
  initialState: {
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
  getNameCar,
  getColorsCar,
  getCategoryId,
  getThumbnail,
  getDescription
} = carPage.actions
export default carPage.reducer
