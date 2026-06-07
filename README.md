# blog.eva9.ai — Deployment Guide

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                      CloudFront CDN                      │
│                 https://blog.eva9.ai                     │
├───────────────────────┬──────────────────────────────────┤
│    S3 Bucket (static) │    API Gateway (dynamic)         │
│    Astro SSG build    │    /api/* → Lambda functions     │
├───────────────────────┼──────────────────────────────────┤
│                       │    DynamoDB Tables               │
│                       │    users, comments, messages,    │
│                       │    visits                        │
└───────────────────────┴──────────────────────────────────┘
```

## Prerequisites

- AWS CLI v2 configured with admin credentials
- AWS SAM CLI installed (`npm install -g aws-sam-cli`)
- Node.js 22+

## Step 1: Build Static Site

```bash
cd ~/projects/eva9-site
npm install
npm run build
# Output: dist/ (20 pages + assets)
```

## Step 2: Deploy Lambda API

```bash
# First time only: bootstrap SAM
sam build --template template.yaml
sam deploy --guided

# Set parameters:
#   JwtSecret: [generate a UUID]
#   AdminJwtSecret: [generate a different UUID]

# After deployment, note the API Gateway URL
```

## Step 3: Deploy Static Site to S3

```bash
# Create S3 bucket
aws s3 mb s3://blog.eva9.ai --region us-east-1

# Enable static website hosting
aws s3 website s3://blog.eva9.ai --index-document index.html --error-document 404.html

# Upload dist/ contents
aws s3 sync dist/ s3://blog.eva9.ai/ --delete

# Set bucket policy (public read)
aws s3api put-bucket-policy --bucket blog.eva9.ai --policy '{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::blog.eva9.ai/*"
  }]
}'
```

## Step 4: Configure CloudFront

```bash
# Create CloudFront distribution pointing to S3
aws cloudfront create-distribution \
  --origin-domain-name blog.eva9.ai.s3-website-us-east-1.amazonaws.com \
  --default-root-object index.html \
  --aliases blog.eva9.ai \
  --viewer-certificate ACM-CERT-ARN
```

## Step 5: Configure DNS

Add CNAME record for blog.eva9.ai → CloudFront distribution domain.

## Step 6: Seed Admin User

```bash
# After Lambda API is deployed:
cd lambda
npx tsx seed.ts

# Take the output JSON and insert into eva9-users DynamoDB table
# via AWS Console → DynamoDB → eva9-users → Create item
```

## Step 7: Verify

```bash
# Check site
curl https://blog.eva9.ai/en/

# Check API
curl https://blog.eva9.ai/api/comments

# Run integration tests
npm run test:integration
```

## CI/CD (GitHub Actions)

The `.github/workflows/ci.yml` file automatically:
1. Runs `npm ci`
2. Runs unit tests (`npm test`)
3. Builds static site (`npm run build`)
4. Runs integration tests (`npm run test:integration`)

For automatic deployment, add a deploy step after the build:
```yaml
- name: Deploy to S3
  run: aws s3 sync dist/ s3://blog.eva9.ai/ --delete
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

## Adding New Blog Posts

1. Create `src/content/blog/en/your-post-slug.md` (English)
2. Create `src/content/blog/zh/your-post-slug-zh.md` (Chinese)
3. Create `src/pages/en/blog/your-post-slug.astro` (see existing for template)
4. Create `src/pages/zh/blog/your-post-slug.astro`
5. Update `src/pages/sitemap.xml.ts` blogPosts array
6. Update `src/pages/rss.xml.ts` seedPosts array
7. Run `npm run build` and deploy
