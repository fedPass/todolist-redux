import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { list_url } from '../config';

// Define a service using a base URL and expected endpoints
export const listApi = createApi({
  reducerPath: 'lists',
  baseQuery: fetchBaseQuery({ baseUrl: list_url }),
  endpoints: (builder) => ({
    getLists: builder.query({
      query: () => '',
    }),
    deleteList: builder.mutation({
      query: (id) => ({
        url: '/' + id,
        method: 'DELETE'
      })

    })
  }),
})

// Export hooks _> use + Nome metodo +Query
export const { useGetListsQuery, useDeleteListMutation } = listApi