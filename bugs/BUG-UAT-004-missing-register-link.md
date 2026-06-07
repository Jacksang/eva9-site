# [BUG-UAT-004] No "Register" link in header navigation

| Field | Value |
|-------|-------|
| **Status** | `[ ] New` |
| **Severity** | 🟡 Medium |
| **Source Test** | E01-visitor-uat.md (US-E01-VISITOR-04-01) |
| **Component** | src/components/Header.astro |

## Steps to Reproduce

```bash
curl -s http://localhost:4321/en/ | grep -c 'register\|Register'
```

**Output**: `0` (no match in header)

## Expected Behavior

A "Register" link should be visible in the header on every page (homepage, blog, post, about) per US-E01-VISITOR-04 AC-01.

## Actual Behavior

The header only shows "Home", "Blog", "About", "Contact", "Log in", and "Admin". There is no "Register" link. Users cannot discover the registration flow without knowing the URL directly (`/en/register/`).

## Suggested Fix

Add a "Register" link to `Header.astro` next to the "Log in" link, e.g.:
```html
<a href="/en/register">Register</a>
```
Consider placing it before "Log in" or as part of a combined auth section.
