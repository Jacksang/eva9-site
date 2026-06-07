# E01 — User Stories: System

**Epic:** E01 — MVP (Phase 1)  
**Role:** System — Automated background processes (R6)

---

## US-E01-SYSTEM-01: Send email verification

As the **System**, I need to **send a verification email to newly registered users via AWS SES** so that **user accounts can be verified and their comments auto-approved**.

**Acceptance Criteria:**
- AC-01: After a successful registration POST, the System generates a unique verification token (UUID, stored in DynamoDB with 24h TTL)
- AC-02: The System sends an email via AWS SES to the user's email address containing a verification link: `blog.eva9.ai/verify-email?token={uuid}`
- AC-03: Email is sent asynchronously (Lambda invocation, does not delay the registration response)
- AC-04: Email sending failures are logged to CloudWatch — registration is NOT rolled back on email failure
- AC-05: The verification token is single-use — consumed when the user clicks the link
- AC-06: Expired tokens (past 24h TTL) return "Verification link expired — request a new one"

---

## US-E01-SYSTEM-02: AI auto-moderate comments

As the **System**, I need to **auto-evaluate submitted comments using keyword and pattern matching** so that **verified users' clean comments are published immediately and spam is flagged for admin review**.

**Acceptance Criteria:**
- AC-01: On comment submission, the System checks: (a) is the user verified? (b) does the comment contain flagged patterns?
- AC-02: Flagged patterns include: URLs in body (unless known safe domains), profanity keywords (EN/ZH), Chinese spam patterns (e.g., "加微信", "免费咨询", phone numbers), repeated characters > 10
- AC-03: Verified user + clean comment → auto-approved (`is_approved = true`)
- AC-04: Verified user + flagged content → held for review (`is_approved = false`, AI reason logged)
- AC-05: Unverified user → always held for review (regardless of content)
- AC-06: AI decision is stored in the comment record: `moderation_action`, `moderation_reason`, `moderated_by = 'ai'`
- AC-07: Moderation rules are defined in a JSON config file (not hardcoded) for easy tuning

---

## US-E01-SYSTEM-03: Send contact form notification

As the **System**, I need to **email the admin when a contact form is submitted** so that **the admin is notified of new inquiries in real time**.

**Acceptance Criteria:**
- AC-01: After a successful contact form submission, the System sends an email to the admin's email address (configured via `ADMIN_EMAIL` env var)
- AC-02: Email contains: sender name, sender email, message body, timestamp, a "Reply" mailto link
- AC-03: Email is sent asynchronously — form submission response is not delayed by email sending
- AC-04: Email sending failures are logged to CloudWatch — the contact message is still saved in DynamoDB

---

## US-E01-SYSTEM-04: Record visitor page access

As the **System**, I need to **record each page visit with IP and timestamp** so that **the admin can view visitor analytics in the dashboard**.

**Acceptance Criteria:**
- AC-01: Each page load fires a lightweight POST to `/api/log-visit` with `page_url` (from JavaScript on the frontend)
- AC-02: The Lambda function extracts the visitor's IP from the API Gateway request context
- AC-03: Record includes: IP address, page URL, User-Agent, Referer, timestamp
- AC-04: Visitor records have a 90-day TTL in DynamoDB (auto-deleted after 90 days)
- AC-05: `/api/log-visit` has no authentication requirement (public endpoint)
- AC-06: Logging failure does NOT affect page rendering (fire-and-forget, silent fail)

---

## US-E01-SYSTEM-05: Generate SEO artifacts

As the **System**, I need to **generate SEO artifacts (sitemap.xml, OG meta, JSON-LD structured data) during each build** so that **search engines can discover and properly index all content**.

**Acceptance Criteria:**
- AC-01: `sitemap.xml` is generated at build time containing all blog post URLs in both languages
- AC-02: Every page has `<meta property="og:title">`, `og:description`, `og:image`, `og:url`, `og:type` tags
- AC-03: Every page has `<meta name="twitter:card" content="summary_large_image">` and `twitter:title` / `twitter:description`
- AC-04: Every blog post page has JSON-LD `Article` structured data with: headline, author, datePublished, dateModified
- AC-05: Homepage has JSON-LD `Person` structured data with: name, description, url
- AC-06: All SEO artifacts compile without errors during `npm run build`
- AC-07: If a post has no excerpt, `og:description` falls back to the first 160 characters of the body text

---

## US-E01-SYSTEM-06: Deploy to production

As the **System**, I need to **automatically build and deploy the site on every push to main** so that **content changes go live without manual intervention**.

**Acceptance Criteria:**
- AC-01: GitHub Actions workflow triggers on push to `main` branch
- AC-02: Workflow: checkout → `npm install` → `npm run build` → sync `dist/` to S3 bucket → invalidate CloudFront cache
- AC-03: Build failures are reported via GitHub Actions notification (email or UI)
- AC-04: Deploy takes under 2 minutes from push to live
- AC-05: S3 bucket is configured for static website hosting with CloudFront as CDN
- AC-06: CloudFront distribution has custom domain `blog.eva9.ai` with SSL certificate
