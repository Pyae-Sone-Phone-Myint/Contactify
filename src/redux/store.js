import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './api/authApi'
import authSlice from './feature/authSlice'


export const store = configureStore({
    reducer : {
        [authApi.reducerPath]: authApi.reducer,
        authSlice : authSlice

    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})