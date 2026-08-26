import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/state/auth.userSlice.js"

export const store=configureStore({
    reducer:{
        auth:authReducer
    }
})
