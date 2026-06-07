import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

describe('i18n library', () => {
  const i18nSource = readFileSync('src/lib/i18n.ts', 'utf-8');

  const enKeys = [
    'nav.home', 'nav.blog', 'nav.about', 'nav.contact', 'nav.admin',
    'hero.title', 'hero.subtitle', 'hero.about', 'hero.services',
    'category.work', 'category.learn', 'category.hobby', 'category.life',
    'blog.recent', 'blog.read_more', 'blog.min_read', 'blog.no_posts',
    'comment.submit', 'comment.placeholder', 'comment.login', 'comment.pending',
    'footer.text', 'theme.light', 'theme.dark', 'theme.system',
  ];

  it('should define all required English keys', () => {
    for (const key of enKeys) {
      assert.ok(i18nSource.includes(key), `Key "${key}" should be defined in i18n.ts`);
    }
  });

  it('should define all required Chinese translations', () => {
    assert.ok(i18nSource.includes('zh: {'), 'Chinese dictionary should exist');
    assert.ok(i18nSource.includes("'nav.home': '首页'"), 'nav.home zh should be 首页');
    assert.ok(i18nSource.includes("'nav.blog': '博客'"), 'nav.blog zh should be 博客');
  });

  it('should support both en and zh locales', () => {
    assert.ok(i18nSource.includes("locales = ['en', 'zh']"), 'locales should include en and zh');
    assert.ok(i18nSource.includes("defaultLocale: Locale = 'en'"), 'default should be en');
  });
});
