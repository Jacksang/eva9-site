# PAGE: Blog Post

**Page ID:** PAGE_POST  
**Route:** `/en/blog/{category}/{slug}/` and `/zh/blog/{category}/{slug}/`  
**Role:** Anonymous Visitor, Registered User  
**User Stories:** US-E01-VISITOR-02, US-E01-USER-01, US-E01-USER-02, US-E01-USER-03  
**Layout:** Desktop + Mobile responsive  

---

## Desktop Layout (full width → centered content)

```
┌──────────────────────────────────────────────────────────────────┐
│ [Jacky Chen]              [🌙] [EN|ZH]       [Register] [Login] │ header
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────────────────────────────┐                        │
│  │  ← Back to Blog                      │                        │ back link
│  └──────────────────────────────────────┘                        │
│                                                                    │
│  ┌─────────────────── 680px centered ──────────────────────────┐ │
│  │                                                              │ │
│  │  ┌────────────────┐  [  Work  ]                             │ │ category
│  │  │  Jun 1, 2026   │  category badge                         │ │ badge +
│  │  │  8 min read    │                                          │ │ metadata
│  │  └────────────────┘                                          │ │
│  │                                                              │ │
│  │  # How I Built a Cloud-Native E-Commerce Platform           │ │ title (h1)
│  │                                                              │ │
│  │  By Jacky Chen                                               │ │ author
│  │                                                              │ │
│  │  ---                                                        │ │
│  │                                                              │ │
│  │  Building a cloud-native e-commerce platform is ...         │ │ body
│  │                                                              │ │ content
│  │  ## Architecture Overview                                   │ │ (Markdown
│  │                                                              │ │  rendered)
│  │  The architecture follows a microservices pattern ...       │ │
│  │                                                              │ │
│  │  ```javascript                                               │ │ code
│  │  const deploy = (config) => {                               │ │ block
│  │    return cloudformation.deploy(config);                    │ │
│  │  }                                                          │ │
│  │  ```                                                        │ │
│  │                                                              │ │
│  │  ![Architecture diagram](/assets/diagram.png)               │ │ image
│  │  *Figure 1: System architecture*                            │ │
│  │                                                              │ │
│  │  ## Results                                                 │ │
│  │                                                              │ │
│  │  The platform now handles 10K+ orders per minute...        │ │
│  │                                                              │ │
│  │  ---                                                        │ │
│  │                                                              │ │
│  │  ← Previous Post          Next Post →                       │ │ prev/next
│  │                                                              │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌─────────────────── 680px centered ──────────────────────────┐ │
│  │                                                              │ │
│  │  ## Comments (3)                                            │ │ comments
│  │                                                              │ │
│  │  ┌──────────────────────────────────────────────────────┐   │ │
│  │  │ [A] Jane Doe  ·  2 hours ago                         │   │ │ comment 1
│  │  │ Great analysis! I especially liked the section on    │   │ │
│  │  │ auto-scaling strategies.                             │   │ │
│  │  └──────────────────────────────────────────────────────┘   │ │
│  │                                                              │ │
│  │  ┌──────────────────────────────────────────────────────┐   │ │
│  │  │ [A] Mike Chen  ·  1 hour ago                         │   │ │ comment 2
│  │  │ Have you considered using Kubernetes instead?        │   │ │
│  │  └──────────────────────────────────────────────────────┘   │ │
│  │                                                              │ │
│  │  ── Leave a Comment ────────────────────────────────────   │ │
│  │  ┌──────────────────────────────────────────────────────┐   │ │
│  │  │                                                      │   │ │ comment
│  │  │  Write your comment...                               │   │ │ form
│  │  │                                                      │   │ │
│  │  │  (if logged out: "Log in to comment")                │   │ │
│  │  │                                       [Submit]      │   │ │
│  │  └──────────────────────────────────────────────────────┘   │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
├──────────────────────────────────────────────────────────────────┤
│        © 2026 Jacky Chen  ·  Blog  ·  About  ·  RSS              │ footer
└──────────────────────────────────────────────────────────────────┘
```

---

## Mobile Layout

- Single column, body max-width fills screen with `px-4`
- Title: `--text-2xl` instead of `--text-3xl`
- Code blocks: horizontal scroll
- Comments: same layout, comment form textarea full width
- Back link: fixed bottom or in header

---

## Component Details

| Element | Spec |
|---------|------|
| Back link | `text-primary text-sm` above title, linked to `/en/blog/` |
| Category badge | Small pill, teal bg, text-xs, next to date |
| Post title | `text-3xl font-bold tracking-tight` (desktop), `text-2xl` (mobile) |
| Post body | Prose class: `max-w-[680px] mx-auto prose prose-lg dark:prose-invert` |
| Code blocks | `bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto` |
| Images | `max-w-full rounded-lg my-6`, with `figcaption` below (`text-sm text-center text-muted`) |
| Comments section | `max-w-[680px] mx-auto mt-12 pt-8 border-t border-border` |
| Comment card | `bg-surface rounded-lg p-4 mb-3` with avatar circle (32px), name, timestamp, body |
| Comment form | Textarea `min-h-[100px]` + Submit button. Disabled state when not logged in |

---

## States

| State | Rendering |
|-------|-----------|
| **Normal** | Full post rendered from Markdown |
| **Loading** | Post skeleton: title bar, body lines, image placeholder |
| **Not found** | 404 page: "Page not found" + links to home/blog |
| **Empty body** | Post renders meta + "This post has no content yet" in body area |
| **Comments loading** | Skeleton comment cards while API fetches |
| **Comments error** | "Comments unavailable — please try again later" + Retry button |
| **Comment submitted** | Comment appears in list with "⏳ Pending review" badge (for author only) |
| **Not logged in** | Comment form shows "Log in to comment" link |
