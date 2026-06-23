# Personal Website Design Plan — blog.eva9.ai

## Current Site Overview
- **Framework:** Astro 5 + Tailwind CSS 4
- **Deployment:** S3 → CloudFront CDN
- **Language:** Bilingual (EN/ZH) via i18n library
- **Design:** Clean blog layout with hero, category cards, post cards
- **Domain:** blog.eva9.ai

---

## What We Want to Add

The site is currently a **blog**. We want to turn it into a **personal portfolio + consulting hub** — a place where if you share the link on LinkedIn, people immediately understand who you are, what you've built, and how to work with you.

### New Pages

| Page | Purpose | Key Content |
|------|---------|-------------|
| **Portfolio** | Showcase your projects with visuals | Smart Learn, Ely, Bug Tracker, past platforms |
| **Studies** | Demonstrate continuous learning | MIT cert, Great Learning, no-code ML projects |
| **Services** | Attract consulting leads | What you offer, past clients, how to engage |

### Enhanced Homepage
The current homepage is blog-first. We want it to be **YOU-first** while keeping the blog as a secondary section.

### Design Questions for You

Before I start coding, let's decide the direction:

**1. Content — What projects do you want to feature?**
I know about:
- ✅ Smart Learn (AI education, active)
- ✅ Ely / Ely2 (resume builder, shipped)
- ✅ Bug Tracker (utility tool)
- ❓ What e-commerce/marketplace platforms from your 20 years would you like to mention? (Names, descriptions, technologies)

**2. Photos / Visuals**
- Do you have a professional photo for the hero section?
- Project screenshots — I can capture from the running local servers (Smart Learn on :3001, etc.)
- Do you want a headshot or just text/icon-based design?

**3. Tone**
- Professional/friendly (like now)
- More formal (consultant-style)
- Casual/approachable

**4. Services — What do you actually want to offer?**
- Cloud architecture consulting?
- CTO-as-a-service?
- Technical due diligence?
- Speaking / teaching?
- All of the above?

**5. Timeline**
- Should I build all pages at once, or start with Portfolio (most impactful for LinkedIn sharing) and iterate?

---

## Proposed Site Map

```
blog.eva9.ai/
├── Home (hero + featured projects + recent blog posts)
├── About (existing)
├── Portfolio ← NEW
│   ├── Smart Learn
│   ├── Ely
│   ├── Bug Tracker
│   └── (your cloud platforms)
├── Studies ← NEW
│   ├── MIT Certification
│   ├── Great Learning
│   └── Projects
├── Services ← NEW (consulting offerings)
├── Blog (existing)
│   ├── Work
│   ├── Learn
│   ├── Hobby
│   └── Life
└── Contact (existing)
```

---

## Design Principles

- **Content-first:** Each page tells a clear story
- **Bilingual:** Everything in both EN and ZH
- **Fast:** Static SSG, no runtime bloat
- **Shareable:** LinkedIn/Facebook OG tags on every page
- **Mobile-first:** Works perfectly on phone screens
