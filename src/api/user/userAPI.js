import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Change this to your API base URL
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => 'user', // Change this to your actual endpoint
    }),
    // Add other user-related queries and mutations
  }),
})
