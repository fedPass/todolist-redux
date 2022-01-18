import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { list_url } from '../config';

// Define a service using a base URL and expected endpoints
export const listApi = createApi({
  reducerPath: 'lists',
  //tag: 'label' attached to cached data that is read after a mutation
  tagTypes:['List'],
  baseQuery: fetchBaseQuery({ baseUrl: list_url }),
  endpoints: (builder) => ({
    getLists: builder.query({
      query: () => '',
      //providesTags: tag attached to the cached data returned by the query
      providesTags: ['List']
    }),
    deleteList: builder.mutation({
      query: (id) => ({
        url: '/' + id,
        method: 'DELETE'
      }),
      //invalidatesTags: determines which cached data will be either refetched or removed from the cache
      invalidatesTags: ['List']
    }),
    addList: builder.mutation({
      query: (list) => ({
        url: '',
        method: 'POST',
        body: list,
      }),
      invalidatesTags: ['List']
    }),
    updateList: builder.mutation({
      //potrei o passare list e destrutturare sotto list.id
      //oppure destrutturo l'arg e prendo id e le altre prop di body
      query: ({id,...body}) => ({
        url: '/' + id,
        method: 'PATCH',
        body
      }),
      //invalidatesTags: determines which cached data will be either refetched or removed from the cache
      invalidatesTags: ['List']
    })
  }),
})

// Export hooks _> use + Nome metodo +Query
export const { useGetListsQuery, useDeleteListMutation, useAddListMutation, useUpdateListMutation } = listApi