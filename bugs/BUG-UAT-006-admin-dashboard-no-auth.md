# [BUG-UAT-006] Admin dashboard accessible without authentication

| Field | Value |
|-------|-------|
| **Status** | `[ ] New` |
| **Severity** | 🔴 Critical |
| **Source Test** | E01-admin-uat.md (A01-10, E-01) |
| **Component** | src/pages/en/admin.astro, src/pages/en/admin/index.astro |

## Steps to Reproduce

```bash
curl -sL -o /dev/null -w "%{http_code}" http://localhost:4321/en/admin/
```

**Output**: `200`

```bash
curl -s http://localhost:4321/en/admin/ | head -c 200
```

**Output**: Shows full admin dashboard HTML with "Comment Moderation Queue" section.

## Expected Behavior

Navigating to `/en/admin/` without a valid JWT token should redirect to `/en/admin/login`. No admin data or UI should be exposed to unauthenticated users.

## Actual Behavior

The admin dashboard page at `/en/admin/` loads and renders the full dashboard UI (sidebar, comments tab, filter dropdown) even without any authentication token. Admin login bypasses entirely via direct URL access.

## Suggested Fix

Add a server-side authentication check in `Admin.astro` layout or the admin page component. If no valid admin JWT is present in cookies/localStorage at build/request time, redirect to `/en/admin/login`. For Astro static generation, this may need client-side auth checking in an inline script that redirects before rendering content, or using Astro middleware for SSR.
