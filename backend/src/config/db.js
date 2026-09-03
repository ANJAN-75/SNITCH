import mongoose from "mongoose"
import { config } from "./config.js"
export async function connectDb(){
    try{
        console.log(config.MONGO_URI)
        await mongoose.connect(config.MONGO_URI)
        console.log("mongoDb connected sucessfully")
    }catch(err){
        console.log(err)
    }
}