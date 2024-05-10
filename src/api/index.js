// src/api/index.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => 'users/profile',
    }),
    getMedicines: builder.query({
      query: () => 'medicines',
    }),
    getOrders: builder.query({
      query: () => 'orders',
    }),
    // ... other endpoints
  }),
})

export const { useGetUserInfoQuery, useGetMedicinesQuery, useGetOrdersQuery } =
  api
