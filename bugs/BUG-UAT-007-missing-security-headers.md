# [BUG-UAT-007] No security headers on HTTP responses

| Field | Value |
|-------|-------|
| **Status** | `[ ] New` |
| **Severity** | 🔴 Critical |
| **Source Test** | E01-system-uat.md (E05) |
| **Component** | Astro config / CloudFront / API Gateway |

## Steps to Reproduce

```bash
curl -sI http://localhost:4321/en/ | grep -iE 'x-content-type|x-frame|content-security|strict-transport|x-xss'
```

**Output**: (empty — no security headers returned)

## Expected Behavior

All HTTP responses should include security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Content-Security-Policy: ...`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`

## Actual Behavior

No security headers are present on any page response. The site is vulnerable to clickjacking, MIME-type sniffing, and other attacks.

## Suggested Fix

Add security headers to:
1. Astro's production build via `astro.config.mjs` (e.g., using `@astrojs/node` or middleware for SSR, or a CloudFront Lambda@Edge for static hosting)
2. API Gateway Lambda responses via the `apiResponse()` helper
3. Alternatively, configure CloudFront custom headers or use a `headers` directive in static hosting
