import { NextResponse } from "next/server";
import connectDB from '@/lib/mongodb';
import Product from "@/models/Products";
import { getServerSession } from "next-auth"; // لو بتستخدم NextAuth'
import { authOptions } from "@/lib/auth";

export async function GET(req) {
  try {
    await connectDB();

    // 1. التأكد من هوية المستخدم (Authentication)
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: "غير مصرح لك بالدخول" }, { status: 401 });
    }

    const userId = session.user.id; // هنجيب الـ ID من السيشن

    // 2. جلب المنتجات المربوطة بهذا المستخدم فقط
    // بنستخدم find وبنمرر لها الـ ownerID (أو المسمى اللي اخترته في الـ Schema)
    const userProducts = await Product.find({ ownerID: userId }).sort({ createdAt: -1 });

    // 3. إرجاع البيانات
    return NextResponse.json(userProducts, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "خطأ في الخادم", error: error.message }, { status: 500 });
  }
}