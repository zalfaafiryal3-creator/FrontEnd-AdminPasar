// next.config.js – performance, SEO, caching settings for FrontEnd‑AdminPasar
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true, // removed – not needed in Next 15
  output: "standalone",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|ico|png|jpg|jpeg|webp|avif|json|js|css|woff2?)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  compress: true,
  // Ensure Next can resolve the correct workspace root for output tracing
  outputFileTracingRoot: path.join(__dirname, "app"),
};

  module.exports = nextConfig;
