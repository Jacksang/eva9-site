# Product Requirements Document: blog.eva9.ai

**Version:** v2.0 — Ready for Phase 1  
**Date:** 2026-06-06  
**Author:** Eva2  
**Product Owner:** Jacky Chen (Sheng)

---

## Product Vision

A bilingual personal website that serves as the digital home for Jacky Chen's solo AI company — combining portfolio, blog, audience-building, and consulting lead-generation in one place.

### Core Principles
- **Content-first**: The writing is the product. Everything else serves the content.
- **Bilingual by default**: Every feature works in both English and Chinese.
- **Self-controlled**: All data lives in Jacky's own AWS account. No third-party data dependencies.
- **$0 operating cost**: All services stay within permanent free tiers.
- **Simple to maintain**: Write Markdown locally. Git push to publish. Zero runtime maintenance.

---

## User Roles

| Role | Description |
|------|-------------|
| **Anonymous Visitor** | Anyone browsing the site. Can read all public content. |
| **Registered User** | Has an account (email + password). Can comment on posts, save dark mode preference. |
| **Admin (Jacky)** | Full control. Manages content, moderates comments, views analytics. |

---

## Product Scope

### In Scope ✅
- Multi-category bilingual blog (Work / Learn / Hobby / Life)
- Blog post with text, images, embedded video, code blocks
- User registration (email + password), login, email verification
- Comment system with admin moderation queue + AI auto-moderation
- Contact form with email notification
- Admin dashboard (comments, users, visitors, analytics)
- Dark mode (user preference for registered, system-follow for anonymous)
- SEO/GEO optimization (SSG, sitemap, structured data, hreflang, llms.txt)
- Visitor analytics with IP tracking
- RSS feed

### Out of Scope ❌ (Future Phases)
- Newsletter / email marketing
- E-commerce or payment
- Social login (Google/GitHub OAuth)
- Real-time chat
- Multi-admin roles
- Public user profiles
- API for third-party integrations

---

## User Stories by Feature

### F1: Blog System

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| F1.1 | Visitor | browse blog posts by category | I can find content relevant to my interests | P0 |
| F1.2 | Visitor | read a blog post with clean typography | I can comfortably consume long-form content | P0 |
| F1.3 | Visitor | see reading time on each post | I know how long it will take to read | P1 |
| F1.4 | Visitor | see related posts at the bottom | I can discover more relevant content | P2 |
| F1.5 | Visitor | subscribe via RSS | I can follow the blog in my feed reader | P1 |
| F1.6 | Visitor | search across all blog posts | I can find specific content quickly | P2 |
| F1.7 | Admin | publish a post by writing a Markdown file | I can create content with my familiar tools | P0 |
| F1.8 | Admin | categorize each post (Work/Learn/Hobby/Life) | my content is organized logically | P0 |
| F1.9 | Admin | include images, videos, and code blocks in posts | my content is rich and engaging | P1 |

### F2: Bilingual Support

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| F2.1 | Visitor | switch between English and Chinese | I can read in my preferred language | P0 |
| F2.2 | Visitor | see the website UI in my browser's default language | it feels native to me | P0 |
| F2.3 | Visitor | see a link to the original version of a translated post | I can read the source if I prefer | P1 |
| F2.4 | Admin | write a post in one language and provide a translation | both audiences get the content | P0 |
| F2.5 | Search Engine | receive correct hreflang tags | bilingual content is indexed properly | P1 |

### F3: User Registration & Comments

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| F3.1 | Visitor | register with my email and password | I can participate in discussions | P0 |
| F3.2 | Visitor | verify my email after registration | my account is confirmed as real | P1 |
| F3.3 | Visitor | log in to my account | I can comment and manage preferences | P0 |
| F3.4 | Registered User | comment on a blog post | I can share my thoughts | P0 |
| F3.5 | Registered User | see my comment appear after approval | I know it was received | P0 |
| F3.6 | Registered User | delete my own comment | I can remove something I regret | P2 |
| F3.7 | Admin | see all comments in a moderation queue | I can review before publishing | P0 |
| F3.8 | Admin | approve or reject a comment | inappropriate content is filtered | P0 |
| F3.9 | Admin | rely on AI to auto-approve comments by default | I don't have to manually review everything | P1 |

**Moderation Rules (Phase 1 default):**
- Comments from verified-email users → **auto-approve** (AI checks for spam/abuse keywords)
- Comments from unverified users → **hold for review**
- Comments containing flagged patterns (links, profanity, Chinese spam keywords) → **hold for review**
- Admin can override any decision from the moderation queue

### F4: Contact Form

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| F4.1 | Visitor | send a message via a contact form | I can reach the site owner | P1 |
| F4.2 | Visitor | know my message was sent successfully | I'm not left wondering | P1 |
| F4.3 | Admin | receive an email when someone submits the contact form | I can respond promptly | P1 |

### F5: Dark Mode

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| F5.1 | Anonymous Visitor | the site follows my system dark/light preference | it's comfortable to read | P1 |
| F5.2 | Registered User | override the theme in my personal settings | I can set my preference independently | P2 |
| F5.3 | All Users | toggle between dark and light mode manually | I can switch on the fly | P1 |

### F6: Admin Dashboard

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| F6.1 | Admin | log in with secure credentials | only I can access admin functions | P0 |
| F6.2 | Admin | view and moderate comments (approve/reject) | I control what appears on my site | P0 |
| F6.3 | Admin | view registered users | I know who's participating | P1 |
| F6.4 | Admin | view contact messages | I can read and respond to inquiries | P1 |
| F6.5 | Admin | see visitor statistics (page views, unique IPs, top pages) | I understand my audience | P1 |
| F6.6 | Admin | see recent visitor logs (IP, time, page) | I can identify patterns or abuse | P1 |

### F7: GEO / SEO

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| F7.1 | Search Engine | crawl a complete XML sitemap | all pages are discoverable | P0 |
| F7.2 | Search Engine | see OpenGraph and Twitter Card meta tags | shared links look good | P0 |
| F7.3 | Search Engine | see JSON-LD structured data | content is understood by AI search | P0 |
| F7.4 | AI Crawler | access llms.txt and llms-full.txt | my content is indexed by AI models | P1 |
| F7.5 | Search Engine | receive correct canonical URLs | duplicate content is handled | P1 |
| F7.6 | Search Engine | receive correct hreflang tags | bilingual pages are properly indexed | P1 |

### F8: Homepage & Static Pages

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| F8.1 | Visitor | land on a clear homepage with hero section | I immediately know who this is | P0 |
| F8.2 | Visitor | see latest blog posts on the homepage | I can discover recent content | P0 |
| F8.3 | Visitor | click category cards to browse by topic | I can explore what interests me | P0 |
| F8.4 | Visitor | read an About page with bio and experience | I can learn about the author | P0 |
| F8.5 | Visitor | find contact information easily | I can reach out | P1 |

---

## Phase Plan

### Phase 1: MVP — Complete End-to-End Flow

**Goal:** A fully working bilingual blog website. A visitor can browse posts, register, verify email, comment (with moderation). Admin can moderate and view analytics. Everything deployed and live on blog.eva9.ai.

| Feature | User Story | Deliverable |
|---------|-----------|-------------|
| **Blog - Read** | F1.1, F1.2, F1.7, F1.8 | Markdown blog with 4 categories, blog index, post pages |
| **Blog - Content** | F1.9 | Images + code blocks support. 2-3 seed posts (en + zh) |
| **Bilingual** | F2.1, F2.2, F2.4 | `/en/` and `/zh/` routing, language switcher, browser detection |
| **SEO** | F7.1, F7.2, F7.3 | Sitemap, OG/Twitter meta, JSON-LD structured data |
| **Homepage** | F8.1, F8.2, F8.3 | Modern card-style homepage: hero + latest posts grid + category cards |
| **About** | F8.4 | About page with bio and experience |
| **Dark Mode** | F5.1 | System-follow dark/light mode (all visitors) |
| **Registration** | F3.1, F3.3 | Email + password register, login, JWT token |
| **Email Verify** | F3.2 | Send verification email via AWS SES |
| **Comments - Submit** | F3.4, F3.5 | Submit comment → queued → "pending review" shown to user |
| **Comments - Moderate** | F3.7, F3.8 | Admin dashboard: comment moderation queue (approve/reject) |
| **Comments - AI** | F3.9 | AI auto-approve for verified users without flagged content |
| **Contact** | F4.1, F4.2, F4.3 | Contact form → email to admin via SES |
| **Admin Login** | F6.1 | Admin JWT login (single account, env var configured) |
| **Admin Dashboard** | F6.2, F6.3, F6.4 | Moderate comments, view users, view messages |
| **Analytics** | F6.5, F6.6 | Visitor log (IP, page, time) + stats dashboard |
| **Deployment** | — | S3 + CloudFront (static) + Lambda + DynamoDB (API) on blog.eva9.ai |
| **Content Seed** | — | 2-3 posts in en + zh across 2+ categories |

**Phase 1 Exit Criteria:**
- [ ] blog.eva9.ai is live and accessible
- [ ] Anonymous visitor can browse blog in English and Chinese
- [ ] Anonymous visitor can register, verify email, log in
- [ ] Registered user can submit a comment → admin can approve/reject it
- [ ] AI auto-approves comments from verified users (no spam)
- [ ] Visitor can submit a contact form → admin gets email
- [ ] Admin can log in, view dashboard, see visitor stats
- [ ] Dark mode works (system preference)
- [ ] SEO: sitemap, OG meta, JSON-LD present
- [ ] All infrastructure runs within AWS free tier ($0/month)
- [ ] Source code on GitHub, CI/CD via GitHub Actions

### Phase 2: Enhancements

| Feature | User Story | Deliverable |
|---------|-----------|-------------|
| RSS Feed | F1.5 | Auto-generated RSS XML |
| Reading Time | F1.3 | Estimated reading time on post cards and post pages |
| hreflang | F2.5, F7.6 | hreflang tags for bilingual SEO |
| llms.txt | F7.4 | llms.txt and llms-full.txt for AI crawlers |
| Dark Mode - User Pref | F5.2 | Registered users can save theme preference |
| Manual Toggle | F5.3 | Light/Dark toggle button in header |
| Contact Page | F8.5 | Dedicated contact page with form |
| Services Page | — | Consulting services overview page |
| Related Posts | F1.4 | Related articles at bottom of each post |
| Post Search | F1.6 | Pagefind static search |

### Phase 3: Polish & Growth

| Feature | User Story | Deliverable |
|---------|-----------|-------------|
| Delete Comment | F3.6 | Users can delete their own comments |
| Canonical URLs | F7.5 | Proper canonical URL handling |
| Video Embeds | F1.9 (extended) | YouTube/Bilibili responsive embeds |
| Performance | — | Lighthouse 95+ audit + optimization |
| Accessibility | — | WCAG AA compliance pass |
| Content Growth | — | 10+ posts across all 4 categories |

---

## Technical Architecture (Reference)

```
blog.eva9.ai
├── Static Content (Astro SSG → S3 + CloudFront)
│   ├── /en/  — English pages
│   └── /zh/  — Chinese pages
│
└── Dynamic API (Lambda + DynamoDB)
    ├── /api/register     — User registration
    ├── /api/login        — User login
    ├── /api/verify-email — Email verification
    ├── /api/comments     — Submit & list comments
    ├── /api/contact      — Contact form
    ├── /api/log-visit    — Record page visit
    ├── /api/admin/login  — Admin login
    ├── /api/admin/comments — Moderate comments
    ├── /api/admin/users  — User management
    ├── /api/admin/messages — View contact messages
    └── /api/admin/visitors — Visitor analytics

DynamoDB Tables:
  eva9_comments  | eva9_messages | eva9_users | eva9_visitors
```

**Stack:** Astro 5 + Tailwind CSS 4 + Markdown | Lambda (Node.js) + DynamoDB | S3 + CloudFront  
**Cost:** $0/month (all AWS free tier)

---

## Design Direction

### Homepage — Modern Card Style

```
┌──────────────────────────────────────────────┐
│  [🌙]                        [EN|ZH] [Login] │  ← Header
│                                              │
│  ┌─────────────────────────────────────────┐ │
│  │  Hi, I'm Jacky Chen                     │ │  ← Hero
│  │  20 years building cloud e-commerce.    │ │
│  │  I write about tech, learning & life.   │ │
│  │  [About Me]  [My Services]              │ │
│  └─────────────────────────────────────────┘ │
│                                              │
│  ┌─── Work ───┐ ┌── Learn ──┐              │ │  ← Category
│  │ Consulting  │ │ Courses &  │  ...         │ │     Cards
│  │ & Tech      │ │ Study      │              │ │
│  └─────────────┘ └───────────┘              │ │
│                                              │
│  Recent Posts                                │ │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │ │  ← Post Cards
│  │ Post 1   │ │ Post 2   │ │ Post 3   │    │ │     (modern
│  │ Category │ │ Category │ │ Category │    │ │      card grid)
│  │ Excerpt  │ │ Excerpt  │ │ Excerpt  │    │ │
│  │ Date · 5m│ │ Date · 8m│ │ Date · 3m│    │ │
│  └──────────┘ └──────────┘ └──────────┘    │ │
│                                              │
│  ── Footer ────────────────────────────────  │
└──────────────────────────────────────────────┘
```

- **Colors:** Teal (#0D9488) primary + Amber (#F59E0B) accent — matches eva9.ai brand
- **Typography:** Inter (body) + JetBrains Mono (code)
- **Cards:** Subtle border + shadow, hover lift effect, responsive grid
- **Spacing:** Generous whitespace, comfortable reading width (max 680px for post body)

---

## Open Decisions (Deferred)

| # | Question | Deferred To |
|---|----------|-------------|
| 1 | Nested routes for categories? (`/en/blog/work/post-slug` vs `/en/work/post-slug`) | Phase 1 implementation |
| 2 | Profile page for registered users? | Phase 2 |
| 3 | Comment threading (nested replies)? | Phase 2 |
| 4 | Newsletter integration? | Phase 3 |
| 5 | CDN for images (CloudFront vs local)? | Phase 1 — local first, CDN later |

---

**Phase 1 ready for review. 确认后我立刻开始开发。**
