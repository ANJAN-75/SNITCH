import axios from "axios"

const authApiInstence=axios.create({
    baseURL:"/api/auth",
    withCredentials:true,
})

export const register=async ({ email, contact, password, fullname, isSeller})=>{
    try{
         const response = await authApiInstence.post("/register", {
        email,
        contact,
        password,
        fullname,
        isSeller
    })
    return response.data
    }catch(e){
        console.log("backend error: ",e.response?.data)
        throw e
    }
}

