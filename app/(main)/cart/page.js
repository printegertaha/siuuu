import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Cart() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f8f9fb] py-12 px-[5%] font-sans"
    >
      <div className="max-w-4xl mx-auto">
        {/* الحاوية الرئيسية للمحتوى */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col items-center justify-center py-20 px-10 text-center">
            {/* أيقونة السلة الفارغة */}
            <div className="w-32 h-32 bg-[#f4f6f8] rounded-full flex items-center justify-center mb-6">
              <ShoppingBag
                className="w-14 h-14 text-gray-300"
                strokeWidth={1}
              />
            </div>

            <h2 className="text-2xl font-bold text-[#1e2331] mb-3">
              سلة التسوق فارغة حالياً!
            </h2>
            <p className="text-gray-500 mb-10 max-w-sm">
              يبدو أنك لم تضف أي منتجات إلى سلتك بعد. ابدأ باستكشاف أفضل العروض
              المتاحة لدينا.
            </p>

            {/* زر العودة للمتجر */}
            <div className="flex gap-2 items-center">
              <Link
                href={`/`}
                className="inline-flex items-center gap-2 px-10 py-4 bg-[#1e2331] text-white rounded-full font-bold text-sm tracking-wide hover:bg-black transition-all shadow-lg shadow-gray-200"
              >
                متابعة التسوق
                <ArrowRight className="w-4 h-4 rotate-180" />
              </Link>
              <button className="inline-flex cursor-pointer items-center gap-2 px-10 py-4 bg-blue-800 text-white rounded-full font-bold text-sm tracking-wide hover:bg-blue-900 transition-all shadow-lg shadow-gray-200">
                تحديث السلة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
