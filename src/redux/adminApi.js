import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getRandomString } from '../components/RandomString/RandomString'
// import { Mutex } from 'async-mutex'
// const mutex = new Mutex()

const getAuthToken = () => {
  if (!localStorage.getItem('authToken')) {
    const authToken = `${window.btoa(
      `${getRandomString(7)}:${process.env.REACT_APP_AUTH_SECRET}`
    )}`
    localStorage.setItem('authToken', authToken)
    return authToken
  }
  return localStorage.getItem('authToken')
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api-factory.simbirsoft1.com/api',
  prepareHeaders: (headers) => {
    const token = `${process.env.REACT_APP_API_KEY}`
    if (token) {
      headers.set('X-Api-Factory-Application-Id', `${token}`)
    }
    return headers
  }
})
export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery,
  endpoints: (build) => ({
    login: build.mutation({
      query: (userData) => ({
        url: `/auth/login`,
        method: 'POST',
        body: userData,
        headers: {
          authorization: `Basic ${getAuthToken()}`
        }
      })
    }),
    logout: build.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
    }),
    getPoint: build.query({
      query: () => `/db/point`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }),
    getCity: build.query({
      query: () => `/db/city`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }),
    getCar: build.query({
      query: () => `/db/car`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }),
    getStatus: build.query({
      query: () => `/db/orderStatus`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }),
    getOrdersList: build.query({
      query: ({ page, city, status, car }) => ({
        url: `/db/order?limit=4&page=${page}${city ? `&cityId=${city}` : ''}${
          status ? `&orderStatusId=${status}` : ''
        }${car ? `&carId=${car}` : ''}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
    })
    // deleteOrderData: build.mutation({
    //   query: ({ id, ...data }) => ({
    //     url: `/db/order/${id}`,
    //     method: 'PUT',
    //     body: data
    //   })
    // })
  })
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetPointQuery,
  useGetCityQuery,
  useGetCarQuery,
  useGetStatusQuery,
  useGetOrdersListQuery
} = adminApi
