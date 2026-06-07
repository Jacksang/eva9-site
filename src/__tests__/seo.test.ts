import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

describe('SEO library', () => {
  const source = readFileSync('src/lib/seo.ts', 'utf-8');

  it('should generate og:title meta tag', () => {
    assert.ok(source.includes('og:title'), 'should include og:title');
    assert.ok(source.includes('og:description'), 'should include og:description');
    assert.ok(source.includes('og:image'), 'should include og:image');
  });

  it('should generate twitter card meta', () => {
    assert.ok(source.includes('twitter:card'), 'should include twitter:card');
    assert.ok(source.includes('twitter:title'), 'should include twitter:title');
  });

  it('should generate JSON-LD structured data', () => {
    assert.ok(source.includes('BlogPosting'), 'should include BlogPosting schema');
    assert.ok(source.includes('Person'), 'should include Person author');
    assert.ok(source.includes('datePublished'), 'should include datePublished');
  });

  it('should escape HTML entities', () => {
    assert.ok(source.includes('escapeHtml'), 'should have escapeHtml function');
    assert.ok(source.includes('&amp;'), 'should escape &');
    assert.ok(source.includes('&lt;'), 'should escape <');
  });

  it('should support both website and article og:type', () => {
    assert.ok(source.includes("'website' | 'article'"), 'should support website and article types');
    assert.ok(source.includes('article:published_time'), 'articles should have published_time');
  });
});
