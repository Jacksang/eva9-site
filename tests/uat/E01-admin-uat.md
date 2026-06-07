# Eva9-Site UAT — E01 Admin

**Version:** 1.0 | **Date:** 2026-06-07
**Role:** Admin (Jacky Chen) | **Epic:** E01
**Source:** plan/E01-admin-stories.md
**UI Design:** uidesign/PAGE_admin-dashboard.md
**Duration:** ~20 min

## UAT Pass Criteria

a) UI matches design specifications (layout, colors, typography)
b) No emojis in UI, all images visible and properly sized
c) End-to-end flows are smooth, responsive, clear action feedback
d) Every clickable element is responsive, missing content triggers visible error

---

## Pre-Test Setup

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| PS‑1 | Open http://localhost:4321/en/admin/login | Admin login page loads at `/en/admin/login` | [ ] |
| PS‑2 | Confirm admin login URL is `/en/admin/login`, not `/en/login` | Different path from user login — confirms separate page | [ ] |
| PS‑3 | Open http://localhost:4321/zh/admin/login | Chinese admin login page loads at `/zh/admin/login` | [ ] |
| PS‑4 | Confirm the login form has email and password fields | Two visible input fields with labels | [ ] |
| PS‑5 | Confirm there is no "Register" link on the admin login page | No register/sign-up option (admin accounts are env‑configured only) | [ ] |

---

## US-E01-ADMIN-01: Log into admin dashboard

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| A01‑01 | Enter a valid admin email + password (matching `ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH`) and click "Log in" or press Enter | **Success:** redirected to `/en/admin/` dashboard. Toast notification: "Logged in successfully" | [ ] |
| A01‑02 | Inspect the JWT token (via dev tools → Application → Local Storage / cookies) | JWT contains `role: admin` claim. Token expiry is 2 hours from issue time `[REQUIRES BACKEND]` | [ ] |
| A01‑03 | Enter a wrong password for the known admin email | **Error:** generic message "Invalid credentials" — no hint about which field is wrong | [ ] |
| A01‑04 | Enter a non‑existent email address | **Error:** same generic "Invalid credentials" — does not reveal whether the email exists | [ ] |
| A01‑05 | Leave email empty and enter a password | Form validation prevents submission — inline error "Email is required" (or browser validation) | [ ] |
| A01‑06 | Leave password empty | Form validation prevents submission — inline error "Password is required" | [ ] |
| A01‑07 | Submit login 11 times within 1 minute from the same IP | 11th attempt returns HTTP 429 with message "Too many login attempts. Try again later." `[REQUIRES BACKEND]` | [ ] |
| A01‑08 | Wait 1 hour after rate-limit trigger, then attempt one valid login | Rate-limit resets — login succeeds with valid credentials `[REQUIRES BACKEND]` | [ ] |
| A01‑09 | Open an expired admin JWT page (wait 2h+ or manipulate expiry) | API returns 401. Frontend redirects to `/en/admin/login` with message "Session expired. Please log in again." `[REQUIRES BACKEND]` | [ ] |
| A01‑10 | Open `/en/admin/` without any JWT token | Redirect to `/en/admin/login` | [ ] |
| A01‑11 | Attempt to use a regular user JWT (role: customer) on an admin endpoint | HTTP 403 — "Forbidden — admin access required" `[REQUIRES BACKEND]` | [ ] |

---

## US-E01-ADMIN-02: View comment moderation queue

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| A02‑01 | After login, confirm the "Comments" tab is the default active tab | Comments tab is highlighted (active state). Below it shows the moderation queue | [ ] |
| A02‑02 | Verify sidebar has "Comments" listed and is active (highlighted) | Left sidebar: "Comments" link has `bg-primary/10 text-primary font-medium` styling | [ ] |
| A02‑03 | Verify the tab bar shows all 4 tabs: Comments / Users / Messages / Analytics | Four horizontal tabs visible with correct labels | [ ] |
| A02‑04 | With at least 3 pending comments, verify the queue loads | Comments listed newest first. Each row shows: author name, email, post title (linked), comment body (truncated), status badge, timestamp | [ ] |
| A02‑05 | Click on a comment row to expand it | Row expands to show the full comment body text (no truncation) | [ ] |
| A02‑06 | Click the expanded row again | Row collapses back to truncated preview | [ ] |
| A02‑07 | Use the filter dropdown — select "Approved" | Only approved comments shown | [ ] |
| A02‑08 | Select "Rejected" from filter | Only rejected comments shown | [ ] |
| A02‑09 | Select "Pending" from filter | Only pending comments shown | [ ] |
| A02‑10 | Select "All" from filter | All comments shown regardless of status | [ ] |
| A02‑11 | Verify post title is a clickable link | Clicking the post title opens the blog post page in a new tab (or navigates to it) | [ ] |
| A02‑12 | With zero pending comments, select "Pending" filter | Empty state message: "No comments to moderate" with a checkmark icon | [ ] |
| A02‑13 | Verify each comment has a status badge | Pending: yellow badge, Approved: green badge, Rejected: red badge. Badge colors match DESIGN_SYSTEM.md tokens (bg-yellow-100 etc.) | [ ] |
| A02‑14 | Verify the comment queue loads with skeleton rows while data is being fetched | Skeleton placeholder rows visible for < 1 s, then replaced by actual rows `[REQUIRES BACKEND]` | [ ] |
| A02‑15 | Simulate an API failure (e.g., disconnect network) and refresh the Comments tab | Error state shows "Failed to load data" with a "Retry" button | [ ] |
| A02‑16 | Click "Retry" after network is restored | Data loads successfully | [ ] |

---

## US-E01-ADMIN-03: Approve or reject a comment

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| A03‑01 | On a pending comment row, click the "Approve" button | Comment status changes to a green "Approved" badge immediately. Toast: "Comment approved" | [ ] |
| A03‑02 | Navigate to the blog post where the approved comment was made, as a visitor (not logged in) | The comment is visible to all visitors on the post page | [ ] |
| A03‑03 | On a different pending comment, click the "Reject" button | Comment status changes to a red "Rejected" badge immediately. Toast: "Comment rejected" | [ ] |
| A03‑04 | Navigate to the blog post for the rejected comment, as a visitor | The comment is NOT visible to visitors | [ ] |
| A03‑05 | Log into a regular user account that submitted the rejected comment, go to that post | The author sees "✗ Not approved" status on their own comment | [ ] |
| A03‑06 | After approving a comment, verify no "Undo" button appears | No undo / revert action available (irreversible in Phase 1) | [ ] |
| A03‑07 | After rejecting a comment, verify no "Undo" button appears | Same — no undo action | [ ] |
| A03‑08 | Verify Approve and Reject buttons are visually distinct | Approve: green (`bg-green-600 text-white`), Reject: red (`bg-red-600 text-white`). Match DESIGN_SYSTEM.md button spec | [ ] |
| A03‑09 | Verify that a comment marked "Approved" has `is_approved = true` in DynamoDB | Check database (or backend logs) `[REQUIRES BACKEND]` | [ ] |
| A03‑10 | Verify that a comment marked "Rejected" has `is_approved = false` and `status = rejected` in DynamoDB | Check database `[REQUIRES BACKEND]` | [ ] |
| A03‑11 | Attempt to approve a comment that was already approved | Action is allowed but idempotent — status stays "Approved". No error shown | [ ] |
| A03‑12 | Attempt to approve/reject while disconnected from network | Error state: toast notification "Action failed — please try again" | [ ] |

---

## US-E01-ADMIN-04: View registered users

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| A04‑01 | Click the "Users" tab in the admin dashboard | Users tab activates. Table of registered users loads | [ ] |
| A04‑02 | Verify each user row shows: name, email, verification status, registration date | Four visible columns with correct data. Verification badge: "Verified" (green) or "Unverified" (gray/yellow) | [ ] |
| A04‑03 | Verify users are sorted newest first | Most recently registered user is at the top of the list | [ ] |
| A04‑04 | If there are 50+ users, verify pagination controls appear at the bottom | Page numbers or "Next" / "Previous" buttons visible. 50 users per page | [ ] |
| A04‑05 | Click "Next" on the pagination | Page 2 loads with users 51–100 | [ ] |
| A04‑06 | Click "Previous" | Returns to page 1 | [ ] |
| A04‑07 | With zero registered users | Empty state: "No registered users yet" | [ ] |
| A04‑08 | Verify the user list loading state shows skeleton rows | Skeleton placeholders, then replaced with data (or empty state) `[REQUIRES BACKEND]` | [ ] |
| A04‑09 | Simulate API failure on the Users tab | Error state: "Failed to load data — Retry" | [ ] |

---

## US-E01-ADMIN-05: View contact messages

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| A05‑01 | Click the "Messages" tab | Messages tab activates. List of contact form submissions loads | [ ] |
| A05‑02 | Verify each message row shows: sender name, email, message preview (first ~100 chars), timestamp | Correct columns with truncated preview | [ ] |
| A05‑03 | Click an unread message row | Row expands to show the full message body. The row's unread highlight disappears | [ ] |
| A05‑04 | Verify unread messages are visually distinct from read messages | Unread: highlighted background (e.g., `bg-primary/5` or a left border accent). Read: normal background | [ ] |
| A05‑05 | Click a message row that is already read | Toggles expand/collapse — no change to read status | [ ] |
| A05‑06 | Refresh the page and check the previously clicked message | It remains marked as "read" (unread highlight does not return) `[REQUIRES BACKEND]` | [ ] |
| A05‑07 | With zero messages | Empty state: "No messages yet" | [ ] |
| A05‑08 | Verify the Messages tab shows skeleton rows while loading | Skeleton placeholders `[REQUIRES BACKEND]` | [ ] |
| A05‑09 | Simulate API failure on the Messages tab | Error state: "Failed to load data — Retry" | [ ] |

---

## US-E01-ADMIN-06: View visitor analytics

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| A06‑01 | Click the "Analytics" tab | Analytics tab activates. View switches to analytics layout as shown in PAGE_admin-dashboard.md | [ ] |
| A06‑02 | Verify four summary cards are visible: Total Page Views (Today), Unique Visitors (Today), Total Comments, Total Users | Four cards in a grid layout. Each card: number in large font, label underneath, `bg-surface rounded-xl p-5 text-center` styling | [ ] |
| A06‑03 | Verify "Top Pages" table shows URLs ranked by page views (top 10) | Table with columns: #, URL, Views. Sorted descending by Views. Max 10 rows | [ ] |
| A06‑04 | Verify "Recent Visitors" table shows IP address, page visited, timestamp (last 50) | Three columns visible. Sorted by timestamp descending. Max 50 rows | [ ] |
| A06‑05 | Click the "Refresh" button (or trigger auto-refresh) | Analytics data updates without a full page reload. Numbers may change if new traffic arrived | [ ] |
| A06‑06 | With zero analytics data (fresh site) | All summary cards show "0". Tables show "No data yet" | [ ] |
| A06‑07 | Verify the Analytics tab shows skeleton cards while loading | Skeleton placeholders `[REQUIRES BACKEND]` | [ ] |
| A06‑08 | Simulate API failure on the Analytics tab | Error state: "Failed to load data — Retry" | [ ] |
| A06‑09 | Verify analytics card colors and font sizes | Large stat number uses `--text-3xl` or similar. Label is `--text-sm text-secondary`. Cards have consistent spacing | [ ] |

---

## US-E01-ADMIN-07: Publish blog content (via Git)

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| A07‑01 | Create a new Markdown file at `src/content/blog/en/work/my-new-post.md` with valid frontmatter (title, date, category, excerpt). Add a body with paragraphs and an image reference | File saves correctly. Valid frontmatter present | [ ] |
| A07‑02 | Run `git add . && git commit -m "New post: my-new-post" && git push origin main` | GitHub Actions workflow triggers. Pipeline starts building | [ ] |
| A07‑03 | Monitor the GitHub Actions workflow (open repo → Actions tab) | Build completes successfully. No errors. Deployment to S3 runs | [ ] |
| A07‑04 | Check the post is live at `/en/blog/work/my-new-post/` | Post renders with correct title, date, excerpt, body content. Image displays properly. Code blocks have syntax highlighting | [ ] |
| A07‑05 | Verify the new post appears on the homepage (recent posts list) | Post visible on homepage, newest first | [ ] |
| A07‑06 | Time the deployment from push to live | Under 2 minutes | [ ] |
| A07‑07 | Create a post without required frontmatter fields (omit `title`) and push | GitHub Actions build fails. Error message: "Missing required frontmatter: title". Site remains on last successful build | [ ] |
| A07‑08 | Create a post with valid frontmatter in `src/content/blog/zh/work/` (Chinese category) | Post appears at `/zh/blog/work/` with Chinese-appropriate rendering | [ ] |
| A07‑09 | Verify the post's category is determined by directory path, not frontmatter | Post placed under correct category section on the site | [ ] |
| A07‑10 | Push a post with a Markdown image reference `![alt](/images/photo.jpg)` | Image renders on the live site, properly sized | [ ] |
| A07‑11 | Push a post with a code block with language annotation (e.g., ` ```python`) | Code block renders with syntax highlighting and language label | [ ] |

---

## US-E01-ADMIN-08: View AI moderation decisions

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| A08‑01 | Create a comment that triggers an AI spam rule (e.g., contains "加微信" or a URL from a new user) | The comment appears in the queue with status "Pending". An `[AI]` badge (purple pill) is shown next to the status | [ ] |
| A08‑02 | Click the comment row to expand it | Full comment body visible. Below the body, a moderation reason line: e.g., "AI: spam_pattern_detected — contains contact solicitation" | [ ] |
| A08‑03 | Create a comment from a verified user with clean content | AI auto-approves it. Comment shows `[AI]` badge with green approved status. Reason visible: "Auto-approved: verified user, clean content" | [ ] |
| A08‑04 | Click "Approve" on a comment that was auto-rejected by AI | Admin override succeeds. Comment changes to "Approved" status. The `[AI]` badge may remain but status is now green | [ ] |
| A08‑05 | Click "Reject" on a comment that was auto-approved by AI | Admin override succeeds. Comment changes to "Rejected" status | [ ] |
| A08‑06 | Verify AI auto-rejected comments still appear in the queue | They are not silently deleted — visible with "Pending" or "Rejected" status + `[AI]` badge | [ ] |
| A08‑07 | Check the AI decision log (via backend query or admin panel) | Each AI-evaluated comment has a logged decision timestamp and reason `[REQUIRES BACKEND]` | [ ] |
| A08‑08 | Verify the AI badge styling matches specs | `[AI]` badge uses purple tokens: `bg-purple-100 text-purple-700` (light) / `bg-purple-900 text-purple-300` (dark). Small pill shape (`--text-xs` or `--text-sm`) | [ ] |

---

## Error States

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| E‑01 | Visit `/en/admin/` or any admin tab while not logged in | Redirect to `/en/admin/login`. No admin data exposed | [ ] |
| E‑02 | Submit admin login with empty fields | Form validation blocks submission — inline errors shown on empty fields | [ ] |
| E‑03 | Submit login with valid email + wrong password 11 times | Rate limit kicked in after 10. 11th shows "Too many login attempts" with 429 status `[REQUIRES BACKEND]` | [ ] |
| E‑04 | Use a regular user JWT to access `GET /api/admin/comments` | HTTP 403 — "Forbidden — admin access required" `[REQUIRES BACKEND]` | [ ] |
| E‑05 | Use an expired admin JWT on any admin API endpoint | HTTP 401 — frontend redirects to login with "Session expired" `[REQUIRES BACKEND]` | [ ] |
| E‑06 | Tamper with the admin JWT (change payload or signature) | JWT validation fails — HTTP 401 — frontend redirects to login `[REQUIRES BACKEND]` | [ ] |
| E‑07 | Disconnect network, then click any tab (Comments / Users / Messages / Analytics) | Error state: "Failed to load data — Retry" button visible | [ ] |
| E‑08 | Disconnect network, then try to approve/reject a comment | Toast notification: "Action failed — please try again" | [ ] |
| E‑09 | Send an API request to an admin endpoint from a non-admin IP that was not whitelisted (if IP restriction enabled) | HTTP 403 or connection refused `[REQUIRES BACKEND]` | [ ] |
| E‑10 | Open `/en/admin/` after the Lambda backend has been shut down (cold start failure) | Error state shown on all tabs. "Service unavailable. Please try again later." | [ ] |
| E‑11 | Attempt to access `/zh/admin/` routes with an English-session JWT | Chinese admin page loads correctly (language in URL changes UI language, not access) | [ ] |
| E‑12 | Navigate directly to a non-existent admin path (e.g., `/en/admin/settings`) | 404 page or redirect to `/en/admin/` dashboard | [ ] |

---

## UI Design Checklist

| Check | Criteria | [ ] |
|-------|----------|-----|
| Layout — Admin Login | Login page is clean, centered form card. Email + password fields. No register link. Matches the separate-admin-login design intent | [ ] |
| Layout — Dashboard | Full dashboard layout matches PAGE_admin-dashboard.md: left sidebar (220px fixed width, `bg-surface border-r`), main content area with tab bar + content | [ ] |
| Sidebar | Contains nav links: Comments, Users, Messages, Analytics. Active link highlighted with `bg-primary/10 text-primary font-medium`. Logout at bottom. `py-2 px-4 rounded-md` link styling | [ ] |
| Tab Bar | Four horizontal tabs under header: Comments, Users, Messages, Analytics. Active tab visually distinct | [ ] |
| Comment Rows | `border rounded-lg p-4 mb-2`. Expandable on click. Action buttons visible when expanded | [ ] |
| Action Buttons — Approve | `btn-sm bg-green-600 text-white` styling | [ ] |
| Action Buttons — Reject | `btn-sm bg-red-600 text-white` styling | [ ] |
| AI Badge | Small purple pill `[AI]` — `bg-purple-100 text-purple-700` (light) / `bg-purple-900 text-purple-300` (dark) | [ ] |
| Stats Cards (Analytics) | 4-column grid. Each: `bg-surface rounded-xl p-5 text-center`. Large stat number, smaller label | [ ] |
| Tables (Users, Top Pages, Visitors) | `w-full text-sm`. Header with gray background (`bg-gray-100`/`bg-gray-700`). Alternating row colors | [ ] |
| Empty States | Centered, muted text. "No comments to moderate" / "No registered users yet" / "No messages yet" / "No data yet". Icon (gray-400) + message | [ ] |
| Loading States | Skeleton rows / cards while data is fetching | [ ] |
| Error States | "Failed to load data — Retry" with a clickable Retry button | [ ] |
| No emojis in UI | All indicators use text labels or SVG icons — no emoji characters in the admin UI except where explicitly specified (e.g., checkmark icon in empty state may be SVG) | [ ] |
| Images visible | Any images (avatars, icons) load correctly and are properly sized | [ ] |
| Dark mode | Dashboard respects system dark mode preference. All colors switch to dark tokens (bg-gray-900 surfaces, text-white, etc.) | [ ] |
| Typography | Body text uses Inter font. Appropriate font sizes (`--text-sm` for secondary, `--text-base` for body). Proper contrast | [ ] |
| Brand Colors | Primary = `#0D9488` / `#14B8A6` (teal). Accent = `#F59E0B` / `#FBBF24` (amber). Error = red. Success = green | [ ] |
| Toast Notifications | Fixed bottom-right. Auto-dismiss after 4 seconds. Slide-in animation. Green for success, red for error | [ ] |
| Accessibility | All interactive elements have `focus-visible` ring. Semantic HTML. `aria-label` on icon-only buttons. 4.5:1 contrast minimum | [ ] |
| Sidebar — Logout | Logout link/section at bottom of sidebar. Clicking it: session invalidated, redirect to `/en/admin/login`, toast: "Logged out" | [ ] |
| Header — Dark Mode Toggle | Moon/sun icon in header works. Toggling dark mode changes all dashboard elements accordingly | [ ] |
| Header — Language Switch | EN | ZH toggle in header switches between `/en/admin/` and `/zh/admin/` while maintaining the same tab | [ ] |
| Header — Back to Site | Link returns to the public-facing blog (not admin) | [ ] |

---

## Sign-Off

| Tester | Date | Result | Issues |
|--------|------|--------|--------|
| | | Pass / Fail | |
