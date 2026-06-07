# E01 — User Stories: Anonymous Visitor

**Epic:** E01 — MVP (Phase 1)  
**Role:** Anonymous Visitor (R1)

---

## US-E01-VISITOR-01: Browse blog by category

As an **Anonymous Visitor**, I need to **browse blog posts grouped by category (Work/Learn/Hobby/Life)** so that **I can find content relevant to my interests without reading everything**.

**Acceptance Criteria:**
- AC-01: Blog index page loads in both `/en/` and `/zh/` with all 4 category tabs visible
- AC-02: Each category tab filters posts to show only that category's articles
- AC-03: Each post card displays: title, date, category badge, excerpt (first 200 chars)
- AC-04: If a category has no posts, an empty state message is shown ("No posts yet in this category")
- AC-05: Category filter updates the URL (e.g., `/en/blog?category=work`)

---

## US-E01-VISITOR-02: Read a blog post

As an **Anonymous Visitor**, I need to **read a blog post with clean typography** so that **I can comfortably consume long-form content on any device**.

**Acceptance Criteria:**
- AC-01: Post page displays: title, publish date, category badge, reading time, author name, body content
- AC-02: Body text is rendered from Markdown with proper headings, lists, bold/italic, links, blockquotes
- AC-03: Code blocks have syntax highlighting and use monospace font (JetBrains Mono)
- AC-04: Images in posts are responsive and have alt text
- AC-05: Post body max-width is 680px, centered, with comfortable line-height
- AC-06: Post page works on mobile (responsive) — font sizes scale, no horizontal scroll
- AC-07: Missing or empty body renders a graceful empty state ("This post has no content yet")

---

## US-E01-VISITOR-03: Switch language

As an **Anonymous Visitor**, I need to **switch between English and Chinese** so that **I can read the website in my preferred language**.

**Acceptance Criteria:**
- AC-01: Language switcher is visible in the header on every page
- AC-02: Switching language changes URL from `/en/...` to `/zh/...` and reloads the equivalent page
- AC-03: If a post doesn't have a translation yet, a fallback page shows "Translation not yet available" with a link to the original
- AC-04: First visit auto-detects browser's `Accept-Language` header and redirects to the matching language
- AC-05: Language preference is remembered for the current session via cookie or localStorage

---

## US-E01-VISITOR-04: Register an account

As an **Anonymous Visitor**, I need to **register with my email and password** so that **I can participate in discussions by commenting on posts**.

**Acceptance Criteria:**
- AC-01: Registration form is accessible from the header ("Register" link) or from the comment section below posts
- AC-02: Form fields: Name, Email, Password (min 8 chars — hint displayed), Confirm Password
- AC-03: All fields required — submit with empty fields shows inline validation errors
- AC-04: Password and Confirm Password must match — mismatch shows error
- AC-05: Email must be valid format — invalid email shows error
- AC-06: Successful registration shows "Registration successful — please check your email to verify your account" toast
- AC-07: Registration with an already-registered email shows "An account with this email already exists"
- AC-08: CAPTCHA (hCaptcha) is required to prevent bot registration
- AC-09: Form submission is protected against SQL injection and XSS

---

## US-E01-VISITOR-05: Log in

As an **Anonymous Visitor**, I need to **log in with my email and password** so that **I can access my registered user features**.

**Acceptance Criteria:**
- AC-01: Login link is visible in the header on every page
- AC-02: Login form has Email + Password fields
- AC-03: Successful login returns JWT token (stored client-side), redirects to previous page
- AC-04: Failed login (wrong email or password) shows "Invalid email or password" — does not reveal which field is wrong
- AC-05: After login, the header changes: "Register" → "Logout", shows user's name
- AC-06: JWT token expires after 7 days — user must log in again

---

## US-E01-VISITOR-06: Verify email

As an **Anonymous Visitor** (who just registered), I need to **verify my email by clicking a link sent to my inbox** so that **my account is confirmed and I can comment without manual moderation**.

**Acceptance Criteria:**
- AC-01: After registration, a verification email is sent to the user's email address within 60 seconds
- AC-02: Email contains a unique verification link with a token (valid for 24 hours)
- AC-03: Clicking the link marks the account as verified and shows a "Email verified — you can now comment" success page
- AC-04: Expired or invalid token shows "Verification link expired or invalid — request a new one"
- AC-05: Verified users' comments are auto-approved by the AI moderation system
- AC-06: Email is sent via AWS SES (free tier)

---

## US-E01-VISITOR-07: View homepage

As an **Anonymous Visitor**, I need to **land on a clear homepage** so that **I immediately understand who the author is and what content is available**.

**Acceptance Criteria:**
- AC-01: Hero section displays: author name, one-line tagline, two CTA buttons ("About Me", "My Services")
- AC-02: Below hero: 4 category cards (Work, Learn, Hobby, Life) in a responsive grid — each links to its category page
- AC-03: Below category cards: "Recent Posts" section — 3-6 latest post cards sorted by date
- AC-04: Each post card in the grid displays: title, category badge, date, excerpt
- AC-05: If zero posts exist, homepage shows empty state: "No posts yet — check back soon"
- AC-06: Homepage loads in under 1 second (Lighthouse performance score ≥ 95)

---

## US-E01-VISITOR-08: Read About page

As an **Anonymous Visitor**, I need to **read an About page with the author's bio and experience** so that **I can learn about the person behind the blog**.

**Acceptance Criteria:**
- AC-01: About page is linked from the header and homepage hero
- AC-02: Page displays: author photo, name, bio text, experience timeline, skills list
- AC-03: Content is translatable — both `/en/about/` and `/zh/about/` work
- AC-04: Page renders without JavaScript errors

---

## US-E01-VISITOR-09: System-follow dark mode

As an **Anonymous Visitor**, I need **the website to follow my system's dark/light mode setting** so that **reading is comfortable for my eyes**.

**Acceptance Criteria:**
- AC-01: On first visit, the site matches the browser/OS `prefers-color-scheme` setting
- AC-02: Dark mode has: dark background (#111827), light text (#F9FAFB), adjusted card colors
- AC-03: Light mode has: white background (#FFFFFF), dark text (#111827)
- AC-04: All pages respect the current theme — no white flash on dark mode

---

## US-E01-VISITOR-10: Submit contact form

As an **Anonymous Visitor**, I need to **submit a contact form** so that **I can reach the site owner with inquiries or opportunities**.

**Acceptance Criteria:**
- AC-01: Contact form is accessible from the footer on every page
- AC-02: Fields: Name, Email, Message (textarea)
- AC-03: All fields required — submit with missing fields shows validation errors
- AC-04: CAPTCHA is required to prevent spam
- AC-05: Successful submission shows "Message sent — I'll get back to you soon" toast
- AC-06: Admin receives an email notification via AWS SES for each submission
- AC-07: Form submission rate-limited to 5 per hour per IP to prevent abuse
