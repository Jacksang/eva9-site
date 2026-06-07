# Eva9-Site UAT — E01 SEO & Crawling

**Version:** 1.0 | **Date:** 2026-06-07
**Role:** Search Engine / Social Platform | **Epic:** E01
**Source:** plan/E01-seo-stories.md
**Duration:** ~15 min

## UAT Pass Criteria

| # | Criterion | Result |
|---|-----------|--------|
| a | All SEO meta tags present and valid | [ ] |
| b | Sitemap and robots.txt accessible and valid | [ ] |
| c | Structured data (JSON-LD) validates | [ ] |
| d | hreflang and canonical tags correct | [ ] |
| e | RSS feed accessible and well-formed | [ ] |

---

## Pre-Test Setup

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| P1 | Verify dev server is running on localhost:4321 | Process responds | [ ] |
| P2 | Install `xmllint` for XML validation (`which xmllint`) | Executable found | [ ] |
| P3 | Fetch sitemap: `curl -s http://localhost:4321/sitemap.xml \| xmllint --noout -` | Valid XML returned | [ ] |
| P4 | Fetch robots.txt: `curl -s http://localhost:4321/robots.txt` | Text with directives returned | [ ] |
| P5 | Fetch RSS feed: `curl -s http://localhost:4321/rss.xml \| xmllint --noout -` | Valid XML returned | [ ] |

---

## Test Steps

### US-E01-SEO-01: Crawl complete XML sitemap

**Source AC:** E01-SEO-01 AC-01 through AC-05

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 01-01 | Run `curl -s http://localhost:4321/sitemap.xml \| xmllint --noout - && echo "VALID" \|\| echo "INVALID"` | Outputs `VALID` | [ ] |
| 01-02 | Count URLs: `curl -s http://localhost:4321/sitemap.xml \| grep -c '<loc>'` | ≥ 14 (all pages + bilingual blog posts) | [ ] |
| 01-03 | Check bilingual posts appear twice: `curl -s http://localhost:4321/sitemap.xml \| grep -oP '<loc>\K[^<]+' \| grep -c '/en/blog/'` | ≥ 2 (en blog post URLs) | [ ] |
| 01-04 | Check ZH URLs: `curl -s http://localhost:4321/sitemap.xml \| grep -oP '<loc>\K[^<]+' \| grep -c '/zh/'` | ≥ 6 (zh pages + blog posts) | [ ] |
| 01-05 | Verify `<lastmod>` is present on every `<url>`: `curl -s http://localhost:4321/sitemap.xml \| grep -c '<lastmod>' \| xargs -I{} echo "{} urls have lastmod"` | Count matches URL count from 01-02 | [ ] |
| 01-06 | Check `<loc>` URLs use `https://blog.eva9.ai/` base: `curl -s http://localhost:4321/sitemap.xml \| grep -oP '<loc>\K[^<]+' \| grep -v '^https://blog.eva9.ai/' \| wc -l` | Output: `0` (all URLs on correct domain) | [ ] |
| 01-07 | Verify `robots.txt` references sitemap: `curl -s http://localhost:4321/robots.txt \| grep -E '^Sitemap:'` | `Sitemap: https://blog.eva9.ai/sitemap.xml` | [ ] |
| 01-08 | Rebuild test (manual): `npm run build && curl -s http://localhost:4321/sitemap.xml \| grep -c '<loc>'` | Count matches or exceeds prior build | [ ] |
| 01-09 | Confirm no duplicated `<loc>` values: `curl -s http://localhost:4321/sitemap.xml \| grep -oP '<loc>\K[^<]+' \| sort \| uniq -d \| wc -l` | Output: `0` | [ ] |

---

### US-E01-SEO-02: OpenGraph and Twitter Card meta tags

**Source AC:** E01-SEO-02 AC-01 through AC-05

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 02-01 | Homepage og:title: `curl -s http://localhost:4321/en/ \| grep -oP '<meta property="og:title" content="\K[^"]+'` | Non-empty string returned | [ ] |
| 02-02 | Homepage og:description: `curl -s http://localhost:4321/en/ \| grep -oP '<meta property="og:description" content="\K[^"]+'` | Non-empty string returned | [ ] |
| 02-03 | Homepage og:image: `curl -s http://localhost:4321/en/ \| grep -oP '<meta property="og:image" content="\K[^"]+'` | Non-empty image path returned | [ ] |
| 02-04 | Homepage og:url: `curl -s http://localhost:4321/en/ \| grep -oP '<meta property="og:url" content="\K[^"]+'` | `https://blog.eva9.ai/en` | [ ] |
| 02-05 | Homepage og:type: `curl -s http://localhost:4321/en/ \| grep -oP '<meta property="og:type" content="\K[^"]+'` | `website` | [ ] |
| 02-06 | Homepage twitter:card: `curl -s http://localhost:4321/en/ \| grep -oP '<meta name="twitter:card" content="\K[^"]+'` | `summary_large_image` | [ ] |
| 02-07 | Homepage twitter:title: `curl -s http://localhost:4321/en/ \| grep -oP '<meta name="twitter:title" content="\K[^"]+'` | Non-empty string matching og:title | [ ] |
| 02-08 | Homepage twitter:description: `curl -s http://localhost:4321/en/ \| grep -oP '<meta name="twitter:description" content="\K[^"]+'` | Non-empty string matching og:description | [ ] |
| 02-09 | Homepage twitter:image: `curl -s http://localhost:4321/en/ \| grep -oP '<meta name="twitter:image" content="\K[^"]+'` | Non-empty image path matching og:image | [ ] |
| 02-10 | Blog post og:type is "article": `curl -s http://localhost:4321/en/blog/why-i-built-this-blog \| grep -oP '<meta property="og:type" content="\K[^"]+'` | `article` | [ ] |
| 02-11 | Blog post og:url matches slug: `curl -s http://localhost:4321/en/blog/why-i-built-this-blog \| grep -oP '<meta property="og:url" content="\K[^"]+'` | `https://blog.eva9.ai/en/blog/why-i-built-this-blog` | [ ] |
| 02-12 | Blog post og:title: `curl -s http://localhost:4321/en/blog/why-i-built-this-blog \| grep -oP '<meta property="og:title" content="\K[^"]+'` | Matches post title "Why I Built This Blog in 2026" | [ ] |
| 02-13 | Blog post article:published_time: `curl -s http://localhost:4321/en/blog/why-i-built-this-blog \| grep -oP '<meta property="article:published_time" content="\K[^"]+'` | `2026-06-01T00:00:00.000Z` | [ ] |
| 02-14 | ZH page og:locale: `curl -s http://localhost:4321/zh/ \| grep -oP '<meta property="og:locale" content="\K[^"]+'` | Locale present (e.g. `zh_CN` or `zh`) | [ ] |
| 02-15 | Default fallback image check: `curl -s http://localhost:4321/en/about \| grep -oP '<meta property="og:image" content="\K[^"]+'` | Returns a path (e.g. `/og-default.png`), not blank | [ ] |
| 02-16 | Meta tags are in `<head>` (not injected by JS): `curl -s http://localhost:4321/en/ \| grep -oP '</head>' \| head -1; curl -s http://localhost:4321/en/ \| grep -oP '<meta property="og:title"' \| head -1` | Both present; og:title appears before `</head>` | [ ] |
| 02-17 | All 5 og tags on homepage: `curl -s http://localhost:4321/en/ \| grep -oP '<meta property="og:' \| wc -l` | ≥ 5 (title, description, image, url, type, site_name, locale) | [ ] |
| 02-18 | All 5 twitter tags on homepage: `curl -s http://localhost:4321/en/ \| grep -oP '<meta name="twitter:' \| wc -l` | ≥ 3 (card, title, description, image) | [ ] |

---

### US-E01-SEO-03: Parse JSON-LD structured data

**Source AC:** E01-SEO-03 AC-01 through AC-05

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 03-01 | Extract JSON-LD from homepage: `curl -s http://localhost:4321/en/ \| sed -n '/<script type="application\/ld+json">/,/<\/script>/p' \| sed '1s/.*<script type="application\/ld+json">//' \| sed '$s/<\/script>.*//'` | Valid JSON-LD block returned (may be empty — homepage may not have JSON-LD yet) | [ ] |
| 03-02 | Extract JSON-LD from blog post: `curl -s http://localhost:4321/en/blog/why-i-built-this-blog \| sed -n '/<script type="application\/ld+json">/,/<\/script>/p' \| sed '1s/.*<script type="application\/ld+json">//' \| sed '$s/<\/script>.*//' \| python3 -m json.tool 2>&1` | Valid JSON output (no parse error) | [ ] |
| 03-03 | Check BlogPosting @type: `curl -s http://localhost:4321/en/blog/why-i-built-this-blog \| sed -n '/<script type="application\/ld+json">/,/<\/script>/p' \| sed '1s/.*<script type="application\/ld+json">//' \| sed '$s/<\/script>.*//' \| python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('@type','MISSING'))"` | `BlogPosting` | [ ] |
| 03-04 | Check headline: Same as above with `d.get('headline','MISSING')` | `Why I Built This Blog in 2026` | [ ] |
| 03-05 | Check author name: Same pipeline with `d['author']['name']` | `Jacky Chen` | [ ] |
| 03-06 | Check datePublished: Same pipeline with `d.get('datePublished','MISSING')` | `2026-06-01T00:00:00.000Z` | [ ] |
| 03-07 | Check description: Same pipeline with `d.get('description','MISSING')` | Non-empty string | [ ] |
| 03-08 | Check image: Same pipeline with `d.get('image','MISSING')` | Non-empty string | [ ] |
| 03-09 | Check publisher name: Same pipeline with `d['publisher']['name']` | `eva9.ai` | [ ] |
| 03-10 | Check publisher @type: Same pipeline with `d['publisher']['@type']` | `Organization` | [ ] |
| 03-11 | Person JSON-LD on homepage (if implemented): `curl -s http://localhost:4321/en/ \| sed -n '/<script type="application\/ld+json">/,/<\/script>/p' \| grep -oP '"@type":"Person"'` | `"@type":"Person"` (may be absent — feature gap noted) | [ ] |
| 03-12 | BreadcrumbList JSON-LD on blog post: Same extraction method, check for `"@type":"BreadcrumbList"` | Output contains `"@type":"BreadcrumbList"` | [ ] |
| 03-13 | Validate JSON-LD with schema.org (manual): Visit `https://search.google.com/test/rich-results` and submit blog post URL | No errors reported | [ ] |
| 03-14 | JSON-LD is in `<head>` at build time: `curl -s http://localhost:4321/en/blog/why-i-built-this-blog \| grep -oP 'application/ld\+json' \| wc -l` | ≥ 1 (present before `</head>`) | [ ] |
| 03-15 | Second blog post has valid JSON-LD: Repeat 03-02 for `/en/blog/cloud-native-ecommerce-playbook` | Valid JSON returned | [ ] |
| 03-16 | ZH blog post has JSON-LD: Repeat 03-02 for `/zh/blog/why-i-built-this-blog` | Valid JSON returned (with zh content) | [ ] |

---

### US-E01-SEO-04: Identify canonical URLs

**Source AC:** E01-SEO-04 AC-01 through AC-05

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 04-01 | Homepage canonical: `curl -s http://localhost:4321/en/ \| grep -oP '<link rel="canonical" href="\K[^"]+'` | `https://blog.eva9.ai/en` | [ ] |
| 04-02 | Blog list canonical: `curl -s http://localhost:4321/en/blog \| grep -oP '<link rel="canonical" href="\K[^"]+'` | `https://blog.eva9.ai/en/blog` | [ ] |
| 04-03 | Blog post canonical: `curl -s http://localhost:4321/en/blog/why-i-built-this-blog \| grep -oP '<link rel="canonical" href="\K[^"]+'` | `https://blog.eva9.ai/en/blog/why-i-built-this-blog` | [ ] |
| 04-04 | ZH blog post canonical: `curl -s http://localhost:4321/zh/blog/why-i-built-this-blog \| grep -oP '<link rel="canonical" href="\K[^"]+'` | `https://blog.eva9.ai/zh/blog/why-i-built-this-blog` | [ ] |
| 04-05 | About page canonical: `curl -s http://localhost:4321/en/about \| grep -oP '<link rel="canonical" href="\K[^"]+'` | `https://blog.eva9.ai/en/about` | [ ] |
| 04-06 | Canonical URL starts with `https://blog.eva9.ai/` on all pages (no trailing slash mismatch): `for p in en/ en/blog en/blog/why-i-built-this-blog en/about en/contact zh/ zh/blog zh/blog/why-i-built-this-blog; do curl -s "http://localhost:4321/$p" \| grep -oP '<link rel="canonical" href="\K[^"]+' \| grep -q '^https://blog.eva9.ai/' && echo "OK: $p" \|\| echo "FAIL: $p"; done` | All pages return `OK` | [ ] |
| 04-07 | No duplicate canonical URLs across different paths: `for p in en en/index; do curl -s "http://localhost:4321/$p" \| grep -oP '<link rel="canonical" href="\K[^"]+'; done \| sort \| uniq -d` | Empty (no duplicates) | [ ] |
| 04-08 | Canonical tag is in `<head>`: `curl -s http://localhost:4321/en/blog/why-i-built-this-blog \| grep -oP '<link rel="canonical"'` | At least one match | [ ] |

**Known issue:** Current build (2026-06-07) does not emit `<link rel="canonical">` tags — see [Issues](#open-issues). Steps above define expected behaviour once implemented.

---

### US-E01-SEO-05: Identify hreflang alternatives

**Source AC:** E01-SEO-05 AC-01 through AC-05

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 05-01 | EN blog post hreflang x-default: `curl -s http://localhost:4321/en/blog/why-i-built-this-blog \| grep -oP '<link rel="alternate" hreflang="\K[^"]+' \| head -1` | `x-default` (or `en`) present | [ ] |
| 05-02 | EN blog post links to ZH: `curl -s http://localhost:4321/en/blog/why-i-built-this-blog \| grep -oP '<link rel="alternate" hreflang="zh" href="\K[^"]+'` | `https://blog.eva9.ai/zh/blog/why-i-built-this-blog` | [ ] |
| 05-03 | ZH blog post links to EN: `curl -s http://localhost:4321/zh/blog/why-i-built-this-blog \| grep -oP '<link rel="alternate" hreflang="en" href="\K[^"]+'` | `https://blog.eva9.ai/en/blog/why-i-built-this-blog` | [ ] |
| 05-04 | Homepage hreflang pair: `curl -s http://localhost:4321/en/ \| grep -oP '<link rel="alternate" hreflang="zh" href="\K[^"]+'` | `https://blog.eva9.ai/zh` | [ ] |
| 05-05 | ZH homepage hreflang pair: `curl -s http://localhost:4321/zh/ \| grep -oP '<link rel="alternate" hreflang="en" href="\K[^"]+'` | `https://blog.eva9.ai/en` | [ ] |
| 05-06 | All hreflang URLs use HTTPS absolute: `curl -s http://localhost:4321/en/blog/why-i-built-this-blog \| grep -oP '<link rel="alternate" href="\K[^"]+' \| grep -v '^https://blog.eva9.ai/'` | Empty output (all URLs correct) | [ ] |
| 05-07 | Reciprocal check: EN page hreflang `en` = self, hreflang `zh` = ZH counterpart: `curl -s http://localhost:4321/en/blog/why-i-built-this-blog \| grep -oP '<link rel="alternate" hreflang="en" href="\K[^"]+'` | `https://blog.eva9.ai/en/blog/why-i-built-this-blog` | [ ] |
| 05-08 | Hreflang tags in `<head>` only: `curl -s http://localhost:4321/en/blog/why-i-built-this-blog \| grep -c 'hreflang'` | ≥ 2 (en + zh) | [ ] |
| 05-09 | Blog listing page has hreflang: `curl -s http://localhost:4321/en/blog \| grep -oP '<link rel="alternate" hreflang="zh" href="\K[^"]+'` | `https://blog.eva9.ai/zh/blog` | [ ] |

**Known issue:** Current build (2026-06-07) does not emit `<link rel="alternate" hreflang="...">` tags — see [Issues](#open-issues). Steps above define expected behaviour once implemented.

---

### US-E01-SEO-06: Read RSS feed

**Source AC:** E01-SEO-06 AC-01 through AC-05

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| 06-01 | Fetch RSS: `curl -s http://localhost:4321/rss.xml \| xmllint --noout - && echo "VALID" \|\| echo "INVALID"` | `VALID` | [ ] |
| 06-02 | Count items: `curl -s http://localhost:4321/rss.xml \| grep -c '<item>'` | ≥ 2 (matching blog post count) | [ ] |
| 06-03 | Check channel title: `curl -s http://localhost:4321/rss.xml \| grep -oP '<title>\K[^<]+' \| head -1` | `blog.eva9.ai` | [ ] |
| 06-04 | Check channel link: `curl -s http://localhost:4321/rss.xml \| grep -oP '<link>\K[^<]+' \| head -1` | `https://blog.eva9.ai` | [ ] |
| 06-05 | Check channel description: `curl -s http://localhost:4321/rss.xml \| grep -oP '<description>\K[^<]+' \| head -1` | Non-empty blog description | [ ] |
| 06-06 | Check language: `curl -s http://localhost:4321/rss.xml \| grep -oP '<language>\K[^<]+'` | `en` | [ ] |
| 06-07 | Check `<lastBuildDate>` is present and recent: `curl -s http://localhost:4321/rss.xml \| grep -oP '<lastBuildDate>\K[^<]+'` | Valid RFC-822 date matching today (2026-06-07) | [ ] |
| 06-08 | Item has valid `<guid>` unique per post: `curl -s http://localhost:4321/rss.xml \| grep -oP '<guid>\K[^<]+' \| sort \| uniq -d \| wc -l` | `0` | [ ] |
| 06-09 | Item titles present: `curl -s http://localhost:4321/rss.xml \| grep -oP '<title>\K[^<]+' \| tail -n +2` | Non-empty titles for each item | [ ] |
| 06-10 | Items sorted by pubDate descending (newest first): `curl -s http://localhost:4321/rss.xml \| grep -oP '<pubDate>\K[^<]+'` | Most recent date appears first | [ ] |
| 06-11 | RSS auto-discovery link in homepage: `curl -s http://localhost:4321/en/ \| grep -oP '<link[^>]*type="application/rss\+xml"[^>]*>'` | Contains href pointing to RSS feed | [ ] |
| 06-12 | RSS auto-discovery link href: Extract via `curl -s http://localhost:4321/en/ \| grep -oP '<link[^>]*type="application/rss\+xml"[^>]+href="\K[^"]+'` | `https://blog.eva9.ai/rss.xml` | [ ] |

---

## Error States

| # | Step | Expected | [ ] |
|---|------|----------|-----|
| E1 | Fetch nonexistent page: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/nonexistent` | `404` | [ ] |
| E2 | Fetch nonexistent XML: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/nonexistent.xml` | `404` | [ ] |
| E3 | Fetch sitemap without `.xml`: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/sitemap` | `404` or redirect | [ ] |
| E4 | Fetch `/en/nonexistent-page/`: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/en/nonexistent-page` | `404` | [ ] |
| E5 | Wrong HTTP method on sitemap: `curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:4321/sitemap.xml` | `405` or `404` | [ ] |
| E6 | Traversal attempt: `curl -s -o /dev/null -w "%{http_code}" "http://localhost:4321/../../../etc/passwd"` | `400` or `404` (not 200) | [ ] |

---

## Open Issues

| # | Issue | Priority | Status |
|---|-------|----------|--------|
| 1 | **Missing `<link rel="canonical">` tags** — No page currently emits a canonical link element. Search engines will see duplicate content across HTTP/HTTPS and possibly `www` vs non-`www`. | **High** | Open |
| 2 | **Missing `<link rel="alternate" hreflang="...">` tags** — No page currently emits hreflang link elements. Without these, search engines may not recognise the EN/ZH pairing. | **High** | Open |
| 3 | **Homepage JSON-LD (Person)** — Homepage likely lacks the `Person` schema defined in E01-SEO-03 AC-01. Blog posts have `BlogPosting` but homepage may be missing schema. | **Medium** | Verify |
| 4 | **BreadcrumbList JSON-LD** — Blog post JSON-LD currently only includes `BlogPosting` type. May need to add `BreadcrumbList` for rich search results. | **Medium** | Verify |
| 5 | **RSS feed only EN** — RSS currently serves English-only posts. ZH blog posts may not appear in the feed, limiting discoverability of Chinese content. | **Low** | Verify |

---

## Sign-Off

| Tester | Date | Result | Issues |
|--------|------|--------|--------|
| | 2026-06-07 | Pass / Fail | |
