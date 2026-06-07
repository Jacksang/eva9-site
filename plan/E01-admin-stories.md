# E01 — User Stories: Admin

**Epic:** E01 — MVP (Phase 1)  
**Role:** Admin — Jacky Chen (R3)

---

## US-E01-ADMIN-01: Log into admin dashboard

As an **Admin**, I need to **log in with secure admin credentials** so that **only I can access the admin dashboard and management functions**.

**Acceptance Criteria:**
- AC-01: Admin login page is at `/en/admin/login` and `/zh/admin/login`
- AC-02: Admin login form is separate from user login — different endpoint (`/api/admin/login`)
- AC-03: Admin credentials are configured via environment variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`), not in the database
- AC-04: Successful login returns admin JWT with `role: admin` claim
- AC-05: Failed login returns generic "Invalid credentials" — does not reveal whether email exists
- AC-06: Admin JWT expires after 2 hours (shorter than user tokens)
- AC-07: Admin login is rate-limited to 10 attempts per hour per IP

---

## US-E01-ADMIN-02: View comment moderation queue

As an **Admin**, I need to **see all comments in a moderation queue** so that **I can review, approve, or reject comments before they appear publicly**.

**Acceptance Criteria:**
- AC-01: Admin dashboard has a "Comments" tab showing the moderation queue
- AC-02: The queue shows all pending comments, sorted newest first
- AC-03: Each comment row shows: author name, email, post title (linked), comment body (truncated), status badge, timestamp
- AC-04: Comments can be filtered by status: Pending / Approved / Rejected / All
- AC-05: Clicking a comment row expands to show the full comment body
- AC-06: Empty queue shows "No comments to moderate" empty state

---

## US-E01-ADMIN-03: Approve or reject a comment

As an **Admin**, I need to **approve or reject a comment from the moderation queue** so that **I control what content appears publicly on my blog**.

**Acceptance Criteria:**
- AC-01: Each pending comment has "Approve" and "Reject" action buttons
- AC-02: Clicking "Approve" immediately publishes the comment — it becomes visible to all visitors on the post page
- AC-03: Clicking "Reject" hides the comment from public view — the author sees "✗ Not approved" status
- AC-04: Both actions are irreversible (no undo in Phase 1)
- AC-05: After action, the comment row updates to show the new status badge (Approved / Rejected)
- AC-06: Comment approval updates the comment's `is_approved` field in DynamoDB
- AC-07: Bulk approve/reject is out of scope for Phase 1 (individual actions only)

---

## US-E01-ADMIN-04: View registered users

As an **Admin**, I need to **view a list of registered users** so that **I know who is participating on my blog**.

**Acceptance Criteria:**
- AC-01: Admin dashboard has a "Users" tab showing registered user list
- AC-02: Each user row shows: name, email, verification status (Verified / Unverified), registration date
- AC-03: Users are sorted by registration date (newest first)
- AC-04: Empty list shows "No registered users yet" empty state
- AC-05: User list is paginated (50 per page)

---

## US-E01-ADMIN-05: View contact messages

As an **Admin**, I need to **read contact messages submitted by visitors** so that **I can respond to inquiries in a timely manner**.

**Acceptance Criteria:**
- AC-01: Admin dashboard has a "Messages" tab showing all contact form submissions
- AC-02: Each message row shows: sender name, email, message preview (first 100 chars), timestamp
- AC-03: Clicking a message expands to show the full message body
- AC-04: Messages show read/unread status (unread messages have a highlight)
- AC-05: Clicking a message marks it as "read"
- AC-06: Empty list shows "No messages yet" empty state

---

## US-E01-ADMIN-06: View visitor analytics

As an **Admin**, I need to **see visitor analytics (page views, unique IPs, top pages)** so that **I understand my blog's audience and reach**.

**Acceptance Criteria:**
- AC-01: Admin dashboard has an "Analytics" tab with visitor statistics
- AC-02: Dashboard shows summary cards: Total Page Views (today), Unique Visitors (today), Total Comments, Total Users
- AC-03: Dashboard shows "Top Pages" list — URLs ranked by page views (top 10)
- AC-04: Dashboard shows "Recent Visitors" table — IP address, page visited, timestamp (last 50)
- AC-05: Analytics data is sourced from `eva9_visitors` DynamoDB table + CloudFront logs
- AC-06: Dashboard data refreshes automatically or via a "Refresh" button (no page reload needed)

---

## US-E01-ADMIN-07: Publish blog content (via Git)

As an **Admin**, I need to **publish a blog post by writing a Markdown file and pushing to Git** so that **I create content with my familiar writing tools (Obsidian)**.

**Acceptance Criteria:**
- AC-01: Writing workflow: write `.md` file in `src/content/blog/{lang}/{category}/` → `git push` → GitHub Actions builds → deploys to S3
- AC-02: Each post has frontmatter with: title, date, category, excerpt, tags (optional)
- AC-03: Post supports images (referenced in Markdown), code blocks with language detection
- AC-04: Categories are determined by the directory path (not frontmatter tag)
- AC-05: Deployment completes in under 2 minutes from git push
- AC-06: This workflow is documented in the project README (not in the admin dashboard)

---

## US-E01-ADMIN-08: View AI moderation decisions

As an **Admin**, I need to **see which comments were auto-approved or auto-rejected by the AI moderation system** so that **I can override AI decisions if needed and monitor the system's accuracy**.

**Acceptance Criteria:**
- AC-01: In the comment moderation queue, auto-approved and auto-rejected comments show an "AI" badge indicating the AI made the decision
- AC-02: Admin can override any AI decision by manually approving or rejecting
- AC-03: The AI moderation reason is visible (e.g., "Auto-rejected: contains link" or "Auto-approved: verified user, clean content")
- AC-04: AI decisions are logged — admin can see the decision timestamp and reason
- AC-05: Comments auto-rejected by AI still appear in the queue (not silently deleted)
