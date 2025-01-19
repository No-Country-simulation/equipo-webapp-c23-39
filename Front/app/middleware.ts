
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const protectedRoutes = ["/register", "/login"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token");

  
  if (!token && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
