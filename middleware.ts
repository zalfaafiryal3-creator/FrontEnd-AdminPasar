import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/penjual") {
    return NextResponse.redirect(new URL("/Penjual", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/penjual",
};
