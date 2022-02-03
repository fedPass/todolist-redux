// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { auth_url } from '../config';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: auth_url }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: `/login`,
                method: 'POST',
                body,
            })
        })
    })
})
// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = authApi