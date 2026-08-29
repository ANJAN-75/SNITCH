import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    price: {
      amount: {
        type: number,
        required: true,
      },
      currency: {
        type: String,
        enum: ["USD", "EUR", "INR", "GBP", "JPY"],
      },
    },
    images: [
      {url: {
        type: String,
        required: true,
      },}
    ],
  },
  { timestamps: true },
);

const ProductModel = mongoose.model("product", productSchema);

export default ProductModel;
