import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
  },
  { timestamps: true } // بيضيف وقت الإنشاء والتعديل تلقائياً
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;