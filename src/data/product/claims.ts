export type ClaimStatus = 'verified' | 'pending' | 'unverified';
export type ClaimCategory = 'specification' | 'feature' | 'safety' | 'comparison' | 'general';

export interface ProductClaim {
  id: string;
  category: ClaimCategory;
  status: ClaimStatus;
  source: string | null;
  evidence: string | null;
  lastVerified: string | null;
  claim: { en: string; fa: string };
  detail: { en: string; fa: string };
}

export const productClaims: ProductClaim[] = [
  // ── Specifications (5 claims) ──
  {
    id: 'spec-unlimited-flashes',
    category: 'specification',
    status: 'verified',
    source: 'https://mercury-gp.com/official-specifications',
    evidence: 'Official product specifications list unlimited flash capacity with no cartridge replacement required.',
    lastVerified: '2025-01-15',
    claim: {
      en: 'Unlimited flash capacity — no cartridge replacement needed',
      fa: 'ظرفیت فلش نامحدود — نیازی به تعویض کارتریج نیست',
    },
    detail: {
      en: 'Mercury GP is designed to deliver consistent light pulses throughout its operational lifetime without requiring cartridge replacements, unlike many competitor IPL devices.',
      fa: 'مرکوری GP برای ارائه پالس‌های نور مداوم در طول عمر عملیاتی بدون نیاز به تعویض کارتریج طراحی شده است، برخلاف بسیاری از دستگاه‌های IPL رقیب.',
    },
  },
  {
    id: 'spec-corded-operation',
    category: 'specification',
    status: 'verified',
    source: 'https://mercury-gp.com/official-specifications',
    evidence: 'Product documentation confirms mains-powered corded operation.',
    lastVerified: '2025-01-15',
    claim: {
      en: 'Corded (mains-powered) operation',
      fa: 'عملکرد با سیم (تأمین انرژی از برق شهری)',
    },
    detail: {
      en: 'The device is powered through a corded connection to mains electricity, ensuring consistent power output without battery charging cycles or battery-life limitations during treatment.',
      fa: 'دستگاه از طریق اتصال سیمی به برق شهری تأمین انرژی می‌شود و خروجی توان مداوم را بدون چرخه شارژ باتری یا محدودیت عمر باتری در طول درمان تضمین می‌کند.',
    },
  },
  {
    id: 'spec-ipl-technology',
    category: 'specification',
    status: 'verified',
    source: 'https://mercury-gp.com/technology-overview',
    evidence: 'Official technology documentation confirms IPL (Intense Pulsed Light) as the core technology.',
    lastVerified: '2025-01-15',
    claim: {
      en: 'Uses IPL (Intense Pulsed Light) technology',
      fa: 'از فناوری IPL (نور پالسی شدید) استفاده می‌کند',
    },
    detail: {
      en: 'Mercury GP employs Intense Pulsed Light technology, emitting broad-spectrum light pulses absorbed by melanin in hair to help reduce hair growth over time with consistent use.',
      fa: 'مرکوری GP از فناوری نور پالسی شدید استفاده می‌کند که پالس‌های نور با طیف گسترده ساطع کرده و توسط ملانین موجود در مو جذب می‌شود.',
    },
  },
  {
    id: 'spec-flash-speed',
    category: 'specification',
    status: 'verified',
    source: 'https://mercury-gp.com/official-specifications',
    evidence: 'Product specifications document high flash speed rating for efficient sessions.',
    lastVerified: '2025-01-10',
    claim: {
      en: 'High-speed flash delivery',
      fa: 'تحویل فلش با سرعت بالا',
    },
    detail: {
      en: 'Engineered for efficient treatment sessions with rapid flash intervals, supporting a consistent routine with less waiting between pulses. Refer to the official manual for exact timing specifications.',
      fa: 'برای جلسات درمانی کارآمد با فاصله فلش سریع مهندسی شده و روتین منظم با انتظار کمتر بین پالس‌ها را پشتیبانی می‌کند.',
    },
  },
  {
    id: 'spec-treatment-areas',
    category: 'specification',
    status: 'pending',
    source: null,
    evidence: 'General product description references body and face treatment areas. Exact areas need official manual confirmation.',
    lastVerified: null,
    claim: {
      en: 'Suitable for multiple body and face treatment areas',
      fa: 'مناسب برای نواحی درمانی متعدد بدن و صورت',
    },
    detail: {
      en: 'The device is described as suitable for use on both body and face areas. Refer to the official Mercury GP manual for the complete list of approved treatment areas and contraindications.',
      fa: 'دستگاه برای استفاده در نواحی بدن و صورت مناسب توصیف شده است. به دفترچه راهنمای رسمی مرکوری GP مراجعه کنید.',
    },
  },

  // ── Features (4 claims) ──
  {
    id: 'feat-ergonomic',
    category: 'feature',
    status: 'pending',
    source: null,
    evidence: 'Product imagery and marketing materials show an ergonomic form factor. No formal ergonomic study cited.',
    lastVerified: null,
    claim: {
      en: 'Ergonomic design for comfortable handling',
      fa: 'طراحی ارگونومیک برای دستگیری راحت',
    },
    detail: {
      en: 'The device is shaped for comfortable handling during extended use, with intuitive controls accessible during treatment sessions. Formal ergonomic certification has not been cited.',
      fa: 'دستگاه برای دستگیری راحت در طول استفاده طولانی‌مدت شکل‌دهی شده است. گواهینامه ارگونومی رسمی ذکر نشده است.',
    },
  },
  {
    id: 'feat-no-cartridge',
    category: 'feature',
    status: 'verified',
    source: 'https://mercury-gp.com/official-specifications',
    evidence: 'Confirmed in official product specifications: no cartridge replacement required.',
    lastVerified: '2025-01-15',
    claim: {
      en: 'No cartridge replacement required over device lifetime',
      fa: 'نیازی به تعویض کارتریج در طول عمر دستگاه نیست',
    },
    detail: {
      en: 'Unlike many IPL devices that require purchasing replacement cartridges after a set number of flashes, Mercury GP is designed to operate without any cartridge replacement for the lifetime of the device.',
      fa: 'برخلاف بسیاری از دستگاه‌های IPL که نیاز به خرید کارتریج جایگزین دارند، مرکوری GP بدون نیاز به تعویض کارتریج در طول عمر دستگاه کار می‌کند.',
    },
  },
  {
    id: 'feat-customer-support',
    category: 'feature',
    status: 'pending',
    source: null,
    evidence: 'Customer support availability referenced in product materials. Response times and coverage details not independently verified.',
    lastVerified: null,
    claim: {
      en: 'Customer support and warranty access available',
      fa: 'پشتیبانی مشتریان و دسترسی به گارانتی در دسترس است',
    },
    detail: {
      en: 'Mercury GP provides access to warranty details, usage guidance, and customer support channels. Specific coverage terms, response times, and regional availability should be confirmed through official channels.',
      fa: 'مرکوری GP دسترسی به جزئیات گارانتی، راهنمای استفاده و کانال‌های پشتیبانی مشتریان را فراهم می‌کند.',
    },
  },
  {
    id: 'feat-energy-levels',
    category: 'feature',
    status: 'unverified',
    source: null,
    evidence: null,
    lastVerified: null,
    claim: {
      en: 'Multiple adjustable energy levels',
      fa: 'سطوح انرژی چندگانه قابل تنظیم',
    },
    detail: {
      en: 'The device may offer multiple energy level settings. This has not been independently verified. Refer to the official product manual for confirmed specifications.',
      fa: 'دستگاه ممکن است تنظیمات سطح انرژی متعددی ارائه دهد. این مورد به طور مستقل تأیید نشده است.',
    },
  },

  // ── Safety (3 claims) ──
  {
    id: 'safe-skin-sensor',
    category: 'safety',
    status: 'verified',
    source: 'https://mercury-gp.com/safety-features',
    evidence: 'Official safety documentation confirms a built-in skin contact sensor that prevents flashes when the device is not in proper contact with skin.',
    lastVerified: '2025-01-12',
    claim: {
      en: 'Built-in skin contact sensor',
      fa: 'سنسور تماس پوستی داخلی',
    },
    detail: {
      en: 'Mercury GP includes a skin contact sensor designed to prevent accidental flashes when the treatment window is not properly positioned against the skin, enhancing safe operation during home use.',
      fa: 'مرکوری GP دارای سنسور تماس پوستی است که برای جلوگیری از فلش‌های تصادفی هنگامی که پنجره درمان به درستی روی پوست قرار ندارد، طراحی شده است.',
    },
  },
  {
    id: 'safe-uv-filter',
    category: 'safety',
    status: 'pending',
    source: null,
    evidence: 'UV filtration is a common IPL safety feature. Specific UV filter specifications for Mercury GP have not been independently confirmed.',
    lastVerified: null,
    claim: {
      en: 'UV filter integrated into light output',
      fa: 'فیلتر UV در خروجی نور یکپارچه شده',
    },
    detail: {
      en: 'Most professional IPL devices include a UV filter to block harmful ultraviolet wavelengths from the output. This is a standard safety feature expected in the device but not yet independently verified for Mercury GP specifically.',
      fa: 'اکثر دستگاه‌های IPL حرفه‌ای شامل فیلتر UV برای مسدود کردن طول موج‌های مضر فرابنفش هستند. این یک ویژگی ایمنی استاندارد است.',
    },
  },
  {
    id: 'safe-auto-shutoff',
    category: 'safety',
    status: 'unverified',
    source: null,
    evidence: null,
    lastVerified: null,
    claim: {
      en: 'Auto-shutoff safety mechanism',
      fa: 'مکانیزم ایمنی خاموش‌شدن خودکار',
    },
    detail: {
      en: 'An automatic shutoff feature may be included to prevent overuse in a single session. This has not been independently verified. Refer to the official device manual for confirmed safety features.',
      fa: 'ویژگی خاموش‌شدن خودکار ممکن است برای جلوگیری از استفاده بیش از حد در یک جلسه گنجانده شده باشد. این مورد تأیید نشده است.',
    },
  },

  // ── Comparison (2 claims) ──
  {
    id: 'comp-competitive-pricing',
    category: 'comparison',
    status: 'pending',
    source: null,
    evidence: 'Pricing varies by region and retailer. Competitive positioning claimed in marketing materials but not independently verified across all markets.',
    lastVerified: null,
    claim: {
      en: 'Competitive pricing within the IPL device market',
      fa: 'قیمت‌گذاری رقابتی در بازار دستگاه‌های IPL',
    },
    detail: {
      en: 'Mercury GP is positioned as competitively priced compared to other premium home IPL devices. Actual pricing varies by region, retailer, and ongoing promotions. Compare current prices from authorized sellers.',
      fa: 'مرکوری GP به عنوان دستگاهی با قیمت رقابتی در مقایسه با سایر دستگاه‌های IPL خانگی پریمیوم معرفی شده است.',
    },
  },
  {
    id: 'comp-unlimited-flash-design',
    category: 'comparison',
    status: 'verified',
    source: 'https://mercury-gp.com/official-specifications',
    evidence: 'Most competing IPL devices (Philips, Braun, Ulike, Silk’n, DEESS) have finite flash limits. Mercury GP’s unlimited flash design is a documented differentiator.',
    lastVerified: '2025-01-15',
    claim: {
      en: 'Unique unlimited flash design differentiates from competitors with finite flash limits',
      fa: 'طراحی منحصر به فرد فلش نامحدود، تمایز با رقبا که محدودیت فلش دارند',
    },
    detail: {
      en: 'Unlike major competitors such as Philips Lumea (~250,000 flashes), Braun Silk-Expert Pro 5 (~300,000 flashes), and Silk’n Infinity (~400,000 flashes), Mercury GP offers unlimited flashes without cartridge replacement — a documented design differentiator.',
      fa: 'برخلاف رقبای اصلی مانند فیلیپس لومیا، براون سیلک اکسپرت و سیلکن اینفینیتی، مرکوری GP فلش نامحدود بدون تعویض کارتریج ارائه می‌دهد.',
    },
  },

  // ── General (2 claims) ──
  {
    id: 'gen-premium-positioning',
    category: 'general',
    status: 'pending',
    source: null,
    evidence: 'Brand positioning and marketing materials suggest premium quality. No independent quality certification or award has been cited.',
    lastVerified: null,
    claim: {
      en: 'Premium brand positioning in the home IPL market',
      fa: 'جایگاه برند پریمیوم در بازار IPL خانگی',
    },
    detail: {
      en: 'Mercury GP is marketed as a premium at-home IPL device with emphasis on design quality, consistent performance, and user experience. This positioning is based on brand messaging rather than independent quality assessments.',
      fa: 'مرکوری GP به عنوان یک دستگاه IPL خانگی پریمیوم با تأکید بر کیفیت طراحی، عملکرد مداوم و تجربه کاربر بازاریابی می‌شود.',
    },
  },
  {
    id: 'gen-at-home-convenience',
    category: 'general',
    status: 'unverified',
    source: null,
    evidence: null,
    lastVerified: null,
    claim: {
      en: 'Designed for convenient at-home use',
      fa: 'برای استفاده راحت در خانه طراحی شده',
    },
    detail: {
      en: 'The device is intended for at-home hair reduction as part of a personal care routine. Convenience claims are based on the device design and corded operation. Individual experiences may vary.',
      fa: 'دستگاه برای کاهش مو در خانه به عنوان بخشی از روتین مراقبت شخصی طراحی شده است.',
    },
  },
];
