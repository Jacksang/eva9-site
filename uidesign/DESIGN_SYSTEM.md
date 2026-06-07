# DESIGN SYSTEM: blog.eva9.ai

## Brand Identity
- **Brand:** eva9.ai — Jacky Chen's personal platform
- **Tone:** Professional, warm, content-first
- **Audience:** Tech professionals, consulting clients, bilingual readers

---

## Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--color-primary` | `#0D9488` | `#14B8A6` | Buttons, links, active states, badges |
| `--color-primary-hover` | `#0F766E` | `#2DD4BF` | Button hover |
| `--color-accent` | `#F59E0B` | `#FBBF24` | Highlights, category badges |
| `--color-bg` | `#FFFFFF` | `#111827` | Page background |
| `--color-surface` | `#F9FAFB` | `#1F2937` | Card background |
| `--color-surface-hover` | `#F3F4F6` | `#374151` | Card hover |
| `--color-border` | `#E5E7EB` | `#374151` | Borders, dividers |
| `--color-text-primary` | `#111827` | `#F9FAFB` | Headings, body text |
| `--color-text-secondary` | `#6B7280` | `#9CA3AF` | Secondary text, dates |
| `--color-text-muted` | `#9CA3AF` | `#6B7280` | Placeholders, hints |
| `--color-success` | `#16A34A` | `#22C55E` | Success, approved |
| `--color-error` | `#DC2626` | `#EF4444` | Errors, rejected |
| `--color-warning` | `#D97706` | `#F59E0B` | Warnings, pending |

---

## Typography

| Token | Value | Usage |
|-------|-------|-------|
| Font — Body | **Inter** (weights 400, 500, 600, 700) | All text |
| Font — Code | **JetBrains Mono** (weight 400) | Code blocks, inline code |
| `--text-xs` | 0.75rem / 1rem | Tags, badges, captions |
| `--text-sm` | 0.875rem / 1.25rem | Secondary text, dates |
| `--text-base` | 1rem / 1.75rem | Body text |
| `--text-lg` | 1.125rem / 1.75rem | Lead paragraphs |
| `--text-xl` | 1.25rem / 1.75rem | Section headings |
| `--text-2xl` | 1.5rem / 2rem | Post titles in cards |
| `--text-3xl` | 1.875rem / 2.25rem | Page titles |
| `--text-4xl` | 2.25rem / 2.5rem | Hero title |
| Max reading width | 680px | Blog post body |

---

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 0.25rem (4px) | Tight gaps |
| `--space-sm` | 0.5rem (8px) | Icon gaps, inline padding |
| `--space-md` | 1rem (16px) | Card padding, section gaps |
| `--space-lg` | 1.5rem (24px) | Section spacing |
| `--space-xl` | 2rem (32px) | Page section dividers |
| `--space-2xl` | 3rem (48px) | Hero spacing |
| `--space-3xl` | 4rem (64px) | Page top/bottom padding |

---

## Components

### Buttons
```
Primary:   bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover
Secondary: border border-gray-300 px-6 py-3 rounded-lg hover:bg-surface
Ghost:     text-primary px-4 py-2 hover:bg-surface rounded
```

### Cards (Post Cards & Category Cards)
```
- bg-surface rounded-xl border border-border p-0 (post) or p-6 (category)
- hover: shadow-md translate-y-[-2px] transition-all duration-200
- Post card: image (optional) → padding area with title, excerpt, metadata
- Category card: icon/emoji → title → description → arrow
```

### Header
```
- Fixed top, bg-white/80 dark:bg-gray-900/80 backdrop-blur
- Height: 64px
- Left: Logo/Name "Jacky Chen"
- Right: [Dark mode toggle] [EN|ZH] [Login/Register|Logout]
- Mobile: Hamburger menu
```

### Footer
```
- bg-surface border-t border-border py-8
- Left: © 2026 Jacky Chen
- Center: Links (About, Blog, Contact, RSS)
- Right: Social links
```

### Blog Post Body
```
- Max-width: 680px, centered
- Prose styling (headings, paragraphs, lists, blockquotes)
- Code blocks: bg-gray-900, text-green-400, rounded-lg, p-4, overflow-x-auto
- Images: max-width 100%, rounded-lg
```

### Comment Section
```
- Below post body, max-width 680px, centered
- Comment card: avatar placeholder → name + timestamp → body
- Status badges: "⏳ Pending" (yellow), "✓" (green), "✗ Rejected" (red)
- Comment form: textarea + Submit button (disabled if not logged in)
```

### Empty States
```
- Centered, muted text
- Icon (gray-400) + title + description
- Optional CTA button
```

### Status Badges
```
Approved:  bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300
Pending:   bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300
Rejected:  bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300
AI:        bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300
Category:  bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300
```

### Toast Notifications
```
- Fixed bottom-right, z-50
- Success: green, Error: red, Info: blue
- Auto-dismiss after 4 seconds
- Slide-in animation
```

---

## Accessibility
- All interactive elements: focus-visible ring (2px primary, offset 2px)
- Sufficient contrast: 4.5:1 minimum for text
- Semantic HTML headings (h1→h6)
- aria-label on icon-only buttons
- alt text on all images
