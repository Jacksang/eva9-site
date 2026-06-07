# [BUG-UAT-011] AI comment moderation not implemented

| Field | Value |
|-------|-------|
| **Status** | `[ ] New` |
| **Severity** | 🔴 Critical |
| **Source Test** | E01-system-uat.md (T02-01 through T02-07) |
| **Component** | lambda/comments/index.ts |

## Steps to Reproduce

**Code Review:**
```bash
grep -i 'moderation\|flag\|spam\|verified\|pattern' lambda/comments/index.ts lambda/shared/*.ts
# Returns empty — no moderation logic exists
```

## Expected Behavior

Per US-E01-SYSTEM-02 AC-01 through AC-07:
- Comments should be checked for flagged patterns (URLs, profanity in EN/ZH, Chinese spam, repeated chars)
- Verified users with clean content should be auto-approved
- Unverified users should always have comments held for review
- Moderation reason should be logged with each comment
- Moderation rules should be in a config file

## Actual Behavior

The `comments/index.ts` Lambda saves ALL submitted comments with `status: 'pending'` regardless of:
- User verification status
- Content characteristics (URLs, profanity, spam patterns)
- User comment history

No moderation fields (`moderation_action`, `moderation_reason`, `moderated_by`) are stored. No moderation config file exists.

## Suggested Fix

1. Create `lambda/shared/moderation.ts` with pattern matching and rule evaluation
2. Add moderation rules config (e.g., `lambda/shared/moderation-rules.json`)
3. Modify `comments/index.ts` POST handler to:
   - Read user's `verified` status from DynamoDB
   - Run content through moderation rules
   - Auto-approve verified users with clean content
   - Flag suspicious content with moderation reason
   - Store `moderation_action`, `moderation_reason`, `moderated_by` fields
4. Implement AI badge rendering in admin frontend
