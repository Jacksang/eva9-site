# [BUG-UAT-012] DynamoDB TTL not configured — tokens and visitor records never expire

| Field | Value |
|-------|-------|
| **Status** | `[ ] New` |
| **Severity** | 🟡 Medium |
| **Source Test** | E01-system-uat.md (T01-03, T04-05, E09) |
| **Component** | lambda/shared/db.ts, template.yaml |

## Steps to Reproduce

**Code Review:**
```bash
grep -i 'ttl\|expiresAt\|TimeToLive' lambda/register/index.ts lambda/log-visit/index.ts template.yaml
# Returns empty — no TTL anywhere
```

## Expected Behavior

- Verification tokens should have 24-hour TTL (E01-SYSTEM-01 AC-01)
- Visitor visit records should have 90-day TTL (E01-SYSTEM-04 AC-04)
- DynamoDB tables should have `TimeToLiveSpecification` configured
- Expired tokens should be rejected on verification attempts

## Actual Behavior

- No `ttl` or `expiresAt` field on any DynamoDB record
- No `TimeToLiveSpecification` in template.yaml for any table
- Verification tokens never expire at the database level
- Visitor records accumulate indefinitely with no auto-cleanup

## Suggested Fix

1. Add TTL attribute to DynamoDB write operations:
   - User records: set `ttl` = now + 24h for verification code
   - Visit records: set `ttl` = now + 90 days
2. Add `TimeToLiveSpecification` to all four DynamoDB table definitions in `template.yaml`
3. Check for token expiry in `verify-email/index.ts` even though DB-level TTL handles deletion
