/**
 * Integration smoke tests — runs against built static site or dev server.
 * Verifies that the site builds and serves correctly.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';

describe('Static site integration', () => {
  it('should build and generate dist/ directory', () => {
    assert.ok(existsSync(DIST), 'dist/ should exist after build');
  });

  // English pages
  const enPages = [
    { path: 'en/index.html', name: 'English homepage' },
    { path: 'en/about/index.html', name: 'English about' },
    { path: 'en/blog/index.html', name: 'English blog index' },
    { path: 'en/contact/index.html', name: 'English contact' },
  ];

  for (const page of enPages) {
    it(`should generate ${page.name}`, () => {
      const filePath = join(DIST, page.path);
      assert.ok(existsSync(filePath), `${page.path} should exist`);
      const content = readFileSync(filePath, 'utf-8');
      assert.ok(content.includes('<!DOCTYPE html>'), `${page.name} should be valid HTML`);
      assert.ok(content.includes('lang="en"'), `${page.name} should have lang="en"`);
    });
  }

  // Chinese pages
  const zhPages = [
    { path: 'zh/index.html', name: 'Chinese homepage' },
    { path: 'zh/about/index.html', name: 'Chinese about' },
    { path: 'zh/blog/index.html', name: 'Chinese blog index' },
    { path: 'zh/contact/index.html', name: 'Chinese contact' },
  ];

  for (const page of zhPages) {
    it(`should generate ${page.name}`, () => {
      const filePath = join(DIST, page.path);
      assert.ok(existsSync(filePath), `${page.path} should exist`);
      const content = readFileSync(filePath, 'utf-8');
      assert.ok(content.includes('<!DOCTYPE html>'), `${page.name} should be valid HTML`);
      assert.ok(content.includes('lang="zh"'), `${page.name} should have lang="zh"`);
    });
  }

  // SEO
  it('should generate sitemap.xml', () => {
    assert.ok(existsSync(join(DIST, 'sitemap.xml')), 'sitemap.xml should exist');
  });

  it('should generate rss.xml', () => {
    assert.ok(existsSync(join(DIST, 'rss.xml')), 'rss.xml should exist');
  });

  it('should generate robots.txt', () => {
    const content = readFileSync(join(DIST, 'robots.txt'), 'utf-8');
    assert.ok(content.includes('Sitemap:'), 'robots.txt should reference sitemap');
  });

  // Blog posts — check individual post pages exist
  it('should generate English blog post pages', () => {
    const blogDir = join(DIST, 'en/blog');
    assert.ok(existsSync(blogDir), 'en/blog/ should exist');
    // Individual post pages should exist
    assert.ok(existsSync(join(blogDir, 'cloud-native-ecommerce-playbook/index.html')), 'EN cloud-native post should exist');
  });

  // Theme toggle
  it('should include theme toggle script', () => {
    const homepage = readFileSync(join(DIST, 'en/index.html'), 'utf-8');
    assert.ok(homepage.includes('eva9-theme'), 'Should have theme detection');
    assert.ok(homepage.includes('prefers-color-scheme'), 'Should detect system preference');
  });

  // Language switcher
  it('should have language switcher linking en↔zh', () => {
    const enPage = readFileSync(join(DIST, 'en/index.html'), 'utf-8');
    assert.ok(enPage.includes('/zh/'), 'EN page should link to ZH version');

    const zhPage = readFileSync(join(DIST, 'zh/index.html'), 'utf-8');
    assert.ok(zhPage.includes('/en/'), 'ZH page should link to EN version');
  });
});
