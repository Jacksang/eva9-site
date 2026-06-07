# PAGE: Homepage

**Page ID:** PAGE_HOME  
**Route:** `/en/` and `/zh/` (root)  
**Role:** Anonymous Visitor, Registered User  
**User Stories:** US-E01-VISITOR-01, US-E01-VISITOR-07, US-E01-VISITOR-09  
**Layout:** Desktop + Mobile responsive  

---

## Desktop Layout (1200px+)

```
┌──────────────────────────────────────────────────────────────────┐
│ [Jacky Chen]              [🌙] [EN|ZH]       [Register] [Login] │ header
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐│
│  │                                                              ││
│  │  👋 Hi, I'm Jacky Chen                                      ││ hero
│  │                                                              ││
│  │  20+ years building cloud-native e-commerce platforms.       ││
│  │  I write about technology, learning, and life.               ││
│  │                                                              ││
│  │  ┌──────────┐  ┌────────────┐                               ││
│  │  │ About Me │  │  Contact │   ← teal outline buttons      ││
│  │  └──────────┘  └────────────┘                               ││
│  └──────────────────────────────────────────────────────────────┘│
│                                                                    │
│  ┌─ Explore by Category ────────────────────────────────────────┐ │
│  │                                                                │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │ │
│  │  │  💼      │  │  📚      │  │  🎨      │  │  🌍      │    │ │ category
│  │  │  Work    │  │  Learn   │  │  Hobby   │  │  Life    │    │ │ cards
│  │  │Consulting│  │Courses & │  │Projects  │  │Travel &  │    │ │ (2x2 grid)
│  │  │& Tech    │  │Study     │  │& Notes   │  │More      │    │ │
│  │  │    →     │  │    →     │  │    →     │  │    →     │    │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌─ Recent Posts ───────────────────────────────────────────────┐ │
│  │                                                                │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │ │
│  │  │  [Work]     │  │  [Learn]    │  │  [Hobby]    │          │ │ post
│  │  │             │  │             │  │             │          │ │ cards
│  │  │ How I Built │  │ No-Code ML  │  │ My Home Lab │          │ │ (3 cols)
│  │  │ a Cloud E-  │  │ Getting     │  │ Setup 2026  │          │ │
│  │  │ commerce    │  │ Started     │  │             │          │ │
│  │  │ Platform    │  │             │  │ Raspberry   │          │ │
│  │  │             │  │             │  │ Pi cluster  │          │ │
│  │  │ Jun 1 · 8m  │  │ May 28 · 5m │  │ May 20 · 3m │          │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘          │ │
│  │                                                                │ │
│  │                              ┌──────────────────┐             │ │
│  │                              │ View All Posts → │             │ │ link
│  │                              └──────────────────┘             │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                    │
├──────────────────────────────────────────────────────────────────┤
│        © 2026 Jacky Chen  ·  Blog  ·  About  ·  Contact              │ footer
└──────────────────────────────────────────────────────────────────┘
```

---

## Mobile Layout (< 768px)

```
┌──────────────────────┐
│ [JC]       [🌙][☰]  │ header (hamburger)
├──────────────────────┤
│                      │
│ ┌──────────────────┐ │
│ │ 👋 Hi,           │ │
│ │ I'm Jacky Chen   │ │ hero (full width, smaller text)
│ │                  │ │
│ │ 20+ years...     │ │
│ │                  │ │
│ │ [About Me]       │ │ buttons stacked
│ │ [My Services]    │ │
│ └──────────────────┘ │
│                      │
│ Explore by Category  │
│ ┌────────┐┌────────┐ │
│ │  Work  ││ Learn  │ │ category cards 2x2
│ └────────┘└────────┘ │
│ ┌────────┐┌────────┐ │
│ │ Hobby  ││  Life  │ │
│ └────────┘└────────┘ │
│                      │
│ Recent Posts         │
│ ┌──────────────────┐ │
│ │ [Work]           │ │ post cards
│ │ How I Built...   │ │ stacked 1 col
│ │ Jun 1 · 8m       │ │
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │ [Learn]          │ │
│ │ No-Code ML...    │ │
│ │ May 28 · 5m      │ │
│ └──────────────────┘ │
│                      │
│ [View All Posts →]   │
│                      │
├──────────────────────┤
│    © 2026 Jacky Chen │ footer (simplified)
└──────────────────────┘
```

---

## Component Details

| Element | Spec |
|---------|------|
| Hero section | `--space-3xl` top padding, `--space-2xl` bottom. Text: `--text-4xl` name, `--text-lg` tagline |
| Hero CTA buttons | `btn-primary` (About Me), `btn-secondary` (My Services). `12px` gap |
| Category cards | `border border-border rounded-xl p-6`. Hover: shadow + lift. 4-col grid (2-col tablet, 2-col mobile) |
| Post cards | `border border-border rounded-xl`. Top: optional cover image. Bottom: `p-5` with title, excerpt, metadata |
| Post metadata | Category badge (small, teal) + date (gray-400, `--text-sm`) + reading time |
| Section titles | `--text-xl`, `font-semibold`, `--space-lg` bottom margin |

---

## States

| State | Rendering |
|-------|-----------|
| **Normal** | As wireframe above — posts loaded from Astro content collection |
| **Loading** | Skeleton cards (gray pulse animation) in place of post cards |
| **Empty (no posts)** | Hero + category cards still visible. "No posts yet — check back soon" in Recent Posts area |
| **Error** | Not applicable — this is a static page, content errors fail at build time |
