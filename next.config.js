// next.config.js – performance, SEO, caching settings for FrontEnd‑AdminPasar
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable standalone build (easier to deploy to any Node environment)
  output: "standalone",
  // Image optimisation – allow any remote domain (adjust to match your CDN)
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  // Add Cache‑Control headers for static assets (fonts, images, JS, CSS)
  async headers() {
    return [
      {
        source: "/:all*(svg|ico|png|jpg|jpeg|webp|avif|json|js|css|woff2?)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // Enable gzip/brotli compression (default in Next when running on Node)
  compress: true,
};

module.exports = nextConfig;
