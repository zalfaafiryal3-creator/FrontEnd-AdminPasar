// scripts/generate-sitemap.js
// Simple static sitemap generator for Next.js project
// Run with: npm run sitemap
const fs = require('fs');
const path = require('path');

// Update this to your actual domain when deploying
const BASE_URL = "https://admin.pasaroro-dowo.com";

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let pages = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      pages = pages.concat(walk(full));
    } else if (entry.isFile() && /\.tsx?$/.test(entry.name)) {
      // Exclude API routes, special files, and API folder
      if (full.includes(`${path.sep}api${path.sep}`)) continue;
      if (full.includes(`${path.sep}components${path.sep}`)) continue;
      if (full.includes(`${path.sep}app${path.sep}(admin)${path.sep}`)) {
        // keep, admin routes are part of the app
      }
      const rel = path.relative(path.join(__dirname, '..', 'app'), full);
      const urlPath = '/' + rel.replace(/\\/g, '/').replace(/\.tsx?$/, '');
      // Normalize index routes
      const finalPath = urlPath.endsWith('/page') ? urlPath.replace('/page', '') : urlPath;
      pages.push(finalPath);
    }
  }
  return pages;
}

const pages = walk(path.join(__dirname, '..', 'app'));

function buildSitemap(urls) {
  const entries = urls
    .map((p) => {
      const loc = `${BASE_URL}${p === '/index' ? '' : p}`;
      return `  <url><loc>${loc}</loc><changefreq>weekly</changefreq></url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
}

const sitemap = buildSitemap(pages);
const outDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
console.log('✅ sitemap.xml generated');
