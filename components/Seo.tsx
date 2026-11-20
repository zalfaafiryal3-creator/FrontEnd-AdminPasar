// FrontEnd-AdminPasar/components/Seo.tsx
import Head from "next/head";

type SeoProps = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
};

export const Seo = ({
  title = "Admin Dashboard - Pasar Oro‑Oro Dowo",
  description = "Panel administrasi Pasar Oro‑Oro Dowo – kelola produk, toko, dan promosi dengan cepat.",
  url,
  image,
}: SeoProps) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width,initial-scale=1" />

    {/* Open Graph */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
      {url ? <meta property="og:url" content={url} /> : null}
  {image ? <meta property="og:image" content={image} /> : null}
  {url ? <link rel="canonical" href={url} /> : null}
  <meta name="robots" content="index,follow" />
    {image && <meta property="og:image" content={image} />}

    {/* Twitter Card */}
    <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {image && <meta name="twitter:image" content={image} />}

    {/* Favicon */}
    <link rel="icon" href="/favicon.ico" />
  </Head>
);
