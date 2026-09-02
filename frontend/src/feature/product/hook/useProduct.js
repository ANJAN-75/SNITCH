import { createProduct } from "../service/product.api";
import { setProduct } from "../state/product.productSlice.js";
import {useDispatch} from "react-redux"

export const useProduct=async()=>{
    const response=await createProduct({
        title, description, amount, currency,images
    })
    
    useDispatch(setProduct(response.product))
    console.log(response)
    return response.product
}