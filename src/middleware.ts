import { NextRequest, NextResponse } from "next/server";

export function middleware (request:NextRequest){

    const path = request.nextUrl.pathname
    const isPublicPath = path == '/login' || path == '/signup' || path == '/verifyemail'  || path =='/forgotpassword' || path == '/resetpassword'

    const token = request.cookies.get("token")?.value || ''

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL ('/signup', request.nextUrl))
    }
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup",
    "/verifyemail",
    "/forgotpassword",
    "/resetpassword",
  ],
};