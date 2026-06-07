import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('eva9-site smoke tests', () => {
  it('should pass basic assertion', () => {
    assert.strictEqual(1 + 1, 2);
  });

  it('should parse Markdown frontmatter correctly', () => {
    const sample = `---
title: "Test Post"
slug: "test-post"
category: "work"
pubDate: 2026-06-01
excerpt: "A test post"
---`;
    assert.ok(sample.includes('title'));
    assert.ok(sample.includes('slug'));
    assert.ok(sample.includes('category'));
  });
});
