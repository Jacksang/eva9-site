# UI Design Index — E01

**Epic:** E01 — MVP  
**Mapping:** User Stories → Pages → Test Coverage

---

## Page Inventory

| Page ID | Route | Role | Key Stories | Design File |
|---------|-------|------|-------------|-------------|
| PAGE_HOME | `/en/`, `/zh/` | Visitor | US-V01-01, US-V01-07, US-V01-09 | `PAGE_homepage.md` |
| PAGE_BLOG_INDEX | `/en/blog/`, `/zh/blog/` | Visitor | US-V01-01 | (covered in homepage + header) |
| PAGE_POST | `/en/blog/{cat}/{slug}/` | Visitor, User | US-V01-02, US-V01-10, US-U01-01, US-U02-02, US-U02-03 | `PAGE_blog-post.md` |
| PAGE_ABOUT | `/en/about/`, `/zh/about/` | Visitor | US-V01-08 | (simple content page — see design system) |
| PAGE_REGISTER | Modal or `/en/register/` | Visitor | US-V01-04 | (form in design system) |
| PAGE_LOGIN | Modal or `/en/login/` | Visitor | US-V01-05 | (form in design system) |
| PAGE_VERIFY_EMAIL | `/verify-email?token=` | Visitor | US-V01-06 | (simple result page) |
| PAGE_ADMIN_LOGIN | `/en/admin/login/` | Admin | US-ADM-01 | `PAGE_admin-dashboard.md` |
| PAGE_ADMIN | `/en/admin/` | Admin | US-ADM-02–08 | `PAGE_admin-dashboard.md` |

---

## Shared Components

| Component | Used On | Spec |
|-----------|---------|------|
| Header | All pages | Fixed top, logo, lang switch, dark toggle, login/logout |
| Footer | All pages | Copyright, links, social |
| Post Card | Homepage, Blog index | Image + title + excerpt + metadata |
| Category Card | Homepage | Icon + title + desc + link |
| Comment Card | Post page | Avatar + name + time + body + status badge |
| Comment Form | Post page | Textarea + submit (auth gated) |
| Status Badge | Post page, Admin | Color-coded pill badges |
| Toast | All pages | Bottom-right, auto-dismiss |
| Modal | Register, Login | Centered overlay dialog |
| Skeleton | All loading states | Gray pulse animation bars |

---

## Template Coverage by Story

| Story ID | Story Name | Page | Component |
|----------|-----------|------|-----------|
| US-VISITOR-01 | Browse by category | Homepage / Blog index | Post Cards, Category Cards |
| US-VISITOR-02 | Read blog post | Post page | Post body, TOC, prev/next |
| US-VISITOR-03 | Switch language | All pages | Header lang switcher |
| US-VISITOR-04 | Register | Register form | Modal, form fields, CAPTCHA |
| US-VISITOR-05 | Login | Login form | Modal, form fields |
| US-VISITOR-06 | Verify email | Verify page | Status page, resend button |
| US-VISITOR-07 | View homepage | Homepage | Hero, category cards, post cards |
| US-VISITOR-08 | Read About | About page | Content page |
| US-VISITOR-09 | Dark mode | All pages | Theme follow + toggle |
| US-VISITOR-10 | Contact form | Post page / footer | Contact form, CAPTCHA |
| US-USER-01 | Submit comment | Post page | Comment form |
| US-USER-02 | See comment status | Post page | Comment card + status badge |
| US-USER-03 | View comments | Post page | Comment list |
| US-USER-04 | Log out | Header | Logout link |
| US-ADMIN-01 | Admin login | Admin login page | Login form |
| US-ADMIN-02 | View queue | Admin dashboard | Comment queue table |
| US-ADMIN-03 | Approve/reject | Admin dashboard | Action buttons |
| US-ADMIN-04 | View users | Admin dashboard | User table |
| US-ADMIN-05 | View messages | Admin dashboard | Messages table |
| US-ADMIN-06 | Analytics | Admin dashboard | Stats cards + tables |
| US-ADMIN-07 | Publish (Git) | README docs | (no UI) |
| US-ADMIN-08 | AI decisions | Admin dashboard | AI badge + reason |
| US-SEO-01 | Sitemap | (build artifact) | (no UI) |
| US-SEO-02 | OG meta | All pages | `<head>` meta |
| US-SEO-03 | JSON-LD | All pages | `<head>` script |
| US-SYSTEM-01 | Email verify | Lambda | (no UI) |
| US-SYSTEM-02 | AI moderate | Lambda | (no UI) |
| US-SYSTEM-03 | Contact email | Lambda | (no UI) |
| US-SYSTEM-04 | Visitor log | Lambda + Client JS | (no UI) |
| US-SYSTEM-05 | SEO artifacts | Build process | (no UI) |
| US-SYSTEM-06 | Deploy | GitHub Actions | (no UI) |

---

**Coverage:** 31/31 stories mapped to pages or system processes.
