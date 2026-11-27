// next.config.js – performance, SEO, caching settings for FrontEnd‑AdminPasar
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|ico|png|jpg|jpeg|webp|avif|woff2?)",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
  compress: true,
};

module.exports = nextConfig;
