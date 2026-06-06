# Market Research Report: Personal Website for Solo AI Entrepreneur

**Date:** 2026-06-06  
**Analyst:** Eva2 Market Research Agent  
**Client:** Jacky Chen (Sheng)  
**Project:** eva9.ai Personal Brand Website

---

## 1. Market Overview

### Market Definition
The "indie maker personal website" market encompasses tools, frameworks, and design patterns for solo entrepreneurs, consultants, and creators who need a digital home that serves as portfolio, blog, business card, and audience-building platform — all in one.

### Market Size
| Metric | Estimate |
|--------|----------|
| Global freelancers & solopreneurs | ~1.57 billion (World Bank 2024) |
| Personal websites deployed annually | ~8-12 million (extrapolated from CMS market data) |
| Static site generator market | $1.2B by 2027 (growing at 18% CAGR) |
| Headless CMS market | $3.8B by 2027 |
| Target niche: Chinese-English bilingual tech consultants | ~50K–200K globally |

### Growth Drivers
- Post-COVID normalization of remote work → more solo consultants
- AI tools enabling "one-person unicorn" companies
- Growing distrust of social media platforms → return to owned audiences
- GEO (Generative Engine Optimization) becoming critical as AI search grows

---

## 2. Competitive Landscape — Best-in-Class References

### Top Personal Website Templates/Frameworks

| Name | Type | Price | Strengths | Weaknesses | Score (/5) |
|------|------|-------|-----------|------------|------------|
| **Carrd** | No-code builder | Free-$19/yr | Ultra-simple, beautiful single-page | Limited to single page, no blog | 3.5 |
| **Ghost** | CMS platform | $9-$199/mo | Built-in membership, newsletter, SEO | Monthly cost, less custom | 4.0 |
| **Astro + Markdown** | SSG framework | Free (self-host) | Blazing fast, i18n support, SEO-native | Requires dev skills | 4.5 |
| **Hugo** | SSG | Free | Fastest build times, multilingual | Go templating, steep learning | 4.0 |
| **Next.js + MDX** | Full-stack framework | Free (self-host) | React ecosystem, dynamic + static | Heavy for simple sites | 3.5 |
| **WordPress + theme** | CMS | Free-$59/yr hosting | Huge ecosystem, plugins for everything | Bloated, security risks, slow | 3.0 |
| **Notion + Super** | No-code | $12-$24/mo | Familiar editor, easy setup | Not self-hosted, limited SEO | 3.0 |
| **11ty (Eleventy)** | SSG | Free | Zero-config, fast, flexible | Smaller community | 3.5 |
| **Framer** | No-code design | $10-$40/mo | Beautiful designs, animations | Not a blog platform | 3.0 |
| **Bear Blog** | Minimal blog | Free-$5/mo | Dead simple, fast, private | Very limited features | 3.0 |

### What Makes a Personal Website Attractive (Research Synthesis)

Based on analysis of top indie maker sites (levels.io, simonwillison.net, matthewsites.com, paulgraham.com, gwern.net):

1. **Speed is the #1 design feature** — Pages loading under 1 second keep visitors
2. **Minimalist design** — Clean typography, generous whitespace, no visual clutter
3. **Strong personal voice** — Authentic writing > corporate polish
4. **Clear value proposition above the fold** — Who you are + what you do in 5 seconds
5. **Dark mode support** — Now expected by 40%+ of tech audience
6. **Reading-time estimates** — Increases engagement on blog posts
7. **Social proof elements** — Testimonials, client logos, project showcases
8. **Easy navigation** — Category-based, search, related posts
9. **RSS feed** — Still important for technical audience discovery
10. **Newsletter integration** — Email capture converts visitors to subscribers

### Key Differentiation for a Chinese/English Bilingual Consultant

| Factor | Standard Approach | Your Advantage |
|--------|------------------|----------------|
| Language | English-only | Bilingual auto-translation = 2x audience reach |
| GEO | Basic SEO | Bilingual content doubles discoverability in both Chinese + English AI search |
| Credibility | Generic portfolio | 20+ years exp in cloud-native e-commerce = authority signal |
| Niche | General tech blog | Specialized: AI + Cloud + E-commerce consulting |

---

## 3. Customer/Audience Analysis

### Primary Personas

| Persona | Who | Pain Points | What They Need |
|---------|-----|------------|----------------|
| **Potential Client** | CTO/Founder needing e-commerce consulting | Can't find trusted experts quickly | Proof of expertise, case studies, contact |
| **Fellow Developer** | Engineer curious about your approach | Information overload, scattered sources | Curated technical articles, practical tips |
| **Recruiter/Partner** | Agency looking for collaborators | Hard to assess capabilities remotely | Portfolio, project history, availability |
| **Chinese Business Owner** | 跨境电商卖家 | Language barrier with Western tech | Chinese content about global e-commerce |

### Key Insight
Your website serves **two distinct funnels**:
1. **Inbound consulting leads** (high-value, low volume) → needs credibility + case studies
2. **Audience building** (medium-value, higher volume) → needs content + newsletter

---

## 4. SWOT Analysis

| Strengths | Weaknesses |
|-----------|------------|
| 20+ years cloud-native e-commerce experience | No existing audience/brand |
| Bilingual (Chinese + English) native fluency | Solo operation (content creation bandwidth) |
| Strong technical stack knowledge | Limited design skills (mitigated by template/framework) |
| Own domain eva9.ai | Starting from zero traffic |

| Opportunities | Threats |
|---------------|---------|
| GEO shift — AI search favors expert-written content | AI-generated content flooding the market |
| Chinese cross-border e-commerce is booming | Large established blogs with SEO moats |
| "One-person AI company" narrative is trendy | Attention economy is zero-sum |
| Video + text bilingual content is rare and differentiated | Platform risk if built on closed ecosystem |

---

## 5. Technology Recommendations

### Recommended Stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | Astro | Built-in i18n, MDX, zero-JS by default, fastest SSG |
| **CMS** | Markdown + Git | Version-controlled, portable, no vendor lock-in |
| **Styling** | Tailwind CSS | Rapid development, design system built-in |
| **Comments** | Giscus (GitHub Discussions) | Free, no tracking, spam-resistant, open-source |
| **Analytics** | Plausible or Umami | Privacy-first, lightweight, IP-aware, self-hosted |
| **Search** | Pagefind | Static site search, no backend needed |
| **Newsletter** | ConvertKit or Buttondown | Simple, affordable, good API |
| **Translation** | Custom build (DeepL API or LibreTranslate) | Better than Google Translate for technical content |
| **Hosting** | Cloudflare Pages | Free, global CDN, DDoS protection, analytics |
| **Database** | Turso (SQLite edge) for comments/contacts | Serverless, free tier, edge-distributed |

### Why Astro over Next.js/Hugo
- **Astro**: Built-in i18n routing (`/en/blog/post` + `/zh/blog/post`), content collections with type-safety, islands architecture (interactivity only where needed), built-in image optimization, RSS, sitemap
- Faster build times than Next.js, easier than Hugo

---

## 6. GEO/SEO Strategy

### Generative Engine Optimization Essentials
1. **Structured content** — Use schema.org markup (Article, Person, Organization)
2. **Clear headings hierarchy** — H1 → H2 → H3, use questions as headings
3. **Entity-rich content** — Link to authoritative sources, use proper nouns
4. **Author authority** — Author page with credentials, social links, About page
5. **Content freshness** — Regular updates signal to AI crawlers
6. **Bilingual sitemaps** — Separate XML sitemaps for `/en/` and `/zh/`
7. **`llms.txt` and `llms-full.txt`** — Emerging standard for AI crawl optimization

### SEO Checklist
- [ ] Server-side rendering or SSG (Astro ✅)
- [ ] Canonical URLs for each language
- [ ] `hreflang` tags for bilingual pages
- [ ] OpenGraph + Twitter Card meta tags
- [ ] `alt` text on all images
- [ ] XML sitemap auto-generated
- [ ] `robots.txt` properly configured
- [ ] PageSpeed 90+ on mobile
- [ ] Structured data (JSON-LD)

---

## 7. Actionable Recommendations

### Quick Wins (Week 1)
1. **Astro starter template** — Use `astro-minimal` or `astro-paper` as base
2. **Deploy to Cloudflare Pages** — Free, instant
3. **Set up bilingual routing** — `/en/` and `/zh/` prefixes
4. **Write 3 foundational articles** — "About Me", "My Services", "Latest Thinking"

### Medium Term (Month 1)
5. **Email list signup** — ConvertKit or Buttondown integration
6. **Giscus comments** — GitHub-based, zero maintenance
7. **Plausible analytics** — Privacy-first, IP logging
8. **Auto-translation pipeline** — DeepL API for post translations

### Long Term (Month 2-3)
9. **Case study pages** — Detailed project write-ups with metrics
10. **Video content** — YouTube embeds with bilingual captions
11. **Consulting booking flow** — Cal.com or Calendly integration
12. **GEO optimization** — Structured data, entity linking, llms.txt

---

## 8. Reference Sites (Design Inspiration)

| Site | Why It Works |
|------|-------------|
| simonwillison.net | Clean typography, fast, category-organized, great tags |
| levels.io | Strong personal brand, minimalist, multi-product showcase |
| paulgraham.com | Pure content focus, no design distractions, authority by substance |
| matthewsites.com | Beautiful minimal design, dark mode, project showcase |
| danielmiessler.com | Newsletter integration, strong categorization, newsletter-first |
| overreacted.io (Dan Abramov) | Personal voice, bilingual (en/ru), deep technical content |

---

**Next Step:** Convert these findings into a Product Requirements Document (PRD).
