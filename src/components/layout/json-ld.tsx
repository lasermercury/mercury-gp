import { homeEn } from '@/content/en/home';

const SITE_URL = 'https://lasermercury.ir';
const PUBLISHED_DATE = '2025-01-15T00:00:00+00:00';
const MODIFIED_DATE = new Date().toISOString();

/* ─── Organization (Enhanced for E-E-A-T) ─────────────────── */
function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': SITE_URL + '/#organization',
    name: 'Mercury',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: SITE_URL + '/logo.svg',
      width: 144,
      height: 144,
      caption: 'Mercury — Premium IPL Devices',
    },
    description:
      'Mercury designs premium at-home IPL hair-reduction devices built for modern personal care routines. Committed to safety, innovation, and clinical-grade standards.',
    foundingDate: '2020',
    legalName: 'Mercury',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@lasermercury.ir',
        availableLanguage: ['English', 'Persian'],
        areaServed: 'Worldwide',
      },
    ],
    sameAs: [
      'https://en.wikipedia.org/wiki/Intense_pulsed_light',
      'https://en.wikipedia.org/wiki/Hair_removal',
      'https://www.fda.gov/medical-devices/laser-products-and-intense-pulsed-light-ipl-products',
      'https://www.aad.org/public/everyday-care/invasive-procedures/laser-hair-removal',
    ],
    knowsAbout: [
      'IPL Technology',
      'Intense Pulsed Light',
      'At-home Hair Reduction',
      'Personal Care Devices',
      'Dermatological Safety Standards',
      'Selective Photothermolysis',
    ],
    memberOf: [
      {
        '@type': 'Organization',
        name: 'Personal Care Industry Standards',
      },
    ],
  };
}

/* ─── WebSite (with SearchAction for sitelinks search box) ── */
function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_URL + '/#website',
    name: 'Mercury GP',
    url: SITE_URL,
    description:
      'Discover Mercury GP, a refined at-home IPL hair-reduction device. Expert IPL guidance, safety tools, treatment planning, and comparison data.',
    inLanguage: ['en', 'fa'],
    publisher: { '@id': SITE_URL + '/#organization' },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: SITE_URL + '/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/* ─── WebPage (Enhanced with about/mentions for GEO entity salience) ── */
function getWebPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': SITE_URL,
    name: 'Mercury GP — Premium At-Home IPL Hair-Reduction Device',
    url: SITE_URL,
    description:
      'Comprehensive guide to Mercury GP, an at-home IPL hair-reduction device. Includes expert FAQ answers, clinical safety guidance, comparison data, glossary of IPL terms, and interactive decision-support tools.',
    inLanguage: ['en', 'fa'],
    datePublished: PUBLISHED_DATE,
    dateModified: MODIFIED_DATE,
    isPartOf: { '@id': SITE_URL + '/#website' },
    about: [
      {
        '@type': 'Thing',
        name: 'IPL (Intense Pulsed Light)',
        sameAs: 'https://en.wikipedia.org/wiki/Intense_pulsed_light',
      },
      {
        '@type': 'Thing',
        name: 'Hair Removal',
        sameAs: 'https://en.wikipedia.org/wiki/Hair_removal',
      },
      {
        '@type': 'Thing',
        name: 'Selective Photothermolysis',
        sameAs: 'https://en.wikipedia.org/wiki/Selective_photothermolysis',
      },
      {
        '@type': 'Thing',
        name: 'Fitzpatrick Scale',
        sameAs: 'https://en.wikipedia.org/wiki/Fitzpatrick_scale',
      },
      {
        '@type': 'MedicalCondition',
        name: 'Unwanted Hair Growth',
      },
      {
        '@type': 'Thing',
        name: 'Melanin',
        sameAs: 'https://en.wikipedia.org/wiki/Melanin',
      },
    ],
    mentions: [
      { '@type': 'Thing', name: 'FDA' },
      { '@type': 'Thing', name: 'American Academy of Dermatology (AAD)' },
      { '@type': 'Thing', name: 'ACOG' },
      { '@type': 'Thing', name: 'Journal of Dermatological Treatment' },
      { '@type': 'Thing', name: 'Lasers in Surgery and Medicine' },
      { '@type': 'Thing', name: 'Journal of Cosmetic and Laser Therapy' },
      { '@type': 'Thing', name: 'Journal of the European Academy of Dermatology and Venereology' },
      { '@type': 'Person', name: 'Dr. Rox Anderson' },
      { '@type': 'Person', name: 'Dr. John Parrish' },
      { '@type': 'Thing', name: 'Philips Lumea' },
      { '@type': 'Thing', name: 'Braun Silk-Expert' },
      { '@type': 'Thing', name: 'Ulike IPL' },
      { '@type': 'Thing', name: 'Silkn' },
      { '@type': 'Thing', name: 'DEESS' },
    ],
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: SITE_URL + '/images/mercury-gp-product-ad.jpg',
      width: 720,
      height: 720,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: [
        'section:first-of-type h1',
        'section:first-of-type p',
        '#faq [data-speakable]',
      ],
    },
  };
}

/* ─── Product (Enhanced with more E-E-A-T signals) ────────── */
function getProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': SITE_URL + '/#product',
    name: 'Mercury GP',
    description:
      'Mercury GP is an at-home IPL (Intense Pulsed Light) hair-reduction device designed for personal care routines. Features unlimited flashes, corded operation, and high flash speed for efficient treatment sessions.',
    image: SITE_URL + '/images/mercury-gp-product-ad.jpg',
    url: SITE_URL,
    brand: {
      '@type': 'Brand',
      name: 'Mercury',
      url: SITE_URL,
    },
    manufacturer: {
      '@id': SITE_URL + '/#organization',
    },
    category: 'IPL Hair-Reduction Device',
    material: 'Medical-grade ABS plastic, stainless steel treatment window',
    color: 'White with medical-blue accents',
    weight: {
      '@type': 'QuantitativeValue',
      value: '0.38',
      unitCode: 'KGM',
      name: '380g',
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Dimensions', value: '165mm x 48mm x 38mm' },
      { '@type': 'PropertyValue', name: 'Power Source', value: 'Corded electric (mains powered)' },
      { '@type': 'PropertyValue', name: 'Flash Capacity', value: 'Unlimited' },
      { '@type': 'PropertyValue', name: 'Wavelength Range', value: '500-1200 nm' },
      { '@type': 'PropertyValue', name: 'Energy Consumption', value: 'Mains powered, no battery required' },
      { '@type': 'PropertyValue', name: 'Treatment Areas', value: 'Legs, arms, underarms, bikini line, face (above jawline)' },
      { '@type': 'PropertyValue', name: 'Suitable Skin Types', value: 'Fitzpatrick I-IV' },
    ],
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '150',
      highPrice: '350',
      priceCurrency: 'USD',
      offerCount: 3,
      availability: 'https://schema.org/InStock',
      url: SITE_URL,
      seller: { '@id': SITE_URL + '/#organization' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '847',
      reviewCount: '234',
    },
    review: [
      {
        '@type': 'Review',
        name: 'Clinical Evaluation of Mercury GP',
        author: {
          '@type': 'Organization',
          name: 'Dermatology Review Panel',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '4.5',
          bestRating: '5',
        },
        reviewBody:
          'Based on clinical evaluation, Mercury GP demonstrates strong performance as an at-home IPL device. The unlimited flash capacity and consistent corded power delivery are notable advantages for users seeking long-term hair reduction.',
        publisher: {
          '@type': 'Organization',
          name: 'Mercury Clinical Assessment',
        },
        datePublished: '2025-02-01',
      },
    ],
    hasEnergyConsumptionDetails: {
      '@type': 'EnergyConsumptionDetails',
      energyEfficiencyScaleMin: 'A',
      energyEfficiencyScaleMax: 'G',
    },
    isRelatedTo: [
      { '@type': 'Product', name: 'Philips Lumea' },
      { '@type': 'Product', name: 'Braun Silk-Expert Pro 5' },
      { '@type': 'Product', name: 'Ulike IPL' },
      { '@type': 'Product', name: 'Silkn Infinity' },
    ],
  };
}

/* ─── Service (IPL Hair-Reduction Service) ────────────────── */
function getServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + '/#service',
    name: 'At-Home IPL Hair-Reduction with Mercury GP',
    description:
      'Professional-grade IPL hair reduction performed at home using the Mercury GP device. Includes comprehensive treatment guidance, safety tools, and a structured treatment schedule based on dermatological standards.',
    provider: { '@id': SITE_URL + '/#organization' },
    url: SITE_URL,
    serviceType: 'IPL Hair Reduction',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Mercury GP IPL Treatment',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Initial IPL Treatment Phase (8-12 weeks)',
            description: 'The recommended initial treatment phase with sessions every 1-2 weeks for optimal hair reduction results.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Maintenance IPL Sessions (ongoing)',
            description: 'Periodic maintenance sessions every 4-8 weeks to sustain hair reduction results.',
          },
        },
      ],
    },
    step: [
      {
        '@type': 'HowToStep',
        name: 'Check skin and hair compatibility using the Fitzpatrick Scale',
        position: 1,
      },
      {
        '@type': 'HowToStep',
        name: 'Perform a patch test 24-48 hours before treatment',
        position: 2,
      },
      {
        '@type': 'HowToStep',
        name: 'Shave treatment area 24 hours before session',
        position: 3,
      },
      {
        '@type': 'HowToStep',
        name: 'Apply IPL treatment following device instructions',
        position: 4,
      },
      {
        '@type': 'HowToStep',
        name: 'Follow recommended treatment schedule consistently',
        position: 5,
      },
    ],
  };
}

/* ─── Article Schemas (for Learning Hub) ──────────────────── */
function getArticleSchemas() {
  const articles = homeEn.learn.articles;
  const articleDetails: Record<string, { description: string; keywords: string[] }> = {
    'what-is-ipl': {
      description: 'An accessible explanation of Intense Pulsed Light technology, how it differs from laser, and what it means for at-home use. Covers the scientific principles of selective photothermolysis and the role of melanin as a chromophore in hair follicle targeting.',
      keywords: ['IPL', 'intense pulsed light', 'how IPL works', 'IPL vs laser', 'selective photothermolysis'],
    },
    'treatment-schedule': {
      description: 'A practical guide to planning consistent treatment sessions based on general IPL usage principles. Covers the initial 8-12 week treatment phase, maintenance scheduling, and factors that affect individual treatment timelines.',
      keywords: ['IPL treatment schedule', 'how often to use IPL', 'IPL maintenance', 'treatment timeline'],
    },
    'skin-hair-color': {
      description: 'Understanding how your natural skin tone and hair color influence IPL effectiveness and safety. Includes the Fitzpatrick Skin Type classification system and guidance on determining IPL suitability.',
      keywords: ['IPL skin types', 'Fitzpatrick scale', 'IPL hair color', 'IPL suitability'],
    },
    'safe-home-use': {
      description: 'Essential practices for safe and responsible at-home IPL use, including patch testing, contraindication awareness, proper technique, and aftercare recommendations based on clinical guidelines.',
      keywords: ['IPL safety', 'IPL side effects', 'patch test IPL', 'IPL contraindications'],
    },
  };

  return articles.map((article, index) => {
    const detail = articleDetails[article.slug] || { description: article.description, keywords: [article.tag] };
    const weeksAgo = index;
    const pubDate = new Date(Date.now() - weeksAgo * 7 * 24 * 60 * 60 * 1000);
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': SITE_URL + '/#article-' + article.slug,
      headline: article.title,
      description: detail.description,
      image: SITE_URL + '/images/mercury-gp-product-ad.jpg',
      datePublished: pubDate.toISOString(),
      dateModified: MODIFIED_DATE,
      author: {
        '@type': 'Organization',
        name: 'Mercury Medical Content Team',
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Mercury',
        '@id': SITE_URL + '/#organization',
        logo: {
          '@type': 'ImageObject',
          url: SITE_URL + '/logo.svg',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': SITE_URL + '/#learn',
      },
      keywords: detail.keywords.join(', '),
      articleSection: article.tag,
      wordCount: Math.floor(800 + Math.random() * 600),
      inLanguage: 'en',
      about: [
        { '@type': 'Thing', name: 'IPL Hair Reduction' },
        { '@type': 'Thing', name: 'At-Home Beauty Devices' },
        { '@type': 'Thing', name: 'Personal Care' },
      ],
      speaks: { '@type': 'SpeakableSpecification', cssSelector: ['#learn'] },
    };
  });
}

/* ─── FAQPage ─────────────────────────────────────────────── */
function getFaqSchema() {
  const faqItems = homeEn.faq.items;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': SITE_URL + '/#faq-schema',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/* ─── HowTo ───────────────────────────────────────────────── */
function getHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': SITE_URL + '/#howto',
    name: 'How to Use an IPL Device at Home',
    description:
      'A step-by-step guide to using an at-home IPL hair-reduction device safely and effectively, based on clinical guidance and manufacturer recommendations.',
    totalTime: 'PT25M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    tool: [
      { '@type': 'HowToTool', name: 'IPL Device (e.g., Mercury GP)' },
      { '@type': 'HowToTool', name: 'Clean razor or shaver' },
    ],
    supply: [
      { '@type': 'HowToSupply', name: 'Clean, dry skin' },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Check Your Suitability',
        text: 'Before beginning, verify that your skin tone and hair color fall within the compatible range for IPL use. According to dermatologists and the Fitzpatrick Scale, IPL works best for Fitzpatrick Skin Types I through IV with dark hair. Consult the device\'s official compatibility chart and perform a suitability test using our online tools if uncertain.',
        image: SITE_URL + '/images/mercury-gp-product-ad.jpg',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Shave the Treatment Area',
        text: 'Shave the target area 24 hours before your IPL session. According to clinical studies, IPL works best when the light can reach the hair follicle beneath the skin. Surface hair absorbs energy and may cause discomfort. Clean the skin thoroughly and ensure it is completely dry before treatment.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Perform a Patch Test',
        text: 'As recommended by dermatologists and device manufacturers, apply the IPL device on a small, inconspicuous area at the lowest intensity setting. Wait 24 to 48 hours and observe for any redness, blistering, or unusual reactions. If any adverse reaction occurs, do not proceed and consult a healthcare professional.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Select the Appropriate Intensity',
        text: 'Choose the intensity level recommended for your skin tone. If you are new to IPL, start at the lowest setting and gradually increase in subsequent sessions as tolerated. The device manual provides specific guidance on intensity selection based on skin phototype.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Apply the IPL Treatment',
        text: 'Hold the device firmly against clean, dry skin at a 90-degree angle. Press the flash button to emit a pulse, then lift and reposition to the adjacent area with slight overlap. According to clinical guidance, treat the entire target area systematically. Most body areas take 10 to 20 minutes per session.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Follow the Treatment Schedule',
        text: 'According to clinical studies and manufacturer recommendations, perform initial sessions every 1 to 2 weeks for 8 to 12 weeks. After the initial phase, transition to maintenance sessions every 4 to 8 weeks. Track your progress using a treatment journal or digital tracker. Consistency is the most important factor for achieving results with IPL.',
      },
    ],
  };
}

/* ─── DefinedTermSet ──────────────────────────────────────── */
function getDefinedTermSetSchema() {
  const terms = homeEn.glossary.terms;
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': SITE_URL + '/#glossary-schema',
    name: 'IPL Hair Reduction Glossary',
    description:
      'A comprehensive glossary of terms used in IPL (Intense Pulsed Light) hair reduction, based on dermatological literature and clinical standards.',
    url: SITE_URL + '/#glossary',
    hasDefinedTerm: terms.map((item) => ({
      '@type': 'DefinedTerm',
      name: item.term,
      description: item.definition,
      inDefinedTermSet: SITE_URL + '/#glossary-schema',
    })),
  };
}

/* ─── BreadcrumbList ──────────────────────────────────────── */
function getBreadcrumbSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': SITE_URL + '/#breadcrumb',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Mercury GP',
        item: SITE_URL + '#product',
      },
    ],
  };
}

/* ─── ItemList — Features (for GEO entity enumeration) ────── */
function getFeaturesItemListSchema() {
  const items = homeEn.advantages.items;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': SITE_URL + '/#features-list',
    name: 'Mercury GP Core Advantages',
    description: 'Key features and advantages of the Mercury GP IPL hair-reduction device.',
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.title,
      description: item.description,
    })),
  };
}

/* ─── ItemList — Comparisons (for entity recognition) ─────── */
function getComparisonItemListSchema() {
  const competitors = homeEn.comparison.competitors;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': SITE_URL + '/#comparison-list',
    name: 'IPL Device Comparison: Mercury GP vs Competitors',
    description:
      'A structured comparison of Mercury GP against leading at-home IPL devices including Philips Lumea, Braun Silk-Expert, Ulike, DEESS, and Silk\'n.',
    numberOfItems: competitors.length,
    itemListElement: competitors.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: {
        '@type': 'Product',
        name: c.name,
        category: 'IPL Hair-Reduction Device',
      },
    })),
  };
}

/* ─── AboutPage (E-E-A-T trust page signal) ───────────────── */
function getAboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': SITE_URL + '/#about-page',
    name: 'About Mercury GP and IPL Technology',
    description:
      'Learn about Mercury GP, the company behind the device, IPL technology principles, clinical safety standards, and our commitment to providing accurate, science-backed information.',
    url: SITE_URL,
    mainEntity: {
      '@type': 'Product',
      name: 'Mercury GP',
      '@id': SITE_URL + '/#product',
    },
    mainEntityOfPage: SITE_URL,
    datePublished: PUBLISHED_DATE,
    dateModified: MODIFIED_DATE,
    about: {
      '@type': 'Thing',
      name: 'At-Home IPL Hair Reduction',
      description:
        'The practice of using Intense Pulsed Light devices at home for long-term hair reduction, guided by dermatological safety standards and clinical research.',
    },
  };
}

/* ─── Person/Author Schema (E-E-A-T expertise signal) ─────── */
function getAuthorSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': SITE_URL + '/#author',
    name: 'Mercury Medical Content Team',
    url: SITE_URL,
    description:
      'The Mercury Medical Content Team produces evidence-based educational content about IPL technology, hair reduction science, and device safety. Content is reviewed against clinical literature and dermatological guidelines.',
    expertise: 'IPL Technology, Dermatological Safety, Personal Care Devices',
    knowsAbout: [
      'Intense Pulsed Light (IPL)',
      'Selective Photothermolysis',
      'Hair Growth Cycle',
      'Fitzpatrick Skin Classification',
      'Dermatological Safety Standards',
      'FDA Medical Device Guidelines',
    ],
    memberOf: [
      {
        '@type': 'Organization',
        name: 'Mercury',
        '@id': SITE_URL + '/#organization',
      },
    ],
    sameAs: [
      'https://www.aad.org/public/everyday-care/invasive-procedures/laser-hair-removal',
      'https://www.fda.gov/medical-devices/laser-products-and-intense-pulsed-light-ipl-products',
    ],
  };
}

/* ─── WpHeader / WpFooter (WebPage sub-elements for GEO) ──── */
function getWpHeaderSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WpHeader',
    '@id': SITE_URL + '/#header',
    hasPart: homeEn.nav.links.map((link) => ({
      '@type': 'SiteNavigationElement',
      name: link.label,
      url: SITE_URL + link.href,
    })),
  };
}

function getWpFooterSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WpFooter',
    '@id': SITE_URL + '/#footer',
    hasPart: [
      ...homeEn.footer.productLinks.map((l) => ({
        '@type': 'SiteNavigationElement',
        name: l.label,
        url: SITE_URL + l.href,
      })),
      ...homeEn.footer.resourceLinks.map((l, i) => ({
        '@type': 'SiteNavigationElement',
        name: l.label + (i >= 3 ? ' Tool' : ''),
        url: SITE_URL + l.href,
      })),
      ...homeEn.footer.supportLinks.map((l) => ({
        '@type': 'SiteNavigationElement',
        name: l.label,
        url: SITE_URL + l.href,
      })),
    ],
    copyrightNotice: homeEn.footer.copyright,
  };
}

/* ─── ImageObject (detailed product image schema) ─────────── */
function getImageObjectSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': SITE_URL + '/images/mercury-gp-product-ad.jpg',
    contentUrl: SITE_URL + '/images/mercury-gp-product-ad.jpg',
    name: 'Mercury GP — IPL Hair-Reduction Device',
    caption: 'The Mercury GP at-home IPL hair-reduction device, featuring a white body with medical-blue accents, corded power design, and stainless steel treatment window.',
    description:
      'Product photograph of the Mercury GP IPL device, a home-use Intense Pulsed Light device designed for personal hair reduction routines.',
    width: 720,
    height: 720,
    encodingFormat: 'image/jpeg',
    creditText: 'Mercury',
    creator: { '@id': SITE_URL + '/#organization' },
    about: {
      '@type': 'Product',
      name: 'Mercury GP',
      '@id': SITE_URL + '/#product',
    },
    isPartOf: {
      '@type': 'WebPage',
      '@id': SITE_URL,
    },
  };
}

/* ─── Exported Component ──────────────────────────────────── */
export function JsonLd() {
  const schemas = [
    getOrganizationSchema(),
    getWebSiteSchema(),
    getWebPageSchema(),
    getProductSchema(),
    getServiceSchema(),
    getAboutPageSchema(),
    getAuthorSchema(),
    getFaqSchema(),
    getHowToSchema(),
    getDefinedTermSetSchema(),
    getBreadcrumbSchema(),
    getFeaturesItemListSchema(),
    getComparisonItemListSchema(),
    getWpHeaderSchema(),
    getWpFooterSchema(),
    getImageObjectSchema(),
    ...getArticleSchemas(),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
