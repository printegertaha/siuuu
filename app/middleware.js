import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextjsUrl.pathname;

    // 1. حماية صفحات الأدمن: لا يدخلها إلا admin
    if (path.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 2. حماية صفحات البائع: لا يدخلها إلا seller أو admin
    if (path.startsWith("/dashboard/seller") && 
        token?.role !== "seller" && 
        token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      // الميدل وير سيعمل فقط إذا كان المستخدم مسجل دخول أصلاً
      authorized: ({ token }) => !!token,
    },
  }
);

// تحديد المسارات التي سيطبق عليها الميدل وير
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/profile/:path*"],
};