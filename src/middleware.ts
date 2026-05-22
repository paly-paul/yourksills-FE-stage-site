import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const isValid =
    !!token &&
    token.toLowerCase() !== "undefined" &&
    token.toLowerCase() !== "null";

  if (isValid) {
    return NextResponse.redirect(new URL("/create", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/forgotpassword", "/forgotpassword/:path*"],
};
