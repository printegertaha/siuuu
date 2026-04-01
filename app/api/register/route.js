import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    
    // 1. تشفير كلمة السر (Hashing)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. الاتصال بقاعدة البيانات
    await connectMongoDB();

    // 3. التحقق من وجود المستخدم مسبقاً
    const userExists = await User.findOne({ email }).select("_id");
    if (userExists) {
      return NextResponse.json(
        { message: "هذا الإيميل مسجل بالفعل!" },
        { status: 400 }
      );
    }

    // 4. إنشاء المستخدم الجديد (الصلاحية ستكون user تلقائياً كما حددنا في الموديل)
    const userData = await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({data: userData, message: "تم تسجيل المستخدم بنجاح" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "حدث خطأ أثناء التسجيل" },
      { status: 500 }
    );
  }
}