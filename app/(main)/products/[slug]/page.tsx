"use client";
import { Maximize2, X, MapPin, Clock } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Product } from "@/app/types/product";

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

export default function ProductDetailsPage({ params: paramsPromise }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const params = await paramsPromise;
        const slug: string = params.slug;
        const productID: string = slug.split("PID").at(-1).replace("-", "");
        const res = await fetch(`/api/products/${productID}`);
        const result = await res.json();
        const product: Product = result?.data;
        setProduct(product);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [paramsPromise]);

  const handleScroll = () => {
    const scroll = scrollRef?.current;
    if (scroll) {
      const { scrollLeft, offsetWidth } = scroll;
      const index = Math.round(Math.abs(scrollLeft) / offsetWidth);
      setActiveIndex(index);
    }
  };

  if (loading)
    return (
      <div className="flex h-dscreen items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!product)
    return (
      <div className="h-dscreen flex items-center justify-center font-bold">
        المنتج غير موجود
      </div>
    );

  const images = [...product?.images, product?.thumbnail];

  return (
    <div
      className="max-w-5xl mx-auto p-4 md:p-10 bg-white min-h-dscreen text-right selection:bg-blue-100"
      dir="rtl"
    >
      {/* Lightbox Popup */}
      {isPopupOpen && (
        <div className="fixed top-20 z-100 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-4 mx-auto">
          <button
            onClick={() => setIsPopupOpen(false)}
            className="absolute opacity-40 top-6 right-6 p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-all text-gray-800"
          >
            <X size={24} />
          </button>
          <div className="w-full max-w-4xl max-h-[80dvh] overflow-y-auto no-scrollbar rounded-2xl">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="w-full object-contain mb-4 rounded-lg shadow-sm"
              />
            ))}
          </div>
          <p className="mt-4 text-gray-500 font-medium font-mono text-sm">
            عرض الكل ({images.length} صور)
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-10">
        <main className="space-y-8">
          {/* Slider Section */}
          <div className="relative group mx-auto max-w-3xl ">
            <div className="relative rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm ">
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory h-75 md:h-112.5 no-scrollbar"
              >
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="min-w-full h-full snap-center flex items-center justify-center p-2"
                  >
                    <img
                      src={img}
                      alt={product.title}
                      className="max-w-full max-h-full object-contain drop-shadow-md transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </div>
                ))}
              </div>

              {/* Floating Controls */}
              <div className="absolute top-4 left-4 right-1.5 opacity-50 flex justify-between items-center pointer-events-none">
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="p-2.5 bg-white/80 backdrop-blur-md rounded-xl shadow-sm pointer-events-auto hover:bg-white transition-all text-gray-700"
                >
                  <Maximize2 size={18} />
                </button>
                {/* <button className="p-2.5 bg-white/80 backdrop-blur-md rounded-xl shadow-sm pointer-events-auto hover:bg-white transition-all">
                  <Heart size={18} className="text-red-500 fill-red-500" />
                </button> */}
              </div>

              {/* Minimal Dots */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 bg-white/50 backdrop-blur-sm rounded-full border border-white/20">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`transition-all duration-300 rounded-full ${activeIndex === i ? "w-4 h-1.5 bg-blue-600" : "w-1.5 h-1.5 bg-gray-400"}`}
                  />
                ))}
              </div>
            </div>
          </div>

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
