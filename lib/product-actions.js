"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function لتحويل ملف الصورة لـ Base64
async function fileToGenerativePart(file) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType: file.type,
    },
  };
}

export async function createProductAction(formData) {
  const title = formData.get("title");
  const price = formData.get("price");
  const description = formData.get("description");
  const category = formData.get("category");
  
  const thumbnail = formData.get('thumbnail');
  const images = formData.getAll('images'); // استخدم getAll لو في أكتر من صورة
  const allFiles = [thumbnail, ...images].filter(file => file && file.size > 0);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // تحويل كل الصور لصيغة بيفهمها Gemini
    const imageParts = await Promise.all(
      allFiles.map(file => fileToGenerativePart(file))
    );

    const prompt = `
      أنت مراجع منتجات محترف لموقع تجارة إلكترونية.
      راجع البيانات التالية:
      - الاسم: ${title}
      - السعر: ${price}
      - الوصف: ${description}
      - التصنيف: ${category}

      المطلوب:
      1. تأكد أن الصور المرفقة هي صور حقيقية للمنتج وليست صوراً مسيئة أو غير لائقة.
      2. تأكد أن السعر منطقي بالنسبة لاسم المنتج ووصفه.
      3. تأكد أن التصنيف (${category}) صحيح ومناسب للمنتج.

      رد فقط بصيغة JSON كالتالي:
      {"approved": boolean, "reason": "اكتب السبب بالعربية باختصار لو تم الرفض"}
    `;

    // نبعت الـ Prompt ومعاه مصفوفة الصور
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text().replace(/```json|```/g, "").trim();
    
    const review = JSON.parse(text);

    if (!review.approved) {
      return { success: false, error: review.reason };
    }

    // 3. هنا مرحلة الحفظ في الـ Database (MongoDB)
    console.log("المنتج سليم، جاري الحفظ...");
    // await db.products.create({ title, price, description, category, ... });

    return { success: true };

  } catch (error) {
    console.error("Gemini Error:", error);
    return { success: false, error: "حدث خطأ أثناء فحص المنتج، حاول مجدداً." };
  }
}