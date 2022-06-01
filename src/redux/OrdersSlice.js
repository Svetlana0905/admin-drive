import { createSlice } from '@reduxjs/toolkit'

export const ordersSlice = createSlice({
  name: 'ordersSlice',
  initialState: {
    data: {},
    order: {},
    status: '',
    error: ''
  },
  reducers: {
    getOrdersData: (state, data) => {
      // console.log(data.payload)
    },
    getOrder: (state, data) => {
      state.order = data.payload
    },
    getCarId: (state, data) => {
      const car = data.payload
      if (car) state.order.carId = car
    },
    getCityId: (state, data) => {
      if (data.payload) state.order.cityId = data.payload
    },
    getPointId: (state, data) => {
      let point = {}
      console.log(data.payload)
      data.payload ? (point = data.payload) : (point = {})
      state.order.pointId = point
    },
    getStatusId: (state, data) => {
      if (data.payload) state.order.orderStatusId = data.payload
    },
    getChildChairId: (state, data) => {
      state.order.isNeedChildChair = data.payload
    },
    getFullTankId: (state, data) => {
      state.order.isFullTank = data.payload
    },
    getRightWhelId: (state, data) => {
      state.order.isRightWheel = data.payload
    },
    getDateFrom: (state, data) => {
      state.order.dateFrom = data.payload
    },
    getDateTo: (state, data) => {
      state.order.dateTo = data.payload
    }
  }
})
export const {
  getOrdersData,
  getCarId,
  getOrder,
  getCityId,
  getPointId,
  getStatusId,
  getChildChairId,
  getFullTankId,
  getRightWhelId,
  getDateFrom,
  getDateTo
} = ordersSlice.actions
export default ordersSlice.reducer
