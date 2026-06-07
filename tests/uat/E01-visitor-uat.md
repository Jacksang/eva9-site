# Eva9-Site UAT — E01 Anonymous Visitor

**Version:** 1.0 | **Date:** 2026-06-07
**Role:** Anonymous Visitor | **Epic:** E01
**Source:** plan/E01-visitor-stories.md
**UI Design:** uidesign/PAGE_homepage.md, uidesign/PAGE_blog-post.md, uidesign/DESIGN_SYSTEM.md
**Duration:** ~20 min

## UAT Pass Criteria
a) UI matches design specifications (layout, colors, typography)
b) No emojis in UI, all images visible and properly sized
c) End-to-end flows are smooth, responsive, clear action feedback
d) Every clickable element is responsive, missing content triggers visible error

## Pre-Test Setup
| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 1 | Open browser, go to http://localhost:4321 | Redirects to /en/ or /zh/ based on browser language | [ ] |
| 2 | Clear localStorage and cache | Clean state — no saved theme, language, or auth tokens | [ ] |

## Test Steps

### US-E01-VISITOR-01: Browse blog by category
| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 1 | Load the blog index at /en/blog/ | All 4 category tabs (Work, Learn, Hobby, Life) are visible and clickable | [ ] |
| 2 | Load the Chinese blog index at /zh/blog/ | All 4 category tabs show Chinese translations | [ ] |
| 3 | Click each category tab (Work, Learn, Hobby, Life) | Blog post list filters to only posts in that category | [ ] |
| 4 | Verify post cards in any category | Each card displays: title, date, category badge (teal pill), reading time, excerpt (first ~200 chars) | [ ] |
| 5 | Click a category when no posts exist for it | Empty state message shown: "No posts yet in this category" | [ ] |
| 6 | Click a category tab and observe the browser URL | URL updates to e.g. /en/blog/?category=work | [ ] |
| 7 | Click the "All" / "All Posts" tab to reset filter | All posts shown again, URL resets to /en/blog/ | [ ] |
| 8 | Reload the page with a category filter in the URL (e.g. /en/blog/?category=work) | Page loads with that category filter pre-applied | [ ] |

### US-E01-VISITOR-02: Read a blog post
| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 1 | Click a blog post card from the homepage or blog index | Post page loads showing: title, publish date, category badge (teal pill), reading time, author name ("Jacky Chen"), body content | [ ] |
| 2 | Examine the post body content | Markdown rendered correctly: headings (h2, h3), bullet/numbered lists, bold/italic text, hyperlinks, blockquotes | [ ] |
| 3 | Examine a code block within the post | Syntax highlighting applied, monospace font (JetBrains Mono) used, background is dark (`bg-gray-900`), rounded corners | [ ] |
| 4 | Examine an image within the post (if present) | Image is responsive (max-width 100%), rounded corners, has alt text visible on hover/inspect | [ ] |
| 5 | Measure the blog post body width | Body content is max 680px wide, centered on screen | [ ] |
| 6 | Resize browser to mobile width (320-767px) | Font sizes scale down, no horizontal scroll, code blocks show horizontal scrollbar if needed | [ ] |
| 7 | Open a post that has no body content | Metadata (title, date, category) renders; body area shows "This post has no content yet" | [ ] |
| 8 | Verify the "Back to Blog" link above the post title | Clicking navigates to /en/blog/ | [ ] |

### US-E01-VISITOR-03: Switch language
| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 1 | Verify language switcher is present in the header on the homepage | EN/ZH toggle (or dropdown) is visible in the header | [ ] |
| 2 | Verify language switcher is present on a blog post page | Switcher visible in header on /en/blog/{cat}/{slug}/ | [ ] |
| 3 | Click the language switcher from EN to ZH on the homepage | URL changes from /en/ to /zh/; page content reloads in Chinese | [ ] |
| 4 | Click the language switcher from ZH to EN on a blog post | URL changes from /zh/blog/{cat}/{slug}/ to /en/blog/{cat}/{slug}/; page reloads in English | [ ] |
| 5 | Switch to ZH and visit a blog post that has no Chinese translation | Falls back gracefully: "Translation not yet available" with a link to the original English post | [ ] |
| 6 | Clear cookies/localStorage, reload the homepage from a browser set to ZH | Page redirects to /zh/ based on `navigator.language` (brief flash acceptable) | [ ] |
| 7 | Switch language, then navigate to a different page | Language preference is remembered (check cookie or localStorage) — second page loads in the same language | [ ] |

### US-E01-VISITOR-04: Register an account
| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 1 | Locate the "Register" link in the header | Link is visible on every page (homepage, blog, post, about) | [ ] |
| 2 | Click "Register" | Registration form opens (modal or /register/ page) with fields: Name, Email, Password, Confirm Password | [ ] |
| 3 | Click the "Submit" / "Register" button with all fields empty | Inline validation errors shown for every required field | [ ] |
| 4 | Enter a password of 3 characters; Submit | Validation error: "Password must be at least 8 characters" (or similar hint shown) | [ ] |
| 5 | Enter valid password in Password field, different text in Confirm Password; Submit | Validation error: "Passwords do not match" | [ ] |
| 6 | Enter invalid email format (e.g. "notanemail"); Submit | Validation error: "Please enter a valid email address" | [ ] |
| 7 | Enter all valid fields; Submit | hCaptcha widget appears and must be completed before final submission | [ ] |
| 8 | Submit registration with valid data and completed CAPTCHA | [REQUIRES BACKEND] Toast: "Registration successful — please check your email to verify your account" | [ ] |
| 9 | Submit registration using an email already registered | [REQUIRES BACKEND] Error: "An account with this email already exists" | [ ] |

### US-E01-VISITOR-05: Log in
| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 1 | Locate the "Login" link in the header | Login link is visible on every page | [ ] |
| 2 | Click "Login" | Login form opens (modal or /login/ page) with Email and Password fields | [ ] |
| 3 | Submit with empty fields | Inline validation: "Email is required" and "Password is required" | [ ] |
| 4 | Submit with valid credentials | [REQUIRES BACKEND] Successful login; JWT token stored client-side; redirects to previous page | [ ] |
| 5 | Submit with an invalid email or wrong password | [REQUIRES BACKEND] Error: "Invalid email or password" — no hint whether email or password is wrong | [ ] |
| 6 | Verify header changes after successful login | [REQUIRES BACKEND] "Register" changes to "Logout" and user's name (or avatar initial) appears in header | [ ] |
| 7 | Check JWT expiry behavior | [REQUIRES BACKEND] Attempt to use a token past 7 days — user is redirected to login | [ ] |

### US-E01-VISITOR-06: Verify email
| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 1 | Complete a new registration | [REQUIRES BACKEND] A verification email arrives within 60 seconds from AWS SES | [ ] |
| 2 | Open the verification email | Email contains a unique link with a token parameter (e.g. /verify-email?token=abc123) | [ ] |
| 3 | Click the verification link | [REQUIRES BACKEND] Page shows: "Email verified — you can now comment" success message | [ ] |
| 4 | Wait until the token is 24+ hours old, then try to use it | [REQUIRES BACKEND] Page shows: "Verification link expired or invalid — request a new one" with a resend option | [ ] |
| 5 | Navigate to /verify-email?token=invalidtoken123 | [REQUIRES BACKEND] Error: "Verification link expired or invalid — request a new one" | [ ] |

### US-E01-VISITOR-07: View homepage
| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 1 | Load http://localhost:4321/en/ | Hero section visible: author name "Jacky Chen", one-line tagline, two CTA buttons ("About Me", "My Services") | [ ] |
| 2 | Click "About Me" button in hero | Navigates to /en/about/ | [ ] |
| 3 | Click "My Services" button in hero | Navigates to the contact/more info section or a relevant page | [ ] |
| 4 | Scroll below the hero — verify 4 category cards (Work, Learn, Hobby, Life) | 2x2 responsive grid; each card has icon/emoji, title, subtitle, arrow indicator → | [ ] |
| 5 | Click each category card | Navigates to the corresponding category blog page (e.g. clicking Work → /en/blog/?category=work) | [ ] |
| 6 | Scroll to "Recent Posts" section | 3-6 latest post cards sorted by most recent first; each shows: title, category badge, date, excerpt | [ ] |
| 7 | Verify post card order in Recent Posts | Posts are sorted by publish date descending (newest first) | [ ] |
| 8 | Click a post card in Recent Posts | Navigates to that post's full page at /en/blog/{category}/{slug}/ | [ ] |
| 9 | Click "View All Posts →" link | Navigates to /en/blog/ | [ ] |
| 10 | Test empty state (no posts published) | [REQUIRES CLEAN BUILD] Hero and category cards still visible; Recent Posts shows: "No posts yet — check back soon" | [ ] |
| 11 | Run Lighthouse performance audit on homepage | Performance score ≥ 95, page loads under 1 second | [ ] |

### US-E01-VISITOR-08: Read About page
| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 1 | Click "About Me" in the header on any page | Navigates to /en/about/ | [ ] |
| 2 | Click "About Me" CTA button on the homepage hero | Also navigates to /en/about/ | [ ] |
| 3 | Verify About page content | Displays: author photo, full name "Jacky Chen", bio text, experience timeline, skills list | [ ] |
| 4 | Load /zh/about/ | About page content in Chinese (translated equivalent) | [ ] |
| 5 | Open browser DevTools Console | No JavaScript errors on the About page | [ ] |
| 6 | Verify the About page renders correctly on mobile (320-767px width) | No layout breakage, horizontal scroll, or overlapping text | [ ] |

### US-E01-VISITOR-09: System-follow dark mode
| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 1 | Set OS/browser to light mode preference; clear localStorage; load homepage | Background is white (#FFFFFF), text is dark (#111827) — light mode active | [ ] |
| 2 | Set OS/browser to dark mode preference; clear localStorage; load homepage | Background is dark (#111827), text is light (#F9FAFB) — dark mode active, no white flash before transition | [ ] |
| 3 | Load a blog post page in dark mode | Post body uses dark theme colors: card background (#1F2937), border (#374151), secondary text (#9CA3AF); prose uses dark-invert | [ ] |
| 4 | Verify the dark mode toggle button exists in the header | Toggle (moon/sun icon) is visible and clickable on all pages | [ ] |
| 5 | Click the dark mode toggle while in light mode | Page switches to dark theme; preference saved to localStorage | [ ] |
| 6 | Click the dark mode toggle while in dark mode | Page switches to light theme; preference saved to localStorage | [ ] |
| 7 | Reload the page after manually toggling | Theme persists (from localStorage), no flash of wrong theme | [ ] |
| 8 | Verify all pages (homepage, blog index, post, about, register, login) respect the theme | No page unexpectedly shows a different theme | [ ] |

### US-E01-VISITOR-10: Submit contact form
| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 1 | Locate the contact form on the site | Form is accessible from the footer on every page | [ ] |
| 2 | Verify form fields | Fields: Name, Email, Message (textarea) are present | [ ] |
| 3 | Click Submit with all fields empty | Inline validation: all fields required | [ ] |
| 4 | Fill Name only, Submit | Validation: "Email is required" | [ ] |
| 5 | Fill Name and an invalid email, Submit | Validation: "Please enter a valid email address" | [ ] |
| 6 | Fill Name, valid email, and Message; Submit | hCaptcha widget appears and must be completed | [ ] |
| 7 | Complete hCaptcha and Submit | [REQUIRES BACKEND] Toast: "Message sent — I'll get back to you soon" | [ ] |
| 8 | Submit the form more than 5 times from the same IP within an hour | [REQUIRES BACKEND] Rate limit error shown: too many submissions, try later | [ ] |

### US-E01-VISITOR-11: Reset forgotten password
| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 1 | Open the login form — locate "Forgot password?" link | Link is visible below the password field on the login form | [ ] |
| 2 | Click "Forgot password?" | A form is shown: single field for email address | [ ] |
| 3 | Submit with an empty email field | Validation: "Email is required" | [ ] |
| 4 | Submit with a valid email (registered or not) | [REQUIRES BACKEND] Message shown: "If an account with that email exists, a reset link has been sent" (same message regardless of whether email exists — no email enumeration) | [ ] |
| 5 | Check the email inbox for a registered account | [REQUIRES BACKEND] Password reset email received via AWS SES with a unique reset token | [ ] |
| 6 | Click the reset link from the email | Opens a "Set New Password" page with two fields: New Password + Confirm Password | [ ] |
| 7 | Enter a short password (3 chars), Submit | Validation: "Password must be at least 8 characters" | [ ] |
| 8 | Enter mismatched passwords, Submit | Validation: "Passwords do not match" | [ ] |
| 9 | Enter valid matching passwords; Submit | [REQUIRES BACKEND] Success: "Password updated — you can now log in" with a link to the login page | [ ] |
| 10 | Wait until the reset token is 1+ hours old, then click it | [REQUIRES BACKEND] Error: "Reset link expired or invalid — request a new one" | [ ] |
| 11 | Visit /reset-password?token=invalidtoken | [REQUIRES BACKEND] Error: "Reset link expired or invalid — request a new one" | [ ] |

### US-E01-VISITOR-12: Navigate between posts
| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 1 | Open any blog post that is between first and last in its category | "← Previous Post" and "Next Post →" links are visible at the bottom of the post body, above the comments section | [ ] |
| 2 | Click the "← Previous Post" link | Navigates to the previous post (in the same category) | [ ] |
| 3 | Click the "Next Post →" link | Navigates to the next post (in the same category) | [ ] |
| 4 | Verify links display the post title | Links show the title (e.g. "← How I Built a Cloud...", not just "Previous") | [ ] |
| 5 | Open the first post in a category | "← Previous Post" link is absent (not just disabled — not rendered) | [ ] |
| 6 | Open the last post in a category | "Next Post →" link is absent | [ ] |
| 7 | Verify same-category navigation | Clicking previous/next never switches to a post from a different category | [ ] |
| 8 | Verify on mobile (320-767px) | Prev/Next links stack vertically or wrap appropriately; no horizontal scroll | [ ] |

## Error States
| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 1 | Visit a non-existent URL (e.g. /en/nonexistent) | 404 page rendered with site header/footer; not a blank page or raw error | [ ] |
| 2 | Visit /en/blog/?category=nonexistent | Empty state shown: "No posts yet in this category" (or similar); no JavaScript crash | [ ] |
| 3 | Submit login/register form with JavaScript disabled (if applicable) | Form submission falls back gracefully — inline validation via HTML5 attributes | [ ] |

## UI Design Checklist
| Check | Criteria | [ ] |
|-------|----------|-----|
| Layout | Matches PAGE_homepage.md — hero with name/tagline/2 CTAs, category cards 2x2 grid, Recent Posts with 3-6 cards | [ ] |
| Layout | Matches PAGE_blog-post.md — 680px centered prose, category badge + date + reading time row, back link, prev/next navigation | [ ] |
| No emojis | All indicators (category badges, status badges, etc.) use text labels or SVG icons, not emoji characters | [ ] |
| Images | All images visible, properly sized, no broken src, alt text present on `<img>` elements | [ ] |
| Buttons | All buttons clickable with hover states (cursor: pointer, color/lift transitions on hover) | [ ] |
| Dark mode | Matches DESIGN_SYSTEM.md dark colors: bg #111827, text #F9FAFB, surface #1F2937, border #374151 | [ ] |
| Light mode | Matches DESIGN_SYSTEM.md light colors: bg #FFFFFF, text #111827, surface #F9FAFB, border #E5E7EB | [ ] |
| Mobile | Responsive at 320px-767px breakpoints, no horizontal scroll, touch targets ≥ 44px | [ ] |
| Typography | Inter and JetBrains Mono fonts load correctly (verify in DevTools → Network/Computed tab) | [ ] |
| Toast | Success/error/info toasts appear fixed bottom-right, auto-dismiss after ~4 seconds | [ ] |
| Focus | All interactive elements show focus-visible ring (2px primary, offset 2px) | [ ] |
| Header | Fixed top, 64px height, backdrop blur, logo left / controls right | [ ] |
| Footer | bg-surface, border-top, copyright, nav links, social links | [ ] |

## Sign-Off
| Tester | Date | Result | Issues |
|--------|------|--------|--------|
| | | Pass / Fail | |
