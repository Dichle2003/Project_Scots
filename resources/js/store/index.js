import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/storeAuth'

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
})
