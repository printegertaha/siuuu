"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // حالة التحميل (بينما يتأكد NextAuth من الجلسة)
  if (status === "loading") {
    return <p className="text-center mt-10">جاري التحميل...</p>;
  }

  // إذا لم يكن هناك جلسة (المستخدم غير مسجل دخول)
  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
          لوحة التحكم
        </h1>

        <div className="space-y-4 text-right" dir="rtl">
          <p className="text-lg">
            <span className="font-bold text-blue-600">الاسم:</span> {session.user.name}
          </p>
          <p className="text-lg">
            <span className="font-bold text-blue-600">البريد الإلكتروني:</span> {session.user.email}
          </p>
          <p className="text-lg">
            <span className="font-bold text-blue-600">الصلاحية الحالية (Role):</span>{" "}
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
              {session.user.role}
            </span>
          </p>
        </div>

        <div className="mt-10 flex gap-4">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })} // تسجيل الخروج والعودة لصفحة اللوجن
            className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-600 transition"
          >
            تسجيل الخروج
          </button>
          
          {/* زر يظهر للأدمن فقط كمثال على التحكم بالـ UI */}
          {session.user.role === "admin" && (
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700">
              لوحة تحكم المدير
            </button>
          )}
        </div>
      </div>
    </div>
  );
}