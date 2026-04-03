import { NextResponse } from 'next/server';

export function proxy(request) {
  // 1. NextAuth بيخزن التوكن في كوكي بالاسم ده
  const token = request.cookies.get('next-auth.session-token')?.value || 
      request.cookies.get('__Secure-next-auth.session-token')?.value;


  const { pathname } = request.nextUrl;
  console.log(token)

  // 2. حماية صفحات التسجيل: لو مسجل، ممنوع يدخل Login
  const authPages = ['/login', '/register']; 
  if (token && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL('/my-account', request.url));
  }

  // 3. حماية الصفحات الخاصة: لو مش مسجل، ممنوع يدخل My Account
  if (!token && pathname.includes('/my-account')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}


export const config = {
  // حدد المسارات اللي الميدل وير يراقبها
  matcher: ['/login', '/register', '/my-account/:path*'],
};
