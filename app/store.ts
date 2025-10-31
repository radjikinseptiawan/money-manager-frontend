import { configureStore } from "@reduxjs/toolkit"
import otpReducers from './features/otpSlice'
import  accountReducers  from "./features/accountSlice"
export const store = configureStore({
    reducer:{
        accounts: accountReducers,
        otp:otpReducers
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch