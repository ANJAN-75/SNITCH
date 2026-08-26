import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js";
import { config } from "../config/config.js";


async function response(user,res,message) {
    const token=jwt.sign(
        {id:user._id},
        config.JWT_SECRET,
        {expiresIn:"3d"}
    )
    res.cookie("token",token)

    return res.status(200).json({
        success:true,
        message,
        user,

    })
}
export const registerController=async(req,res)=>{
    const{email,password,contact,fullname,isSeller}=req.body;
    try{
         const isExistingUser=await UserModel.findOne({
        $or:[{email},{contact}]
    })

    if(isExistingUser){
        return res.status(409).json({
            success:false,
            message:"You already have an account"
        })
    }

    const user=await UserModel.create({
        email,
        password,
        contact,
        fullname,
        isSeller:isSeller ? "seller" : "buyer"
    })

    const userdata=user.toObject()
    delete userdata.password

    await response(userdata,res,"user created sucessfully")

    }catch(e){
        console.log(e)
        return res.status(500).json({message:"Server error"})
    }

   

}



