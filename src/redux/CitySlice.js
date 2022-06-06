import { createSlice } from '@reduxjs/toolkit'

export const citySlice = createSlice({
  name: 'city',
  initialState: {
    obj: {},
    cityId: ''
  },
  reducers: {
    getCityData: (state, data) => {
      state.obj = data.payload
    },
    getCityId: (state, data) => {
      data.payload.cityInput
        ? (state.cityId = data.payload.city.data.find(
            (item) => item.name === data.payload.cityInput
          ))
        : (state.cityId = '')
    }
  }
})
export const { getCityData, getCityId } = citySlice.actions
export default citySlice.reducer
