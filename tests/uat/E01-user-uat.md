# Eva9-Site UAT — E01 Registered User

**Version:** 1.0 | **Date:** 2026-06-07
**Role:** Registered User | **Epic:** E01
**Source:** plan/E01-user-stories.md
**Duration:** ~15 min

## UAT Pass Criteria
a) UI matches design specifications (layout, colors, typography)
b) No emojis in UI, all images visible and properly sized
c) End-to-end flows are smooth, responsive, clear action feedback
d) Every clickable element is responsive, missing content triggers visible error

## Pre-Test Setup
| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 1 | Navigate to http://localhost:4321/en — site loads correctly | Home page renders with header, nav, footer | [ ] |
| 2 | Verify the header shows "Log in" and "Admin" links (user not logged in) | Header has "Log in" link (no logout) | [ ] |
| 3 | Navigate to a blog post at /en/blog (or confirm /en/blog page exists) | Blog index page loads, category filter tabs visible | [ ] |
| 4 | [REQUIRES BACKEND] Register a test user account via the register flow | Registration succeeds, or register page loads | [ ] |
| 5 | [REQUIRES BACKEND] Log in with test account credentials | Login succeeds, header switches to show user name | [ ] |

## Test Steps

### US-E01-USER-01: Submit a comment on a blog post
**AC covered:** AC-01 through AC-07

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 1 | Navigate to any blog post detail page | A comment form is displayed at the bottom of the page, below the article body | [ ] |
| 2 | [REQUIRES BACKEND, LOGGED IN] Verify the form contains only a textarea (no name/email fields) | Single textarea with placeholder "Write your comment…" is present; no name or email inputs | [ ] |
| 3 | [REQUIRES BACKEND, LOGGED IN] Type a valid comment (10 chars) and click Submit | Comment is sent; a success toast "Your comment has been submitted for review" appears | [ ] |
| 4 | [REQUIRES BACKEND, LOGGED IN] Rapidly click Submit twice while the request is in progress | Submit button is disabled during submission; no duplicate comment created | [ ] |
| 5 | [REQUIRES BACKEND, LOGGED IN] Type a comment with markdown syntax: `**bold**` and submit | Comment renders as plain text (`**bold**` is not bolded) | [ ] |
| 6 | [REQUIRES BACKEND, LOGGED IN] Type an HTML tag like `<script>alert('xss')</script>` and submit | HTML is escaped, displayed as literal text, not executed | [ ] |
| 7 | Log out, then navigate back to the blog post comment section | Comment form is replaced with "Log in to comment" link | [ ] |
| 8 | [REQUIRES BACKEND] Click "Log in to comment" link | User is redirected to the login page | [ ] |

### US-E01-USER-02: See comment status after submission
**AC covered:** AC-01 through AC-06

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 1 | [REQUIRES BACKEND, LOGGED IN] Submit a new comment | The comment appears in the comments section below the post, marked with a "Pending review" status badge | [ ] |
| 2 | [REQUIRES BACKEND, LOGGED IN] Verify the pending comment shows: author name, timestamp, body text, and status badge | All four elements are displayed for the comment | [ ] |
| 3 | [REQUIRES BACKEND] Log out and navigate to the same blog post as a non-logged-in visitor | The pending comment is NOT visible to other visitors | [ ] |
| 4 | [REQUIRES BACKEND] Log in as a different registered user and view the same blog post | The pending comment from step 1 is NOT visible | [ ] |
| 5 | [REQUIRES BACKEND] Have an admin approve the comment from step 1; log back in as original author and refresh | Status badge changes to "✓" (approved); comment is now visible to all visitors | [ ] |
| 6 | [REQUIRES BACKEND] Have an admin reject a comment; log in as the original author and view it | Comment shows "Not approved" badge; only the author can see it | [ ] |
| 7 | [REQUIRES BACKEND] Verify comments appear in chronological order (oldest first) | Comments are sorted oldest to newest by timestamp | [ ] |

### US-E01-USER-03: View comments on a post
**AC covered:** AC-01 through AC-05 (from original; overlaps with comment reading)

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 1 | [REQUIRES BACKEND] Navigate to a blog post that has approved comments | A comments section is displayed below the blog post body | [ ] |
| 2 | [REQUIRES BACKEND] Check the top of the comments section | Shows total comment count (e.g., "3 Comments") with correct number | [ ] |
| 3 | [REQUIRES BACKEND] Inspect each approved comment | Each shows: author name, relative timestamp ("2 hours ago"), and body text | [ ] |
| 4 | [REQUIRES BACKEND] Navigate to a blog post with zero approved comments | Section shows "No comments yet — be the first to share your thoughts" | [ ] |
| 5 | [REQUIRES BACKEND] Disconnect network (or simulate API error), then load a blog post with comments | Section shows "Comments unavailable — please try again later" with a retry button | [ ] |
| 6 | [REQUIRES BACKEND, OFFLINE] Click the retry button | The site retries fetching comments (request is re-sent) | [ ] |

### US-E01-USER-04: Log out
**AC covered:** AC-01 through AC-04

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 1 | [REQUIRES BACKEND] Log in with valid credentials | Header shows user name and a "Logout" link/button | [ ] |
| 2 | [REQUIRES BACKEND] Click the "Logout" link | JWT token is removed from localStorage (`eva9-user-token` key is null) | [ ] |
| 3 | [REQUIRES BACKEND] After logout, inspect the header | Header reverts to showing "Log in" and "Admin" links; no user name or logout option | [ ] |
| 4 | [REQUIRES BACKEND] After logout, navigate to any blog post | Comment form shows "Log in to comment" link (not the form) | [ ] |
| 5 | [REQUIRES BACKEND] After logout, try to navigate to an authenticated route | Redirected to login page if protected; otherwise static pages load but comment form shows login prompt | [ ] |

## Error States

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 1 | [REQUIRES BACKEND, LOGGED IN] Submit an empty comment (0 characters) | Inline validation error: "Comment must be at least 3 characters" | [ ] |
| 2 | [REQUIRES BACKEND, LOGGED IN] Submit a 1-character comment | Inline validation error: "Comment must be at least 3 characters" | [ ] |
| 3 | [REQUIRES BACKEND, LOGGED IN] Submit a 2-character comment | Inline validation error: "Comment must be at least 3 characters" | [ ] |
| 4 | [REQUIRES BACKEND, LOGGED IN] Submit a comment with exactly 5001 characters | Inline validation error: "Comment must be under 5000 characters" | [ ] |
| 5 | [REQUIRES BACKEND] Attempt to submit a comment while logged out (if form visible) | Redirected to login page, or form is replaced with login prompt | [ ] |
| 6 | Submit comment form with JavaScript disabled | Graceful degradation: page still loads, form may use standard POST or show fallback | [ ] |
| 7 | [REQUIRES BACKEND] Login with invalid credentials | Error message displayed; no token stored; user remains logged out | [ ] |
| 8 | [REQUIRES BACKEND] Submit a comment while API is unreachable | Error message displayed: "Unable to submit comment — please try again" (or similar) | [ ] |

## Sign-Off
| Tester | Date | Result | Issues |
|--------|------|--------|--------|
| | | Pass / Fail | |
