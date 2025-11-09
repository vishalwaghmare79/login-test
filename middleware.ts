import { type NextRequest, NextResponse } from "next/server"
import { getTokenFromCookie } from "@/lib/auth"

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  // Protect /dashboard route
  // In middleware (Edge runtime) avoid importing node-only libs (jsonwebtoken/bcrypt).
  // Only check for the presence of the auth cookie and let the API/client verify the token.
  if (pathname.startsWith("/dashboard")) {
    const cookieHeader = req.headers.get("cookie")
    const token = getTokenFromCookie(cookieHeader || "")

    // If there's no auth cookie, redirect to login. Token validity is checked by the
    // `/api/auth/verify` endpoint and client-side code.
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  // // Redirect authenticated users away from login/register
  // if (pathname === "/login" || pathname === "/register") {
  //   const cookieHeader = req.headers.get("cookie")
  //   const token = getTokenFromCookie(cookieHeader || "")

  //   if (token && verifyToken(token)) {
  //     return NextResponse.redirect(new URL("/dashboard", req.url))
  //   }
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
}
