import connectDB from "@/lib/mongodb";
import Product from "@/models/Products";
import { NextResponse } from "next/server";
import { status } from "nprogress";


// Get Function
export async function GET () {
  try{
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json({data: products}, {status: 200})
  }catch(errr){
    NextResponse({message: 'failed to fetch products'}, {status: 500})
  }
}

// Post Function
export async function POST (request) {
  try{
    const {name, price, description} = await request.json();
    await connectDB()
    const newProduct = await Product.create({name, price, description})
    return NextResponse.json({data: newProduct, message: 'product created successfully.'}, {status: 201})
  }
  catch(err){
    return NextResponse.json({message: 'failed to create product!'},{ status: 500})
  }

}
