# [BUG-UAT-013] CI/CD deploy step not configured — no S3 sync or CloudFront invalidation

| Field | Value |
|-------|-------|
| **Status** | `[ ] New` |
| **Severity** | 🔴 Critical |
| **Source Test** | E01-system-uat.md (T06-02) |
| **Component** | .github/workflows/ci.yml |

## Steps to Reproduce

**Code Review:**
```bash
cat .github/workflows/ci.yml
```

**Output**: Only contains checkout → npm ci → npm test → npm run build → integration tests. No S3 sync, CloudFront invalidation, or AWS credential steps.

## Expected Behavior

Per E01-SYSTEM-06 AC-02, the CI workflow should include:
1. Checkout code
2. `npm ci`
3. `npm test` (unit tests)
4. `npm run build`
5. Sync build output to S3 bucket
6. Invalid CloudFront cache
7. AWS credentials configuration

## Actual Behavior

The workflow builds and tests but has no deploy step. The site can never be automatically deployed to production via CI. No AWS credentials are configured in the workflow.

## Suggested Fix

Add deploy step to `ci.yml`:
```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: us-east-1

- name: Sync to S3
  run: aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} --delete

- name: Invalidate CloudFront
  run: aws cloudfront create-invalidation --distribution-id ${{ secrets.CF_DISTRIBUTION_ID }} --paths "/*"
```
