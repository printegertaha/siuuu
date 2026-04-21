export const revalidate = 0; // أو استخدم export const dynamic = 'force-dynamic';
import connectDB from "@/lib/mongodb";
import Product from "@/models/Products";
import { NextResponse } from "next/server";

// Get Function - تدعم جلب الكل، أو قسم معين، مع الترتيب
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const sortType = searchParams.get("sort") || "latest";

    // 1. بناء الفلتر
    let query = {};
    if (category && category !== "undefined") {
      query.category = category;
    }

    // 2. بناء الترتيب بدقة
    let sortOptions = {};

    if (sortType === "min-price") {
      sortOptions.price = 1;
    } else if (sortType === "max-price") {
      sortOptions.price = -1;
    } else if (sortType === "a-z") {
      sortOptions.title = 1;
    } else if (sortType === "z-a") {
      sortOptions.title = -1;
    } else if (sortType === "oldest") {
      sortOptions.createdAt = 1;
    } else {
      sortOptions = { createdAt: -1 };
    }

    // 3. التنفيذ مع إضافة .lean() لتحسين الأداء وتجنب مشاكل الـ Circular Structures
    const products = await Product.find(query).sort(sortOptions).lean();

    return NextResponse.json({ data: products }, { status: 200 });
  } catch (err) {
    console.error("Mongoose Error Details:", err.message); // هيطبع لك السبب الحقيقي للـ 500 في الـ Terminal
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// POST Func
export async function POST(request) {
  try {
    const data = await request.formData();
    await connectDB();

    const thumbnailFile = data.get("thumbnail");
    const thumbBytes = await thumbnailFile.arrayBuffer();
    const thumbBuffer = Buffer.from(thumbBytes);
    const thumbBase64 = `data:${thumbnailFile.type};base64,${thumbBuffer.toString("base64")}`;

    const imageFiles = data.getAll("images");
    const imagesBase64 = await Promise.all(
      imageFiles.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        return `data:${file.type};base64,${buffer.toString("base64")}`;
      }),
    );

    const newProduct = await Product.create({
      title: data.get("title"),
      price: data.get("price"),
      description: data.get("description"),
      category: data.get("category"),
      ownerID: data.get("ownerID"),
      thumbnail: thumbBase64,
      images: imagesBase64,
    });

    return NextResponse.json({ data: newProduct }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
