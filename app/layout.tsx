import type { Metadata } from "next";
import AppProviders from "./providers";
import "../index.css";

export const metadata: Metadata = {
  title: "Admin Dashboard - Pasar Oro-Oro Dowo",
  description: "Panel administrasi Pasar Oro-Oro Dowo",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="min-w-[320px] bg-[#e9f2d2]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="m-0 min-h-screen min-w-[320px] bg-[#e9f2d2] font-['Poppins','Segoe_UI',sans-serif] text-sm text-[#222a21] antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
