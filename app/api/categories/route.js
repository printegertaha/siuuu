import Categories from "@/models/categories";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ReactJsxRuntime } from "next/dist/server/route-modules/app-page/vendored/rsc/entrypoints";


export async function GET () {
    try{
        await connectDB()
        const allCategories = await Categories.find({});
        return NextResponse.json({data: allCategories, message: 'categories is ready.'},{status: 200})
    }catch(err){
        return NextResponse.json(
          {message: "failed to get categories"},
          {status: 500}
        )
    }
}

export async function POST(request) {
    try{
        const {name, nickName} = await request.json()
        await connectDB();
        const newCategory = await Categories.create({name, nickName});
        return NextResponse.json(
            {data: newCategory, message: 'new category created successfully.'}, 
            {status: 201}
        )
    }catch(err){
        return NextResponse.json(
            {message: 'failed to create new category'},
            {status: 500}
        )
    }
}

// في ملف api/categories/route.js

export async function DELETE() {
    try {
        await connectDB();
        const result = await Categories.deleteMany({});
        return NextResponse.json({ 
            message: 'تم تنظيف المتجر وحذف جميع التصنيفات بنجاح',
            deletedCount: result.deletedCount // ده بيعرفك حذف كام عنصر بالظبط
        });
    } catch (err) {
        return NextResponse.json(
            { message: 'فشل حذف الكل يا هندسة', error: err.message }, 
            { status: 500 }
        );
    }
}
