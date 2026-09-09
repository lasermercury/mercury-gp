'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  BarChart3,
  Layers,
  Rss,
  FileJson,
  Globe,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  ExternalLink,
  Shield,
  Sparkles,
  Code2,
  Eye,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useLocale } from '@/components/layout/providers';
import { useSeoGuideModalStore } from '@/store/use-seo-guide-modal-store';

/* ─── Types ──────────────────────────────────────────────── */
type StepStatus = 'done' | 'pending' | 'optional';

interface GuideStep {
  id: string;
  titleEn: string;
  titleFa: string;
  icon: React.ComponentType<{ className?: string }>;
  status: StepStatus;
  file?: string;
  descriptionEn: string;
  descriptionFa: string;
  steps: {
    textEn: string;
    textFa: string;
    code?: string;
    link?: string;
    linkLabelEn?: string;
    linkLabelFa?: string;
  }[];
}

/* ─── Guide Data ─────────────────────────────────────────── */
const guideSteps: GuideStep[] = [
  {
    id: 'gsc',
    titleEn: '1. Google Search Console',
    titleFa: '۱. گوگل سرچ کنسول',
    icon: Search,
    status: 'done',
    file: 'src/app/layout.tsx',
    descriptionEn: 'Verify domain ownership and submit sitemap to Google.',
    descriptionFa: 'مالکیت دامنه را در گوگل تأیید کنید و نقشه سایت را ارسال کنید.',
    steps: [
      {
        textEn: 'Go to Google Search Console (search.google.com/search-console) and add your domain property.',
        textFa: 'به Google Search Console بروید و دامنه خود را اضافه کنید.',
        link: 'https://search.google.com/search-console',
        linkLabelEn: 'Open Search Console',
        linkLabelFa: 'باز کردن سرچ کنسول',
      },
      {
        textEn: 'Choose "HTML tag" verification method. Copy the meta tag content value (e.g., abc123xyz).',
        textFa: 'روش تأیید "HTML tag" را انتخاب کنید. مقدار content متا تگ را کپی کنید.',
      },
      {
        textEn: 'In layout.tsx, find the verification.google field and replace the placeholder:',
        textFa: 'در فایل layout.tsx، فیلد verification.google را پیدا کرده و placeholder را جایگزین کنید:',
        code: 'verification: {\n  google: "YOUR_VERIFICATION_CODE_HERE",  // ← paste here\n  yandex: "YOUR_YANDEX_CODE_HERE",\n}',
      },
      {
        textEn: 'After deploying, click "Verify" in Search Console. Then go to Sitemaps and submit:',
        textFa: 'بعد از دیپلوی، دکمه "Verify" را بزنید. سپس به Sitemaps بروید و ارسال کنید:',
        code: 'https://mercurygp.com/sitemap.xml',
      },
      {
        textEn: 'Also submit the RSS feed URL for faster content discovery:',
        textFa: 'آدرس RSS feed را هم برای ایندکس سریع‌تر ارسال کنید:',
        code: 'https://mercurygp.com/feed.xml',
      },
    ],
  },
  {
    id: 'ga4',
    titleEn: '2. Google Analytics 4 (GA4)',
    titleFa: '۲. گوگل آنالیتیکس ۴',
    icon: BarChart3,
    status: 'pending',
    file: 'src/app/layout.tsx',
    descriptionEn: 'Track visitors, pageviews, and user behavior.',
    descriptionFa: 'ردیابی بازدیدکنندگان، صفحه‌ها و رفتار کاربران.',
    steps: [
      {
        textEn: 'Go to Google Analytics and create a GA4 property for mercurygp.com.',
        textFa: 'به Google Analytics بروید و یک property برای mercurygp.com بسازید.',
        link: 'https://analytics.google.com/',
        linkLabelEn: 'Open Google Analytics',
        linkLabelFa: 'باز کردن گوگل آنالیتیکس',
      },
      {
        textEn: 'Copy your Measurement ID (starts with G-).',
        textFa: 'Measurement ID خود را کپی کنید (با G- شروع می‌شود).',
      },
      {
        textEn: 'In layout.tsx, uncomment the GA4 scripts and replace the ID:',
        textFa: 'در layout.tsx، اسکریپت‌های GA4 را از کامنت خارج کرده و ID را جایگزین کنید:',
        code: '// In <head> section — uncomment and replace G-XXXXXXXXXX\n<Script\n  src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID"\n  strategy="afterInteractive"\n/>\n\n// In <body> section — uncomment and replace G-XXXXXXXXXX\n<Script id="ga4-init" strategy="afterInteractive">\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag(\"js\", new Date());\n  gtag(\"config\", \"G-YOUR_ID\");\n</Script>',
      },
      {
        textEn: 'Verify data appears in GA4 Realtime report within 24 hours.',
        textFa: 'ظرف ۲۴ ساعت بررسی کنید که داده‌ها در گزارش Realtime نمایش داده شوند.',
      },
    ],
  },
  {
    id: 'gtm',
    titleEn: '3. Google Tag Manager (GTM)',
    titleFa: '۳. گوگل تگ منیجر',
    icon: Layers,
    status: 'pending',
    file: 'src/app/layout.tsx',
    descriptionEn: 'Centralized tag management for analytics, ads, and conversion tracking.',
    descriptionFa: 'مدیریت متمرکز تگ‌ها برای آنالیتیکس، تبلیغات و ردیابی تبدیل.',
    steps: [
      {
        textEn: 'Go to Google Tag Manager and create a new container for mercurygp.com.',
        textFa: 'به Google Tag Manager بروید و یک container جدید بسازید.',
        link: 'https://tagmanager.google.com/',
        linkLabelEn: 'Open GTM',
        linkLabelFa: 'باز کردن GTM',
      },
      {
        textEn: 'Copy your Container ID (starts with GTM-).',
        textFa: 'Container ID خود را کپی کنید (با GTM- شروع می‌شود).',
      },
      {
        textEn: 'In layout.tsx, uncomment the GTM scripts and replace GTM-XXXXXXX:',
        textFa: 'در layout.tsx، اسکریپت‌های GTM را از کامنت خارج کرده و جایگزین کنید:',
        code: '// In <head> — uncomment and replace GTM-XXXXXXX\n<Script id="gtm" strategy="afterInteractive">\n  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\"gtm.start\":\n  new Date().getTime(),event:\"gtm.js\"});var f=d.getElementsByTagName(s)[0],\n  j=d.createElement(s),dl=l!=\"dataLayer\"?\"&l=\"+l:\"\";j.async=true;j.src=\n  \"https://www.googletagmanager.com/gtm.js?id=\"+i+dl;f.parentNode.insertBefore(j,f);\n  })(window,document,\"script\",\"dataLayer\",\"GTM-YOUR_ID\");\n</Script>',
      },
      {
        textEn: 'Set up GA4, Facebook Pixel, and conversion events as tags inside GTM.',
        textFa: 'GA4، Facebook Pixel و رویدادهای تبدیل را به عنوان tag در GTM تنظیم کنید.',
      },
    ],
  },
  {
    id: 'bing',
    titleEn: '4. Bing Webmaster Tools',
    titleFa: '۴. بینگ وبمستر تولز',
    icon: Globe,
    status: 'optional',
    descriptionEn: 'Submit sitemap to Bing for additional search coverage.',
    descriptionFa: 'نقشه سایت را به بینگ ارسال کنید برای پوشش جستجوی بیشتر.',
    steps: [
      {
        textEn: 'Go to Bing Webmaster Tools and add your site.',
        textFa: 'به Bing Webmaster Tools بروید و سایت خود را اضافه کنید.',
        link: 'https://www.bing.com/webmasters',
        linkLabelEn: 'Open Bing Webmasters',
        linkLabelFa: 'باز کردن بینگ وبمستر',
      },
      {
        textEn: 'Verify ownership using the HTML meta tag method. Replace yandex placeholder in layout.tsx or add a separate Bing verification meta tag.',
        textFa: 'مالکیت را با متا تگ HTML تأیید کنید.',
      },
      {
        textEn: 'Submit sitemap URL: https://mercurygp.com/sitemap.xml',
        textFa: 'آدرس نقشه سایت را ارسال کنید: https://mercurygp.com/sitemap.xml',
      },
    ],
  },
  {
    id: 'jsonld',
    titleEn: '5. Structured Data (JSON-LD)',
    titleFa: '۵. داده‌های ساختاریافته (JSON-LD)',
    icon: FileJson,
    status: 'done',
    file: 'src/components/layout/json-ld.tsx',
    descriptionEn: '20 JSON-LD schemas are already implemented. Verify with Google Rich Results Test.',
    descriptionFa: '۲۰ اسکیمای JSON-LD از قبل پیاده‌سازی شده. با ابزار Google تأیید کنید.',
    steps: [
      {
        textEn: 'Open the Rich Results Test tool and enter your URL after deployment.',
        textFa: 'ابزار Rich Results Test را باز کرده و آدرس سایت را وارد کنید.',
        link: 'https://search.google.com/test/rich-results',
        linkLabelEn: 'Open Rich Results Test',
        linkLabelFa: 'باز کردن ابزار تست',
      },
      {
        textEn: 'Verify these schemas are detected: Product, FAQPage, HowTo, BreadcrumbList, Organization, Article, Service, DefinedTermSet, ItemList, ImageObject.',
        textFa: 'بررسی کنید این اسکیم‌ها شناسایی شوند: Product, FAQPage, HowTo, BreadcrumbList, Organization, Article, Service, DefinedTermSet, ItemList, ImageObject.',
      },
      {
        textEn: 'Also test with Schema Markup Validator for complete validation:',
        textFa: 'همچنین با Schema Markup Validator اعتبارسنجی کامل انجام دهید:',
        link: 'https://validator.schema.org/',
        linkLabelEn: 'Open Schema Validator',
        linkLabelFa: 'باز کردن اعتبارسنج',
      },
    ],
  },
  {
    id: 'feeds',
    titleEn: '6. RSS Feed & Sitemap',
    titleFa: '۶. فید RSS و نقشه سایت',
    icon: Rss,
    status: 'done',
    descriptionEn: 'RSS feed and sitemap are auto-generated. Verify they work.',
    descriptionFa: 'فید RSS و نقشه سایت به‌صورت خودکار تولید می‌شوند. عملکرد آنها را بررسی کنید.',
    steps: [
      {
        textEn: 'Sitemap URL: https://mercurygp.com/sitemap.xml — Submit to Google & Bing.',
        textFa: 'آدرس نقشه سایت: https://mercurygp.com/sitemap.xml — در گوگل و بینگ ارسال کنید.',
      },
      {
        textEn: 'RSS Feed URL: https://mercurygp.com/feed.xml — Auto-discovery is in <head>.',
        textFa: 'آدرس RSS: https://mercurygp.com/feed.xml — Auto-discovery در <head> قرار دارد.',
      },
      {
        textEn: 'Robots.txt: https://mercurygp.com/robots.txt — Includes rules for Google, Bing, GPTBot, ClaudeBot, PerplexityBot.',
        textFa: 'Robots.txt: https://mercurygp.com/robots.txt — شامل قوانین گوگل، بینگ، GPTBot, ClaudeBot, PerplexityBot.',
      },
    ],
  },
  {
    id: 'aio',
    titleEn: '7. GEO / AIO Optimization',
    titleFa: '۷. بهینه‌سازی GEO / AIO',
    icon: Sparkles,
    status: 'done',
    file: 'src/components/layout/json-ld.tsx',
    descriptionEn: 'Optimized for AI-generated overviews (Google AI, ChatGPT, Claude, Perplexity).',
    descriptionFa: 'بهینه‌سازی شده برای AI Overview گوگل، ChatGPT، Claude و Perplexity.',
    steps: [
      {
        textEn: 'WebPage.about[] — 6 entities with Wikipedia links for entity salience.',
        textFa: 'WebPage.about[] — ۶ entity با لینک ویکی‌پدیا برای entity salience.',
      },
      {
        textEn: 'WebPage.mentions[] — 15 named entities: journals, doctors, competitors for AIO citation.',
        textFa: 'WebPage.mentions[] — ۱۵ named entity: ژورنال‌ها، پزشکان، رقبا برای ارجاع AIO.',
      },
      {
        textEn: 'ItemList schemas enumerate features and competitors for structured extraction.',
        textFa: 'اسکیماهای ItemList ویژگی‌ها و رقبا را برای استخراج ساختاریافته فهرست می‌کنند.',
      },
      {
        textEn: 'E-E-A-T signals: Author schema with expertise, Organization with contactPoint/knowsAbout/foundingDate, datePublished/dateModified on all content.',
        textFa: 'سیگنال‌های E-E-A-T: اسکیمای Author با expertise، Organization با contactPoint/knowsAbout، datePublished/dateModified.',
      },
      {
        textEn: 'WpHeader/WpFooter with SiteNavigationElement for full page structure understanding.',
        textFa: 'WpHeader/WpFooter با SiteNavigationElement برای درک کامل ساختار صفحه.',
      },
      {
        textEn: 'Robots.txt allows GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User, Google-Extended for AI training/crawling.',
        textFa: 'Robots.txt اجازه دسترسی GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User, Google-Extended را می‌دهد.',
      },
    ],
  },
  {
    id: 'meta',
    titleEn: '8. Meta Tags & Social',
    titleFa: '۸. متا تگ‌ها و سوشیال',
    icon: Code2,
    status: 'done',
    file: 'src/app/layout.tsx',
    descriptionEn: 'All meta tags, Open Graph, Twitter Cards, and social discovery are configured.',
    descriptionFa: 'تمام متا تگ‌ها، Open Graph، Twitter Cards و social discovery تنظیم شده‌اند.',
    steps: [
      {
        textEn: 'Open Graph: title, description, image, type, locale, alternateLocale (fa_IR), emails.',
        textFa: 'Open Graph: title, description, image, type, locale, alternateLocale (fa_IR), emails.',
      },
      {
        textEn: 'Twitter: card (summary_large_image), title, description, images, site, creator.',
        textFa: 'Twitter: card (summary_large_image), title, description, images, site, creator.',
      },
      {
        textEn: 'hreflang: en, fa, x-default — for multilingual search results.',
        textFa: 'hreflang: en, fa, x-default — برای نتایج جستجوی چندزبانه.',
      },
      {
        textEn: 'RSS auto-discovery, canonical URL, preconnect to Google fonts & GTM.',
        textFa: 'RSS auto-discovery، canonical URL، preconnect به Google fonts و GTM.',
      },
      {
        textEn: 'Preview social sharing cards:',
        textFa: 'پیش‌نمایش کارت‌های اشتراک‌گذاری اجتماعی:',
        link: 'https://developers.facebook.com/tools/debug/',
        linkLabelEn: 'Facebook Sharing Debugger',
        linkLabelFa: 'ديباگر اشتراک فیس‌بوک',
      },
    ],
  },
  {
    id: 'performance',
    titleEn: '9. Performance & Monitoring',
    titleFa: '۹. عملکرد و مانیتورینگ',
    icon: Eye,
    status: 'optional',
    descriptionEn: 'Optional tools to monitor SEO performance and page speed.',
    descriptionFa: 'ابزارهای اختیاری برای مانیتورینگ SEO و سرعت صفحه.',
    steps: [
      {
        textEn: 'Google PageSpeed Insights — check Core Web Vitals after deployment.',
        textFa: 'Google PageSpeed Insights — بررسی Core Web Vitals بعد از دیپلوی.',
        link: 'https://pagespeed.web.dev/',
        linkLabelEn: 'Open PageSpeed Insights',
        linkLabelFa: 'باز کردن PageSpeed',
      },
      {
        textEn: 'Google Search Console — monitor indexing, coverage, and performance.',
        textFa: 'Google Search Console — مانیتورینگ ایندکس، پوشش و عملکرد.',
        link: 'https://search.google.com/search-console',
        linkLabelEn: 'Open Search Console',
        linkLabelFa: 'باز کردن سرچ کنسول',
      },
      {
        textEn: 'Ahrefs / SEMrush — track keyword rankings and backlinks.',
        textFa: 'Ahrefs / SEMrush — ردیابی رتبه کلمات کلیدی و بک‌لینک‌ها.',
      },
    ],
  },
];

/* ─── Copy Button ─────────────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className={
        'inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors ' +
        (copied
          ? 'bg-emerald-500/20 text-emerald-400'
          : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted')
      }
      aria-label={copied ? 'Copied' : 'Copy code'}
    >
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

/* ─── Status Badge ────────────────────────────────────────── */
function StatusBadge({ status }: { status: StepStatus }) {
  if (status === 'done') {
    return (
      <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 text-[11px] px-2.5 py-0.5">
        <CheckCircle2 className="size-3 mr-1" />
        {''}
      </Badge>
    );
  }
  if (status === 'pending') {
    return (
      <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30 hover:bg-amber-500/20 text-[11px] px-2.5 py-0.5">
        <Circle className="size-3 mr-1" />
        {''}
      </Badge>
    );
  }
  return (
    <Badge className="bg-muted/50 text-muted-foreground border-border/50 hover:bg-muted text-[11px] px-2.5 py-0.5">
      {''}
    </Badge>
  );
}

/* ─── Main Component ──────────────────────────────────────── */
export default function SeoGuideModal() {
  const { isOpen, close } = useSeoGuideModalStore();
  const { locale, direction } = useLocale();
  const isRtl = direction === 'rtl';
  const isFa = locale === 'fa';
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(
    new Set(guideSteps.map((s) => s.id))
  );

  const toggleStep = (id: string) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const doneCount = guideSteps.filter((s) => s.status === 'done').length;
  const pendingCount = guideSteps.filter((s) => s.status === 'pending').length;
  const totalCount = guideSteps.length;
  const progress = Math.round((doneCount / totalCount) * 100);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) close(); }}>
      <DialogContent
        className={
          'sm:max-w-3xl rounded-2xl bg-background p-0 ' +
          (isRtl ? 'text-right' : 'text-left')
        }
        dir={direction}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-h-[90vh] overflow-y-auto scrollbar-thin"
        >
          {/* Header */}
          <div className="p-6 pb-4 border-b border-border/60">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
                <Shield className="size-5 text-medical-blue" />
                {isFa ? 'راهنمای اتصال به گوگل و SEO/GEO/AIO' : 'Google & SEO/GEO/AIO Setup Guide'}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                {isFa
                  ? `${doneCount} از ${totalCount} بخش فعال — ${pendingCount} بخش نیاز به تنظیم دارد`
                  : `${doneCount} of ${totalCount} sections active — ${pendingCount} sections need configuration`}
              </DialogDescription>
            </DialogHeader>

            {/* Progress bar */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{isFa ? 'پیشرفت' : 'Progress'}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted/50 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-medical-blue to-emerald-accent"
                  initial={{ width: 0 }}
                  animate={{ width: progress + '%' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            {/* Legend */}
            <div className={
              'flex items-center gap-4 mt-3 text-[11px] text-muted-foreground ' +
              (isRtl ? 'flex-row-reverse' : '')
            }>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="size-3 text-emerald-400" />
                {isFa ? 'فعال' : 'Active'}
              </span>
              <span className="flex items-center gap-1">
                <Circle className="size-3 text-amber-400" />
                {isFa ? 'نیاز به تنظیم' : 'Needs config'}
              </span>
              <span className="flex items-center gap-1">
                <Circle className="size-3 text-muted-foreground" />
                {isFa ? 'اختیاری' : 'Optional'}
              </span>
            </div>
          </div>

          {/* Steps */}
          <div className="p-4 flex flex-col gap-2">
            {guideSteps.map((step, idx) => {
              const Icon = step.icon;
              const isExpanded = expandedSteps.has(step.id);
              return (
                <div
                  key={step.id}
                  className="rounded-xl border border-border/60 overflow-hidden"
                >
                  {/* Step Header — clickable */}
                  <button
                    onClick={() => toggleStep(step.id)}
                    className={
                      'w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-muted/30 ' +
                      (isRtl ? 'text-right flex-row-reverse' : 'text-left')
                    }
                    aria-expanded={isExpanded}
                  >
                    <div className={
                      'flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ' +
                      (step.status === 'done'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : step.status === 'pending'
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-muted/50 text-muted-foreground')
                    }>
                      <Icon className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground truncate">
                          {isFa ? step.titleFa : step.titleEn}
                        </span>
                        {step.file && (
                          <code className="text-[10px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded hidden sm:inline">
                            {step.file.split('/').pop()}
                          </code>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {isFa ? step.descriptionFa : step.descriptionEn}
                      </p>
                    </div>
                    <StatusBadge status={step.status} />
                    {isExpanded
                      ? <ChevronUp className="size-4 text-muted-foreground shrink-0" />
                      : <ChevronDown className="size-4 text-muted-foreground shrink-0" />
                    }
                  </button>

                  {/* Step Detail — collapsible */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className={
                          'px-4 pb-4 pt-0 border-t border-border/40 ' +
                          (isRtl ? 'text-right' : 'text-left')
                        }>
                          <ol className={
                            'flex flex-col gap-3 mt-3 ' +
                            (isRtl ? 'pr-4' : 'pl-4')
                          }>
                            {step.steps.map((s, si) => (
                              <li key={si} className={
                                'relative flex flex-col gap-2 ' +
                                (isRtl ? 'pr-5' : 'pl-5')
                              }>
                                {/* Number bullet */}
                                <span className={
                                  'absolute top-0 flex items-center justify-center w-5 h-5 rounded-full ' +
                                  'text-[10px] font-bold bg-medical-blue/10 text-medical-blue ' +
                                  (isRtl ? 'right-0' : 'left-0')
                                }>
                                  {si + 1}
                                </span>
                                <p className="text-sm text-foreground/80 leading-relaxed">
                                  {isFa ? s.textFa : s.textEn}
                                </p>
                                {s.code && (
                                  <div className="relative rounded-lg bg-navy-deep/80 p-3 mt-1">
                                    <div className={
                                      'absolute top-2 ' + (isRtl ? 'left-2' : 'right-2')
                                    }>
                                      <CopyButton text={s.code} />
                                    </div>
                                    <pre className={
                                      'text-xs text-soft-blue/80 font-mono whitespace-pre-wrap ' +
                                      'overflow-x-auto pr-14 ' + (isRtl ? 'pl-14' : '')
                                    }>
                                      {s.code}
                                    </pre>
                                  </div>
                                )}
                                {s.link && (
                                  <a
                                    href={s.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={
                                      'inline-flex items-center gap-1.5 text-xs text-medical-blue ' +
                                      'hover:text-medical-blue/80 underline underline-offset-2 mt-0.5'
                                    }
                                  >
                                    <ExternalLink className="size-3" />
                                    {isFa ? (s.linkLabelFa || s.link) : (s.linkLabelEn || s.link)}
                                  </a>
                                )}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div className={
            'px-6 pb-5 pt-2 border-t border-border/40 ' +
            (isRtl ? 'text-right' : 'text-left')
          }>
            <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
              {isFa
                ? 'بعد از اعمال تغییرات، حتماً `bun run build` و سپس دیپلوی کنید. تأیید نهایی در Google Search Console انجام شود.'
                : 'After making changes, run `bun run build` and deploy. Final verification should be done in Google Search Console.'}
            </p>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
