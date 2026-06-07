/**
 * Full integration test suite for the built static site.
 * Tests all generated pages, SEO assets, and structural integrity.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';

// Expected pages in both locales
const pages = [
  { path: 'index.html', name: 'homepage' },
  { path: 'about/index.html', name: 'about' },
  { path: 'blog/index.html', name: 'blog index' },
  { path: 'blog/cloud-native-ecommerce-playbook/index.html', name: 'blog post 1' },
  { path: 'blog/why-i-built-this-blog/index.html', name: 'blog post 2' },
  { path: 'contact/index.html', name: 'contact' },
  { path: 'login/index.html', name: 'login' },
  { path: 'register/index.html', name: 'register' },
  { path: 'admin/index.html', name: 'admin dashboard' },
  { path: 'admin/login/index.html', name: 'admin login' },
];

describe('Full integration test', () => {
  it('should have dist/ directory', () => {
    assert.ok(existsSync(DIST), 'dist/ should exist');
  });

  describe('English pages', () => {
    for (const page of pages) {
      it(`should generate /en/${page.name}`, () => {
        const filePath = join(DIST, 'en', page.path);
        assert.ok(existsSync(filePath), `en/${page.path} should exist`);
        const content = readFileSync(filePath, 'utf-8');
        assert.ok(content.includes('<!DOCTYPE html>'), `${page.name} should be valid HTML`);
      });
    }
  });

  describe('Chinese pages', () => {
    for (const page of pages) {
      it(`should generate /zh/${page.name}`, () => {
        const filePath = join(DIST, 'zh', page.path);
        assert.ok(existsSync(filePath), `zh/${page.path} should exist`);
        const content = readFileSync(filePath, 'utf-8');
        assert.ok(content.includes('<!DOCTYPE html>'), `${page.name} should be valid HTML`);
      });
    }
  });

  describe('SEO', () => {
    it('should have sitemap.xml', () => {
      const xml = readFileSync(join(DIST, 'sitemap.xml'), 'utf-8');
      assert.ok(xml.includes('urlset'), 'sitemap.xml should be valid XML');
      // Check new pages are in sitemap
      assert.ok(xml.includes('/en/login'), 'sitemap should include en/login');
      assert.ok(xml.includes('/zh/login'), 'sitemap should include zh/login');
    });

    it('should have rss.xml', () => {
      const xml = readFileSync(join(DIST, 'rss.xml'), 'utf-8');
      assert.ok(xml.includes('<rss'), 'rss.xml should be valid XML');
    });

    it('should have robots.txt', () => {
      const txt = readFileSync(join(DIST, 'robots.txt'), 'utf-8');
      assert.ok(txt.includes('Sitemap:'), 'robots.txt should reference sitemap');
    });
  });

  describe('Features', () => {
    it('should have dark mode support on homepage', () => {
      const html = readFileSync(join(DIST, 'en/index.html'), 'utf-8');
      assert.ok(html.includes('eva9-theme'), 'should have theme detection');
      assert.ok(html.includes('prefers-color-scheme'), 'should detect system preference');
    });

    it('should have language switcher', () => {
      const enHtml = readFileSync(join(DIST, 'en/index.html'), 'utf-8');
      const zhHtml = readFileSync(join(DIST, 'zh/index.html'), 'utf-8');
      assert.ok(enHtml.includes('/zh/'), 'EN page should link to ZH version');
      assert.ok(zhHtml.includes('/en/'), 'ZH page should link to EN version');
    });

    it('should have admin noindex on admin pages', () => {
      const adminHtml = readFileSync(join(DIST, 'en/admin/index.html'), 'utf-8');
      assert.ok(adminHtml.includes('noindex'), 'admin pages should not be indexed');
    });

    it('should have visit logging script', () => {
      const html = readFileSync(join(DIST, 'en/index.html'), 'utf-8');
      assert.ok(html.includes('/api/log-visit'), 'should include visit logging');
    });

    it('should have login form', () => {
      const loginHtml = readFileSync(join(DIST, 'en/login/index.html'), 'utf-8');
      assert.ok(loginHtml.includes('login-form'), 'should have login form');
    });

    it('should have register form with name field', () => {
      const regHtml = readFileSync(join(DIST, 'en/register/index.html'), 'utf-8');
      assert.ok(regHtml.includes('register-form'), 'should have register form');
      assert.ok(regHtml.includes('name'), 'register should include name field');
    });

    it('should have admin login form', () => {
      const adminLoginHtml = readFileSync(join(DIST, 'en/admin/login/index.html'), 'utf-8');
      assert.ok(adminLoginHtml.includes('admin-login-form'), 'should have admin login form');
    });

    it('should have admin dashboard with comments tab', () => {
      const adminHtml = readFileSync(join(DIST, 'en/admin/index.html'), 'utf-8');
      assert.ok(adminHtml.includes('tab-comments'), 'should have comments tab');
      assert.ok(adminHtml.includes('tab-analytics'), 'should have analytics tab');
    });
  });
});
