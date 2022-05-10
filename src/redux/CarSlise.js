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

export const carSlice = createSlice({
  name: 'carSlice',
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
} = carSlice.actions
export default carSlice.reducer
