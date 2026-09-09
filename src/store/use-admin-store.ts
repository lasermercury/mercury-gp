'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* ─── Types ──────────────────────────────────────────────── */

export type AdminTab =
  | 'dashboard'
  | 'site-settings'
  | 'google'
  | 'ai-optimization'
  | 'schema'
  | 'social'
  | 'robots-sitemap'
  | 'redirects'
  | 'bing-others';

export interface AIBotConfig {
  name: string;
  userAgent: string;
  allowed: boolean;
  crawlDelay: number;
  descriptionFa: string;
  descriptionEn: string;
}

export interface EntitySalience {
  id: string;
  name: string;
  wikipediaUrl: string;
  mentionsEnabled: boolean;
}

export interface SchemaConfig {
  id: string;
  name: string;
  nameFa: string;
  type: string;
  enabled: boolean;
  descriptionEn: string;
  descriptionFa: string;
}

export interface RedirectRule {
  id: string;
  from: string;
  to: string;
  statusCode: 301 | 302;
  isPattern: boolean;
  enabled: boolean;
}

export interface SitemapUrl {
  loc: string;
  priority: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  enabled: boolean;
}

export interface AdminSettings {
  /* Auth */
  isLoggedIn: boolean;
  username: string;
  lastActivity: number;
  isLocked: boolean;

  /* UI */
  activeTab: AdminTab;
  sidebarCollapsed: boolean;
  hasUnsavedChanges: boolean;

  /* Site Settings */
  siteTitleFa: string;
  siteTitleEn: string;
  siteDescriptionFa: string;
  siteDescriptionEn: string;
  keywords: string[];
  canonicalUrl: string;
  hreflangEnabled: boolean;
  hreflangDefaultLang: string;
  hreflangAlternateLang: string;
  faviconUrl: string;
  manifestEnabled: boolean;

  /* Google Integration */
  gscVerificationCode: string;
  ga4MeasurementId: string;
  gtmContainerId: string;
  googleSiteVerificationMeta: string;
  sitemapSubmittedToGsc: boolean;

  /* AI Optimization */
  aiBots: AIBotConfig[];
  entitySalience: EntitySalience[];
  aiCitationOptimizationEnabled: boolean;
  aioContentStructureEnabled: boolean;
  aioStructuredDataPriority: string;

  /* Schema Markup */
  schemas: SchemaConfig[];

  /* Social Media */
  ogImageUrl: string;
  twitterHandle: string;
  ogTitleOverride: string;
  ogDescriptionOverride: string;
  facebookAppId: string;

  /* Robots & Sitemap */
  robotsTxtContent: string;
  sitemapUrls: SitemapUrl[];
  rssTitle: string;
  rssDescription: string;
  rssArticleCount: number;

  /* Redirects */
  redirects: RedirectRule[];

  /* Bing & Others */
  bingVerification: string;
  yandexVerification: string;
  baiduVerification: string;
}

/* ─── Defaults ───────────────────────────────────────────── */

const DEFAULT_AI_BOTS: AIBotConfig[] = [
  { name: 'GPTBot', userAgent: 'GPTBot', allowed: true, crawlDelay: 10, descriptionFa: 'ربات خزش OpenAI برای ChatGPT', descriptionEn: 'OpenAI crawl bot for ChatGPT' },
  { name: 'ClaudeBot', userAgent: 'ClaudeBot', allowed: true, crawlDelay: 10, descriptionFa: 'ربات خزش Anthropic برای Claude', descriptionEn: 'Anthropic crawl bot for Claude' },
  { name: 'PerplexityBot', userAgent: 'PerplexityBot', allowed: true, crawlDelay: 5, descriptionFa: 'ربات خزش Perplexity', descriptionEn: 'Perplexity crawl bot' },
  { name: 'ChatGPT-User', userAgent: 'ChatGPT-User', allowed: true, crawlDelay: 10, descriptionFa: 'ربات کاربر ChatGPT', descriptionEn: 'ChatGPT User bot' },
  { name: 'Google-Extended', userAgent: 'Google-Extended', allowed: true, crawlDelay: 0, descriptionFa: 'ربات گوگل برای آموزش AI', descriptionEn: 'Google AI training bot' },
  { name: 'Bytespider', userAgent: 'Bytespider', allowed: false, crawlDelay: 20, descriptionFa: 'ربات خزش TikTok (بایت‌اسپایدر)', descriptionEn: 'TikTok Bytespider bot' },
  { name: 'Applebot-Extended', userAgent: 'Applebot-Extended', allowed: true, crawlDelay: 10, descriptionFa: 'ربات اپل برای Apple Intelligence', descriptionEn: 'Apple Intelligence bot' },
  { name: 'FacebookBot', userAgent: 'FacebookBot', allowed: true, crawlDelay: 5, descriptionFa: 'ربات خزش متا/فیس‌بوک', descriptionEn: 'Meta/Facebook crawl bot' },
  { name: 'Googlebot', userAgent: 'Googlebot', allowed: true, crawlDelay: 0, descriptionFa: 'ربات استاندارد گوگل', descriptionEn: 'Standard Google bot' },
  { name: 'Bingbot', userAgent: 'Bingbot', allowed: true, crawlDelay: 1, descriptionFa: 'ربات استاندارد بینگ', descriptionEn: 'Standard Bing bot' },
];

const DEFAULT_SCHEMAS: SchemaConfig[] = [
  { id: 'organization', name: 'Organization', nameFa: 'سازمان', type: 'Organization', enabled: true, descriptionEn: 'Business entity with E-E-A-T signals', descriptionFa: 'موجودیت تجاری با سیگنال‌های E-E-A-T' },
  { id: 'website', name: 'WebSite', nameFa: 'وب‌سایت', type: 'WebSite', enabled: true, descriptionEn: 'Site search action & metadata', descriptionFa: 'عمل جستجو و متادیتا سایت' },
  { id: 'webpage', name: 'WebPage', nameFa: 'صفحه وب', type: 'WebPage', enabled: true, descriptionEn: 'Page structure & spoke relations', descriptionFa: 'ساختار صفحه و روابط spoke' },
  { id: 'product', name: 'Product', nameFa: 'محصول', type: 'Product', enabled: true, descriptionEn: 'Product offers & reviews', descriptionFa: 'پیشنهادات محصول و بررسی‌ها' },
  { id: 'service', name: 'Service', nameFa: 'سرویس', type: 'Service', enabled: true, descriptionEn: 'Service area & provider', descriptionFa: 'منطقه سرویس و ارائه‌دهنده' },
  { id: 'aboutpage', name: 'AboutPage', nameFa: 'درباره ما', type: 'AboutPage', enabled: true, descriptionEn: 'About page with E-E-A-T', descriptionFa: 'صفحه درباره ما با E-E-A-T' },
  { id: 'author', name: 'Author/Person', nameFa: 'نویسنده/شخص', type: 'Person', enabled: true, descriptionEn: 'Author entity for trust signals', descriptionFa: 'موجودیت نویسنده برای سیگنال‌های اعتماد' },
  { id: 'faq', name: 'FAQ', nameFa: 'سوالات متداول', type: 'FAQPage', enabled: true, descriptionEn: 'FAQ rich results', descriptionFa: 'نتایج غنی سوالات متداول' },
  { id: 'howto', name: 'HowTo', nameFa: 'راهنما', type: 'HowTo', enabled: true, descriptionEn: 'Step-by-step guide rich results', descriptionFa: 'نتایج غنی راهنمای مرحله‌ای' },
  { id: 'definedtermset', name: 'DefinedTermSet', nameFa: 'مجموعه اصطلاحات', type: 'DefinedTermSet', enabled: true, descriptionEn: 'Glossary/terminology schema', descriptionFa: 'اسکیمای اصطلاحات/واژه‌نامه' },
  { id: 'breadcrumb', name: 'BreadcrumbList', nameFa: 'مسیر ناوبری', type: 'BreadcrumbList', enabled: true, descriptionEn: 'Breadcrumb navigation trail', descriptionFa: 'مسیر ناوبری breadcrumb' },
  { id: 'features-itemlist', name: 'Features ItemList', nameFa: 'ویژگی‌ها', type: 'ItemList', enabled: true, descriptionEn: 'Product features carousel', descriptionFa: 'چرخش ویژگی‌های محصول' },
  { id: 'comparison-itemlist', name: 'Comparison ItemList', nameFa: 'مقایسه', type: 'ItemList', enabled: true, descriptionEn: 'Comparison data schema', descriptionFa: 'اسکیمای داده مقایسه' },
  { id: 'wpheader', name: 'WPHeader', nameFa: 'سربرگ', type: 'WPHeader', enabled: true, descriptionEn: 'Page header structure', descriptionFa: 'ساختار سربرگ صفحه' },
  { id: 'wpfooter', name: 'WPFooter', nameFa: 'پاورقی', type: 'WPFooter', enabled: true, descriptionEn: 'Page footer structure', descriptionFa: 'ساختار پاورقی صفحه' },
  { id: 'imageobject', name: 'ImageObject', nameFa: 'تصویر', type: 'ImageObject', enabled: true, descriptionEn: 'Product image metadata', descriptionFa: 'متادیتای تصویر محصول' },
  { id: 'article-ipl-guide', name: 'Article: IPL Guide', nameFa: 'مقاله: راهنمای IPL', type: 'Article', enabled: true, descriptionEn: 'IPL technology deep-dive article', descriptionFa: 'مقاله عمیق فناوری IPL' },
  { id: 'article-safety', name: 'Article: Safety', nameFa: 'مقاله: ایمنی', type: 'Article', enabled: true, descriptionEn: 'Safety guidelines article', descriptionFa: 'مقاله دستورالعمل‌های ایمنی' },
  { id: 'article-comparison', name: 'Article: IPL vs Laser', nameFa: 'مقاله: IPL در برابر لیزر', type: 'Article', enabled: true, descriptionEn: 'IPL vs Laser comparison article', descriptionFa: 'مقاله مقایسه IPL و لیزر' },
  { id: 'article-treatment', name: 'Article: Treatment Plan', nameFa: 'مقاله: برنامه درمان', type: 'Article', enabled: true, descriptionEn: 'Treatment planning article', descriptionFa: 'مقاله برنامه‌ریزی درمان' },
];

const DEFAULT_ROBOTS_TXT = `# Robots.txt for lasermercury.ir
# Managed by Mercury SEO Admin Panel

User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

# Sitemap
Sitemap: https://lasermercury.ir/sitemap.xml

# AI Bots
User-agent: GPTBot
Allow: /
Crawl-delay: 10

User-agent: ClaudeBot
Allow: /
Crawl-delay: 10

User-agent: PerplexityBot
Allow: /
Crawl-delay: 5

User-agent: ChatGPT-User
Allow: /
Crawl-delay: 10

User-agent: Google-Extended
Allow: /

User-agent: Bytespider
Disallow: /

User-agent: Applebot-Extended
Allow: /
Crawl-delay: 10

User-agent: FacebookBot
Allow: /
Crawl-delay: 5
`;

const DEFAULT_SITEMAP_URLS: SitemapUrl[] = [
  { loc: '/', priority: '1.0', changefreq: 'weekly', enabled: true },
  { loc: '/#how-it-works', priority: '0.8', changefreq: 'monthly', enabled: true },
  { loc: '/#safety', priority: '0.9', changefreq: 'monthly', enabled: true },
  { loc: '/#comparison', priority: '0.8', changefreq: 'monthly', enabled: true },
  { loc: '/#faq', priority: '0.7', changefreq: 'monthly', enabled: true },
  { loc: '/#learn', priority: '0.7', changefreq: 'weekly', enabled: true },
];

const DEFAULT_ENTITY_SALIENCE: EntitySalience[] = [
  { id: '1', name: 'Intense Pulsed Light', wikipediaUrl: 'https://en.wikipedia.org/wiki/Intense_pulsed_light', mentionsEnabled: true },
  { id: '2', name: 'Hair Removal', wikipediaUrl: 'https://en.wikipedia.org/wiki/Hair_removal', mentionsEnabled: true },
  { id: '3', name: 'Fitzpatrick Scale', wikipediaUrl: 'https://en.wikipedia.org/wiki/Fitzpatrick_scale', mentionsEnabled: true },
  { id: '4', name: 'Selective Photothermolysis', wikipediaUrl: 'https://en.wikipedia.org/wiki/Selective_photothermolysis', mentionsEnabled: true },
  { id: '5', name: 'Melanin', wikipediaUrl: 'https://en.wikipedia.org/wiki/Melanin', mentionsEnabled: true },
];

const DEFAULT_REDIRECTS: RedirectRule[] = [
  { id: '1', from: '/old-product', to: '/', statusCode: 301, isPattern: false, enabled: true },
  { id: '2', from: '/ipl-device', to: '/', statusCode: 301, isPattern: false, enabled: true },
  { id: '3', from: '/blog/*', to: '/#learn', statusCode: 301, isPattern: true, enabled: true },
];

/* ─── Store Interface ────────────────────────────────────── */

interface AdminStore extends AdminSettings {
  /* Auth actions */
  login: (username: string, password: string) => boolean;
  logout: () => void;
  lockScreen: () => void;
  unlockScreen: (password: string) => boolean;
  updateActivity: () => void;

  /* UI actions */
  setActiveTab: (tab: AdminTab) => void;
  toggleSidebar: () => void;
  markUnsaved: () => void;
  markSaved: () => void;
  saveSettings: () => void;

  /* Site Settings actions */
  setSiteTitleFa: (v: string) => void;
  setSiteTitleEn: (v: string) => void;
  setSiteDescriptionFa: (v: string) => void;
  setSiteDescriptionEn: (v: string) => void;
  addKeyword: (kw: string) => void;
  removeKeyword: (kw: string) => void;
  setCanonicalUrl: (v: string) => void;
  setHreflangEnabled: (v: boolean) => void;
  setFaviconUrl: (v: string) => void;

  /* Google actions */
  setGscVerificationCode: (v: string) => void;
  setGa4MeasurementId: (v: string) => void;
  setGtmContainerId: (v: string) => void;
  setGoogleSiteVerificationMeta: (v: string) => void;
  setSitemapSubmittedToGsc: (v: boolean) => void;

  /* AI Optimization actions */
  toggleAiBot: (name: string) => void;
  setAiBotCrawlDelay: (name: string, delay: number) => void;
  addEntity: (entity: EntitySalience) => void;
  updateEntity: (id: string, updates: Partial<EntitySalience>) => void;
  removeEntity: (id: string) => void;
  setAiCitationOptimizationEnabled: (v: boolean) => void;
  setAioContentStructureEnabled: (v: boolean) => void;
  setAioStructuredDataPriority: (v: string) => void;

  /* Schema actions */
  toggleSchema: (id: string) => void;
  setSchemaEnabled: (id: string, enabled: boolean) => void;

  /* Social actions */
  setOgImageUrl: (v: string) => void;
  setTwitterHandle: (v: string) => void;
  setOgTitleOverride: (v: string) => void;
  setOgDescriptionOverride: (v: string) => void;
  setFacebookAppId: (v: string) => void;

  /* Robots & Sitemap actions */
  setRobotsTxtContent: (v: string) => void;
  addSitemapUrl: (url: SitemapUrl) => void;
  updateSitemapUrl: (index: number, updates: Partial<SitemapUrl>) => void;
  removeSitemapUrl: (index: number) => void;
  setRssTitle: (v: string) => void;
  setRssDescription: (v: string) => void;
  setRssArticleCount: (v: number) => void;

  /* Redirects actions */
  addRedirect: (redirect: RedirectRule) => void;
  updateRedirect: (id: string, updates: Partial<RedirectRule>) => void;
  removeRedirect: (id: string) => void;

  /* Bing & Others actions */
  setBingVerification: (v: string) => void;
  setYandexVerification: (v: string) => void;
  setBaiduVerification: (v: string) => void;
}

/* ─── Constants ──────────────────────────────────────────── */

const VALID_USERNAME = 'mercury-admin';
const VALID_PASSWORD = 'Mercury@2024!Secure';
const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes

/* ─── Store ──────────────────────────────────────────────── */

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      /* Initial state */
      isLoggedIn: false,
      username: '',
      lastActivity: Date.now(),
      isLocked: false,

      activeTab: 'dashboard',
      sidebarCollapsed: false,
      hasUnsavedChanges: false,

      siteTitleFa: 'مِرکوری GP — دستگاه IPL حرفه‌ای خانگی',
      siteTitleEn: 'Mercury GP — Premium At-Home IPL Hair-Reduction Device',
      siteDescriptionFa: 'مِرکوری GP، دستگاه کاهش موی IPL خانگی با استانداردهای بالینی و ایمنی پوست.',
      siteDescriptionEn: 'Discover Mercury GP, a refined at-home IPL hair-reduction device designed for your routine.',
      keywords: ['Mercury GP', 'IPL', 'IPL hair reduction', 'at-home IPL', 'home hair removal', 'IPL device', 'intense pulsed light', 'hair removal device', 'personal care', 'Fitzpatrick scale', 'IPL safety', 'Mercury Laser IPL'],
      canonicalUrl: 'https://lasermercury.ir',
      hreflangEnabled: true,
      hreflangDefaultLang: 'en',
      hreflangAlternateLang: 'fa',
      faviconUrl: '/logo.svg',
      manifestEnabled: true,

      gscVerificationCode: '',
      ga4MeasurementId: '',
      gtmContainerId: '',
      googleSiteVerificationMeta: '',
      sitemapSubmittedToGsc: false,

      aiBots: DEFAULT_AI_BOTS,
      entitySalience: DEFAULT_ENTITY_SALIENCE,
      aiCitationOptimizationEnabled: true,
      aioContentStructureEnabled: true,
      aioStructuredDataPriority: 'high',

      schemas: DEFAULT_SCHEMAS,

      ogImageUrl: '/images/mercury-gp-product-ad.jpg',
      twitterHandle: '@mercurygp',
      ogTitleOverride: '',
      ogDescriptionOverride: '',
      facebookAppId: '',

      robotsTxtContent: DEFAULT_ROBOTS_TXT,
      sitemapUrls: DEFAULT_SITEMAP_URLS,
      rssTitle: 'Mercury GP — IPL Hair-Reduction Knowledge Base',
      rssDescription: 'Expert IPL guidance, safety tools, and treatment planning for Mercury GP.',
      rssArticleCount: 20,

      redirects: DEFAULT_REDIRECTS,

      bingVerification: '',
      yandexVerification: '',
      baiduVerification: '',

      /* ─── Auth Actions ─────────────────────────────────── */

      login: (username: string, password: string) => {
        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
          const token = btoa(username + ':' + password);
          if (typeof window !== 'undefined') {
            localStorage.setItem('admin-auth-token', token);
          }
          set({ isLoggedIn: true, username, lastActivity: Date.now(), isLocked: false });
          return true;
        }
        return false;
      },

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('admin-auth-token');
        }
        set({ isLoggedIn: false, username: '', isLocked: false, activeTab: 'dashboard' });
      },

      lockScreen: () => {
        set({ isLocked: true });
      },

      unlockScreen: (password: string) => {
        if (password === VALID_PASSWORD) {
          set({ isLocked: false, lastActivity: Date.now() });
          return true;
        }
        return false;
      },

      updateActivity: () => {
        const now = Date.now();
        const last = get().lastActivity;
        if (now - last > INACTIVITY_TIMEOUT && get().isLoggedIn) {
          set({ isLocked: true });
        } else {
          set({ lastActivity: now });
        }
      },

      /* ─── UI Actions ──────────────────────────────────── */

      setActiveTab: (tab) => set({ activeTab: tab }),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      markUnsaved: () => set({ hasUnsavedChanges: true }),
      markSaved: () => set({ hasUnsavedChanges: false }),
      saveSettings: () => {
        // All changes are auto-persisted via zustand persist middleware
        set({ hasUnsavedChanges: false, lastActivity: Date.now() });
      },

      /* ─── Site Settings Actions ────────────────────────── */

      setSiteTitleFa: (v) => set({ siteTitleFa: v, hasUnsavedChanges: true }),
      setSiteTitleEn: (v) => set({ siteTitleEn: v, hasUnsavedChanges: true }),
      setSiteDescriptionFa: (v) => set({ siteDescriptionFa: v, hasUnsavedChanges: true }),
      setSiteDescriptionEn: (v) => set({ siteDescriptionEn: v, hasUnsavedChanges: true }),
      addKeyword: (kw) => set((s) => ({ keywords: [...s.keywords, kw], hasUnsavedChanges: true })),
      removeKeyword: (kw) => set((s) => ({ keywords: s.keywords.filter((k) => k !== kw), hasUnsavedChanges: true })),
      setCanonicalUrl: (v) => set({ canonicalUrl: v, hasUnsavedChanges: true }),
      setHreflangEnabled: (v) => set({ hreflangEnabled: v, hasUnsavedChanges: true }),
      setFaviconUrl: (v) => set({ faviconUrl: v, hasUnsavedChanges: true }),

      /* ─── Google Actions ───────────────────────────────── */

      setGscVerificationCode: (v) => set({ gscVerificationCode: v, hasUnsavedChanges: true }),
      setGa4MeasurementId: (v) => set({ ga4MeasurementId: v, hasUnsavedChanges: true }),
      setGtmContainerId: (v) => set({ gtmContainerId: v, hasUnsavedChanges: true }),
      setGoogleSiteVerificationMeta: (v) => set({ googleSiteVerificationMeta: v, hasUnsavedChanges: true }),
      setSitemapSubmittedToGsc: (v) => set({ sitemapSubmittedToGsc: v, hasUnsavedChanges: true }),

      /* ─── AI Optimization Actions ──────────────────────── */

      toggleAiBot: (name) => set((s) => ({
        aiBots: s.aiBots.map((b) => b.name === name ? { ...b, allowed: !b.allowed } : b),
        hasUnsavedChanges: true,
      })),

      setAiBotCrawlDelay: (name, delay) => set((s) => ({
        aiBots: s.aiBots.map((b) => b.name === name ? { ...b, crawlDelay: delay } : b),
        hasUnsavedChanges: true,
      })),

      addEntity: (entity) => set((s) => ({
        entitySalience: [...s.entitySalience, entity],
        hasUnsavedChanges: true,
      })),

      updateEntity: (id, updates) => set((s) => ({
        entitySalience: s.entitySalience.map((e) => e.id === id ? { ...e, ...updates } : e),
        hasUnsavedChanges: true,
      })),

      removeEntity: (id) => set((s) => ({
        entitySalience: s.entitySalience.filter((e) => e.id !== id),
        hasUnsavedChanges: true,
      })),

      setAiCitationOptimizationEnabled: (v) => set({ aiCitationOptimizationEnabled: v, hasUnsavedChanges: true }),
      setAioContentStructureEnabled: (v) => set({ aioContentStructureEnabled: v, hasUnsavedChanges: true }),
      setAioStructuredDataPriority: (v) => set({ aioStructuredDataPriority: v, hasUnsavedChanges: true }),

      /* ─── Schema Actions ───────────────────────────────── */

      toggleSchema: (id) => set((s) => ({
        schemas: s.schemas.map((sc) => sc.id === id ? { ...sc, enabled: !sc.enabled } : sc),
        hasUnsavedChanges: true,
      })),

      setSchemaEnabled: (id, enabled) => set((s) => ({
        schemas: s.schemas.map((sc) => sc.id === id ? { ...sc, enabled } : sc),
        hasUnsavedChanges: true,
      })),

      /* ─── Social Actions ───────────────────────────────── */

      setOgImageUrl: (v) => set({ ogImageUrl: v, hasUnsavedChanges: true }),
      setTwitterHandle: (v) => set({ twitterHandle: v, hasUnsavedChanges: true }),
      setOgTitleOverride: (v) => set({ ogTitleOverride: v, hasUnsavedChanges: true }),
      setOgDescriptionOverride: (v) => set({ ogDescriptionOverride: v, hasUnsavedChanges: true }),
      setFacebookAppId: (v) => set({ facebookAppId: v, hasUnsavedChanges: true }),

      /* ─── Robots & Sitemap Actions ─────────────────────── */

      setRobotsTxtContent: (v) => set({ robotsTxtContent: v, hasUnsavedChanges: true }),

      addSitemapUrl: (url) => set((s) => ({
        sitemapUrls: [...s.sitemapUrls, url],
        hasUnsavedChanges: true,
      })),

      updateSitemapUrl: (index, updates) => set((s) => ({
        sitemapUrls: s.sitemapUrls.map((u, i) => i === index ? { ...u, ...updates } : u),
        hasUnsavedChanges: true,
      })),

      removeSitemapUrl: (index) => set((s) => ({
        sitemapUrls: s.sitemapUrls.filter((_, i) => i !== index),
        hasUnsavedChanges: true,
      })),

      setRssTitle: (v) => set({ rssTitle: v, hasUnsavedChanges: true }),
      setRssDescription: (v) => set({ rssDescription: v, hasUnsavedChanges: true }),
      setRssArticleCount: (v) => set({ rssArticleCount: v, hasUnsavedChanges: true }),

      /* ─── Redirects Actions ────────────────────────────── */

      addRedirect: (redirect) => set((s) => ({
        redirects: [...s.redirects, redirect],
        hasUnsavedChanges: true,
      })),

      updateRedirect: (id, updates) => set((s) => ({
        redirects: s.redirects.map((r) => r.id === id ? { ...r, ...updates } : r),
        hasUnsavedChanges: true,
      })),

      removeRedirect: (id) => set((s) => ({
        redirects: s.redirects.filter((r) => r.id !== id),
        hasUnsavedChanges: true,
      })),

      /* ─── Bing & Others Actions ────────────────────────── */

      setBingVerification: (v) => set({ bingVerification: v, hasUnsavedChanges: true }),
      setYandexVerification: (v) => set({ yandexVerification: v, hasUnsavedChanges: true }),
      setBaiduVerification: (v) => set({ baiduVerification: v, hasUnsavedChanges: true }),
    }),
    {
      name: 'mercury-admin-store',
      partialize: (state) => {
        // Don't persist auth state or UI state
        const keysToPersist: (keyof AdminSettings)[] = [
          'siteTitleFa', 'siteTitleEn', 'siteDescriptionFa', 'siteDescriptionEn',
          'keywords', 'canonicalUrl', 'hreflangEnabled', 'hreflangDefaultLang',
          'hreflangAlternateLang', 'faviconUrl', 'manifestEnabled',
          'gscVerificationCode', 'ga4MeasurementId', 'gtmContainerId',
          'googleSiteVerificationMeta', 'sitemapSubmittedToGsc',
          'aiBots', 'entitySalience', 'aiCitationOptimizationEnabled',
          'aioContentStructureEnabled', 'aioStructuredDataPriority',
          'schemas', 'ogImageUrl', 'twitterHandle', 'ogTitleOverride',
          'ogDescriptionOverride', 'facebookAppId', 'robotsTxtContent',
          'sitemapUrls', 'rssTitle', 'rssDescription', 'rssArticleCount',
          'redirects', 'bingVerification', 'yandexVerification', 'baiduVerification',
        ];
        const partial: Record<string, unknown> = {};
        for (const key of keysToPersist) {
          partial[key] = state[key];
        }
        return partial as Partial<AdminSettings>;
      },
    }
  )
);

/* ─── Helper: Calculate SEO Health Score ──────────────────── */

export function calculateSeoHealthScore(state: AdminSettings): number {
  let score = 0;
  let total = 0;

  // Title (10 pts)
  total += 10;
  if (state.siteTitleEn.length > 10 && state.siteTitleEn.length <= 60) score += 10;
  else if (state.siteTitleEn.length > 0) score += 5;

  // Description (10 pts)
  total += 10;
  if (state.siteDescriptionEn.length > 50 && state.siteDescriptionEn.length <= 160) score += 10;
  else if (state.siteDescriptionEn.length > 0) score += 5;

  // Keywords (10 pts)
  total += 10;
  if (state.keywords.length >= 5) score += 10;
  else if (state.keywords.length > 0) score += 5;

  // Canonical (5 pts)
  total += 5;
  if (state.canonicalUrl.length > 0) score += 5;

  // Google connected (15 pts)
  total += 15;
  if (state.gscVerificationCode) score += 5;
  if (state.ga4MeasurementId) score += 5;
  if (state.gtmContainerId) score += 5;

  // Schemas (20 pts)
  total += 20;
  const enabledSchemas = state.schemas.filter((s) => s.enabled).length;
  score += Math.round((enabledSchemas / state.schemas.length) * 20);

  // AI Optimization (15 pts)
  total += 15;
  if (state.aiCitationOptimizationEnabled) score += 5;
  if (state.aioContentStructureEnabled) score += 5;
  if (state.entitySalience.length >= 3) score += 5;
  else if (state.entitySalience.length > 0) score += 2;

  // Social (10 pts)
  total += 10;
  if (state.ogImageUrl) score += 3;
  if (state.twitterHandle) score += 3;
  if (state.ogTitleOverride || state.siteTitleEn) score += 4;

  // Sitemap (5 pts)
  total += 5;
  if (state.sitemapUrls.length > 0) score += 5;

  return Math.round((score / total) * 100);
}
