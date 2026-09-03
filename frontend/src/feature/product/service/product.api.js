import axios from "axios"

const productApiInstence=axios.create({
    baseURL:"/api/product",
    withCredentials:true
})

export const createProduct=async(fromdata)=>{
    try{
        const response=await productApiInstence.post("/create",fromdata)

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