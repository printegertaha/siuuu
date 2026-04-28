"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  User,
  LogIn,
  PlusCircle,
  ChevronRight,
  LayoutGrid,
  ShoppingBag,
  Heart,
  FastForward,
} from "lucide-react";
import useCategories from "../hooks/useCategories";

export default function SideBar({ isVisible, setIsVisible }) {
  const { data: categories, isLoading } = useCategories();
  const { data: userInfo, status } = useSession();

  // منع السكرول للصفحة لما المنيو تفتح
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isVisible]);

  return (
    <>
      {/* الـ Backdrop */}
      <div
        className={`fixed inset-0 top-[80px] min-h-screen bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 z-[40] ${
          isVisible ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsVisible(false)}
      />

      {/* القائمة الجانبية */}
      <aside
        dir="rtl"
        className={`fixed top-[80px] right-0 w-[80%] sm:w-[350px] h-[calc(100dvh-80px)] bg-white border-l border-gray-100 shadow-2xl z-4000 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isVisible ? "translate-x-0" : "translate-x-full"
        } `}
      >
        <div className="flex-1 overflow-y-auto md-scrollbar">
          {/* حسابي الشخصي */}
          <div className="p-8 flex flex-col items-center border-b bg-white">
            {status === "authenticated" ? (
              <>
                <div className="w-24 h-24 bg-[#F3F0FF] rounded-full flex items-center justify-center mb-4 text-blue-800">
                  {userInfo?.user?.image ? (
                    <img
                      src={userInfo.user.image}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={48} />
                  )}
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {userInfo?.user?.name || "Taha"}
                </h2>

                <Link
                  href="/my-account"
                  className="px-6 py-2 border border-[#E9D5FF] text-[10px] text-center text-blue-800 rounded-xl font-bold  hover:bg-[#F3F0FF] transition-all"
                  onClick={() => setIsVisible(false)}
                >
                  إدارة الحساب
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full bg-blue-100 text-black p-3 rounded-xl font-semibold hover:bg-blue-50 transition-all"
                onClick={() => setIsVisible(false)}
              >
                <LogIn size={20} />
                تسجيل الدخول
              </Link>
            )}
          </div>

          {/* اختصارات */}
          <div className="p-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-4">
              <FastForward size={16} />
              <span>وصول سريع</span>
            </h3>

            <div className="flex flex-col gap-2">
              <Link
                href="/cart"
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-all group"
                onClick={() => setIsVisible(false)}
              >
                <div className="flex items-center gap-3 text-gray-700 font-medium group-hover:text-blue-600">
                  <ShoppingBag size={20} />
                  <span>سلة المنتجات</span>
                </div>
                <ChevronRight
                  size={16}
                  className="text-gray-300 group-hover:text-blue-500 transform -rotate-180"
                />
              </Link>

              <Link
                href="/favorites"
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-all group"
                onClick={() => setIsVisible(false)}
              >
                <div className="flex items-center gap-3 text-gray-700 font-medium group-hover:text-blue-500">
                  <Heart size={20} />
                  <span>المفضلات</span>
                </div>
                <ChevronRight
                  size={16}
                  className="text-gray-300 group-hover:text-blue-500 transform -rotate-180"
                />
              </Link>
            </div>
          </div>

          {/* التصنيفات  */}
          <div className="p-5 border-t space-y-4 ">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <LayoutGrid size={16} /> التصنيفات الرائجة
            </h3>

            <div className="grid gap-2 overflow-auto mini-scrollbar">
              {isLoading ? (
                <div className="space-y-2 ">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-12 bg-gray-100 animate-pulse rounded-lg"
                    />
                  ))}
                </div>
              ) : (
                categories?.map((category) => (
                  <Link
                    key={category._id}
                    href={`/categories/${category.name}`}
                    className="flex flex-nowrap items-center justify-between p-3 hover:bg-blue-50 rounded-xl transition-all group "
                    onClick={() => setIsVisible(false)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={category.image}
                        className="w-8 h-8 rounded-lg object-cover shadow-sm"
                        alt=""
                      />
                      <span
                        dir="ltr"
                        className="text-gray-700 font-medium group-hover:text-blue-700 w-max truncate "
                      >
                        {category.nickName}
                      </span>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-gray-300 group-hover:text-blue-500 transform -rotate-180"
                    />
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* أضف اعلانك */}
          <div className="p-5 border-t space-y-2">
            <Link
              href="/create-product"
              className="flex items-center justify-between gap-3 p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors border border-green-100"
              onClick={() => setIsVisible(false)}
            >
              <PlusCircle size={22} />
              <span className="text-[10px] font-bold text-lg text-center w-full ">
                أضف اعلانك{" "}
              </span>
            </Link>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t text-center">
          <p className="text-[10px] text-gray-400 font-medium">صلي على النبي</p>
        </div>
      </aside>
    </>
  );
}
