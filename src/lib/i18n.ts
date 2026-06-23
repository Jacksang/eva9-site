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
    'nav.portfolio': 'Portfolio',
    'nav.studies': 'Studies',
    'nav.services': 'Services',
    'hero.stats': '20+ years · 30+ projects · Bilingual (EN/中文)',
    'hero.tagline': 'Cloud-Native Architect & CTO',
    'hero.cta.portfolio': 'View My Work',
    'hero.cta.services': 'Hire Me',
    'portfolio.title': 'Projects',
    'portfolio.subtitle': 'Things I\'ve built — from scratch, at scale.',
    'portfolio.role': 'Role',
    'portfolio.tech': 'Tech Stack',
    'portfolio.demo': 'Live Demo',
    'portfolio.github': 'Source Code',
    'portfolio.see_all': 'View All Projects →',
    'studies.title': 'Studies',
    'studies.subtitle': 'Continuous learning — AI, data science, and beyond.',
    'studies.mit': 'MIT Certification',
    'studies.mit_desc': 'Professional Certificate in Machine Learning & Artificial Intelligence',
    'studies.great_learning': 'Great Learning',
    'studies.great_learning_desc': 'No-Code Machine Learning & Data Science program',
    'studies.in_progress': 'In Progress',
    'services.title': 'Services',
    'services.subtitle': '20 years of engineering leadership — available for freelance and advisory.',
    'services.cloud': 'Cloud Architecture',
    'services.cloud_desc': 'AWS & Alibaba Cloud — design, migration, optimization, cost management.',
    'services.ecom': 'E-Commerce & Marketplaces',
    'services.ecom_desc': 'Full platform design — payments, marketplaces, loyalty systems — from zero to production.',
    'services.cto': 'CTO Advisory',
    'services.cto_desc': 'Technical strategy, team building, due diligence, and architecture reviews.',
    'services.ai': 'AI Integration',
    'services.ai_desc': 'LLM-powered features, automation pipelines, intelligent agents — practical AI, not hype.',
    'services.cta': 'Interested in working together?',
    'services.cta_button': 'Get in Touch',
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
    'nav.portfolio': '作品集',
    'nav.studies': '学习',
    'nav.services': '服务',
    'hero.stats': '20+ 年 · 30+ 项目 · 双语',
    'hero.tagline': '云原生架构师 & CTO',
    'hero.cta.portfolio': '查看作品',
    'hero.cta.services': '与我合作',
    'portfolio.title': '项目',
    'portfolio.subtitle': '我亲手打造的项目 — 从零开始，到规模化。',
    'portfolio.role': '角色',
    'portfolio.tech': '技术栈',
    'portfolio.demo': '在线演示',
    'portfolio.github': '源代码',
    'portfolio.see_all': '查看全部项目 →',
    'studies.title': '学习',
    'studies.subtitle': '持续学习 — AI、数据科学、不断前进。',
    'studies.mit': 'MIT 认证',
    'studies.mit_desc': '机器学习与人工智能专业证书',
    'studies.great_learning': 'Great Learning',
    'studies.great_learning_desc': '无代码机器学习与数据科学课程',
    'studies.in_progress': '进行中',
    'services.title': '服务',
    'services.subtitle': '20 年工程领导经验 — 提供自由职业与顾问服务。',
    'services.cloud': '云架构',
    'services.cloud_desc': 'AWS 与阿里云 — 设计、迁移、优化、成本管理。',
    'services.ecom': '电商与市场平台',
    'services.ecom_desc': '全平台设计 — 支付、市场、会员系统 — 从零到生产。',
    'services.cto': 'CTO 顾问',
    'services.cto_desc': '技术战略、团队建设、尽职调查、架构评审。',
    'services.ai': 'AI 集成',
    'services.ai_desc': 'LLM 驱动功能、自动化流程、智能代理 — 实用的 AI，而非炒作。',
    'services.cta': '有兴趣合作吗？',
    'services.cta_button': '联系我们',
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
