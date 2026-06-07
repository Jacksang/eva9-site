import type { APIRoute } from 'astro';

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export const GET: APIRoute = async () => {
  const site = 'https://blog.eva9.ai';

  // Seed posts — this list grows as posts are added
  const seedPosts = [
    {
      title: 'Why I Built This Blog in 2026',
      slug: 'why-i-built-this-blog',
      excerpt: 'After 20 years building software for others, I decided to build a space for myself.',
      category: 'work',
      pubDate: '2026-06-01',
    },
    {
      title: 'The Cloud-Native E-Commerce Playbook: Lessons from 20 Years',
      slug: 'cloud-native-ecommerce-playbook',
      excerpt: "What I've learned building e-commerce platforms at scale on AWS and Alibaba Cloud.",
      category: 'work',
      pubDate: '2026-05-28',
    },
  ];

  const items = seedPosts
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    .map(post => {
      const date = new Date(post.pubDate).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${site}/en/blog/${post.slug}</link>
      <guid>${site}/en/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${date}</pubDate>
      <category>${escapeXml(post.category)}</category>
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>blog.eva9.ai</title>
    <description>Jacky Chen's personal blog — cloud e-commerce, tech, learning &amp; life</description>
    <link>${site}</link>
    <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
