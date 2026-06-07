# E01 — User Stories: Registered User

**Epic:** E01 — MVP (Phase 1)  
**Role:** Registered User (R2)

---

## US-E01-USER-01: Submit a comment on a blog post

As a **Registered User**, I need to **submit a comment on a blog post** so that **I can share my thoughts and participate in discussions**.

**Acceptance Criteria:**
- AC-01: A comment form is displayed at the bottom of every blog post page (below the article body)
- AC-02: Form contains a single textarea field ("Write your comment…") — no name/email fields (auto-filled from user profile)
- AC-03: Comment must be between 3 and 5000 characters — empty or too long shows inline validation
- AC-04: Upon submit, the comment is sent to the moderation queue — user sees "Your comment has been submitted for review" toast
- AC-05: The comment form is disabled while submission is in progress (prevents double-submit)
- AC-06: If logged out, the comment form is replaced with "Log in to comment" link pointing to login page
- AC-07: Markdown formatting within comments is NOT rendered (plain text only, prevent XSS)

---

## US-E01-USER-02: See comment status after submission

As a **Registered User**, I need to **see the status of my comment after submission** so that **I know whether it's pending, approved, or rejected**.

**Acceptance Criteria:**
- AC-01: After submitting a comment, the comment appears in the comments section marked "⏳ Pending review" (visible only to the comment author)
- AC-02: Other visitors do NOT see pending comments
- AC-03: If the comment is approved, the status badge changes to "✓" and the comment is visible to all visitors
- AC-04: If the comment is rejected, it is only visible to the author with "✗ Not approved" badge — other visitors never see it
- AC-05: Comment displays: author name, timestamp, body text, status badge
- AC-06: Comments are listed in chronological order (oldest first)

---

## US-E01-USER-03: View comments on a post

As a **Registered User**, I need to **see approved comments on a blog post** so that **I can read what others have said and join the conversation**.

**Acceptance Criteria:**
- AC-01: A comments section is displayed below every blog post
- AC-02: Section shows the total comment count at the top (e.g., "3 Comments")
- AC-03: Each approved comment shows: author name, timestamp (relative — "2 hours ago"), body text
- AC-04: If zero comments exist, the section shows "No comments yet — be the first to share your thoughts"
- AC-05: If the API is unavailable (network error), the section shows "Comments unavailable — please try again later" with a retry button

---

## US-E01-USER-04: Log out

As a **Registered User**, I need to **log out of my account** so that **my session is terminated on this device**.

**Acceptance Criteria:**
- AC-01: "Logout" link is visible in the header when logged in
- AC-02: Clicking Logout clears the JWT token from local storage
- AC-03: After logout, the header reverts to showing "Login" + "Register" links
- AC-04: After logout, any page that requires authentication (comment form) shows "Log in to comment"
