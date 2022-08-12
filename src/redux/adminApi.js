import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getRandomString } from '../components/RandomString/RandomString'

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
  // baseUrl: 'https://api-factory.simbirsoft1.com/api',
  baseUrl: 'https://frontend-study.simbirsoft.dev/api',
  prepareHeaders: (headers) => {
    const token = `${process.env.REACT_APP_API_KEY}`
    if (token) {
      headers.set('X-Api-Factory-Application-Id', `${token}`)
    }
    return headers
  }
})
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  // console.log(result)
  if (result.error && result.error.originalStatus === 401) {
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        body: {
          refresh_token: localStorage.getItem('refreshToken')
        },
        headers: {
          authorization: `Basic ${localStorage.getItem('authToken')}`
        }
      },
      api,
      extraOptions
    )
    if (refreshResult.data) {
      console.log(refreshResult.data)
      localStorage.setItem('accessToken', refreshResult.data.access_token)
      localStorage.setItem(
        'refreshToken',
        refreshResult.data.data.refresh_token
      )
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}
export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Orders',
    'City',
    'Tarif',
    'TarifType',
    'Point',
    'Car',
    'Category'
  ],
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
      query: ({ page, limit }) => ({
        url: `/db/point?${limit ? `limit=${limit}&` : ''}page=${page}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      providesTags: ['Point', 'City']
    }),
    deletePoint: build.mutation({
      query: ({ pointId }) => ({
        url: `/db/point/${pointId}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      invalidatesTags: ['Point']
    }),
    addPointData: build.mutation({
      query: ({ data }) => ({
        url: `/db/point`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: data
      }),
      invalidatesTags: ['Point']
    }),
    changePoint: build.mutation({
      query: ({ pointId, data }) => ({
        url: `/db/point/${pointId}`,
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: data
      }),
      invalidatesTags: ['Point']
    }),
    getCity: build.query({
      query: ({ page, limit }) => ({
        url: `/db/city?${limit ? `limit=${limit}&` : ''}page=${page}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      providesTags: ['City']
    }),
    getCar: build.query({
      query: ({ page, limit, category, name }) => ({
        url: `/db/car?${limit ? `limit=${limit}&` : ''}page=${page}${
          category ? `&categoryId=${category}` : ''
        }${name ? `&name=${name}` : ''}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      providesTags: ['Car']
    }),
    addCar: build.mutation({
      query: ({ data }) => ({
        url: `/db/car`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: data
      }),
      invalidatesTags: ['Car']
    }),
    deleteCar: build.mutation({
      query: ({ carId }) => ({
        url: `/db/car/${carId}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      invalidatesTags: ['Car']
    }),
    changeCarData: build.mutation({
      query: ({ id, data }) => ({
        url: `/db/car/${id}`,
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: data
      }),
      invalidatesTags: ['Car']
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
      }),
      providesTags: ['Orders']
    }),
    changeOrderStatus: build.mutation({
      query: ({ id, data }) => ({
        url: `/db/order/${id}`,
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: data
      }),
      invalidatesTags: ['Orders']
    }),
    changeOrder: build.mutation({
      query: ({ id, data }) => ({
        url: `/db/order/${id}`,
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: data
      }),
      invalidatesTags: ['Orders']
    }),
    deleteOrderData: build.mutation({
      query: ({ orderId }) => ({
        url: `/db/order/${orderId}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      invalidatesTags: ['Orders']
    }),
    deleteCityData: build.mutation({
      query: ({ cityId }) => ({
        url: `/db/city/${cityId}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      invalidatesTags: ['City']
    }),
    addCityData: build.mutation({
      query: ({ data }) => ({
        url: `/db/city`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: data
      }),
      invalidatesTags: ['City']
    }),
    changeCity: build.mutation({
      query: ({ cityId, data }) => ({
        url: `/db/city/${cityId}`,
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: data
      }),
      invalidatesTags: ['City']
    }),
    getTarif: build.query({
      query: ({ page, limit }) => ({
        url: `/db/rate?${limit ? `limit=${limit}&` : ''}page=${page}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      providesTags: ['Tarif']
    }),
    addTarif: build.mutation({
      query: ({ data }) => ({
        url: `/db/rate`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: data
      }),
      invalidatesTags: ['Tarif']
    }),
    changeTarif: build.mutation({
      query: ({ tarifId, data }) => ({
        url: `/db/rate/${tarifId}`,
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: data
      }),
      invalidatesTags: ['Tarif']
    }),
    deleteTarifData: build.mutation({
      query: ({ tarifId }) => ({
        url: `/db/rate/${tarifId}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      invalidatesTags: ['Tarif']
    }),
    getTarifType: build.query({
      query: ({ page, limit }) => ({
        url: `/db/rateType?${limit ? `limit=${limit}&` : ''}page=${page}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      providesTags: ['TarifType']
    }),
    changeTarifType: build.mutation({
      query: ({ tarifId, data }) => ({
        url: `/db/rateType/${tarifId}`,
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: data
      }),
      invalidatesTags: ['TarifType']
    }),
    deleteTarifType: build.mutation({
      query: ({ tarifId }) => ({
        url: `/db/rateType/${tarifId}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      invalidatesTags: ['TarifType']
    }),
    addTarifType: build.mutation({
      query: ({ data }) => ({
        url: `/db/rateType`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: data
      }),
      invalidatesTags: ['TarifType']
    }),
    getCategory: build.query({
      query: () => ({
        url: `/db/category`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      invalidatesTags: ['Category']
    }),
    addCategoryCar: build.mutation({
      query: ({ data }) => ({
        url: `/db/category`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: data
      }),
      invalidatesTags: ['Category']
    })
  })
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetPointQuery,
  useDeletePointMutation,
  useAddPointDataMutation,
  useChangePointMutation,
  useGetCityQuery,
  useGetCarQuery,
  useAddCarMutation,
  useDeleteCarMutation,
  useChangeCarDataMutation,
  useGetStatusQuery,
  useGetOrdersListQuery,
  useDeleteOrderDataMutation,
  useChangeOrderStatusMutation,
  useChangeOrderMutation,
  useDeleteCityDataMutation,
  useAddCityDataMutation,
  useChangeCityMutation,
  useGetTarifQuery,
  useAddTarifMutation,
  useChangeTarifMutation,
  useDeleteTarifDataMutation,
  useAddTarifTypeMutation,
  useChangeTarifTypeMutation,
  useDeleteTarifTypeMutation,
  useGetTarifTypeQuery,
  useGetCategoryQuery,
  useAddCategoryCarMutation
} = adminApi
