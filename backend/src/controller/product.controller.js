import { url } from "inspector";
import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js"
import { uploadFile } from "../services/storage.service.js";

export async function createProductController(req, res) {
  const { title, description, amount, currency } = req.body;
  console.log("BODY:", req.body);
console.log("FILES:", req.files);

  const seller = req.user;

  const images=await Promise.all(req.files.map(async (file)=>{
    const url= await uploadFile({
        buffer:file.buffer,
        fileName:file.originalname
    })
    return {url}
  }))

  const product=await ProductModel.create({
    title:title,
    description:description,
    seller:seller.id,
    price:{
        amount:amount,
        currency:currency || "INR"
    },
    images,
  })

  return res.status(201).json({
    message:"product created",
    product,
    success:true

  })
}


export async function showProductController(req,res){
  let user=req.user
  const id=user.id
  console.log(id)
  if(!id){
    return res.status(400).json({
      message:"No id found"
    })
  }
  user =await UserModel.findById(id)
  

  if(user.role!=="seller"){
    return res.status(403).json({
      message:"you dont have access for this route"
    })
  }

  const product=await ProductModel.find({seller:id})

  if(!product){
    return res.status(204).json({
      message:"no product found"
    })
  }
  return res.status(200).json({
    message:"seller product featch successfully ",
    sucess:true,
    product
  })
}