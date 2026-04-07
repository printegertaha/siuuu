// /api/products/like
export async function POST(req) {
  const { productId, userId } = await req.json();
  
  const existingLike = await Like.findOne({ productId, userId });

  if (existingLike) {
    await Like.findByIdAndDelete(existingLike._id);
    return Response.json({ message: "Like removed", status: -1 });
  } else {
    await Like.create({ productId, userId });
    // هنا ممكن تبعت النوتيفيكيشن لأحمد (صاحب المنتج)
    return Response.json({ message: "Like added", status: 1 });
  }
}