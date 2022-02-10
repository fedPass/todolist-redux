// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { auth_url } from '../config';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
    reducerPath: 'authService',
    baseQuery: fetchBaseQuery({ 
        baseUrl: auth_url,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Accept', `application/json`)
            const token = getState().auth.token;
            console.log('token',token);
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
              headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
     }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: `/login`,
                method: 'POST',
                body,
            })
        }),
        logout:builder.mutation({
            query: (body) => ({
                url: `/logout`,
                method: 'POST',
                body,
            })
        }),
        register:builder.mutation({
            query: (body) => ({
                url: `/register`,
                method: 'POST',
                body,
            })
        }),
    })
})
// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = authApi