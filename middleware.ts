import { NextResponse, type NextRequest } from "next/server";

const legacyRedirects: Record<string, string> = {
  "/Penjual": "/penjual",
  "/Dashboard": "/dashboard",
  "/Kategori": "/kategori",
  "/Kelola%20Toko": "/kelola-toko",
  "/Kelola Toko": "/kelola-toko",
  "/Kelola%20Promo": "/kelola-promo",
  "/Kelola Promo": "/kelola-promo",
  "/Pengaturan": "/pengaturan",
  "/Pengguna": "/pengguna",
};

export function middleware(request: NextRequest) {
  const pathname = decodeURI(request.nextUrl.pathname);
  const target = legacyRedirects[request.nextUrl.pathname] || legacyRedirects[pathname];
  if (target) {
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/Penjual",
    "/Dashboard",
    "/Kategori",
    "/Kelola%20Toko",
    "/Kelola Toko",
    "/Kelola%20Promo",
    "/Kelola Promo",
    "/Pengaturan",
    "/Pengguna",
  ],
};
