import { url } from "inspector";
import ProductModel from "../models/product.model.js";
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
