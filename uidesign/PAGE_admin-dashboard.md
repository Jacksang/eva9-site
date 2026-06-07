# PAGE: Admin Dashboard

**Page ID:** PAGE_ADMIN  
**Route:** `/en/admin/` and `/zh/admin/`  
**Role:** Admin (Jacky)  
**User Stories:** US-E01-ADMIN-01 through US-E01-ADMIN-08  
**Layout:** Desktop primary (admin tasks not expected on mobile)  

---

## Desktop Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ [Jacky Chen]              [🌙] [EN|ZH]           [← Back to Site]│ header
├──────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌────────────────────────────────────────────┐ │
│  │  Admin      │  │  [Comments] [Users] [Messages] [Analytics] │ │ sidebar
│  │             │  │                                             │ │ + tabs
│  │ ● Comments  │  │  ┌─ Comments Queue ────────────────────┐   │ │
│  │   Users     │  │  │                                       │   │ │
│  │   Messages  │  │  │  Filter: [All ▼]                     │   │ │
│  │   Analytics │  │  │                                       │   │ │
│  │             │  │  │  ┌─────────────────────────────────┐  │   │ │
│  │ ─────────  │  │  │  │ John Doe                        │  │   │ │
│  │   Logout    │  │  │  │ john@example.com                │  │   │ │
│  │             │  │  │  │ On: "How I Built..."           │  │   │ │
│  │             │  │  │  │ "Great article! Very helpful"  │  │   │ │  comment
│  │             │  │  │  │ ⏳ Pending · 2h ago    [AI]    │  │   │ │  row
│  │             │  │  │  │ [Approve]    [Reject]          │  │   │ │
│  │             │  │  │  └─────────────────────────────────┘  │   │ │
│  │             │  │  │                                       │   │ │
│  │             │  │  │  ┌─────────────────────────────────┐  │   │ │
│  │             │  │  │  │ Jane Smith                      │  │   │ │
│  │             │  │  │  │ jane@example.com                │  │   │ │
│  │             │  │  │  │ On: "No-Code ML Started"       │  │   │ │
│  │             │  │  │  │ "加微信 learnmore123"          │  │   │ │
│  │             │  │  │  │ ⏳ Pending · 5h ago    [AI]    │  │   │ │  flagged
│  │             │  │  │  │ AI: spam_pattern_detected      │  │   │ │  row
│  │             │  │  │  │ [Approve]    [Reject]          │  │   │ │
│  │             │  │  │  └─────────────────────────────────┘  │   │ │
│  │             │  │  └───────────────────────────────────────┘   │ │
│  └─────────────┘  └────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────┤
│  © 2026 Jacky Chen                                               │ footer
└──────────────────────────────────────────────────────────────────┘
```

---

## Tab: Analytics (click "Analytics" in sidebar)

```
┌─ Analytics ─────────────────────────────────────────────────────┐
│                                                                  │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐      │
│  │  156      │ │  42       │ │  8        │ │  12       │      │ stats
│  │ Page Views│ │ Unique    │ │ Comments  │ │ Users     │      │ cards
│  │ (Today)   │ │ Visitors  │ │ (Total)   │ │ (Total)   │      │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘      │
│                                                                  │
│  ┌─ Top Pages ───────────────────────────────────────────────┐  │
│  │  #  URL                         Views                      │  │
│  │  1  /en/                        89                         │  │
│  │  2  /en/blog/work/cloud-platform 34                        │  │
│  │  3  /zh/about/                  22                         │  │
│  │  ...                                                       │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─ Recent Visitors ─────────────────────────────────────────┐  │
│  │  IP              Page                  Time                │  │
│  │  192.168.1.100   /en/blog/work/...    2 min ago           │  │
│  │  10.0.0.55       /zh/                  15 min ago          │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Component Details

| Element | Spec |
|---------|------|
| Sidebar | 220px fixed width, left. `bg-surface border-r`. Logo + nav links + logout |
| Sidebar links | `py-2 px-4 rounded-md`, active: `bg-primary/10 text-primary font-medium` |
| Tab bar | Horizontal tabs under header: Comments | Users | Messages | Analytics |
| Comment row | `border rounded-lg p-4 mb-2`. Expanded: shows full body |
| Action buttons | Approve: `btn-sm bg-green-600 text-white`, Reject: `btn-sm bg-red-600 text-white` |
| AI badge | Small purple pill badge `[AI]` next to pending status |
| Stats cards | 4-column grid, each: `bg-surface rounded-xl p-5 text-center` |
| Tables | Standard: `w-full text-sm`, header with gray bg, alternating row colors |

---

## States

| State | Rendering |
|-------|-----------|
| **Comments — Normal** | Queue with pending comments as shown |
| **Comments — Empty** | "No comments to moderate" with checkmark icon |
| **Users — Empty** | "No registered users yet" |
| **Messages — Empty** | "No messages yet" |
| **Analytics — Zero** | All stats show "0", tables show "No data yet" |
| **Loading** | Skeleton rows in table area |
| **Error** | "Failed to load data — Retry" button |
