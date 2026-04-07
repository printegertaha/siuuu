import connectDB from "@/lib/mongodb";
import Product from "@/models/Products";
import { NextResponse } from "next/server";

// Get Function
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json({ data: products }, { status: 200 });
  } catch (errr) {
    NextResponse({ message: "failed to fetch products" }, { status: 500 });
  }
}

// Post Function
export async function POST(request) {
  try {
    const data = await request.formData();
    await connectDB();

    // 1. معالجة الـ Thumbnail
    const thumbnailFile = data.get("thumbnail");
    const thumbBytes = await thumbnailFile.arrayBuffer();
    const thumbBuffer = Buffer.from(thumbBytes);
    const thumbBase64 = `data:${thumbnailFile.type};base64,${thumbBuffer.toString('base64')}`;

    // 2. معالجة مصفوفة الصور (Gallery)
    const imageFiles = data.getAll("images"); // بنجيب كل الصور اللي مبعوتة باسم images
    const imagesBase64 = await Promise.all(
      imageFiles.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        return `data:${file.type};base64,${buffer.toString('base64')}`;
      })
    );

    // 3. التخزين في الداتا بيز
    const newProduct = await Product.create({
      title: data.get("title"),
      price: data.get("price"),
      description: data.get("description"),
      category: data.get("category"),
      ownerID: data.get("ownerID"),
      thumbnail: thumbBase64,
      images: imagesBase64, // مصفوفة النصوص كاملة
    });

    return NextResponse.json({ data: newProduct }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
