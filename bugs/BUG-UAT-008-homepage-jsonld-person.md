# [BUG-UAT-008] Person JSON-LD missing on homepage

| Field | Value |
|-------|-------|
| **Status** | `[ ] New` |
| **Severity** | 🟡 Medium |
| **Source Test** | E01-seo-uat.md (03-11), E01-system-uat.md (T05-05) |
| **Component** | src/pages/en/index.astro (or zh/index.astro) |

## Steps to Reproduce

```bash
curl -s http://localhost:4321/en/ | sed -n '/<script type="application\/ld+json">/,/<\/script>/p'
```

**Output**: (empty — no JSON-LD block at all on homepage)

## Expected Behavior

The homepage should include a JSON-LD `Person` schema block (E01-SEO-03 AC-01):
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jacky Chen",
  "url": "https://blog.eva9.ai",
  "jobTitle": "..."
}
```

## Actual Behavior

The homepage has zero JSON-LD blocks. The `generatePersonJSONLD` function exists in `seo.ts` but is never called on the homepage.

## Suggested Fix

Import and invoke `generatePersonJSONLD()` in the homepage page component (`index.astro`) and render the output in a `<script type="application/ld+json">` tag in `<head>`.
