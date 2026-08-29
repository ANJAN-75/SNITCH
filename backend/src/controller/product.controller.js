import ProductModel from "../models/product.model";
import { uploadFile } from "../services/storage.service.js";

export async function createProductController(req, res) {
  const { title, description, amount, currency } = req.body;

  const seller = req.user;

  const images=promise.all(req.files.map(async file=>{
    return await uploadFile({
        buffer:file.buffer,
        filename:file.orginalname
    })
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
