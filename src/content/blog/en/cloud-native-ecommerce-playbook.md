---
title: "The Cloud-Native E-Commerce Playbook: Lessons from 20 Years"
slug: "cloud-native-ecommerce-playbook"
category: "work"
pubDate: 2026-05-28
excerpt: "What I've learned building e-commerce platforms at scale on AWS and Alibaba Cloud — from payment flows to marketplace architectures."
readingTime: 7
ogImage: "/og-default.png"
---

I've spent two decades building e-commerce systems. Here's what I wish someone had told me on day one.

## Architecture That Scales (Without the Hype)

The biggest mistake I see: over-engineering before you have users.

### Phase 1: Monolith on a Cloud VM

For your first 10,000 users, a well-structured monolith on a single cloud VM works perfectly. The key disciplines:

**What matters:**
- Clean separation of concerns (even in a monolith)
- Database schema designed for eventual sharding
- Idempotent payment processing
- Observability from day one (logs, metrics, tracing)

**What doesn't matter yet:**
- Microservices
- Kubernetes
- Event sourcing

### Phase 2: Extract the Bottleneck

When you hit scale issues, the bottleneck is almost always one of three things:

1. **Payment throughput** → Extract payment service first
2. **Inventory contention** → Extract inventory service with optimistic locking
3. **Search performance** → Elasticsearch or cloud-native search

Extract *one service at a time*. Validate. Then extract the next.

## Payment Processing: The Non-Negotiables

I've built payment integrations for WeChat Pay, Alipay, credit cards, and local wallets across Asia. Some universal lessons:

1. **Idempotency keys are not optional.** Generate a unique key for every payment attempt. Never charge twice.
2. **Reconciliation runs daily.** Compare your ledger against the payment provider's settlement file. Every. Single. Day.
3. **Timeout ≠ failure.** If the payment gateway times out, the transaction might still succeed. Always query the final status.
4. **Currency is hard.** Store amounts in the smallest unit (cents, fen). Round explicitly. Never use floats.
5. **Refunds flow through the same path as charges.** Don't build a separate refund pipeline.

## Marketplace Architecture

Building a marketplace (buyers + sellers) is fundamentally different from a direct e-commerce store:

### The Trust Problem
In a direct store, you trust yourself. In a marketplace, you trust no one. Every transaction needs:

- **Escrow** — hold buyer funds until delivery confirmed
- **Dispute resolution** — clear process, evidence collection, timeline
- **Seller verification** — KYC, business licenses, bank account validation
- **Review integrity** — verified purchase only, anti-gaming heuristics

### The Data Model
```
users (id, type: buyer|seller|admin)
stores (id, seller_id, name, status)
products (id, store_id, sku, price, stock)
orders (id, buyer_id, store_id, status, total)
order_items (id, order_id, product_id, qty, price)
transaction_ledger (id, order_id, type: charge|refund|payout, amount, status)
```

Notice: the transaction ledger is its own table. Never derive financial data from order status. Your accountant will thank you.

## Loyalty Programs That Actually Work

I've designed loyalty systems for multiple platforms. What actually drives behavior:

1. **Points are a liability.** From an accounting perspective, unredeemed points are debt. Set expiration policies.
2. **Tiers change behavior more than points.** People care about status (Gold, Platinum) more than they care about 100 extra points.
3. **Simplicity wins.** If users can't mentally calculate "how many coffees until my free one," they disengage.
4. **Surprise and delight.** Occasional unexpected bonuses create more loyalty than predictable earn rates.

## Cloud Cost Management

The "serverless = cheaper" narrative is dangerous. Serverless is *more efficient at low load* and *more expensive at steady high load*. Know your crossover point.

For a typical e-commerce platform:

| Traffic | Recommendation |
|---------|---------------|
| 0-10K daily orders | Lambda + DynamoDB (on-demand) |
| 10K-100K daily orders | Lambda + DynamoDB (provisioned) |
| 100K+ daily orders | ECS/EKS + RDS/Aurora |

And always, *always* set billing alerts.

## What's Next

I'll be writing deep dives on specific topics — payment reconciliation systems, inventory management patterns, mobile-first architecture, and more.

If there's a specific topic you want me to cover, let me know in the comments.
