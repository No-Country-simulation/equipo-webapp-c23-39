
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export function middleware(request: NextRequest){
  return NextResponse.redirect(new URL("/login", request.url ))
}

export const config ={
  matcher:['/auth/login', '/auth/register']
}

// const protectedRoutes = ["/register", "/login"];

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("auth-token");

  
//   if (!token && protectedRoutes.includes(request.nextUrl.pathname)) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }
