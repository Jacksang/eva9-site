# Stage 2 — Role Identification

**Source:** PRD v2.0 (`PRD.md`)  
**Date:** 2026-06-07

---

## Identified Roles

| # | Role | Evidence from PRD |
|---|------|-------------------|
| R1 | **Anonymous Visitor** | F1.1—F1.6, F2.1—F2.3, F3.1—F3.3, F4.1—F4.2, F5.1, F5.3, F8.1—F8.5 |
| R2 | **Registered User** | F3.4—F3.6, F5.2: Can comment, delete own comments, save dark mode preference |
| R3 | **Admin (Jacky)** | F1.7—F1.9, F2.4, F3.7—F3.9, F4.3, F6.1—F6.6: Full content control, moderation, analytics |
| R4 | **Search Engine** | F7.1—F7.3, F7.5—F7.6: Consumes sitemap, OG meta, structured data, hreflang |
| R5 | **AI Crawler** | F7.4: Consumes llms.txt for AI model indexing |
| R6 | **System** | F3.2 (email verification), F3.9 (AI auto-moderation), F4.3 (email notification), F6.5—F6.6 (visitor logging), deployment automation |

---

## Role Participation by Epic

| Role | E01 (MVP) | E02 (Enhance) | E03 (Polish) |
|------|-----------|---------------|-------------|
| Anonymous Visitor | ✅ Full flow | ✅ RSS, search, contact pg | — |
| Registered User | ✅ Comment submit | ✅ Dark pref, delete own | ✅ Delete comment |
| Admin | ✅ Dashboard, moderate | — | — |
| Search Engine | ✅ Sitemap, OG, JSON-LD | ✅ hreflang, canonical | — |
| AI Crawler | — | ✅ llms.txt | — |
| System | ✅ Email, AI mod, analytics | ✅ RSS gen | ✅ Video embeds, a11y |
