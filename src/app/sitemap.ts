import type { MetadataRoute } from 'next'

const BASE_URL = 'https://lasermercury.ir'

// Fixed lastmod — update when content actually changes
const LAST_MODIFIED = new Date('2025-09-01')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Main homepage (canonical)
    {
      url: BASE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: BASE_URL,
          fa: `${BASE_URL}/?lang=fa`,
          'x-default': BASE_URL,
        },
      },
      images: [`${BASE_URL}/images/mercury-gp-product-ad.jpg`],
    },
  ]
}
