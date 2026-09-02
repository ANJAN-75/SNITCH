import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
    name:"product",
    initialState:{
        product:null
    },
    reducers:{
        setProduct:(state,action)=>{
            state.product=action.payload
        }
    }

})

export default productSlice.reducer
export const {setProduct} =productSlice.actions