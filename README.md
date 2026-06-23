# blog.eva9.ai — 双语个人博客

**Jacky Chen 的个人技术博客** | 双语 (EN/ZH) | Astro 5 + Tailwind CSS 4  
**Runtime:** Node.js 22 | Lambda (API) + S3 (Static) + CloudFront (CDN)  
**Repo:** `github.com/Jacksang/eva9-site`

---

## 架构

```
┌──────────────────────────────────────────────────────────┐
│                      CloudFront CDN                      │
│                 https://blog.eva9.ai                     │
├───────────────────────┬──────────────────────────────────┤
│    S3 Bucket (静态)    │    API Gateway (动态 API)        │
│    Astro SSG build    │    /api/* → Lambda Functions     │
│    dist/ → 20 pages   │    Node.js 22 Runtime            │
├───────────────────────┼──────────────────────────────────┤
│                       │    DynamoDB Tables (4)           │
│                       │    eva9-users                    │
│                       │    eva9-comments                 │
│                       │    eva9-messages                 │
│                       │    eva9-visits                   │
└───────────────────────┴──────────────────────────────────┘
```

---

## 前提条件

| 工具 | 用途 |
|------|------|
| Node.js 22+ | 运行时 |
| AWS CLI v2 | 部署到 AWS |
| AWS SAM CLI | Lambda 打包部署 (`npm i -g aws-sam-cli`) |
| AWS 账户 | S3 + Lambda + DynamoDB + CloudFront + SES |

---

## 目录结构

```
eva9-site/
├── src/
│   ├── pages/           # Astro 页面 (EN + ZH + Admin)
│   │   ├── en/          # 英文页面 (8 pages)
│   │   ├── zh/          # 中文页面 (8 pages)
│   │   ├── admin/       # 管理后台
│   │   ├── sitemap.xml.ts
│   │   └── rss.xml.ts
│   ├── layouts/         # Base.astro, BlogPost.astro, Admin.astro
│   ├── components/      # Header, Footer, PostCard, ThemeToggle, LangSwitcher
│   ├── content/blog/    # Markdown 博客内容 (en/ + zh/)
│   ├── lib/             # i18n 翻译, SEO utilities
│   └── styles/          # global.css (Tailwind)
├── lambda/              # Lambda API 函数
│   ├── register/        # POST /api/register
│   ├── login/           # POST /api/login
│   ├── verify-email/    # GET /api/verify-email
│   ├── comments/        # GET/POST /api/comments
│   ├── contact/         # POST /api/contact
│   ├── log-visit/       # POST /api/log-visit
│   ├── admin/           # Admin API (login, comments, users, messages, visitors)
│   ├── shared/          # 共享模块 (db, auth, validation)
│   └── seed.ts          # 初始管理员种子
├── tests/
│   ├── uat/             # UAT 测试用例 (5 文件)
│   └── integration/     # 集成测试
├── plan/                # 需求文档 (E01 user stories x5)
├── uidesign/            # UI 设计规范
├── template.yaml        # AWS SAM 部署模板
└── astro.config.ts      # Astro 配置 (site: blog.eva9.ai)
```

---

## 本地开发

```bash
# 安装依赖
cd ~/projects/eva9-site
npm install

# 启动开发服务器 (http://localhost:3004)
npm run dev

# 构建静态文件
npm run build          # → dist/

# 预览构建结果
npm run preview

# 运行测试
npm test               # 单元测试
npm run test:integration  # 集成测试

# 类型检查
npm run typecheck
```

---

## 环境变量

### Lambda 环境变量 (在 `template.yaml` 中配置)

| 变量 | 说明 | 示例值 |
|------|------|--------|
| `JWT_SECRET` | 用户 JWT 签名密钥 (至少 32 字符) | 部署时随机生成 |
| `ADMIN_JWT_SECRET` | 管理员 JWT 签名密钥 (不同于 JWT_SECRET) | 部署时随机生成 |
| `TABLE_PREFIX` | DynamoDB 表前缀 | `eva9` |
| `AWS_REGION` | AWS 区域 | `us-east-1` |

### 本地开发环境变量 (可选，创建 `.env`)

```bash
# AWS SAM 本地测试
JWT_SECRET=local-dev-jwt-secret-change-me
ADMIN_JWT_SECRET=local-admin-jwt-secret-change-me
TABLE_PREFIX=eva9
```

---

## 部署步骤

### Step 1: 构建静态网站

```bash
cd ~/projects/eva9-site
npm install
npm run build
# 输出: dist/ (20 pages + assets, SEO meta, JSON-LD, sitemap, RSS)
```

### Step 2: 部署 Lambda API

```bash
# 构建 SAM 包
sam build --template template.yaml

# 首次部署 (交互式)
sam deploy --guided

# 提示输入参数:
#   Stack Name: eva9-site
#   JwtSecret: [生成 UUID: openssl rand -hex 32]
#   AdminJwtSecret: [生成另一个 UUID: openssl rand -hex 32]
#   Confirm changes before deploy: Y
#   Allow SAM CLI IAM role creation: Y

# 部署完成后，记下 API Gateway URL
# 例如: https://abc123.execute-api.us-east-1.amazonaws.com
```

### Step 3: 配置 S3 + CloudFront + DNS

```bash
# 创建 S3 bucket
aws s3 mb s3://blog.eva9.ai --region us-east-1

# 启用静态网站托管
aws s3 website s3://blog.eva9.ai \
  --index-document index.html \
  --error-document 404.html

# 上传静态文件
aws s3 sync dist/ s3://blog.eva9.ai/ --delete

# 设置公开读取权限
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

```bash
# 创建 CloudFront Distribution
# 在 AWS Console → CloudFront → Create Distribution:
#   Origin: blog.eva9.ai.s3-website-us-east-1.amazonaws.com
#   Viewer Protocol: Redirect HTTP to HTTPS
#   Alternate Domain (CNAME): blog.eva9.ai
#   SSL Certificate: 请求或选择 ACM 证书 (us-east-1)
#   Default Root Object: index.html
#   Custom Error Response: 404 → /404.html (HTTP 200)

# DNS: 在域名提供商添加 CNAME 记录
#   blog.eva9.ai → [CloudFront Distribution Domain].cloudfront.net
```

### Step 4: 配置 AWS SES (邮件服务)

```
AWS Console → SES → Verified Identities:
1. 验证域名 eva9.ai
2. 添加 DKIM 记录到 DNS
3. 验证发件邮箱 (admin@eva9.ai)
4. 升级到生产环境 (默认 sandbox 只允许验证过的邮箱)
```

### Step 5: 种子管理员账户

创建 DynamoDB 管理员用户有两种方式：

**方式 A: 使用 seed.ts 生成密码哈希**

```bash
cd lambda
npx tsx seed.ts
# 输出:
# {
#   "email": "admin@eva9.ai",
#   "name": "Jacky Chen",
#   "passwordHash": "$2a$10$...",
#   "role": "admin",
#   "verified": true,
#   "createdAt": "...",
#   "updatedAt": "..."
# }
```

然后将 JSON 输出复制到 AWS Console → DynamoDB → `eva9-users` → Create item。

**方式 B: 使用 AWS CLI 直接创建**

```bash
# 先生成密码哈希
ADMIN_HASH=$(node -e "
  const bcrypt = require('bcryptjs');
  bcrypt.hash('YOUR_ADMIN_PASSWORD', 10).then(h => console.log(h));
")

# 插入到 DynamoDB
aws dynamodb put-item \
  --table-name eva9-users \
  --item "{
    \"email\": {\"S\": \"admin@eva9.ai\"},
    \"name\": {\"S\": \"Jacky Chen\"},
    \"passwordHash\": {\"S\": \"$ADMIN_HASH\"},
    \"role\": {\"S\": \"admin\"},
    \"verified\": {\"BOOL\": true},
    \"createdAt\": {\"S\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"},
    \"updatedAt\": {\"S\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"}
  }"
```

---

## 账户初始信息

### 管理员账户 (唯一)

| 字段 | 值 | 说明 |
|------|-----|------|
| **邮箱** | `admin@eva9.ai` | 管理员登录邮箱 |
| **密码** | 部署时通过 seed.ts 设置 | 首次登录后尽快修改 |
| **角色** | `admin` | 拥有全部管理权限 |
| **JWT 有效期** | 2 小时 (用户 token 7 天) | 管理员 session 更短以保证安全 |
| **登录入口** | `/en/admin/login` 或 `/zh/admin/login` | 与普通用户登录分离 |
| **Dashboard** | `/en/admin/` (需登录) | 4 tabs: Comments / Users / Messages / Analytics |
| **权限** | 评论审核、用户管理、消息查看、站点分析 | |

### 普通用户账户

| 字段 | 说明 |
|------|------|
| **注册方式** | 公开注册 (`/en/register/` 或 `/zh/register/`) |
| **邮箱验证** | 注册后发送验证邮件 (AWS SES)，24 小时内点击验证链接 |
| **密码要求** | 最少 8 个字符 |
| **JWT 有效期** | 7 天 |
| **权限** | 提交评论 (自动审核 | 人工审核)、查看自己评论状态 |

### 测试账户 (本地开发)

```json
{
  "email": "test@eva9.ai",
  "name": "Test User",
  "password": "test1234",
  "role": "user",
  "verified": true
}
```

> ⚠️ 仅用于本地开发测试，生产环境请删除

---

## API 端点

### 公开端点

| Method | Path | 说明 |
|--------|------|------|
| POST | `/api/register` | 用户注册 (name + email + password) |
| POST | `/api/login` | 用户登录 → JWT |
| GET | `/api/verify-email?token=XXX` | 邮箱验证 |
| POST | `/api/forgot-password` | 忘记密码 → 发送重置邮件 |
| POST | `/api/reset-password` | 重置密码 |
| GET | `/api/comments?post=SLUG` | 获取文章公开评论 |
| POST | `/api/comments` | 提交评论 (需登录) |
| POST | `/api/contact` | 提交联系表单 |
| POST | `/api/log-visit` | 记录页面访问 (fire-and-forget) |

### 管理员端点 (需要 Admin JWT)

| Method | Path | 说明 |
|--------|------|------|
| POST | `/api/admin/login` | 管理员登录 |
| GET | `/api/admin/comments` | 评论审核队列 |
| PUT | `/api/admin/comments/ID` | 审核评论 (approve/reject) |
| GET | `/api/admin/users` | 用户列表 |
| GET | `/api/admin/messages` | 联系表单消息 |
| DELETE | `/api/admin/messages/ID` | 删除消息 |
| GET | `/api/admin/visitors` | 站点访问统计 |

---

## CI/CD (GitHub Actions)

`.github/workflows/ci.yml` 在每次 Push 到 main 自动执行：

```yaml
1. npm ci          # 安装依赖
2. npm test        # 单元测试
3. npm run build   # 构建静态站点
4. npm run test:integration  # 集成测试
```

### 添加自动部署 (生产环境启用)

在 `ci.yml` 末尾添加：

```yaml
      - name: Deploy to S3
        if: github.ref == 'refs/heads/main'
        run: |
          aws s3 sync dist/ s3://blog.eva9.ai/ --delete
          aws cloudfront create-invalidation --distribution-id ${{ secrets.CF_DIST_ID }} --paths "/*"
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

需要添加的 GitHub Secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `CF_DIST_ID` (CloudFront Distribution ID)

---

## 添加新博客文章

```bash
# 1. 创建英文 Markdown
vim src/content/blog/en/my-new-post.md

# 2. 创建中文 Markdown
vim src/content/blog/zh/my-new-post-zh.md

# 3. 创建 Astro 页面 (参考现有模板)
cp src/pages/en/blog/why-i-built-this-blog.astro src/pages/en/blog/my-new-post.astro
cp src/pages/zh/blog/why-i-built-this-blog.astro src/pages/zh/blog/my-new-post.astro
# 修改 slug 和 import 路径

# 4. 更新 sitemap 和 RSS
vim src/pages/sitemap.xml.ts   # 添加新文章到 blogPosts 数组
vim src/pages/rss.xml.ts       # 添加新文章到 seedPosts 数组

# 5. 构建并部署
npm run build
aws s3 sync dist/ s3://blog.eva9.ai/ --delete
```

---

## 常见问题

### Q: admin 登录后 token 过期怎么处理？
A: Admin JWT 有效期为 2 小时。过期后会自动跳转到 `/en/admin/login` 重新登录。

### Q: 如何重置管理员密码？
A: 目前需要通过 DynamoDB 直接修改。使用 seed.ts 生成新哈希，然后通过 AWS Console 更新 `eva9-users` 表中的 `passwordHash` 字段。

### Q: 本地开发时 API 不可用？
A: 本地 `npm run dev` 只启动 Astro 静态服务器 (端口 3004)。Lambda API 需要通过 `sam local start-api` 本地启动，或部署到 AWS 后使用生产 API URL。

### Q: 如何修改主题色？
A: 编辑 `src/styles/global.css` 中 Tailwind v4 的 `--color-primary-*` CSS 变量。

### Q: 为什么有些页面没有 hreflang 标签？
A: 所有页面 (含 `Base.astro` 布局) 已自动生成 `en/zh/x-default` hreflang 标签，以及 canonical URL、OG meta、Twitter Card。验证方式：
```bash
curl -s https://blog.eva9.ai/en/ | grep hreflang
```

---

## 技术栈

| 层级 | 技术 |
|------|------|
| **前端框架** | Astro 5 (Static Site Generation) |
| **样式** | Tailwind CSS 4 |
| **字体** | Inter + JetBrains Mono (Google Fonts) |
| **后端 API** | AWS Lambda (Node.js 22) |
| **数据库** | DynamoDB (PAY_PER_REQUEST) |
| **认证** | JWT (jsonwebtoken) |
| **密码** | bcryptjs (10 rounds) |
| **邮件** | AWS SES |
| **CDN** | CloudFront |
| **存储** | S3 |
| **CI/CD** | GitHub Actions |
| **测试** | Node.js test runner + Vitest + Supertest |
| **语法高亮** | Shiki (github-dark-dimmed) |

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 0.1.0 | 2026-06-07 | MVP E01 完成 — 20 pages, Lambda API, UAT 测试 |

---

## UAT 状态

| Phase | 状态 | 详情 |
|-------|------|------|
| 1. 测试用例生成 | ✅ | 5 files, 250+ steps |
| 2. 验证门 | ✅ | 4.60/5.00 avg |
| 3. 自动执行 | ✅ | 112/190 steps, 76 pass |
| 4. Bug 修复 | ✅ 9/14 fixed | 8 frontend + 1 security fixed |
| 5. 后端修复 | ⏳ 待 AWS 部署 | 5 bugs (SES, AI moderation, TTL, deploy, IAM) |

---

**维护者:** Jacky Chen | blog.eva9.ai
