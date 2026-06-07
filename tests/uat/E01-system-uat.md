# Eva9-Site UAT — E01 System

**Version:** 1.0 | **Date:** 2026-06-07
**Role:** System (Background Processes) | **Epic:** E01
**Source:** plan/E01-system-stories.md
**Duration:** ~15 min

## UAT Pass Criteria
- a) All system processes handle errors gracefully
- b) Rate limiting works correctly
- c) Security headers present on all responses
- d) Email sending has proper error handling and logging

---

## Pre-Test Setup

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| P1 | Verify Lambda code exists in `lambda/` dir | All function directories present: `register/`, `login/`, `verify-email/`, `comments/`, `contact/`, `log-visit/`, `admin/` | [ ] |
| P2 | Check template.yaml for correct configuration | SAM template valid (YAML parseable, AWSTemplateFormatVersion & Transform present) | [ ] |
| P3 | Verify `.env.example` exists and documents required env vars | File present at `lambda/.env.example` with JWT_SECRET, ADMIN_JWT_SECRET, AWS_REGION, TABLE_PREFIX | [ ] |
| P4 | Verify `ADMIN_EMAIL` env var is defined in template.yaml or documented as required | **ISSUE:** ADMIN_EMAIL not in template.yaml `Globals.Function.Environment.Variables` — only referenced in seed.ts | [ ] |
| P5 | Verify `lambda/package.json` includes `@aws-sdk/client-ses` or SES SDK dependency | Verify package.json dependencies include SES SDK for email sending | [ ] |
| P6 | Confirm tests directory `tests/uat/` exists and is writable | Directory exists (empty at start) | [ ] |

---

## Test Steps — US-E01-SYSTEM-01: Send email verification

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| T01-01 | **Code review:** Check `lambda/register/index.ts` for unique verification token generation | Token generated using `generateVerificationCode()` — UUID not used, uses 6-char alphanumeric code instead. **GAP:** AC-01 requires UUID per story, but code uses random code. Acceptable as long as functionally equivalent. | [ ] |
| T01-02 | **Code review:** Check that verification code/token is stored in DynamoDB with the user record | ✅ `verificationCode` field saved in user object via `put()` | [ ] |
| T01-03 | **Code review:** Check for TTL attribute on verification token (24h expiry per AC-01) | **❌ NOT IMPLEMENTED:** No `ttl` or `expiresAt` field on user record. DynamoDB table in template.yaml has no `TimeToLiveSpecification`. Token never expires at DB level. | [ ] |
| T01-04 | **Code review:** Confirm SES email sending after registration (AC-02) | **❌ NOT IMPLEMENTED:** `register/index.ts` does NOT call SES. No `@aws-sdk/client-ses` import. Verification code is stored but never emailed. Registration response says "Verification code sent" but no email is actually dispatched. | [ ] |
| T01-05 | **Code review:** Check async email sending (AC-03) | **❌ NOT IMPLEMENTED:** No async invocation or event bridge integration. Registration handler is synchronous only. | [ ] |
| T01-06 | **Code review:** Check CloudWatch logging on email failure (AC-04) | **❌ NOT IMPLEMENTED:** No email sending code exists, therefore no failure logging. `console.log`/`console.error` statements should be present in production code. | [ ] |
| T01-07 | **Code review:** Check that registration succeeds even on email failure (AC-04) | Not verifiable — no email code exists. Registration currently always succeeds and returns 201. | [ ] |
| T01-08 | **Code review:** Verify single-use token consumption (AC-05) | ✅ `verify-email/index.ts` sets `verificationCode: null` after successful verification. Token is consumed on use. | [ ] |
| T01-09 | **Code review:** Check expired token handling (AC-06) | **❌ NOT IMPLEMENTED:** No TTL on token, no expiry check in `verify-email/index.ts`. Tokens never expire. | [ ] |
| T01-10 | **Config review:** Verify IAM permissions for SES `SendEmail` in template.yaml | **❌ MISSING:** template.yaml has no `Policies` or `Policies` section on any Lambda function. SES permission is not granted. | [ ] |

---

## Test Steps — US-E01-SYSTEM-02: AI auto-moderate comments

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| T02-01 | **Code review:** Check `lambda/comments/index.ts` for moderation logic on POST (AC-01) | **❌ NOT IMPLEMENTED:** Comments handler does NOT check user verification status. Does NOT check for flagged patterns. All submitted comments are saved with `status: 'pending'` regardless. No auto-approval logic exists. | [ ] |
| T02-02 | **Code review:** Check flagged pattern definitions — URLs, profanity (EN/ZH), Chinese spam, repeated chars (AC-02) | **❌ NOT IMPLEMENTED:** No pattern matching exists anywhere in the `comments/` handler. No moderation rules file found. | [ ] |
| T02-03 | **Code review:** Verify auto-approval for verified users with clean content (AC-03) | **❌ NOT IMPLEMENTED:** No verification check, no content scan, no auto-approval. | [ ] |
| T02-04 | **Code review:** Verify flagged content from verified users held for review with reason logged (AC-04) | **❌ NOT IMPLEMENTED:** No flagging, no moderation_reason, no review hold logic. | [ ] |
| T02-05 | **Code review:** Verify unverified user comments always held for review (AC-05) | **❌ NOT IMPLEMENTED:** Comment handler doesn't read user's `verified` status. All comments get `status: 'pending'` regardless. | [ ] |
| T02-06 | **Code review:** Check comment record includes `moderation_action`, `moderation_reason`, `moderated_by` fields (AC-06) | **❌ NOT IMPLEMENTED:** Comment object only has `id, postSlug, authorEmail, authorName, content, status, createdAt`. No moderation fields. | [ ] |
| T02-07 | **Code review:** Verify moderation rules are in a JSON config file (AC-07) | **❌ NOT IMPLEMENTED:** No moderation config file exists. No `moderation.json`, `moderation-rules.json`, or similar found in `lambda/`, `src/`, or project root. | [ ] |

---

## Test Steps — US-E01-SYSTEM-03: Send contact form notification

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| T03-01 | **Code review:** Check that contact form submission triggers admin email via SES (AC-01) | **❌ NOT IMPLEMENTED:** `contact/index.ts` saves message to DynamoDB but does NOT call SES. No `ADMIN_EMAIL` env var is read or used. | [ ] |
| T03-02 | **Code review:** Verify email contains sender info, message, timestamp, Reply mailto link (AC-02) | **❌ NOT IMPLEMENTED:** No email composition code exists at all. | [ ] |
| T03-03 | **Code review:** Check async email sending (AC-03) | **❌ NOT IMPLEMENTED:** No async invocation or event bridge integration. | [ ] |
| T03-04 | **Code review:** Check CloudWatch logging on email failure (AC-04) | **❌ NOT IMPLEMENTED:** No email code, no failure logging. | [ ] |
| T03-05 | **Code review:** Check contact message is saved even on email failure (AC-04) | ✅ Message is saved to DynamoDB before any (non-existent) email send attempt. In current code, message always persists. | [ ] |
| T03-06 | **Config review:** Verify ADMIN_EMAIL env var is passed to contact Lambda | **❌ MISSING:** `ADMIN_EMAIL` is not in template.yaml Globals or in ContactFunction's environment variables. | [ ] |

---

## Test Steps — US-E01-SYSTEM-04: Record visitor page access

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| T04-01 | **Code review:** Check `lambda/log-visit/index.ts` accepts POST with `page_url` (AC-01) | ✅ Handler accepts POST, reads `body.page` (property named `page` not `page_url` — minor inconsistency). Returns 400 if page is missing. | [ ] |
| T04-02 | **Code review:** Check frontend fires POST to `/api/log-visit` on page load (AC-01) | ✅ `Base.astro` line 80 fires `fetch('/api/log-visit', { method: 'POST', body: JSON.stringify({ page, referrer }) })` inside an inline `<script>`. | [ ] |
| T04-03 | **Code review:** Check IP extraction from API Gateway request context (AC-02) | ✅ Uses `event.requestContext?.http?.sourceIp` with fallback to `'unknown'`. | [ ] |
| T04-04 | **Code review:** Check record includes IP, page URL, User-Agent, Referer, timestamp (AC-03) | ✅ Objects includes: `id`, `page`, `referrer`, `ip`, `userAgent`, `timestamp`. | [ ] |
| T04-05 | **Code review:** Check 90-day TTL on visitor records (AC-04) | **❌ NOT IMPLEMENTED:** `log-visit/index.ts` does not set a `ttl` attribute. DynamoDB table `VisitsTable` has no `TimeToLiveSpecification` in template.yaml. | [ ] |
| T04-06 | **Code review:** Verify `/api/log-visit` is public (no auth required) (AC-05) | ✅ No auth check in handler. GET method optional. No `verifyToken()` call. Public endpoint. | [ ] |
| T04-07 | **Code review:** Check logging failure is fire-and-forget (silent fail, no impact on page) (AC-06) | ✅ Frontend `fetch()` is inside try/catch that swallows errors. Page rendering is never dependent on this call. | [ ] |

---

## Test Steps — US-E01-SYSTEM-05: Generate SEO artifacts

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| T05-01 | **Code review:** Verify sitemap.xml includes all blog posts in both languages (AC-01) | ✅ `src/pages/sitemap.xml.ts` includes `/en`, `/zh` for static pages and known blog posts. **GAP:** Post list is hardcoded — not dynamically fetched from content collection. New posts require manual addition to the sitemap. | [ ] |
| T05-02 | **Code review:** Verify og:title, og:description, og:image, og:url, og:type meta tags (AC-02) | ✅ `Base.astro` includes all OG tags. `seo.ts` also generates them. | [ ] |
| T05-03 | **Code review:** Verify Twitter Card meta tags (AC-03) | ✅ `twitter:card` (summary_large_image), `twitter:title`, `twitter:description` present in Base.astro. | [ ] |
| T05-04 | **Code review:** Verify JSON-LD Article schema with headline, author, datePublished, dateModified (AC-04) | ✅ `BlogPost.astro` calls `generateBlogPostJSONLD()` which includes headline, description, image, url, datePublished, author (Person). **GAP:** `dateModified` is NOT included in the JSON-LD. Story AC-04 requires it. | [ ] |
| T05-05 | **Code review:** Verify homepage JSON-LD Person schema (AC-05) | **❌ NOT IMPLEMENTED:** Homepage (`index.astro`) does NOT include Person JSON-LD. The `seo.ts` library has a `generatePersonJSONLD` function but it's not invoked on the homepage. | [ ] |
| T05-06 | **Code review:** Verify fallback for og:description when no excerpt (AC-07) | **❌ NOT IMPLEMENTED:** `Base.astro` uses `description` prop directly. No fallback logic to extract first 160 characters from body text. BlogPost.astro passes `excerpt` from frontmatter. | [ ] |
| T05-07 | **[REQUIRES BUILD]** Run `npm run build` to verify SEO artifacts compile without errors (AC-06) | Build completes successfully. `sitemap.xml` is generated in `dist/`. | [ ] |

---

## Test Steps — US-E01-SYSTEM-06: Deploy to production

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| T06-01 | **Code review:** Check `.github/workflows/ci.yml` triggers on push to main (AC-01) | ✅ Workflow triggers on: `push` to `main` and `pull_request` to `main`. | [ ] |
| T06-02 | **Code review:** Check CI workflow includes checkout → npm install → build → sync to S3 → invalidate CloudFront (AC-02) | **❌ INCOMPLETE:** Current workflow does `npm ci`, `npm test`, `npm run build`, `npm run test:integration`. No S3 sync step. No CloudFront invalidation step. No AWS credentials configuration. | [ ] |
| T06-03 | **Code review:** Check build failures are reported via GitHub Actions (AC-03) | ✅ GitHub Actions provides native email/UI notifications on workflow failure. No custom notification setup needed. | [ ] |
| T06-04 | **Config review:** Check S3 bucket exists in template.yaml (AC-05) | **❌ NOT CONFIGURED:** template.yaml has no S3 bucket resource. No CloudFront distribution. Static site hosting and CDN infrastructure are not defined as code. | [ ] |
| T06-05 | **Config review:** Verify CloudFront distribution for blog.eva9.ai with SSL (AC-06) | **❌ NOT CONFIGURED:** No CloudFront resource in infra. Route53/ACM/CloudFront setup not present. | [ ] |

---

## Test Steps — US-E01-SYSTEM-07: Provision AWS infrastructure

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| T07-01 | **Code review:** Check infrastructure defined as code in `infra/` directory (AC-01) | **❌ MISSING:** No `infra/` directory exists. Infrastructure is partially defined in `template.yaml` (SAM/CloudFormation). CDK not used. | [ ] |
| T07-02 | **Config review:** Verify all four DynamoDB tables are defined (AC-02) | ✅ Tables defined: `eva9-users`, `eva9-comments`, `eva9-messages`, `eva9-visits`. All use PAY_PER_REQUEST billing. **GAP:** `eva9-users` table has `email-index` GSI that duplicates the hash key (redundant). | [ ] |
| T07-03 | **Config review:** Verify Lambda functions have DynamoDB read/write IAM permissions (AC-03) | **❌ MISSING:** template.yaml has no `Policies` or `Role` on any Lambda function. Functions would get the default SAM execution role with no explicit DynamoDB or SES permissions. | [ ] |
| T07-04 | **Config review:** Verify API Gateway HTTP API with proper routes and CORS (AC-04) | ✅ ALL Lambda functions have `HttpApi` event with specific routes. **GAP:** CORS is handled at the Lambda level via response headers, not at the API Gateway level (which is the recommended approach for HTTP APIs). | [ ] |
| T07-05 | **Config review:** Verify S3 bucket and CloudFront for static hosting (AC-05) | **❌ MISSING:** No S3 or CloudFront resources in template.yaml. | [ ] |
| T07-06 | **Config review:** Verify free tier compliance (AC-06) | ✅ PAY_PER_REQUEST billing, 256MB Lambda memory, 10s timeout — all within free tier. **GAP:** No explicit free-tier limit checks or budgets configured. | [ ] |
| T07-07 | **Config review:** Verify single command teardown (AC-07) | ✅ SAM supports `sam delete` for teardown. If using CloudFormation directly, `aws cloudformation delete-stack` works. | [ ] |

---

## Error States

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| E01 | **Error: DynamoDB writes fail** — Check if all handlers wrap `put()`/`query()` in try/catch | **❌ GAP:** No handler wraps DynamoDB operations in try/catch. `db.ts` functions are raw `await`s. A DynamoDB failure would throw an unhandled exception and return a 502/500 to the client. | [ ] |
| E02 | **Error: Malformed request body** — Check `parseBody()` handles invalid JSON | ✅ `validation.ts` `parseBody()` catches JSON parse errors and returns `{}`. | [ ] |
| E03 | **Error: Missing env vars** — Check graceful fallback when JWT_SECRET / AWS_REGION not set | ✅ `auth.ts` has fallback to `'eva9-dev-secret-change-in-production'`. `db.ts` falls back to `'us-east-1'`. **⚠️** Production fallbacks should not use dev values. | [ ] |
| E04 | **Error: Rate limiting** — Check for rate limiting on ALL API endpoints | **❌ NOT IMPLEMENTED:** No rate limiting exists in any Lambda handler or API Gateway configuration. No token bucket, no throttling. Public endpoints (register, contact, comments, log-visit) all lack protection. | [ ] |
| E05 | **Error: Security headers** — Check security headers on all HTTP responses | **❌ PARTIAL:** `apiResponse()` in validation.ts returns CORS headers but no security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Content-Security-Policy`, `Strict-Transport-Security`). Frontend pages served by Astro/CloudFront also lack security headers. | [ ] |
| E06 | **Error: SQL/NoSQL injection** — Check input sanitization on all user-supplied fields | ✅ `sanitize()` strips script tags and truncates length. Email validated via regex. Password min-length validated. No raw query construction. DynamoDB uses parameterized queries by design. | [ ] |
| E07 | **Error: SES throttling** — Check fallback when SES rate limit is exceeded | **❌ NOT IMPLEMENTED:** SES code doesn't exist. When implemented, should catch `ThrottlingException` and log to CloudWatch. | [ ] |
| E08 | **Error: Expired JWT** — Check behavior when expired token is used | ✅ `verifyToken()` returns `null` on any JWT error (expired, malformed, wrong secret). Handlers reject with 401. | [ ] |
| E09 | **Error: DynamoDB TTL expiry —** Check expired visits/tokens are auto-deleted | **❌ NOT IMPLEMENTED:** No TTL configured on any table. Auto-deletion of 90-day visit records or 24h verification tokens is not functional. | [ ] |
| E10 | **Error: Unhandled Lambda exceptions** — Check if handler wraps entire body in try/catch for 500 response | **❌ GAP:** No top-level try/catch in any handler. Unhandled exceptions will cause Lambda to throw, returning HTTP 502 or causing API Gateway 500. | [ ] |

---

## Gaps Summary (Issues Found)

| ID | Severity | Story | Description |
|----|----------|-------|-------------|
| G01 | **HIGH** | SYSTEM-01 | SES email sending NOT implemented — `register/index.ts` never calls SES to send the verification email |
| G02 | **HIGH** | SYSTEM-02 | AI auto-moderation NOT implemented — `comments/index.ts` has no pattern matching, verification checks, or moderation fields |
| G03 | **HIGH** | SYSTEM-03 | Admin notification email NOT implemented — `contact/index.ts` never calls SES to notify admin |
| G04 | **HIGH** | SYSTEM-01 / SYSTEM-04 | DynamoDB TTL NOT configured on any table — verification tokens and visitor records never expire |
| G05 | **HIGH** | SYSTEM-04 | Visitor TTL (90-day) NOT implemented — no `ttl` attribute on visit records |
| G06 | **HIGH** | SYSTEM-06 | CI/CD deploy step NOT configured — workflow lacks S3 sync, CloudFront invalidation, and AWS credentials |
| G07 | **HIGH** | SYSTEM-07 | IAM policies MISSING from template.yaml — Lambda functions have no DynamoDB read/write or SES send permissions |
| G08 | **HIGH** | SYSTEM-07 | S3 bucket + CloudFront NOT defined in infrastructure code |
| G09 | **MEDIUM** | SYSTEM-05 | `dateModified` missing from JSON-LD Article schema (per AC-04) |
| G10 | **MEDIUM** | SYSTEM-05 | Homepage lacks Person JSON-LD structured data (per AC-05) |
| G11 | **MEDIUM** | SYSTEM-05 | og:description lacks 160-char fallback excerpt (per AC-07) |
| G12 | **MEDIUM** | SYSTEM-05 | Sitemap.xml post list is hardcoded, not dynamically generated from content |
| G13 | **MEDIUM** | SYSTEM-07 | ADMIN_EMAIL env var not in template.yaml Globals |
| G14 | **MEDIUM** | SYSTEM-01 | Registration uses 6-char code instead of UUID per story spec (functional but diverges from AC-01) |
| G15 | **LOW** | SYSTEM-07 | `log-visit` body field named `page` instead of `page_url` (per AC-01) |
| G16 | **LOW** | SYSTEM-07 | CORS handled in Lambda code rather than at API Gateway level |
| G17 | **LOW** | All | No rate limiting on any public API endpoint |
| G18 | **LOW** | All | No security headers (X-Content-Type-Options, X-Frame-Options, CSP, HSTS) on API responses |
| G19 | **LOW** | All | No top-level error handling — Lambda handlers lack try/catch wrappers for defensive 500 responses |

---

## Sign-Off

| Tester | Date | Result | Issues |
|--------|------|--------|--------|
| | | Pass / Fail | |
