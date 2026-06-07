# [BUG-UAT-002] Missing `<link rel="alternate" hreflang="...">` tags on all pages

| Field | Value |
|-------|-------|
| **Status** | `[ ] New` |
| **Severity** | 🔴 Critical |
| **Source Test** | E01-seo-uat.md (US-E01-SEO-05) |
| **Component** | src/pages (SEO layout or Base.astro) |

## Steps to Reproduce

```bash
curl -s http://localhost:4321/en/blog/why-i-built-this-blog | grep -c 'hreflang'
curl -s http://localhost:4321/en/ | grep -c 'hreflang'
```

**Output**: `0` for all pages tested.

## Expected Behavior

Each bilingual page should emit `<link rel="alternate" hreflang="en/zh/x-default" href="...">` tags so search engines recognise the EN/ZH page pairings.

## Actual Behavior

No hreflang link elements exist on any page. Without hreflang, search engines may not serve the correct language variant to users.

## Suggested Fix

Add hreflang link generation to `Base.astro`. For EN pages, emit:
```html
<link rel="alternate" hreflang="en" href="https://blog.eva9.ai/en/PATH">
<link rel="alternate" hreflang="zh" href="https://blog.eva9.ai/zh/PATH">
<link rel="alternate" hreflang="x-default" href="https://blog.eva9.ai/en/PATH">
```
For ZH pages, swap the order. For blog posts, ensure both language variants are linked.
