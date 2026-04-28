import { MapPin, Clock } from "lucide-react";
import { Product } from "@/app/types/product";
import ProductImagesSlider from "./ProductImagesSlider";

interface Props {
  params: Promise<{ slug: string }>;
}

// --- دالة تنسيق الوقت ---
function formatRelativeTime(dateString?: Date | string): string {
  if (!dateString) return "منذ مدة";
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (isNaN(date.getTime())) return "تاريخ غير محدد";
  if (diffInSeconds < 60) return "منذ ثواني";
  if (diffInSeconds < 3600)
    return `منذ ${Math.floor(diffInSeconds / 60)} دقيقة`;
  if (diffInSeconds < 86400)
    return `منذ ${Math.floor(diffInSeconds / 3600)} ساعة`;
  if (diffInSeconds < 604800)
    return `منذ ${Math.floor(diffInSeconds / 86400)} أيام`;
  return date.toLocaleDateString("ar-EG");
}

// دالة لجلب البيانات في السيرفر
async function getProduct(slug: string): Promise<Product | null> {
  const productID = slug.split("PID").at(-1)?.replace("-", "");
  if (!productID) return null;

  // نستخدم URL كامل لو بننادي API داخلية، أو ننادي DB مباشرة وده الأفضل في السيرفر
  const res = await fetch(
    `http://localhost:3000/api/products/${productID}`,
    {
      next: { revalidate: 3600 }, // اختيارياً: كاش لمدة ساعة
    },
  );

  if (!res.ok) return null;
  const result = await res.json();
  return result?.data;
}

export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center font-bold">
        المنتج غير موجود
      </div>
    );
  }

  const images = [...product.images, product.thumbnail];

  return (
    <div
      className="max-w-5xl mx-auto p-4 md:p-10 bg-white min-h-dscreen text-right selection:bg-blue-100"
      dir="rtl"
    >
      <div className="grid grid-cols-1 gap-10">
        <main className="space-y-8">
          {/* Slider Section */}
          <ProductImagesSlider images={images} />

          {/* Product Info Section */}
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-blue-100">
                  {product?.category || "General"}
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight tracking-tight">
                  {product?.title}
                </h1>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-black text-blue-600 overflow-auto max-w-[99%]">
                    {product.price?.toLocaleString()}{" "}
                    <small className="text-xs font-medium text-gray-400">
                      ج.م
                    </small>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-5 text-gray-400 text-xs font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-gray-300" />{" "}
                  {product.location || "عنوان غير محدد"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-gray-300" />{" "}
                  {formatRelativeTime(product.timestamp)}
                </span>
              </div>
            </div>

            {/* Description Container */}
            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100/50">
              <h3 className="text-sm font-bold text-gray-900 mb-3 opacity-80 italic">
                الوصف والتفاصيل
              </h3>
              <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            {/* <div className="grid grid-cols-2 gap-4 pt-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-blue-100 transition-all active:scale-[0.98]">
                طلب شراء المنتج
              </button>
              <button className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                <MessageCircle size={18} /> دردشة سريعة
              </button>
            </div> */}
          </div>

          {/* Comments Mini-Section */}
          <div className="max-w-3xl mx-auto border-t border-gray-100 pt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">التعليقات</h3>
              <span className="text-xs text-gray-400">0 تعليق</span>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 shrink-0" />
              <div className="flex-1 relative">
                <textarea
                  placeholder="لسه مش شغال..."
                  className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm outline-none focus:border-blue-500 transition-all min-h-20 resize-none"
                />
                <button className="mt-2 px-6 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-800 transition-all">
                  إرسال
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <p className="fixed top-1/2 left-1/2 opacity-20 -translate-1/2 z-2000 text-red-600">
        تصميم تجريبي يا ليفة
      </p>
    </div>
  );
}
