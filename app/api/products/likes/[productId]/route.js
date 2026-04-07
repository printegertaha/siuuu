// /api/products/likes/[productId]
export async function GET(req, { params }) {
  const { productId } = params;
  
  // بنجيب اللايكات ونعمل "Populate" لبيانات المستخدم
  const likes = await Like.find({ productId })
    .populate('userId', 'name image bio') // بنجيب الاسم والصورة بس
    .exec();

  return Response.json(likes.map(like => like.userId)); 
  // كدة هيرجعلك Array فيها بيانات المستخدمين اللي عملوا لايك بس
}