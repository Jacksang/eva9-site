# E01 — Behavior Tests: Admin

**Epic:** E01 — MVP  
**Role:** Admin — Jacky Chen (R3)

---

## US-E01-ADMIN-01: Log into admin dashboard

### ✅ Positive Behavior Tests

**TEST-ADM01-P1: Successful admin login**
| Field | Value |
|-------|-------|
| Scenario | Admin logs in with correct credentials |
| Pre-condition | `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` set in env |
| Steps | 1. `POST /api/admin/login` with `{email, password}` |
| Expected | • HTTP 200 • JWT with `role: admin` claim • Token valid for 2 hours |

### ❌ Negative Behavior Tests

**TEST-ADM01-N1: Wrong credentials**
| Field | Value |
|-------|-------|
| Scenario | Attacker tries wrong password |
| Steps | 1. `POST /api/admin/login` with wrong password |
| Expected | • HTTP 401 • "Invalid credentials" — generic, no field hints |

**TEST-ADM01-N2: Rate limit**
| Field | Value |
|-------|-------|
| Scenario | 11 login attempts from same IP in one hour |
| Steps | 1. `POST /api/admin/login` 11 times |
| Expected | • 11th request → HTTP 429 • "Too many login attempts" |

---

## US-E01-ADMIN-02 & 03: Moderate comments

### ✅ Positive Behavior Tests

**TEST-ADM02-P1: Approve a pending comment**
| Field | Value |
|-------|-------|
| Scenario | Admin approves a pending comment |
| Pre-condition | Pending comment exists in DynamoDB |
| Steps | 1. `GET /api/admin/comments?status=pending` 2. `PATCH /api/admin/comments/{id}` with `{action: "approve"}` |
| Expected | • HTTP 200 • Comment `is_approved = true` • Comment visible on post page |

**TEST-ADM02-P2: Reject a pending comment**
| Field | Value |
|-------|-------|
| Scenario | Admin rejects inappropriate comment |
| Steps | 1. `PATCH /api/admin/comments/{id}` with `{action: "reject"}` |
| Expected | • HTTP 200 • Comment `is_approved = false, status = rejected` • Comment NOT visible to other visitors • Author sees "Not approved" |

### ❌ Negative Behavior Tests

**TEST-ADM02-N1: Unauthenticated access**
| Field | Value |
|-------|-------|
| Scenario | Anonymous user tries to moderate comments |
| Steps | 1. `PATCH /api/admin/comments/{id}` without token |
| Expected | • HTTP 401 • "Authentication required" |

**TEST-ADM02-N2: Non-admin user access**
| Field | Value |
|-------|-------|
| Scenario | Regular registered user tries to access admin endpoints |
| Pre-condition | User token has `role: customer` |
| Steps | 1. `GET /api/admin/comments` with user JWT |
| Expected | • HTTP 403 • "Forbidden — admin access required" |

---

## US-E01-ADMIN-04: View registered users

### ✅ Positive Behavior Tests

**TEST-ADM04-P1: List users**
| Field | Value |
|-------|-------|
| Scenario | Admin views registered user list |
| Pre-condition | At least 2 users registered |
| Steps | 1. `GET /api/admin/users` with admin JWT |
| Expected | • HTTP 200 • Returns paginated list • Each user: name, email, verified status, date • Sorted newest first |

### ❌ Negative Behavior Tests

**TEST-ADM04-N1: No users yet**
| Field | Value |
|-------|-------|
| Scenario | Admin views user list on fresh site |
| Steps | 1. `GET /api/admin/users` |
| Expected | • HTTP 200 • Empty array `[]` • Frontend shows "No registered users yet" |

---

## US-E01-ADMIN-05: View contact messages

### ✅ Positive Behavior Tests

**TEST-ADM05-P1: List messages**
| Field | Value |
|-------|-------|
| Scenario | Admin views contact form submissions |
| Steps | 1. `GET /api/admin/messages` |
| Expected | • HTTP 200 • Messages sorted newest first • Unread messages highlighted |

---

## US-E01-ADMIN-06: View visitor analytics

### ✅ Positive Behavior Tests

**TEST-ADM06-P1: Analytics dashboard**
| Field | Value |
|-------|-------|
| Scenario | Admin views analytics dashboard |
| Pre-condition | At least 10 page visits recorded |
| Steps | 1. Open admin dashboard → Analytics tab OR `GET /api/admin/visitors/summary` |
| Expected | • Total PV today + Unique visitors shown • Top Pages list (top 10) • Recent Visitors table (last 50) • Data refreshes |

---

## US-E01-ADMIN-07: Publish content via Git

### ✅ Positive Behavior Tests

**TEST-ADM07-P1: New post goes live**
| Field | Value |
|-------|-------|
| Scenario | Admin pushes a new Markdown post |
| Steps | 1. Write `src/content/blog/en/work/test.md` 2. `git push origin main` 3. Wait for GitHub Actions build |
| Expected | • Build succeeds • Post visible at `/en/blog/work/test/` within 2 minutes • Post appears on homepage recent posts |

### ❌ Negative Behavior Tests

**TEST-ADM07-N1: Invalid frontmatter**
| Field | Value |
|-------|-------|
| Scenario | Post has missing required frontmatter fields |
| Steps | 1. Create post without `title` or `date` 2. `git push` |
| Expected | • GitHub Actions build fails • Clear error message: "Missing required frontmatter: title" • Site stays on last successful build (no deploy) |
