# [BUG-UAT-009] BreadcrumbList JSON-LD missing on blog posts

| Field | Value |
|-------|-------|
| **Status** | `[ ] New` |
| **Severity** | 🟡 Medium |
| **Source Test** | E01-seo-uat.md (03-12) |
| **Component** | src/pages/en/blog/[slug].astro (BlogPost layout) |

## Steps to Reproduce

```bash
curl -s http://localhost:4321/en/blog/why-i-built-this-blog | grep -oP '"@type":"BreadcrumbList"'
```

**Output**: (empty — not found)

## Expected Behavior

Blog posts should include a `BreadcrumbList` JSON-LD schema for rich search results, e.g.:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://blog.eva9.ai/en" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://blog.eva9.ai/en/blog" },
    { "@type": "ListItem", "position": 3, "name": "Post Title" }
  ]
}
```

## Actual Behavior

Blog post JSON-LD only includes the `BlogPosting` type. No `BreadcrumbList` schema is present.

## Suggested Fix

Add a `generateBreadcrumbJSONLD()` function to `seo.ts` and call it in the blog post template. Include the breadcrumb alongside the `BlogPosting` JSON-LD block.
