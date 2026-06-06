# Product Requirements Document: eva9.ai Personal Website

**Version:** v1.0 FINAL  
**Date:** 2026-06-06  
**Author:** Eva2  
**Client:** Jacky Chen (Sheng) — Solo AI Entrepreneur

---

## Executive Summary

A bilingual (Chinese/English) personal website for Jacky Chen's one-person AI company. Combines professional portfolio, multi-category blog, audience-building, and consulting lead-generation.

### Core Constraints
- [x] **完全免费** — 所有工具和服务使用免费层，$0 月费
- [x] **数据自控** — 内容、评论、留言全在自己控制的存储中
- [x] **本地优先** — 文章以 Markdown 存储在本地 Git

---

## Architecture Overview

```
┌──────────────────────────────────────────────────┐
│               本地 Ubuntu / Mac                    │
│                                                    │
│  eva9-site/                                        │
│  ├── src/content/blog/work/    ← Markdown 文章     │
│  ├── src/content/blog/learn/                       │
│  ├── src/content/blog/hobby/                       │
│  ├── src/content/blog/life/                        │
│  ├── src/assets/images/       ← 本地图片          │
│  ├── src/pages/               ← Astro 页面组件     │
│  ├── lambda/                  ← Lambda 函数源码    │
│  └── astro.config.mjs                             │
│                                                    │
│  所有内容在 Git → git push → GitHub               │
└──────────────────────────────────────────────────┘
                         │
                    git push
                         ▼
┌──────────────────────────────────────────────────┐
│            GitHub Actions (免费)                   │
│  push → Astro build → 纯静态 HTML/CSS/JS           │
│  → 部署到 S3                                       │
└──────────────────────────────────────────────────┘
                         │
                    deploy
                         ▼
┌──────────────────────────────────────────────────┐
│           AWS (你的账号，完全自控)                 │
│                                                    │
│  ┌─ S3 + CloudFront ──────────────────────────┐  │
│  │  托管静态网站 (HTML/CSS/JS)                  │  │
│  │  全球CDN，HTTPS，免费层内                     │  │
│  └────────────────────────────────────────────┘  │
│                                                    │
│  ┌─ API Gateway + Lambda + DynamoDB ───────────┐  │
│  │  POST /comment   → 提交评论                  │  │
│  │  GET  /comments   → 获取某篇文章评论          │  │
│  │  POST /contact    → 提交留言                  │  │
│  │  GET  /admin/*    → 后台管理 (JWT鉴权)       │  │
│  └────────────────────────────────────────────┘  │
│                                                    │
│  ┌─ DynamoDB Tables ───────────────────────────┐  │
│  │  comments 表  — 博客评论                      │  │
│  │  messages 表  — 访客留言                      │  │
│  │  users 表     — 注册用户                      │  │
│  │  visitors 表  — 访问记录 (IP/时间/页面)       │  │
│  └────────────────────────────────────────────┘  │
│                                                    │
│  ┌─ CloudFront Logs ───────────────────────────┐  │
│  │  原生访问日志 (IP/UA/referer 自动记录)        │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

---

## 1. Functional Requirements

### FR-1: Multi-Category Blog

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1.1 | 4 个博客类目：工作 (/work)、学习 (/learn)、爱好 (/hobby)、生活 (/life) | P0 |
| FR-1.2 | 文章以 Markdown 编写，存储在 `src/content/blog/{category}/` | P0 |
| FR-1.3 | 支持文字、图片、嵌入视频（YouTube/Bilibili）、代码块 | P0 |
| FR-1.4 | 首页显示最新文章（跨类目） | P0 |
| FR-1.5 | 类目页面：该类目下的文章列表 + 分页 | P0 |
| FR-1.6 | 文章页：标题、日期、类目标签、阅读时间、作者、正文 | P0 |
| FR-1.7 | 文章自动生成目录（TOC）（>500字时） | P1 |
| FR-1.8 | 相关文章推荐（同类目 + 同标签） | P1 |
| FR-1.9 | RSS feed | P1 |
| FR-1.10 | 上一页/下一页导航 | P2 |

### FR-2: Bilingual (中英双语)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-2.1 | URL 结构：`/en/blog/...` 和 `/zh/blog/...` | P0 |
| FR-2.2 | 语言切换按钮（自动检测浏览器语言） | P0 |
| FR-2.3 | 作者写一种语言的文章，手动翻译后存入对应语言目录 | P0 |
| FR-2.4 | `hreflang` 标签自动生成 | P1 |
| FR-2.5 | 翻译文章标注链接指向原文 | P1 |
| FR-2.6 | 界面文字（导航、按钮等）双语切换 | P1 |

### FR-3: User Registration & Comments

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-3.1 | 邮箱注册（email + password，bcrypt 加密） | P0 |
| FR-3.2 | 注册用户可评论博客文章 | P0 |
| FR-3.3 | 评论显示：作者名、时间、内容 | P0 |
| FR-3.4 | 评论提交后即时显示（Lambda API 实时） | P0 |
| FR-3.5 | hCaptcha 防垃圾评论 | P1 |
| FR-3.6 | 邮箱验证（发送验证链接） | P1 |
| FR-3.7 | 用户可删除自己的评论 | P2 |

### FR-4: Contact / Messages

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-4.1 | 联系表单：姓名、邮箱、内容 | P0 |
| FR-4.2 | 提交后存储到 DynamoDB + 邮件通知管理员 | P0 |
| FR-4.3 | 邮件通知使用 AWS SES（6.2万封/月永久免费） | P1 |
| FR-4.4 | hCaptcha 防垃圾 | P1 |

### FR-5: Admin Backend

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-5.1 | Admin JWT 登录（单一管理员账号，环境变量配置） | P0 |
| FR-5.2 | 评论审核（通过/拒绝/删除） | P1 |
| FR-5.3 | 查看/删除注册用户 | P1 |
| FR-5.4 | 查看/回复留言 | P1 |
| FR-5.5 | 访问统计看板（PV、访客IP、热门文章） | P1 |
| FR-5.6 | 文章管理直接在本地 Markdown 编辑 → git push 发布 | P0 |

### FR-6: GEO & SEO

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-6.1 | 全站静态生成（Astro SSG） | P0 |
| FR-6.2 | 自动生成 XML sitemap（/en/ 和 /zh/ 分开） | P0 |
| FR-6.3 | OpenGraph + Twitter Card meta 标签 | P0 |
| FR-6.4 | JSON-LD 结构化数据（Article、Person、BreadcrumbList） | P0 |
| FR-6.5 | `hreflang` 标签 | P1 |
| FR-6.6 | `llms.txt` 和 `llms-full.txt` | P1 |
| FR-6.7 | Canonical URL | P1 |
| FR-6.8 | 所有图片带 alt 文本 | P1 |
| FR-6.9 | 自动生成 meta description | P1 |

### FR-7: Visitor Analytics & IP Tracking

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-7.1 | 记录每次页面访问：IP、时间、URL、User-Agent | P0 |
| FR-7.2 | 通过 CloudFront 标准日志自动记录（免费） | P0 |
| FR-7.3 | 或通过 Lambda + DynamoDB visitors 表主动记录 | P1 |
| FR-7.4 | 管理后台显示：总PV、独立访客、热门页面 | P1 |
| FR-7.5 | 显示最近访问记录（IP + 时间 + 页面） | P1 |

### FR-8: Homepage & Static Pages

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-8.1 | 首页：Hero（名字 + 一句话介绍） + 最新文章 6 篇 | P0 |
| FR-8.2 | 首页：四个类目快捷入口卡片 | P0 |
| FR-8.3 | About 页面：个人介绍、经历时间线、技能、照片 | P0 |
| FR-8.4 | Services 页面：咨询服务介绍、案例、联系方式 | P1 |
| FR-8.5 | 404 页面：搜索 + 推荐文章链接 | P2 |
| FR-8.6 | 深色模式切换（跟随系统偏好） | P1 |

---

## 2. DynamoDB Table Design

### Table: `eva9_comments`
| Attribute | Type | Description |
|-----------|------|-------------|
| `post_slug` (PK) | String | 文章 slug，如 `work/building-cloud-platform` |
| `comment_id` (SK) | String | UUID，保证唯一 |
| `author_name` | String | 评论者名字 |
| `author_email` | String | 评论者邮箱 |
| `body` | String | 评论内容 |
| `is_approved` | Bool | 默认 true（可改为审核模式） |
| `created_at` | String | ISO 时间戳 |
| GSI: `comment_id-index` | | 按 comment_id 单独查询 |

### Table: `eva9_messages`
| Attribute | Type | Description |
|-----------|------|-------------|
| `msg_id` (PK) | String | UUID |
| `name` | String | 留言者名字 |
| `email` | String | 留言者邮箱 |
| `message` | String | 留言内容 |
| `is_read` | Bool | 管理员已读标记 |
| `created_at` | String | ISO 时间戳 |

### Table: `eva9_users`
| Attribute | Type | Description |
|-----------|------|-------------|
| `email` (PK) | String | 邮箱（登录用） |
| `password_hash` | String | bcrypt 哈希 |
| `name` | String | 显示名 |
| `is_verified` | Bool | 邮箱是否验证 |
| `created_at` | String | 注册时间 |

### Table: `eva9_visitors`
| Attribute | Type | Description |
|-----------|------|-------------|
| `visitor_id` (PK) | String | UUID |
| `ip` | String | 访问者 IP |
| `page_url` | String | 访问的页面 |
| `user_agent` | String | 浏览器信息 |
| `referer` | String | 来源 |
| `created_at` | String | ISO 时间戳 |
| TTL: `expires_at` | Number | 90天后自动删除（节省存储） |

---

## 3. Lambda API Design

### Endpoints

| Method | Path | Auth | Function |
|--------|------|------|----------|
| POST | `/api/register` | — | 用户注册 |
| POST | `/api/login` | — | 用户登录 → 返回 JWT |
| POST | `/api/verify-email` | — | 邮箱验证 |
| GET | `/api/comments/{post_slug}` | — | 获取文章评论列表 |
| POST | `/api/comments` | JWT (user) | 提交评论 |
| DELETE | `/api/comments/{comment_id}` | JWT (user/self) | 删除自己的评论 |
| POST | `/api/contact` | — | 提交留言 |
| POST | `/api/admin/login` | — | 管理员登录 |
| GET | `/api/admin/comments` | JWT (admin) | 获取所有评论 (管理) |
| PATCH | `/api/admin/comments/{id}` | JWT (admin) | 审核评论 |
| GET | `/api/admin/messages` | JWT (admin) | 获取所有留言 |
| GET | `/api/admin/users` | JWT (admin) | 用户列表 |
| DELETE | `/api/admin/users/{email}` | JWT (admin) | 删除用户 |
| GET | `/api/admin/visitors` | JWT (admin) | 访问统计 |
| POST | `/api/log-visit` | — | 记录页面访问 |

### Lambda 实现要点
- 所有 Lambda 共享同一个 Node.js runtime
- JWT secret 存储在 AWS Systems Manager Parameter Store（免费）
- hCaptcha 验证在提交评论/留言/注册前执行
- CORS 配置允许域名 `eva9.ai` 的请求

---

## 4. Technology Stack (Final)

| Layer | Technology | Cost |
|-------|-----------|------|
| Static Site Generator | **Astro 5** | Free |
| CSS Framework | **Tailwind CSS 4** | Free |
| Content | **Markdown + Git** | Free |
| Static Hosting | **AWS S3 + CloudFront** | Free tier |
| API Backend | **AWS Lambda** (Node.js) | Free tier |
| Database | **AWS DynamoDB** | Free tier |
| API Gateway | **AWS API Gateway HTTP** | Free tier |
| Auth | **JWT** (custom, bcrypt) | Free |
| Email | **AWS SES** | Free tier (62K/month) |
| CAPTCHA | **hCaptcha** | Free tier |
| CI/CD | **GitHub Actions** | Free |
| Domain | **eva9.ai** (已有) | 已购买 |
| SSL | **CloudFront 自带** | Free |

**总月费: $0**

---

## 5. Content Structure

```
src/content/
├── blog/
│   ├── en/
│   │   ├── work/
│   │   │   └── building-cloud-platform.md
│   │   ├── learn/
│   │   │   └── no-code-ml-getting-started.md
│   │   ├── hobby/
│   │   │   └── home-lab-setup.md
│   │   └── life/
│   │       └── trip-to-japan-2026.md
│   └── zh/
│       ├── work/
│       ├── learn/
│       ├── hobby/
│       └── life/
├── pages/
│   ├── index.astro          # 首页
│   ├── about.astro          # 关于我
│   ├── services.astro       # 咨询服务
│   ├── contact.astro        # 联系页面
│   ├── blog/
│   │   ├── index.astro      # 博客首页
│   │   ├── [category].astro # 类目页
│   │   └── [...slug].astro  # 文章页 (动态路由)
│   └── admin/
│       ├── login.astro      # 管理员登录
│       └── dashboard.astro  # 管理后台
├── components/              # Astro 组件
├── layouts/                 # 页面布局
└── assets/
    └── images/              # 文章图片
```

---

## 6. Development Phases

### Phase 1: 静态网站骨架 (Week 1-2)
- [ ] Astro 项目初始化 + i18n 路由 (`/en/` `/zh/`)
- [ ] Tailwind CSS + 设计 tokens（颜色、字体、间距）
- [ ] 深色模式
- [ ] 首页布局（Hero + 最新文章网格 + 类目卡片）
- [ ] About 页面
- [ ] Header + Footer 组件
- [ ] 部署到 S3 + CloudFront

### Phase 2: 博客系统 (Week 2-3)
- [ ] Astro Content Collections（4 类目）
- [ ] 博客首页 + 类目过滤
- [ ] 文章页模板（TOC、阅读时间、元数据）
- [ ] 上一页/下一页
- [ ] RSS + sitemap.xml
- [ ] SEO meta（OG、Twitter、JSON-LD）
- [ ] hreflang 标签
- [ ] 首批 5-10 篇文章

### Phase 3: 动态 API (Week 3-4)
- [ ] DynamoDB 表创建（CloudFormation 或 Terraform）
- [ ] Lambda 函数开发（register、login、comment、contact）
- [ ] API Gateway 配置
- [ ] hCaptcha 集成
- [ ] JWT 认证（用户 + 管理员）
- [ ] CORS 配置
- [ ] 前端评论组件 + API 调用

### Phase 4: 管理后台 (Week 4-5)
- [ ] Admin 登录页面
- [ ] 评论审核面板
- [ ] 留言查看
- [ ] 用户管理
- [ ] 访问统计看板
- [ ] 管理员 JWT（环境变量配置）

### Phase 5: 访问追踪 (Week 5-6)
- [ ] CloudFront 标准日志启用
- [ ] Lambda log-visit 函数
- [ ] DynamoDB visitors 表
- [ ] 管理后台统计面板集成

### Phase 6: 打磨 + 上线 (Week 6-7)
- [ ] Lighthouse 性能优化（目标 95+）
- [ ] 移动端响应式测试
- [ ] 无障碍（WCAG AA）检查
- [ ] llms.txt / SEO 审计
- [ ] 内容补充
- [ ] 🚀 Launch

---

## 7. AWS 免费层验证

| 服务 | 免费层额度 | 个人博客预估用量 | 是否免费 |
|------|-----------|-----------------|---------|
| Lambda | 100万请求/月 + 40万秒计算 | ~5千请求/月 | ✅ $0 |
| DynamoDB | 25GB存储 + 25 WCU/RCU | <1MB, <5 WCU | ✅ $0 |
| API Gateway HTTP | 100万请求/月 (首年) | ~5千/月 | ✅ $0 |
| S3 | 5GB存储 | <100MB | ✅ $0 |
| CloudFront | 1TB出站 + 1千万请求 | <5GB + <1万请求 | ✅ $0 |
| SES | 6.2万封/月 | <100封/月 | ✅ $0 |
| GitHub Actions | 2000分钟/月 | <500分钟/月 | ✅ $0 |
| **合计** | | | **$0/月** 🎉 |

---

## 8. Open Questions

1. ✅ **部署方案?** → S3 + CloudFront + Lambda + DynamoDB（已确认）
2. ❓ **域名:** eva9.ai 主域名 or blog.eva9.ai 子域名？
3. ❓ **评论审核:** 即时发布 or 管理员审核后发布？
4. ❓ **深色模式:** 默认跟随系统 or 手动切换？
5. ❓ **首页设计风格:** 极简（像paulgraham.com）or 现代卡片式（像linear.app/blog）？

---

**Status:** FINAL — Ready for Phase 1
