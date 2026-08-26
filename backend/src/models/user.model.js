import mongoose from "mongoose"
import bcrypt from "bcrypt"
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    contact:{
        type:String,
        required:false,
    },
    role:{
        type:String,
        enum:["buyer","seller"],
        default:"buyer"
    }

})

userSchema.pre("save",async function(){

    if(!this.isModified("password")){
        return;
    }
    this.password=await bcrypt.hash(this.password, 10) 
})

userSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password,this.password)
}

const UserModel=mongoose.model("user",userSchema)

export default UserModel;