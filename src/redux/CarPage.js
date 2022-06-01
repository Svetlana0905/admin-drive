import { createSlice } from '@reduxjs/toolkit'

export const carPage = createSlice({
  name: 'carPage',
  initialState: {
    data: {}
  },
  reducers: {
    getNameCar: (state, data) => {
      state.data.name = data.payload
      // console.log(state.name)
    },
    getColorsCar: (state, data) => {
      state.data.colors = data.payload
      // console.log(state.colors)
    },
    getCategoryId: (state, data) => {
      state.data.categoryId = { name: `${data.payload}`, description: '' }
      // console.log(state.categoryId)
    },
    getThumbnail: (state, data) => {
      state.data.thumbnail = data.payload
      // console.log(data.payload)
    },
    getDescription: (state, data) => {
      state.data.description = data.payload
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
