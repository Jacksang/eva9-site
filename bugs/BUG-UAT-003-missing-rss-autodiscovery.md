# [BUG-UAT-003] Missing RSS auto-discovery link in homepage `<head>`

| Field | Value |
|-------|-------|
| **Status** | `[ ] New` |
| **Severity** | 🟡 Medium |
| **Source Test** | E01-seo-uat.md (06-11, 06-12) |
| **Component** | src/layouts/Base.astro |

## Steps to Reproduce

```bash
curl -s http://localhost:4321/en/ | grep -oP '<link[^>]*type="application/rss\+xml"[^>]*>'
```

**Output**: (empty)

## Expected Behavior

Homepage should include an RSS auto-discovery link in `<head>`:
```html
<link rel="alternate" type="application/rss+xml" title="blog.eva9.ai" href="https://blog.eva9.ai/rss.xml">
```

## Actual Behavior

No `<link type="application/rss+xml">` tag is present in the homepage HTML.

## Suggested Fix

Add the RSS auto-discovery link to `Base.astro` in the `<head>` section. Use the production URL.
