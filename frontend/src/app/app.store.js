import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/state/auth.userSlice.js"
import productReducer from "../feature/product/state/product.productSlice.js"

export const store=configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer
    }
})
