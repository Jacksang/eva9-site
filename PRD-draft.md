# Product Requirements Document: eva9.ai Personal Website

**Version:** DRAFT v0.1  
**Date:** 2026-06-06  
**Author:** Eva2 (based on Market Research Report)  
**Client:** Jacky Chen (Sheng) — Solo AI Entrepreneur

---

## Executive Summary

A bilingual (Chinese/English) personal website serving as the digital home for Jacky Chen's one-person AI company. The site combines a professional portfolio, multi-category blog, audience-building platform, and consulting lead-generation engine. Built on Astro, deployed to Cloudflare Pages, content managed via Markdown in Git.

### Core Value Proposition
> "I'm a 20-year veteran of cloud-native e-commerce. I help businesses build and scale their digital commerce platforms — and I document everything I learn along the way."

### Success Metrics
- [ ] PageSpeed score ≥ 90 (mobile)
- [ ] GEO: Appear in AI search results for "cloud-native e-commerce consultant" queries
- [ ] Email subscribers: 100 within 3 months
- [ ] Monthly unique visitors: 1,000 within 6 months
- [ ] Consulting inquiries: 2-4 per month within 6 months

---

## 1. Site Architecture

### URL Structure

```
eva9.ai/
├── /en/                          # English version
│   ├── /en/                      # Homepage
│   ├── /en/about/                # About Me
│   ├── /en/blog/                 # Blog index
│   │   ├── /en/blog/work/        # Category: Work (consulting, tech)
│   │   ├── /en/blog/learn/       # Category: Learning (courses, study)
│   │   ├── /en/blog/hobby/       # Category: Hobbies (projects, notes)
│   │   └── /en/blog/life/        # Category: Life (games, sports, travel)
│   ├── /en/services/             # Consulting services
│   ├── /en/contact/              # Contact form
│   └── /en/search/               # Search
├── /zh/                          # Chinese version (mirror structure)
│   ├── /zh/
│   ├── /zh/about/
│   ├── /zh/blog/
│   │   ├── /zh/blog/work/        # 工作
│   │   ├── /zh/blog/learn/       # 学习
│   │   ├── /zh/blog/hobby/       # 兴趣爱好
│   │   └── /zh/blog/life/        # 生活
│   ├── /zh/services/
│   ├── /zh/contact/
│   └── /zh/search/
├── /api/                         # API endpoints (comments, contact, analytics)
├── /rss.xml                      # RSS feed
├── /sitemap.xml                  # Sitemap
├── /llms.txt                     # AI crawl optimization
└── /robots.txt
```

---

## 2. Functional Requirements

### FR-1: Multi-Category Blog System

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1.1 | Admin can create/edit/delete blog posts via Markdown files | P0 |
| FR-1.2 | Each post belongs to one of 4 categories: Work, Learn, Hobby, Life | P0 |
| FR-1.3 | Posts support rich media: images, embedded video (YouTube/Bilibili), code blocks | P0 |
| FR-1.4 | Post list page shows: title, date, category badge, reading time, excerpt | P0 |
| FR-1.5 | Posts display: author, publish date, reading time, category, tags | P0 |
| FR-1.6 | Related posts shown at bottom (by category + tags) | P1 |
| FR-1.7 | Table of Contents auto-generated for posts > 500 words | P1 |
| FR-1.8 | RSS feed auto-generated for blog | P1 |
| FR-1.9 | Previous/Next post navigation | P2 |

### FR-2: Bilingual Support

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-2.1 | Dual language routes: `/en/` (English) and `/zh/` (Chinese) | P0 |
| FR-2.2 | Language switcher in header (auto-detect browser language) | P0 |
| FR-2.3 | Admin writes in primary language; system auto-translates to secondary | P0 |
| FR-2.4 | Auto-translation uses DeepL API (superior for English↔Chinese) | P0 |
| FR-2.5 | `hreflang` tags auto-generated for SEO | P1 |
| FR-2.6 | Translated content marked `[AI Translated]` with link to original | P1 |
| FR-2.7 | Admin can override AI translation with manual edits | P2 |

### FR-3: User Registration & Engagement

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-3.1 | Email-based registration (email + password, no social login) | P0 |
| FR-3.2 | Registered users can comment on blog posts | P0 |
| FR-3.3 | Users can send messages via Contact form | P0 |
| FR-3.4 | Comments use Giscus (GitHub Discussions backend) — no database needed | P1 |
| FR-3.5 | Contact form sends email notification to admin | P1 |
| FR-3.6 | Email verification required before commenting | P1 |
| FR-3.7 | Spam protection via reCAPTCHA or hCaptcha | P1 |
| FR-3.8 | Newsletter signup on blog posts and homepage | P2 |

### FR-4: Admin Dashboard

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-4.1 | Admin login (JWT-based, single admin account) | P0 |
| FR-4.2 | Admin can create/edit/delete any post | P0 |
| FR-4.3 | Admin can moderate/delete comments | P1 |
| FR-4.4 | Admin can view/manage registered users | P1 |
| FR-4.5 | Admin can view analytics dashboard (visitors, page views, top posts) | P1 |
| FR-4.6 | Admin can trigger re-translation of any post | P2 |
| FR-4.7 | Admin can upload media (images, videos) to CDN | P2 |

### FR-5: GEO & SEO

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-5.1 | Static site generation (SSG) for all content pages | P0 |
| FR-5.2 | Auto-generated XML sitemap (separate for /en/ and /zh/) | P0 |
| FR-5.3 | OpenGraph and Twitter Card meta tags on all pages | P0 |
| FR-5.4 | JSON-LD structured data (Article, Person, Organization, BreadcrumbList) | P0 |
| FR-5.5 | `hreflang` alternate links on all bilingual pages | P1 |
| FR-5.6 | `llms.txt` and `llms-full.txt` for AI crawler optimization | P1 |
| FR-5.7 | Canonical URLs on all pages | P1 |
| FR-5.8 | Image alt text required on all images | P1 |
| FR-5.9 | Meta description on every page (auto-generated from excerpt) | P1 |
| FR-5.10 | Breadcrumb navigation on blog post pages | P2 |

### FR-6: Analytics & Tracking

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-6.1 | Privacy-first analytics (Plausible or Umami, self-hosted) | P0 |
| FR-6.2 | Visitor IP logging (for security/abuse prevention) | P0 |
| FR-6.3 | Page view tracking per URL | P1 |
| FR-6.4 | Top posts by views (last 7/30/90 days) | P1 |
| FR-6.5 | Referral source tracking | P2 |
| FR-6.6 | Bounce rate and time-on-page metrics | P2 |

### FR-7: Homepage & Static Pages

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-7.1 | Homepage: hero section with name, tagline, CTA button | P0 |
| FR-7.2 | Homepage: latest 3-6 blog posts from all categories | P0 |
| FR-7.3 | Homepage: category cards linking to each blog category | P0 |
| FR-7.4 | About page: bio, photo, experience timeline, skills | P0 |
| FR-7.5 | Services page: consulting offerings, pricing, testimonials, CTA | P1 |
| FR-7.6 | Contact page: form + email + social links | P1 |
| FR-7.7 | 404 page: friendly error with search + recent posts links | P2 |
| FR-7.8 | Dark mode toggle (respects system preference) | P1 |

---

## 3. Non-Functional Requirements

### NFR-1: Performance
- [ ] Lighthouse score ≥ 90 on all metrics
- [ ] First Contentful Paint (FCP) < 1.0s
- [ ] Time to Interactive (TTI) < 2.0s
- [ ] All images optimized (WebP/AVIF, responsive srcset)
- [ ] Zero JavaScript on content pages (Astro islands pattern)

### NFR-2: Security
- [ ] HTTPS enforced (Cloudflare provides)
- [ ] No user passwords stored in plaintext (bcrypt hashing)
- [ ] Rate limiting on API endpoints
- [ ] Input sanitization on contact form
- [ ] No sensitive data exposed client-side

### NFR-3: Accessibility
- [ ] WCAG 2.1 AA compliant
- [ ] Semantic HTML throughout
- [ ] Keyboard navigation support
- [ ] Sufficient color contrast ratios
- [ ] Screen reader friendly

### NFR-4: Maintainability
- [ ] Content managed via Markdown in Git
- [ ] Site rebuilds on push (Cloudflare Pages CI)
- [ ] Zero database for content (static site)
- [ ] Admin functions via lightweight API endpoints
- [ ] Clear project structure documented in README

---

## 4. Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | **Astro 5.x** | SSG, built-in i18n, content collections, MDX, zero-JS default |
| Styling | **Tailwind CSS 4** | Utility-first, design system, dark mode |
| Content | **Markdown + MDX** | Git-versioned, portable, editor-agnostic |
| Comments | **Giscus** | GitHub Discussions, free, spam-resistant |
| Contact Form | **Custom API + Resend** | Email delivery, simple |
| Analytics | **Umami (self-hosted)** | Privacy-first, IP tracking, lightweight |
| Auth | **Better Auth or Lucia** | Lightweight JWT auth for admin |
| Translation | **DeepL API** | Best English↔Chinese quality |
| Search | **Pagefind** | Static search, zero backend |
| Hosting | **Cloudflare Pages** | Free, global CDN, CI integration |
| Database | **Turso (SQLite)** | For comments/auth if Giscus isn't enough |
| Media | **Cloudflare R2** | Free image storage, CDN |
| Email | **Resend** | Transactional emails (verification, contact) |

---

## 5. Design Direction

### Visual Identity
- **Font:** Inter (body) + JetBrains Mono (code)
- **Colors:** 
  - Primary: Deep teal `#0D9488` (matches eva9.ai branding)
  - Accent: Amber `#F59E0B`
  - Background: White `#FFFFFF` / Dark `#111827`
- **Style:** Clean, minimalist, content-forward — think simonwillison.net meets linear.app
- **Logo:** Simple wordmark "EVA9" in Inter Bold or custom SVG

### Page Templates
1. **Homepage** — Hero + latest posts grid + category quick-links + newsletter CTA
2. **Blog Index** — Filter by category, card grid, pagination
3. **Blog Post** — Centered content, TOC sidebar (desktop), related posts, comments
4. **Static Page** — Full-width content, clean layout
5. **Admin** — Simple dashboard, post editor, analytics view

---

## 6. Development Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Astro project setup with i18n routing
- [ ] Tailwind CSS configuration + design tokens
- [ ] Dark mode toggle
- [ ] Homepage layout (hero + latest posts)
- [ ] About page
- [ ] Deploy to Cloudflare Pages

### Phase 2: Blog System (Week 2-3)
- [ ] Content collections (4 categories)
- [ ] Blog index with category filtering
- [ ] Blog post template (TOC, metadata, related posts)
- [ ] RSS feed generation
- [ ] sitemap.xml generation
- [ ] SEO metadata (OG, Twitter, JSON-LD)

### Phase 3: Engagement (Week 3-4)
- [ ] Giscus comments integration
- [ ] Contact form with email notification
- [ ] User registration (email-only)
- [ ] Newsletter signup (ConvertKit or Buttondown)
- [ ] Pagefind search

### Phase 4: Translation (Week 4-5)
- [ ] DeepL API integration for auto-translation
- [ ] Translation workflow (admin triggers, result stored as Markdown)
- [ ] Language switcher component
- [ ] hreflang tags

### Phase 5: Admin & Analytics (Week 5-6)
- [ ] Admin login (JWT)
- [ ] Admin dashboard
- [ ] Post management (create/edit/delete)
- [ ] Umami analytics integration
- [ ] Visitor IP logging
- [ ] llms.txt generation

### Phase 6: Polish (Week 6-7)
- [ ] Performance optimization (Lighthouse 90+)
- [ ] Accessibility audit
- [ ] Mobile responsive testing
- [ ] SEO audit
- [ ] Content seeding (5-10 initial posts)
- [ ] Launch 🚀

---

## 7. Open Questions

1. **Domain:** Is eva9.ai the primary domain, or a subdomain like blog.eva9.ai?
2. **Comments:** Giscus (free, GitHub-based) vs custom built with Turso (more control)?
3. **Hosting:** Cloudflare Pages (free) vs VPS (more control, $5-10/mo)?
4. **Newsletter:** Start now with ConvertKit, or wait until there's content volume?
5. **Admin UI:** Build custom admin panel, or use a headless CMS like Decap CMS (ex-Netlify CMS)?
6. **Video hosting:** YouTube embeds only, or self-host via Cloudflare Stream?
7. **Translation quality:** Auto-translate all posts, or only select "evergreen" content?

---

## 8. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Content creation burden | High | Start with 2 posts/week; use AI to draft, human to edit |
| Translation quality issues | Medium | DeepL is best for EN↔ZH; add manual override option |
| SEO takes months to build | Medium | Focus on GEO (AI search) as faster path; niche keywords |
| Spam on comments/contact | Low | Giscus + hCaptcha + rate limiting |
| Astro ecosystem churn | Low | Astro is stable; Markdown is forever portable |

---

**Status:** DRAFT — Ready for review and feedback from Jacky Chen.
