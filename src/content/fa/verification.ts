export const verificationFa = {
  title: 'شفافیت داده‌های محصول',
  subtitle: 'هر ادعایی درباره مرکوری GP ردیابی، منبع‌دهی و دسته‌بندی شده است. این ثبت‌نامه نشان‌دهنده تعهد ما به یکپارچگی داده‌هاست.',
  sectionLabels: {
    all: 'همه ادعاها',
    verified: 'تأیید شده',
    pending: 'در انتظار تأیید',
    unverified: 'تأیید نشده',
    allCategories: 'همه دسته‌بندی‌ها',
    source: 'منبع',
    evidence: 'شواهد',
    lastVerified: 'آخرین تأیید',
    category: 'دسته‌بندی',
    status: 'وضعیت',
    claim: 'ادعا',
    detail: 'جزئیات',
    close: 'بستن',
    verifiedCount: (v: number, total: number) => `${v} از ${total} ادعا تأیید شده`,
    showingCount: (shown: number, total: number) => `${shown} از ${total} ادعا نمایش داده می‌شود`,
  },
  categories: {
    specification: 'مشخصات',
    feature: 'ویژگی',
    safety: 'ایمنی',
    comparison: 'مقایسه',
    general: 'عمومی',
  },
  statuses: {
    verified: 'تأیید شده',
    pending: 'در انتظار',
    unverified: 'تأیید نشده',
  },
  disclaimer: 'این ثبت‌نامه برای شفافیت نگهداری می‌شود. ادعاها باید با مستندات رسمی مرکوری GP تأیید شوند. آخرین به‌روزرسانی: ۲۰۲۵.',
  viewRegistry: 'مشاهده ثبت‌نامه داده‌ها',
} as const;

export type VerificationContentFa = typeof verificationFa;
