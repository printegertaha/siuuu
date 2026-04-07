import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
    thumbnail: { type: String, require: true },
    images: [{ type: String }],
    ownerID: { type: String, required: true },
  },
  { timestamps: true }, // بيضيف وقت الإنشاء والتعديل تلقائياً
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
