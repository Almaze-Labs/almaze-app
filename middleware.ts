import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // console.log("Request Pathname:", request.nextUrl.pathname);
  // console.log("Authentication Cookie:", request.cookies.get("privy-authenticated")?.value);

  const { pathname } = request.nextUrl;

  // List of restricted routes
  const blockList = ["/dashboard", "/admin", "/private"];

  // Check if the route is in the block list
  const isRestricted = blockList.some((route) => pathname.startsWith(route));

  if (!isRestricted) {
    // console.log("Public route accessed or route not in block list.");
    return NextResponse.next();
  }

  // Authentication check
  const isAuthenticated = request.cookies.get("privy-authenticated")?.value === "true";

  if (!isAuthenticated) {
    // console.log("User is not authenticated. Redirecting...");
    const url = new URL("/auth", request.url);
    return NextResponse.redirect(url);
  }

  // console.log("User is authenticated. Proceeding...");
  return NextResponse.next();
}

// Matcher configuration for middleware
export const config = {
  matcher: ["/:path*"], // Apply middleware to all routes
};
