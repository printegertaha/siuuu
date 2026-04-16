"use client";
import { Heart } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

// --- دالة تنسيق الوقت الاحترافية ---
function formatRelativeTime(dateString) {
  if (!dateString) return "لا يوجد عنوان محدد";
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (isNaN(date.getTime())) return "لا يوجد تاريخ محدد";
  if (diffInSeconds < 60) return "منذ ثواني";
  if (diffInSeconds < 3600)
    return `منذ ${Math.floor(diffInSeconds / 60)} دقيقة`;
  if (diffInSeconds < 86400)
    return `منذ ${Math.floor(diffInSeconds / 3600)} ساعة`;
  if (diffInSeconds < 604800)
    return `منذ ${Math.floor(diffInSeconds / 86400)} أيام`;
  return date.toLocaleDateString("ar-EG");
}

export default function ProductDetailsPage({ params: paramsPromise }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  // فك تشفير البرامز وجلب البيانات
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = await paramsPromise;
        const slug = params.slug;
        const productID = slug.split("PID").at(-1).replace("-", "");

        const res = await fetch(`/api/products/${productID}`);
        const data = await res.json();
        setProduct(data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [paramsPromise]);

  // التحكم في السلايدر
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(Math.abs(scrollLeft) / offsetWidth);
      setActiveIndex(index);
    }
  };

  const scrollToImage = (index) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: -index * width,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!product)
    return (
      <div className="flex h-screen items-center justify-center text-xl font-bold">
        المنتج غير موجود
      </div>
    );

  const images = product.images || [product.image];

  return (
    <div
      className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen text-right"
      dir="rtl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* العمود الأكبر: السلايدر والتفاصيل */}
        <div className="relative lg:col-span-8 space-y-6">
          {/* Smart Slider */}
          <div className="relative bordere group overflow-hidden rounded-[2.5rem] shadow-2xl bg-white border border-gray-100">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory h-[450px] md:h-[650px] no-scrollbar  no-scrollbar "
            >
              {images.map((img, i) => (
                <div key={i} className="min-w-full h-full snap-center relative">
                  <img
                    src={img || "/placeholder.png"}
                    alt="Product"
                    className="w-full h-full object-fill transition-transform duration-1000 "
                  />
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-5 py-2.5 bg-black/30 backdrop-blur-xl rounded-full">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToImage(i)}
                  className={`transition-all duration-500 rounded-full ${
                    activeIndex === i
                      ? "w-10 h-2 bg-blue-500"
                      : "w-2 h-2 bg-white/50 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* معلومات المنتج */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
              <div className="space-y-4">
                <span className="inline-block px-5 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest">
                  {product.category || "General"}
                </span>
                <h1 className="text-xl md:text-5xl font-black text-gray-900 leading-[1.2]">
                  {product.title}
                </h1>
                <div className="flex items-center gap-6 text-gray-400 font-medium">
                  <span className="flex items-center gap-2">
                    📍 {product.location || "لا يوجد عنوان محدد"}
                  </span>
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                  <span className="flex items-center gap-2">
                    🕒 {formatRelativeTime(product.timestamp)}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xl font-black">
                  {product.price?.toLocaleString()}{" "}
                  <span className="text-lg font-medium">ج.م</span>
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-2">
              <h3 className="text-2xl font-black text-gray-900 mb-2 flex items-center gap-3">
                الوصف
              </h3>
              <p className="text-gray-600 leading-[2] text-xl whitespace-pre-line font-medium">
                {product.description}
              </p>
            </div>
          </div>

          {/* التعليقات */}
          {/* <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="text-2xl font-black text-gray-900 mb-10 border-b border-gray-50 pb-6">
              التعليقات{" "}
            </h3>
            <div className="space-y-8">
              <div className="relative group">
                <textarea
                  placeholder="لديك استفسار؟ اكتبه هنا..."
                  className="w-full bg-gray-50 border-2 border-transparent rounded-3xl p-6 pt-7 focus:bg-white focus:border-blue-600 outline-none min-h-[150px] transition-all text-lg shadow-inner"
                />
                <button className="absolute bottom-5 left-5 bg-blue-600 hover:bg-blue-700 text-white px-10 py-3.5 rounded-2xl font-black shadow-lg transition-all active:scale-95 text-lg">
                  إرسال
                </button>
              </div>
              <div className="py-20 text-center opacity-40">
                <div className="text-7xl mb-4">💬</div>
                <p className="text-xl font-bold">كن أول من يترك بصمته هنا</p>
              </div>
            </div>
          </div> */}

          {/* زيادات */}
          <button type="button" className="absolute top-5 right-5 z-20 p-2 bg-gray-200/50 rounded-full ">
            <Heart size={20} className="text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
