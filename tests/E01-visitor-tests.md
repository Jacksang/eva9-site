# E01 — Behavior Tests: Anonymous Visitor

**Epic:** E01 — MVP  
**Role:** Anonymous Visitor (R1)

---

## US-E01-VISITOR-01: Browse blog by category

### ✅ Positive Behavior Tests

**TEST-V01-P1: Browse all posts (no filter)**
| Field | Value |
|-------|-------|
| Scenario | Visitor navigates to blog index with all categories visible |
| Pre-condition | At least 3 posts exist across 2+ categories |
| Steps | 1. Open `blog.eva9.ai/en/` 2. Click "Blog" in header |
| Expected | • Page shows all posts across categories • 4 category tabs visible • Post count displayed |

**TEST-V01-P2: Filter by category**
| Field | Value |
|-------|-------|
| Scenario | Visitor clicks "Work" category tab |
| Pre-condition | At least 1 post in "Work" category |
| Steps | 1. Go to `/en/blog/` 2. Click "Work" tab |
| Expected | • Only "Work" posts shown • Other category posts hidden • URL updates to `/en/blog/?category=work` |

### ❌ Negative Behavior Tests

**TEST-V01-N1: Empty category**
| Field | Value |
|-------|-------|
| Scenario | Visitor clicks a category that has no posts |
| Pre-condition | "Hobby" category has 0 posts |
| Steps | 1. Go to `/en/blog/` 2. Click "Hobby" tab |
| Expected | • Empty state shown: "No posts yet in this category" • No error in console • Category tab still clickable |

**TEST-V01-N2: API down**
| Field | Value |
|-------|-------|
| Scenario | Blog page cannot fetch post data (build failure or CDN issue) |
| Pre-condition | S3 bucket empty or CloudFront returns 500 |
| Steps | 1. Open `/en/blog/` |
| Expected | • Friendly error page shown, not blank white screen • "Something went wrong" message with retry suggestion |

---

## US-E01-VISITOR-02: Read a blog post

### ✅ Positive Behavior Tests

**TEST-V02-P1: Normal post with all content types**
| Field | Value |
|-------|-------|
| Scenario | Visitor reads a fully-formatted blog post |
| Pre-condition | Post exists with headings, code blocks, images, links, bold/italic |
| Steps | 1. Go to `/en/blog/work/sample-post/` |
| Expected | • Title, date, category badge, author visible • Markdown rendered correctly • Code blocks have syntax highlighting • Images responsive with alt text • Page loads < 2 seconds |

### ❌ Negative Behavior Tests

**TEST-V02-N1: Post not found**
| Field | Value |
|-------|-------|
| Scenario | Visitor navigates to a non-existent post URL |
| Steps | 1. Go to `/en/blog/work/does-not-exist/` |
| Expected | • 404 page shown (HTTP 404 status) • "Page not found" message • Links to homepage and search |

**TEST-V02-N2: Post with empty body**
| Field | Value |
|-------|-------|
| Scenario | Post file exists but has no body content |
| Steps | 1. Go to `/en/blog/work/empty-post/` |
| Expected | • Page renders header/meta but empty body area • "This post has no content yet" message • No console errors |

---

## US-E01-VISITOR-03: Switch language

### ✅ Positive Behavior Tests

**TEST-V03-P1: Switch EN → ZH**
| Field | Value |
|-------|-------|
| Scenario | Visitor switches from English to Chinese |
| Pre-condition | Both EN and ZH versions of the page exist |
| Steps | 1. Go to `/en/about/` 2. Click language switcher → 中文 |
| Expected | • URL changes to `/zh/about/` • Page content is in Chinese • Language switcher now shows "EN" as the other option |

**TEST-V03-P2: Browser auto-detect ZH**
| Field | Value |
|-------|-------|
| Scenario | First visit with Chinese browser language |
| Pre-condition | Browser `Accept-Language: zh-CN` |
| Steps | 1. Open `blog.eva9.ai` in fresh incognito |
| Expected | • Auto-redirected to `/zh/` • Cookie/localStorage remembers preference |

### ❌ Negative Behavior Tests

**TEST-V03-N1: Translation not available**
| Field | Value |
|-------|-------|
| Scenario | Post exists in EN but has no ZH translation |
| Steps | 1. Go to `/zh/blog/work/english-only-post/` |
| Expected | • Fallback page: "Translation not yet available" • Link to original English post • HTTP 200, not 404 |

---

## US-E01-VISITOR-04: Register an account

### ✅ Positive Behavior Tests

**TEST-V04-P1: Successful registration**
| Field | Value |
|-------|-------|
| Scenario | Visitor registers with valid data |
| Steps | 1. Click "Register" in header 2. Fill: Name="John", Email="john@test.com", Password="Secure123!", Confirm="Secure123!" 3. Pass hCaptcha 4. Submit |
| Expected | • HTTP 201 • "Registration successful — please check your email" toast • Verification email sent • User record created in DynamoDB (unverified) |

### ❌ Negative Behavior Tests

**TEST-V04-N1: Empty fields**
| Field | Value |
|-------|-------|
| Scenario | Submit registration form with all fields empty |
| Steps | 1. Open register form 2. Submit without filling anything |
| Expected | • Form not submitted • Inline validation: "Name is required", "Email is required", "Password is required" |

**TEST-V04-N2: Password mismatch**
| Field | Value |
|-------|-------|
| Scenario | Password and Confirm Password don't match |
| Steps | 1. Fill all fields 2. Password="Secure123!", Confirm="Different123!" 3. Submit |
| Expected | • Inline validation: "Passwords do not match" • Form not submitted |

**TEST-V04-N3: Weak password**
| Field | Value |
|-------|-------|
| Scenario | Password shorter than 8 characters |
| Steps | 1. Fill all fields 2. Password="12345", Confirm="12345" 3. Submit |
| Expected | • Inline validation: "Password must be at least 8 characters" • Form not submitted |

**TEST-V04-N4: Duplicate email**
| Field | Value |
|-------|-------|
| Scenario | Register with an already-registered email |
| Pre-condition | User "john@test.com" already exists |
| Steps | 1. Register with email="john@test.com" |
| Expected | • HTTP 409 • "An account with this email already exists" toast |

**TEST-V04-N5: hCaptcha not completed**
| Field | Value |
|-------|-------|
| Scenario | Submit without completing CAPTCHA |
| Steps | 1. Fill all valid fields 2. Do NOT complete hCaptcha 3. Submit |
| Expected | • Form rejected • "Please complete the CAPTCHA" error |

**TEST-V04-N6: XSS in name field**
| Field | Value |
|-------|-------|
| Scenario | Name field contains script tag |
| Steps | 1. Name="<script>alert(1)</script>" 2. Fill other fields 3. Submit |
| Expected | • Registration rejected OR • Script tags stripped/escaped, safe text stored |

---

## US-E01-VISITOR-05: Log in

### ✅ Positive Behavior Tests

**TEST-V05-P1: Successful login**
| Field | Value |
|-------|-------|
| Scenario | Verified user logs in with correct credentials |
| Pre-condition | User exists: "john@test.com" / "Secure123!" / verified |
| Steps | 1. Click "Login" in header 2. Email="john@test.com", Password="Secure123!" 3. Submit |
| Expected | • HTTP 200 • JWT token returned • Header shows username + "Logout" • Redirected to previous page |

### ❌ Negative Behavior Tests

**TEST-V05-N1: Wrong password**
| Field | Value |
|-------|-------|
| Scenario | User enters incorrect password |
| Steps | 1. Login with correct email, wrong password |
| Expected | • HTTP 401 • "Invalid email or password" (generic — does not reveal which is wrong) • No token returned |

**TEST-V05-N2: Unverified user login**
| Field | Value |
|-------|-------|
| Scenario | Unverified user tries to log in |
| Pre-condition | User registered but not email-verified |
| Steps | 1. Login with unverified user credentials |
| Expected | • HTTP 200 login works OR • "Please verify your email first" message • Comment form still disabled until verified |

---

## US-E01-VISITOR-06: Verify email

### ✅ Positive Behavior Tests

**TEST-V06-P1: Successful verification**
| Field | Value |
|-------|-------|
| Scenario | User clicks valid verification link from email |
| Pre-condition | Verification token is valid and not expired |
| Steps | 1. Open verification link from email: `/verify-email?token=valid-uuid` |
| Expected | • HTTP 200 • "Email verified — you can now comment" page • User record updated: `is_verified = true` in DynamoDB • Token is consumed (cannot be reused) |

### ❌ Negative Behavior Tests

**TEST-V06-N1: Expired token**
| Field | Value |
|-------|-------|
| Scenario | User clicks verification link after token TTL (24h) |
| Steps | 1. Use expired token: `/verify-email?token=expired-uuid` |
| Expected | • "Verification link expired — request a new one" • Option to resend verification email |

**TEST-V06-N2: Invalid token**
| Field | Value |
|-------|-------|
| Scenario | User clicks link with fake/nonexistent token |
| Steps | 1. `/verify-email?token=fake-token-123` |
| Expected | • "Verification link invalid" • No user record modified |

---

## US-E01-VISITOR-07: View homepage

### ✅ Positive Behavior Tests

**TEST-V07-P1: Homepage with content**
| Field | Value |
|-------|-------|
| Scenario | Visitor lands on homepage with blog posts |
| Pre-condition | At least 3 posts exist |
| Steps | 1. Open `blog.eva9.ai/en/` |
| Expected | • Hero section with name + tagline + CTAs • 4 category cards visible • 3-6 recent post cards • Page loads < 1 second |

### ❌ Negative Behavior Tests

**TEST-V07-N1: Homepage with no posts**
| Field | Value |
|-------|-------|
| Scenario | New site with zero blog posts |
| Steps | 1. Open `blog.eva9.ai/en/` |
| Expected | • Hero + category cards still render • "No posts yet — check back soon" empty state • No console errors |

---

## US-E01-VISITOR-08: Read About page

### ✅ Positive Behavior Tests

**TEST-V08-P1: About page renders**
| Field | Value |
|-------|-------|
| Scenario | Visitor reads About page |
| Steps | 1. Go to `/en/about/` |
| Expected | • Photo, name, bio visible • Experience timeline rendered • Skills section shown • Both EN and ZH versions work |

---

## US-E01-VISITOR-09: System-follow dark mode

### ✅ Positive Behavior Tests

**TEST-V09-P1: Dark mode from system preference**
| Field | Value |
|-------|-------|
| Scenario | Visitor's system is set to dark mode |
| Pre-condition | OS/browser `prefers-color-scheme: dark` |
| Steps | 1. Open `blog.eva9.ai` |
| Expected | • Dark background (#111827) • Light text • No white flash on load |

**TEST-V09-P2: Light mode from system preference**
| Field | Value |
|-------|-------|
| Scenario | Visitor's system is set to light mode |
| Pre-condition | OS/browser `prefers-color-scheme: light` |
| Steps | 1. Open `blog.eva9.ai` |
| Expected | • White background • Dark text • No dark flash on load |

---

## US-E01-VISITOR-10: Submit contact form

### ✅ Positive Behavior Tests

**TEST-V10-P1: Successful contact submission**
| Field | Value |
|-------|-------|
| Scenario | Visitor submits a contact form |
| Steps | 1. Fill Name, Email, Message 2. Pass hCaptcha 3. Submit |
| Expected | • HTTP 201 • "Message sent — I'll get back to you soon" toast • Admin receives email • Message saved in DynamoDB |

### ❌ Negative Behavior Tests

**TEST-V10-N1: Rate limit exceeded**
| Field | Value |
|-------|-------|
| Scenario | Same IP submits 6 forms in one hour |
| Pre-condition | 5 previous submissions from same IP |
| Steps | 1. Submit 6th form from same IP |
| Expected | • HTTP 429 • "Too many submissions — please try again later" |

**TEST-V10-N2: Missing required fields**
| Field | Value |
|-------|-------|
| Scenario | Submit with empty message |
| Steps | 1. Fill Name and Email, leave Message empty 2. Submit |
| Expected | • Inline validation: "Message is required" • Form not submitted |
