import { todo_url,filter_url } from '../config';

//****** metodo con le chiamate fetch **********

// export const fetchTodos = async () => {
//     return fetch(todo_url).then(res => res.json()).then(res => res);
// }

// export const fetchFilter = async () => {
//     return fetch(filter_url).then(res => res.json()).then(res => res);
// }

// export const removeTodo = async (todo) => {
//     //console.log('deleting el '+todo.id);
//     return fetch(todo_url+'/'+todo.id,
//     {
//         method:'DELETE'
//     }).then(res => res.json()).then(res => res);
// }

// export const addNewTodo = async (todo) => {
//     return fetch(todo_url,
//     {
//         method:'POST',
//         headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(todo)
//     }).then(res => res.json()).then(res => res);
// }

// export const changeCompleted = async (todo) => {
//     return fetch(todo_url+'/'+ todo.id,
//     {
//         method:'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(todo)
//     }).then(res => res.json()).then(res => res);
// }
// ****************************************************

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
    reducerPath: 'todos',
    tagTypes: ['TODOS'],
    baseQuery: fetchBaseQuery({ baseUrl: todo_url }),
    endpoints: (builder) => ({
      getTodos: builder.query({
        query: () => ``,
        //providesTags: tag attached to the cached data returned by the query
        providesTags: (result, error) => {
            if (error || !result) {
                return [{ type: 'TODOS' }];
            }
            return result.map((ele) => ({ type: 'TODOS', id: ele.id }));
        },
      }),
      getTodoByListId: builder.query({
        query: (id) =>`?list_id=${id}`
      }),
      deleteTodo: builder.mutation({
        query: (id) => ({
          url: '/' + id,
          method: 'DELETE'
        }),
        //invalidatesTags: determines which cached data will be either refetched or removed from the cache
        invalidatesTags: ['TODOS']
      }),
      addTodo: builder.mutation({
        query: (todo) => ({
          url: '',
          method: 'POST',
          body: todo,
        }),
        invalidatesTags: ['TODOS']
      }),
      updateTodo: builder.mutation({
        query: ({id,...body}) => ({
          url: '/' + id,
          method: 'PATCH',
          body
        }),
        //invalidatesTags: determines which cached data will be either refetched or removed from the cache
        invalidatesTags: ['TODOS']
      })
    }),
  })

  export const {useGetTodosQuery, useGetTodoByListIdQuery, useDeleteTodoMutation, useAddTodoMutation, useUpdateTodoMutation} = todoApi;
