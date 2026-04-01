import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // لمنع تكرار الإيميل
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "seller", "moderator", "admin"], // القيم المسموح بها فقط
      default: "user", // القيمة الافتراضية عند التسجيل
    },
  },
  { timestamps: true } // لإضافة وقت الإنشاء والتحديث تلقائياً
);

const User = models.User || mongoose.model("User", userSchema);
export default User;