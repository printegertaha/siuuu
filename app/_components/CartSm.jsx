"use client";
import { ShoppingBag, X } from "lucide-react";
import { useEffect } from "react";
import Link from 'next/link'

export default function CartSm({ isVisible, setIsVisible }) {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isVisible]);

  return (
    isVisible && (
      <section
        dir="rtl"
        className="fixed inset-0 top-20 bg-black/20 backdrop-blur-[2px] m h-[calc(100vh-80px)] w-full z-2000 flex justify-start"
        onClick={() => setIsVisible(false)}
      >
        {/* الحاوية الجانبية - بتفتح من اليمين للشمال في الـ RTL */}
        <div
          className="h-full w-[90%] sm:w-105 bg-white shadow-2xl flex flex-col font-sans border-r border-gray-100 animate-in slide-in-from-right duration-300"
          onClick={(e) => {
            if (e.target.closest("a") || e.target.closest('button')) {
              setIsVisible(false);
            }else{
              e.stopPropagation()
            }
          }}
        >
          {/* رأس السلة */}
          <div className="flex items-center justify-between p-6 pt-8">
            <h2 className="text-2xl font-bold text-[#1e2331]">عرض السلة</h2>
            <button
              className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer hover:bg-gray-200 rounded-[50%]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <hr className="mx-6 border-gray-100" />

          {/* محتوى السلة الفارغة */}
          <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
            <div className="w-24 h-24 bg-[#f8f9fb] rounded-full flex items-center justify-center mb-6">
              <ShoppingBag
                className="w-10 h-10 text-gray-300"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="text-xl font-medium text-[#4a5568] mb-8">
              سلة التسوق الخاصة بك فارغة!
            </h3>

            <button
              className="w-full py-4 bg-[#1e2331] text-white rounded-full font-bold text-sm tracking-wide hover:bg-black transition-all cursor-pointer"
              
            >
              متابعة التسوق
            </button>
          </div>

          {/* ملخص السلة (Footer) */}
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold text-[#1e2331]">
                الإجمالي:
              </span>
              <span className="text-xl font-bold text-[#1e2331]">0.00$</span>
            </div>

            <div className="flex gap-3">
              <Link href='/cart' className="flex-1 py-4 bg-[#435ebe] text-white rounded-full font-bold text-center text-sm hover:opacity-90 transition-opacity">
                مشاهدة السلة
              </Link>
              <button className="flex-1 py-4 bg-[#1e2331] text-white rounded-full font-bold text-sm hover:bg-black transition-all">
                إتمام الطلب
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  );
}
