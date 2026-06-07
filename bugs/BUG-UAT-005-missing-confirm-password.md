# [BUG-UAT-005] Registration form missing "Confirm Password" field

| Field | Value |
|-------|-------|
| **Status** | `[ ] New` |
| **Severity** | 🟡 Medium |
| **Source Test** | E01-visitor-uat.md (US-E01-VISITOR-04-02) |
| **Component** | src/pages/en/register.astro |

## Steps to Reproduce

```bash
curl -s http://localhost:4321/en/register/ | grep -c -iE 'confirm|confirm.*password'
```

**Output**: `0`

## Expected Behavior

The registration form should include 4 fields: Name, Email, Password, and Confirm Password.

## Actual Behavior

The registration form has only 3 fields: Name, Email, Password. There is no Confirm Password field, so users cannot verify they typed their password correctly.

## Suggested Fix

Add a "Confirm Password" input field to `register.astro` and implement client-side matching validation:
```html
<div>
  <label for="confirmPassword">Confirm Password</label>
  <input type="password" id="confirmPassword" name="confirmPassword" required>
</div>
```
