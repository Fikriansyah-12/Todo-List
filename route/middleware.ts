import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isLogin = req.nextUrl.pathname === "/login";
    const isRegist = req.nextUrl.pathname === "/login";

  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
   if (!token && isRegist) {
    return NextResponse.redirect(new URL("/register", req.url));
  }

  if (token && isLogin) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*","/register"], // halaman yang butuh proteksi
};
