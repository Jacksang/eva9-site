/* ============================================================
   eva9.ai — Internationalization Utilities
   ============================================================ */

export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** UI translation dictionary */
const dict: Record<Locale, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    'nav.login': 'Log in',
    'nav.register': 'Register',
    'nav.logout': 'Log out',
    'hero.title': "Hi, I'm Jacky Chen",
    'hero.subtitle': '20 years building cloud e-commerce. I write about tech, learning & life.',
    'hero.about': 'About Me',
    'hero.services': 'My Services',
    'category.work': 'Work',
    'category.learn': 'Learn',
    'category.hobby': 'Hobby',
    'category.life': 'Life',
    'blog.recent': 'Recent Posts',
    'blog.read_more': 'Read more →',
    'blog.min_read': 'min read',
    'blog.no_posts': 'No posts yet in this category.',
    'comment.submit': 'Submit',
    'comment.placeholder': 'Write your comment…',
    'comment.login': 'Log in to comment',
    'comment.pending': 'Your comment has been submitted for review',
    'comment.char_min': 'Minimum 3 characters',
    'comment.char_max': 'Maximum 5000 characters',
    'contact.title': 'Get in Touch',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sent': 'Message sent successfully!',
    'footer.text': 'Built with care. All rights reserved.',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',
  },
  zh: {
    'nav.home': '首页',
    'nav.blog': '博客',
    'nav.about': '关于',
    'nav.contact': '联系',
    'nav.admin': '管理',
    'nav.login': '登录',
    'nav.register': '注册',
    'nav.logout': '退出',
    'hero.title': '你好，我是 Jacky Chen',
    'hero.subtitle': '20 年云端电商经验。我在这里分享技术、学习与生活。',
    'hero.about': '了解更多',
    'hero.services': '我的服务',
    'category.work': '工作',
    'category.learn': '学习',
    'category.hobby': '爱好',
    'category.life': '生活',
    'blog.recent': '最新文章',
    'blog.read_more': '阅读全文 →',
    'blog.min_read': '分钟阅读',
    'blog.no_posts': '此分类暂无文章。',
    'comment.submit': '提交',
    'comment.placeholder': '写下你的评论…',
    'comment.login': '登录后评论',
    'comment.pending': '你的评论已提交审核',
    'comment.char_min': '最少 3 个字符',
    'comment.char_max': '最多 5000 个字符',
    'contact.title': '联系我们',
    'contact.name': '姓名',
    'contact.email': '邮箱',
    'contact.message': '留言',
    'contact.send': '发送消息',
    'contact.sent': '消息已发送！',
    'footer.text': '用心构建。保留所有权利。',
    'theme.light': '浅色',
    'theme.dark': '深色',
    'theme.system': '系统',
  },
};

/**
 * Get translated string for current locale. Falls back to key.
 */
export function t(key: string, locale: Locale): string {
  return dict[locale]?.[key] ?? dict[defaultLocale]?.[key] ?? key;
}

/**
 * Get localized URL path.
 */
export function localizePath(path: string, locale: Locale): string {
  return `/${locale}${path}`;
}

/**
 * Human-readable locale label.
 */
export function localeLabel(locale: Locale): string {
  return locale === 'zh' ? '中文' : 'EN';
}
