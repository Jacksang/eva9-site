# [BUG-UAT-001] Missing `<link rel="canonical">` tags on all pages

| Field | Value |
|-------|-------|
| **Status** | `[ ] New` |
| **Severity** | 🔴 Critical |
| **Source Test** | E01-seo-uat.md (US-E01-SEO-04) |
| **Component** | src/pages (SEO layout or Base.astro) |

## Steps to Reproduce

```bash
curl -s http://localhost:4321/en/ | grep -oP '<link rel="canonical" href="\K[^"]+'
curl -s http://localhost:4321/en/blog/why-i-built-this-blog | grep -oP '<link rel="canonical" href="\K[^"]+'
```

**All tested pages return empty** (tested: en/, en/blog, en/blog/why-i-built-this-blog, en/about, en/contact, zh/, zh/blog, zh/blog/why-i-built-this-blog).

## Expected Behavior

Every page should emit a `<link rel="canonical" href="https://blog.eva9.ai/PATH">` tag in `<head>`. For example:
- `https://blog.eva9.ai/en` for /en/
- `https://blog.eva9.ai/en/blog/why-i-built-this-blog` for the blog post

## Actual Behavior

No `<link rel="canonical">` tag is emitted on any page. Without canonical tags, search engines may see duplicate content across HTTP/HTTPS and www/non-www variants.

## Suggested Fix

Add canonical URL generation to `Base.astro` or a shared SEO component. Use Astro's `Astro.url` or `import.meta.env` to construct the full canonical URL. Emit:
```html
<link rel="canonical" href="https://blog.eva9.ai${Astro.url.pathname}">
```
