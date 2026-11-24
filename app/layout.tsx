import type { Metadata } from "next";
import AppProviders from "./providers";
import { JsonLd } from "../components/JsonLd";
import "../index.css";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard - Pasar Oro-Oro Dowo",
    template: "%s | Pasar Oro-Oro Dowo",
  },
  description: "Panel administrasi resmi Pasar Tradisional Modern Oro-Oro Dowo Kota Malang.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Admin Dashboard - Pasar Oro-Oro Dowo",
    description: "Panel administrasi resmi Pasar Tradisional Modern Oro-Oro Dowo Kota Malang.",
    type: "website",
    locale: "id_ID",
  },
};

const marketStructuredData = {
  "@context": "https://schema.org",
  "@type": "PublicBathOrWashHouse",
  "name": "Pasar Oro-Oro Dowo Malang",
  "description": "Pasar Tradisional Modern Bersih Berstandar SNI di Kota Malang",
  "url": "https://pasar-oroodowo.malangkota.go.id",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Guntur No.20, Oro-oro Dowo, Kec. Klojen",
    "addressLocality": "Kota Malang",
    "addressRegion": "Jawa Timur",
    "postalCode": "65112",
    "addressCountry": "ID"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="min-w-[320px] bg-[#e9f2d2]">
      <head>
        <JsonLd data={marketStructuredData} />
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
