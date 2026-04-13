import { model, models, Schema } from "mongoose";

const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // تأكد من كتابتها required وليس require
      trim: true,
    },
    nickName: {
      type: String,
      required: true,
      unique: true, // يفضل يكون فريد لو هتستخدمه في الـ URL (Slug)
      trim: true,
    },
    image: {
      type: String,
      required: true, // هنا هنخزن رابط الصورة (مثلاً من Cloudinary أو S3)
    },
  },
  { timestamps: true },
); // ضيف دي عشان تعرف التصنيف اتكريت إمتى

const Categories = models.Categories || model("Categories", categoriesSchema);

export default Categories;
