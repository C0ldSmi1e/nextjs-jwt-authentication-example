import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "sv2025-admin-secret-key";

export async function middleware(request: NextRequest) {
  // For admin routes (excluding login)
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // First, handle the case where a logged-in user tries to access the login page
    if (request.nextUrl.pathname === "/admin/login") {
      const token = request.cookies.get("auth-token")?.value;

      // If token exists, verify it before redirecting to admin home
      if (token) {
        try {
          const secretKey = new TextEncoder().encode(JWT_SECRET);
          await jwtVerify(token, secretKey);
          // If token is valid, redirect to admin home
          return NextResponse.redirect(new URL("/admin", request.url));
        } catch (error) {
          console.error("Token verification error:", error);
          // If token is invalid, allow access to login page
          return NextResponse.next();
        }
      }
      // If no token, allow access to login page
      return NextResponse.next();
    }

    // For all other admin routes, require authentication
    const token = request.cookies.get("auth-token")?.value;

    // If no token is present, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      // Convert secret to TextEncoder for jose
      const secretKey = new TextEncoder().encode(JWT_SECRET);

      // Verify the token using jose
      await jwtVerify(token, secretKey);

      // If token is valid, allow the request to proceed
      return NextResponse.next();
    } catch (error) {
      // If token verification fails, redirect to login
      console.error("Authentication error:", error);
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // For non-admin routes, allow access
  return NextResponse.next();
}

export const config = {
  // Apply this middleware to admin routes
  matcher: ["/admin/:path*"],
};
