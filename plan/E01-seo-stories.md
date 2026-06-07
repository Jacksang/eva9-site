# E01 — User Stories: Search Engine & AI Crawler

**Epic:** E01 — MVP (Phase 1)  
**Roles:** Search Engine (R4), AI Crawler (R5 — deferred to E02)

---

## US-E01-SEO-01: Crawl complete XML sitemap

As a **Search Engine**, I need to **access a complete XML sitemap** so that **all blog.eva9.ai pages are discovered and indexed**.

**Acceptance Criteria:**
- AC-01: `blog.eva9.ai/sitemap.xml` returns a valid XML sitemap with all blog post URLs
- AC-02: Sitemap includes both `/en/` and `/zh/` URLs for bilingual posts
- AC-03: Sitemap has correct `<lastmod>` dates matching post publish dates
- AC-04: Sitemap is referenced in `robots.txt` as `Sitemap: https://blog.eva9.ai/sitemap.xml`
- AC-05: Sitemap auto-regenerates on every build (no manual maintenance)

---

## US-E01-SEO-02: Read OpenGraph and Twitter Card meta tags

As a **Search Engine / Social Platform**, I need to **see OpenGraph and Twitter Card meta tags on every page** so that **shared links render rich previews with title, description, and image**.

**Acceptance Criteria:**
- AC-01: Every page has `<meta property="og:title">`, `og:description`, `og:image`, `og:url`, `og:type`
- AC-02: Every page has `<meta name="twitter:card">`, `twitter:title`, `twitter:description`, `twitter:image`
- AC-03: Homepage og:type is "website"; blog post pages og:type is "article"
- AC-04: Missing og:image falls back to a default site-wide social share image
- AC-05: Meta tags are in the HTML `<head>` at build time (not injected by JavaScript)

---

## US-E01-SEO-03: Parse JSON-LD structured data

As a **Search Engine / AI Search**, I need to **parse JSON-LD structured data on pages** so that **content is understood as entities (Person, Article, BreadcrumbList) for rich search results and AI answer generation**.

**Acceptance Criteria:**
- AC-01: Homepage has JSON-LD `Person` type with: name, description, sameAs (social links)
- AC-02: Every blog post page has JSON-LD `Article` type with: headline, author, datePublished, dateModified, description
- AC-03: Blog post pages have JSON-LD `BreadcrumbList` with: Home > [Category] > Post Title
- AC-04: JSON-LD validates against schema.org validator (no errors)
- AC-05: JSON-LD is in the HTML `<head>` at build time
