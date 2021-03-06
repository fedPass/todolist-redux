import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { list_url } from '../config';

// Define a service using a base URL and expected endpoints
export const listApi = createApi({
  reducerPath: 'listService',
  //tag: 'label' attached to cached data that is read after a mutation
  tagTypes:['List'],
  baseQuery: fetchBaseQuery({ 
    baseUrl: list_url,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Accept', `application/json`)
      const token = getState().auth.token;
      if (token) {
       headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({

    getLists: builder.query({
      query: () => (''),
      //providesTags: tag attached to the cached data returned by the query
      providesTags: (result, error) => {
        if (error || !result || !result.data) {
            return [{ type: 'List' }];
        }
        return result.data.map((ele) => ({ type: 'List', id: ele.id }));
      },
    }),

    getListById: builder.query({
      query: (id) =>({url:`/${id}`}),
      providesTags: (result, error, id) => [{ type: 'List', id }],
    }),

    deleteList: builder.mutation({
      query: (id) => ({
        url: '/' + id,
        method: 'DELETE',
      }),
      //invalidatesTags: determines which cached data will be either refetched or removed from the cache
      invalidatesTags: (result, error, id) => [{ type: 'List', id }],
    }),

    addList: builder.mutation({
      query: (list) => ({
        url: '',
        method: 'POST',
        body: list
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
      //invalidatesTags: (result,error, id) => [{type:'List', id}]
      invalidatesTags:  ['List']
    })

  })
})

// Export hooks _> use + Nome metodo +Query/Mutation
export const { useGetListsQuery, useGetListByIdQuery, useDeleteListMutation, useAddListMutation, useUpdateListMutation } = listApi