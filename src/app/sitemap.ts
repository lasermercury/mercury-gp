import type { MetadataRoute } from 'next'

const BASE_URL = 'https://lasermercury.ir'

const SECTIONS = [
  { url: '/', priority: 1.0, changeFreq: 'weekly' as const },
  { url: '/?lang=fa', priority: 0.9, changeFreq: 'weekly' as const },
]

const STATIC_ASSETS: MetadataRoute.Sitemap[number][] = [
  {
    url: `${BASE_URL}/#product`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/#technology`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/#safety`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/#compare`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/#learn`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/#faq`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/#glossary`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/#tools`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/#contact`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.5,
  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const pages: MetadataRoute.Sitemap = SECTIONS.map((s) => ({
    url: `${BASE_URL}${s.url}`,
    lastModified: now,
    changeFrequency: s.changeFreq,
    priority: s.priority,
    images: s.priority >= 0.9
      ? [
          {
            loc: `${BASE_URL}/images/mercury-gp-product-ad.jpg`,
            title: 'Mercury GP — IPL Hair-Reduction Device',
            caption: 'Mercury GP at-home IPL device for personal hair reduction',
          },
        ]
      : undefined,
  }))

  return [...pages, ...STATIC_ASSETS]
}
