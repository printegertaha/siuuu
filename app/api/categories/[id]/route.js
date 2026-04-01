import Categories from "@/models/categories";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(_, {params}) {
    try{
    const {id} = await params;
    await connectDB();
    const category = await Categories.findById(id);
    return NextResponse.json({data: category, message: 'product is ready.'}, {status: 200})
    }catch(err){
        return NextResponse.json({message: 'failed to get product'}, {status: 500})
    }
}

export async function DELETE(_, { params }) {
    try {
        const { id } = await params;
        await connectDB();
        const deletedCategory = await Categories.findByIdAndDelete(id);

        if (!deletedCategory) {
            return NextResponse.json(
                { message: 'التصنيف غير موجود أصلاً يا هندسة' }, 
                { status: 404 }
            );
        }

        return NextResponse.json({ 
            data: deletedCategory, 
            message: 'تم حذف التصنيف بنجاح' 
        });

    } catch (err) {
        console.error(err); // مهم عشان تشوف الـ error في الـ terminal عندك
        return NextResponse.json(
            { message: 'حصلت مشكلة في السيرفر', error: err.message }, 
            { status: 500 }
        );
    }
}

export async function PUT (request, {params}){
    try{
    const {id} = await params;
    const {name, nickName} = await request.json();
    await connectDB();
    const category = await Categories.findByIdAndUpdate(id, {name, nickName}, {new: true, runValidators: true});
    return NextResponse.json({data: category, message: "category is ready."}, {status: 200})
    }catch(err){
        return NextResponse.json({message: "failed to get category"}, {status: 500})
    }


}