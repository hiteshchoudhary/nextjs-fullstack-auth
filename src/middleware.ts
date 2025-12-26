import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup" || path === "/verify-email" || path === "/forgot-password" || path === "/resetpassword";

  const token = request.cookies.get("token")?.value || "";

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  const redirectIfLoggedIn = path === "/login" || path === "/signup";
  
  if (token && redirectIfLoggedIn) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  
}

export const config = {
  matcher: ["/", "/signup", "/login", "/profile", "/verify-email"],
};