# [BUG-UAT-010] SES email sending not implemented in register and contact Lambdas

| Field | Value |
|-------|-------|
| **Status** | `[ ] New` |
| **Severity** | 🔴 Critical |
| **Source Test** | E01-system-uat.md (T01-04, T03-01) |
| **Component** | lambda/register/index.ts, lambda/contact/index.ts |

## Steps to Reproduce

**Code Review:**
```bash
# Check register for SES calls
grep -i 'ses\|@aws-sdk/client-ses' lambda/register/index.ts lambda/shared/*.ts
# Returns empty — no SES import or call anywhere
```

## Expected Behavior

- `register/index.ts` should call SES to send a verification email after user registration
- `contact/index.ts` should call SES to notify admin of new contact form submissions
- The `@aws-sdk/client-ses` package should be in `lambda/package.json` dependencies
- template.yaml should grant SES `SendEmail` IAM permission to the Lambda functions

## Actual Behavior

Neither function calls SES at all. The register handler stores the verification code but never emails it. The contact handler saves the message to DynamoDB but never notifies the admin. The register API response says "Verification code sent" but no email is dispatched. No SES SDK dependencies exist in `lambda/package.json`.

## Suggested Fix

1. Add `@aws-sdk/client-ses` to `lambda/package.json`
2. Create a shared SES utility (e.g., `lambda/shared/email.ts`)
3. Implement `sendVerificationEmail(email, code)` in register handler
4. Implement `sendContactNotification(message)` in contact handler
5. Add `ADMIN_EMAIL` env var to template.yaml Globals
6. Add SES `SendEmail` policy to each function in template.yaml
7. Handle SES `ThrottlingException` gracefully (log to CloudWatch, don't fail the request)
