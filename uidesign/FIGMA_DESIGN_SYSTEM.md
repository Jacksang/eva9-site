# eva9.ai — Figma Design System Reference

This file documents the structured design tokens for Figma-to-code workflows.
Update when design tokens change in Figma.

## Brand

| Property | Value |
|----------|-------|
| Name | Jacky Chen — eva9.ai |
| Tone | Professional, warm, content-first, tech blog |
| Audience | Tech professionals, consulting clients, bilingual readers |

## Colors

### Light Mode
| Token | Hex | Figma Variable Usage |
|-------|-----|---------------------|
| `--color-primary` | `#0D9488` | Primary buttons, links, active states, badges |
| `--color-primary-hover` | `#0F766E` | Button hover |
| `--color-accent` | `#F59E0B` | Highlights, category badges |
| `--color-bg` | `#FFFFFF` | Page background |
| `--color-surface` | `#F9FAFB` | Card background |
| `--color-surface-hover` | `#F3F4F6` | Card hover |
| `--color-border` | `#E5E7EB` | Borders, dividers |
| `--color-text-primary` | `#111827` | Headings, body text |
| `--color-text-secondary` | `#6B7280` | Secondary text, dates |
| `--color-text-muted` | `#9CA3AF` | Placeholders, hints |
| `--color-success` | `#16A34A` | Success, approved |
| `--color-error` | `#DC2626` | Errors, rejected |
| `--color-warning` | `#D97706` | Warnings, pending |

### Dark Mode
| Token | Hex |
|-------|-----|
| `--color-primary` | `#14B8A6` |
| `--color-accent` | `#FBBF24` |
| `--color-bg` | `#111827` |
| `--color-surface` | `#1F2937` |
| `--color-text-primary` | `#F9FAFB` |
| `--color-border` | `#374151` |

## Typography

| Token | Value | Usage |
|-------|-------|-------|
| Font body | Inter (400,500,600,700) | All text |
| Font code | JetBrains Mono (400) | Code blocks |
| `--text-xs` | 0.75rem / 1rem | Tags, badges, captions |
| `--text-sm` | 0.875rem / 1.25rem | Secondary text, dates |
| `--text-base` | 1rem / 1.75rem | Body text |
| `--text-lg` | 1.125rem / 1.75rem | Lead paragraphs |
| `--text-xl` | 1.25rem / 1.75rem | Section headings |
| `--text-2xl` | 1.5rem / 2rem | Post titles in cards |
| `--text-3xl` | 1.875rem / 2.25rem | Page titles |
| `--text-4xl` | 2.25rem / 2.5rem | Hero title |
| Max reading width | 680px | Blog post body |

## Components

| Component | Auto-layout | Variants | States |
|-----------|-------------|----------|--------|
| Button/Primary | H | — | Default, Hover |
| Button/Secondary | H | — | Default, Hover |
| Button/Ghost | H | — | Default, Hover |
| Post Card | V | — | Normal, Hover |
| Category Card | V | — | Normal, Hover |
| Comment Card | H | — | Normal |
| Comment Form | V | — | Logged In, Logged Out |
| Header | H | — | Default |
| Footer | H | — | Default |
| Status Badge | H | Approved/Pending/Rejected/AI/Category | — |
| Toast | H | Success/Error/Info | Visible, Auto-dismiss |
| Modal | V | — | Open, Closing |
| Skeleton | H | — | Loading |

## Pages (E01)

| Page | Route | Key Components |
|------|-------|---------------|
| Homepage | `/en/`, `/zh/` | Hero, Category Cards, Post Cards, Header, Footer |
| Blog Post | `/en/blog/{cat}/{slug}/` | Post body, Code block, Comments, Comment form |
| Admin Dashboard | `/en/admin/` | Sidebar, Comment Queue, Stats Cards, Tables |

## Responsive Breakpoints

| Name | Width |
|------|-------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |

## Figma File Reference

- **Figma project:** [link TBD — create when ready]
- **Figma file key:** [TBD]
- **Design system page:** [TBD]
