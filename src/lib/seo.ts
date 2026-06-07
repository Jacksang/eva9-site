/* ============================================================
   eva9.ai — SEO Utilities
   ============================================================ */

export interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalURL?: string;
  publishedDate?: Date;
  locale?: 'en' | 'zh';
}

const SITE_NAME = 'blog.eva9.ai';
const DEFAULT_IMAGE = '/og-default.png';
const TWITTER_HANDLE = '@eva9ai';

/**
 * Generate all SEO meta tags as HTML string.
 */
export function generateSEOMeta(props: SEOProps): string {
  const {
    title,
    description,
    ogImage = DEFAULT_IMAGE,
    ogType = 'website',
    canonicalURL,
    publishedDate,
    locale = 'en',
  } = props;

  const fullTitle = `${title} — ${SITE_NAME}`;
  const tags: string[] = [];

  // Primary meta
  tags.push(`<title>${escapeHtml(fullTitle)}</title>`);
  tags.push(`<meta name="description" content="${escapeHtml(description)}">`);

  // OpenGraph
  tags.push(`<meta property="og:title" content="${escapeHtml(fullTitle)}">`);
  tags.push(`<meta property="og:description" content="${escapeHtml(description)}">`);
  tags.push(`<meta property="og:image" content="${ogImage}">`);
  tags.push(`<meta property="og:url" content="${canonicalURL ?? ''}">`);
  tags.push(`<meta property="og:type" content="${ogType}">`);
  tags.push(`<meta property="og:site_name" content="${SITE_NAME}">`);
  tags.push(`<meta property="og:locale" content="${locale === 'zh' ? 'zh_CN' : 'en_US'}">`);

  // Twitter Card
  tags.push(`<meta name="twitter:card" content="summary_large_image">`);
  tags.push(`<meta name="twitter:title" content="${escapeHtml(fullTitle)}">`);
  tags.push(`<meta name="twitter:description" content="${escapeHtml(description)}">`);
  tags.push(`<meta name="twitter:image" content="${ogImage}">`);
  tags.push(`<meta name="twitter:site" content="${TWITTER_HANDLE}">`);

  // Article-specific
  if (ogType === 'article' && publishedDate) {
    tags.push(`<meta property="article:published_time" content="${new Date(publishedDate).toISOString()}">`);
  }

  // Canonical
  if (canonicalURL) {
    tags.push(`<link rel="canonical" href="${canonicalURL}">`);
  }

  return tags.join('\n    ');
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generate JSON-LD structured data for a blog post.
 */
export function generateBlogPostJSONLD(props: {
  title: string;
  description: string;
  image?: string;
  url: string;
  publishedDate: Date;
  authorName: string;
}): string {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: props.title,
    description: props.description,
    image: props.image ?? DEFAULT_IMAGE,
    url: props.url,
    datePublished: new Date(props.publishedDate).toISOString(),
    author: {
      '@type': 'Person',
      name: props.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'eva9.ai',
    },
  };
  return JSON.stringify(ld, null, 2);
}
