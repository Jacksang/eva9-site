import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const site = 'https://blog.eva9.ai';
  const today = new Date().toISOString().split('T')[0];

  const staticPages = ['', '/blog', '/about', '/contact', '/login', '/register'];
  const urls: string[] = [];

  for (const locale of ['en', 'zh']) {
    for (const page of staticPages) {
      urls.push(`  <url>\n    <loc>${site}/${locale}${page}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`);
    }
  }

  // Blog posts — hardcoded from known slugs (will be dynamic in CI build)
  const blogPosts = [
    { slug: 'why-i-built-this-blog', date: '2026-06-01' },
    { slug: 'cloud-native-ecommerce-playbook', date: '2026-05-28' },
  ];

  for (const post of blogPosts) {
    urls.push(`  <url>\n    <loc>${site}/en/blog/${post.slug}</loc>\n    <lastmod>${post.date}</lastmod>\n  </url>`);
    urls.push(`  <url>\n    <loc>${site}/zh/blog/${post.slug}</loc>\n    <lastmod>${post.date}</lastmod>\n  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
