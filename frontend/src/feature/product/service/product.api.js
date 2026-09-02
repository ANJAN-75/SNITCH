import axios from "axios"

const productApiInstence=axios.create({
    baseURL:"/api/product",
    withCredentials:true
})

export const createProduct=async({
    title, description, amount, currency,images
})=>{
    try{
        const response=await productApiInstence.post("/create",{
        title, description, amount, currency,images
    })

    return response.data
    }catch(error){
        console.log("backend error",error.response?.data)
        throw error
    }
}

export const showProduct=async()=>{
    try{
        const response=await productApiInstence.get("/")
        return response.data
    }catch(error){
        console.log("backend errror",error.response?.data)
        throw error
    }
}