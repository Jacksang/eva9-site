# E01 — Behavior Tests: Registered User & System

**Epic:** E01 — MVP  
**Roles:** Registered User (R2), System (R6)

---

## US-E01-USER-01: Submit a comment

### ✅ Positive Behavior Tests

**TEST-USR01-P1: Verified user submits clean comment**
| Field | Value |
|-------|-------|
| Scenario | Verified user posts a normal comment |
| Pre-condition | User logged in, email verified |
| Steps | 1. `POST /api/comments` with `{post_slug: "work/test", body: "Great article!"}` |
| Expected | • HTTP 201 • Comment stored in DynamoDB • `is_approved = true` (AI auto-approved) • `moderated_by = "ai"` |

**TEST-USR01-P2: Unverified user submits comment**
| Field | Value |
|-------|-------|
| Scenario | Unverified user posts a comment |
| Pre-condition | User logged in but email NOT verified |
| Steps | 1. `POST /api/comments` with valid body |
| Expected | • HTTP 201 • Comment stored • `is_approved = false` (held for review) • User sees "Submitted for review" toast |

### ❌ Negative Behavior Tests

**TEST-USR01-N1: Unauthenticated**
| Field | Value |
|-------|-------|
| Scenario | Anonymous user tries to comment |
| Steps | 1. `POST /api/comments` without JWT |
| Expected | • HTTP 401 • "Authentication required" |

**TEST-USR01-N2: Empty body**
| Field | Value |
|-------|-------|
| Scenario | Comment body is empty or only whitespace |
| Steps | 1. `POST /api/comments` with `{body: ""}` |
| Expected | • HTTP 422 • "Comment must be between 3 and 5000 characters" |

**TEST-USR01-N3: Body too long**
| Field | Value |
|-------|-------|
| Scenario | Comment exceeds 5000 characters |
| Steps | 1. `POST /api/comments` with 5001-character body |
| Expected | • HTTP 422 • Explicit error message |

---

## US-E01-USER-02 & 03: View comments

### ✅ Positive Behavior Tests

**TEST-USR02-P1: List approved comments**
| Field | Value |
|-------|-------|
| Scenario | Visitor sees approved comments on a post |
| Pre-condition | 2 approved comments on post "work/test" |
| Steps | 1. `GET /api/comments/work/test` |
| Expected | • HTTP 200 • Array of 2 comments • Each has: author_name, body, created_at • No comments with `is_approved = false` returned |

**TEST-USR02-P2: Author sees their pending comment**
| Field | Value |
|-------|-------|
| Scenario | Author views comments and sees their own pending comment |
| Steps | 1. `GET /api/comments/work/test` with user JWT |
| Expected | • When user is the author, their pending comment is shown with "⏳ Pending review" badge |

### ❌ Negative Behavior Tests

**TEST-USR02-N1: Post has no comments**
| Field | Value |
|-------|-------|
| Scenario | Post with zero comments |
| Steps | 1. `GET /api/comments/new-post` |
| Expected | • HTTP 200 • Empty array `[]` • Frontend shows "No comments yet" |

---

## US-E01-USER-04: Log out

### ✅ Positive Behavior Tests

**TEST-USR04-P1: Successful logout**
| Field | Value |
|-------|-------|
| Scenario | User clicks logout |
| Steps | 1. Click "Logout" in header |
| Expected | • JWT cleared from localStorage • Header shows "Login" + "Register" • Comment form shows "Log in to comment" |

---

## System Tests

## US-E01-SYSTEM-01: Email verification

### ❌ Negative Behavior Tests

**TEST-SYS01-N1: Expired token**
| Field | Value |
|-------|-------|
| Scenario | Verification token past 24h TTL |
| Steps | 1. `GET /api/verify-email?token=expired-token` |
| Expected | • HTTP 410 • "Verification link expired — request a new one" |

**TEST-SYS01-N2: Duplicate verification**
| Field | Value |
|-------|-------|
| Scenario | User clicks verification link twice |
| Steps | 1. Verify email with valid token (first time — succeeds) 2. Click same link again |
| Expected | • HTTP 200 or 410 • "Email already verified" message • Token is single-use |

---

## US-E01-SYSTEM-02: AI auto-moderation

### ❌ Negative Behavior Tests

**TEST-SYS02-N1: URL in comment**
| Field | Value |
|-------|-------|
| Scenario | Verified user posts comment with URL |
| Steps | 1. `POST /api/comments` with body: "Check out https://spam-site.com" |
| Expected | • `is_approved = false` • `moderation_reason = "contains_link"` • Admin sees it in moderation queue |

**TEST-SYS02-N2: Chinese spam pattern**
| Field | Value |
|-------|-------|
| Scenario | Comment contains "加微信" spam pattern |
| Steps | 1. `POST /api/comments` with body: "加微信 abc123 了解更多" |
| Expected | • `is_approved = false` • Held for admin review |

**TEST-SYS02-N3: Clean comment auto-approved**
| Field | Value |
|-------|-------|
| Scenario | Verified user posts clean comment |
| Steps | 1. `POST /api/comments` with body: "This is a thoughtful analysis, thanks!" |
| Expected | • `is_approved = true` • `moderation_reason = "auto_approved: clean_content"` • Published immediately |

---

## US-E01-SYSTEM-03: Contact email notification

### ✅ Positive Behavior Tests

**TEST-SYS03-P1: Email sent on contact submission**
| Field | Value |
|-------|-------|
| Scenario | Contact form triggers email to admin |
| Steps | 1. Submit contact form 2. Check admin email inbox |
| Expected | • Email arrives within 30 seconds • Contains: sender name, email, message, timestamp |

---

## US-E01-SYSTEM-04: Visitor logging

### ✅ Positive Behavior Tests

**TEST-SYS04-P1: Page visit recorded**
| Field | Value |
|-------|-------|
| Scenario | Visitor opens a page |
| Steps | 1. Open `blog.eva9.ai/en/blog/work/test/` |
| Expected | • `POST /api/log-visit` fired in background • Record in DynamoDB: IP, page_url, user_agent, timestamp • No impact on page load performance |

### ❌ Negative Behavior Tests

**TEST-SYS04-N1: Logging endpoint down**
| Field | Value |
|-------|-------|
| Scenario | Analytics Lambda is unavailable |
| Steps | 1. Open any page |
| Expected | • Page renders normally • Silent fail on logging — no error visible to user • No console error |

---

## US-E01-SYSTEM-05: SEO artifacts

### ✅ Positive Behavior Tests

**TEST-SYS05-P1: Sitemap generated**
| Field | Value |
|-------|-------|
| Scenario | Build produces valid sitemap |
| Steps | 1. `npm run build` 2. Check `dist/sitemap.xml` |
| Expected | • XML valid • All `/en/` and `/zh/` post URLs present • `<lastmod>` dates correct |

**TEST-SYS05-P2: OG meta on post page**
| Field | Value |
|-------|-------|
| Scenario | Blog post has OpenGraph meta tags |
| Steps | 1. View page source of any blog post |
| Expected | • `<meta property="og:title">` present • `og:description` = post excerpt • `og:type` = "article" |

---

## US-E01-SYSTEM-06: GitHub Actions deploy

### ✅ Positive Behavior Tests

**TEST-SYS06-P1: Push triggers deploy**
| Field | Value |
|-------|-------|
| Scenario | Git push triggers GitHub Actions workflow |
| Steps | 1. `git push origin main` 2. Check GitHub Actions |
| Expected | • Workflow starts automatically • Build succeeds • S3 synced • CloudFront cache invalidated • Site updated < 2 minutes |

### ❌ Negative Behavior Tests

**TEST-SYS06-N1: Build failure does not deploy**
| Field | Value |
|-------|-------|
| Scenario | Push introduces a build error |
| Steps | 1. Push broken code 2. Check GitHub Actions |
| Expected | • Build fails • S3 NOT updated • Previous version stays live • Failure notification sent |
