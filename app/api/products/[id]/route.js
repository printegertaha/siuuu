import connectDB from "@/lib/mongodb";
import Product from "@/models/Products";
import { NextResponse } from "next/server";

// 3. تعديل منتج (UPDATE)
export async function PUT (request, context){
  try{
    const {id} = await context.params;
    const {name, price, description} = await request.json();
    await connectDB();
    const newProduct = await Product.findByIdAndUpdate( id, {name, price, description},{new: true, runValidators: true} );
    return NextResponse.json({data: newProduct, message: 'data updated.'}, {status: 200})
  }
  catch(err){
    return NextResponse.json({message: err.message}, {status: 500})
  }
}


// 4. حذف منتج (DELETE)
export async function DELETE (_, context){
  try{
    const {id} = await context.params;
    await connectDB();
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct){
      return NextResponse.json({message: 'product non found'}, {status: 404});
    }
    return NextResponse.json({data: deletedProduct, message: 'product deleted successfully.'}, {status: 200})
  }
  catch(err){
    return NextResponse.json({message: err.message}, {status: 500})
  }
}

// 5. جلب منتج واحد بالأيدي (PUT)
export async function GET (request, context) {
  try{
    const {id} = await context.params;
    await connectDB()
    const targetProduct = await Product.findById(id);
    if (!targetProduct){
      return NextResponse.json({message: 'product not found'}, {status: 404})
    }
    return NextResponse.json({data: targetProduct, message: 'product is ready.'}, {status: 200})
  }
  catch(err){
    return NextResponse.json({message: "interval server error!"}, {status: 500})
  }
}

