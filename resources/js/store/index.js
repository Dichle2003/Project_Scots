import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/storeUser'

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
})
