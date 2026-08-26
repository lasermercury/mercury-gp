import { NextResponse } from 'next/server'

const BASE_URL = 'https://lasermercury.ir'

const ARTICLES = [
  {
    title: 'What Is IPL? A Clear Introduction',
    slug: 'what-is-ipl',
    description:
      'Intense Pulsed Light (IPL) is a broad-spectrum light technology used for long-term hair reduction. This article explains how IPL works, how it differs from laser treatments, and what makes it a popular choice for at-home hair removal devices like Mercury GP.',
    categories: ['IPL Technology', 'Hair Reduction', 'Beginner Guide'],
    weeksAgo: 0,
  },
  {
    title: 'Building Your IPL Treatment Schedule',
    slug: 'treatment-schedule',
    description:
      'Consistency is the key to effective IPL results. Learn how to build an optimal treatment schedule that balances frequency with skin recovery, including the recommended phase-based approach for the first 12 weeks and ongoing maintenance.',
    categories: ['Treatment Schedule', 'Planning', 'Maintenance'],
    weeksAgo: 1,
  },
  {
    title: 'Skin Tone and Hair Color: What You Need to Know',
    slug: 'skin-hair-color',
    description:
      'IPL effectiveness depends on the contrast between skin tone and hair color. This guide covers which skin tones and hair colors respond best to IPL treatment, the Fitzpatrick scale, and how Mercury GP devices are designed to work across a wide range of complexions.',
    categories: ['Skin Tone', 'Hair Color', 'Fitzpatrick Scale', 'Safety'],
    weeksAgo: 2,
  },
  {
    title: 'Safe Home-Use Habits for IPL Devices',
    slug: 'safe-home-use',
    description:
      'Using an IPL device at home is safe when you follow best practices. This article covers pre-treatment checks, proper technique, aftercare routines, and common mistakes to avoid so you can achieve great results confidently with your Mercury GP device.',
    categories: ['Safety', 'Home Use', 'Best Practices', 'Aftercare'],
    weeksAgo: 3,
  },
]

function rfc822(date: Date): string {
  return date.toUTCString()
}

export async function GET() {
  const now = new Date()
  const oneWeek = 7 * 24 * 60 * 60 * 1000

  const items = ARTICLES.map((a) => {
    const pubDate = new Date(now.getTime() - a.weeksAgo * oneWeek)
    const link = `${BASE_URL}/#learn`
    return `    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="false">mercury-gp-${a.slug}</guid>
      <description><![CDATA[${a.description}]]></description>
      <pubDate>${rfc822(pubDate)}</pubDate>
      <author>support@lasermercury.ir (Mercury Support)</author>
      <category>IPL Hair Reduction</category>
${a.categories.map((c) => `      <category>${c}</category>`).join('\n')}
    </item>`
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">
  <channel>
    <title>Mercury GP — IPL Hair-Reduction Knowledge Base</title>
    <link>${BASE_URL}</link>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Expert guides on IPL technology, safety best practices, treatment planning, and product updates for at-home hair reduction with Mercury GP.</description>
    <language>en-us</language>
    <copyright>© ${now.getFullYear()} Mercury. All rights reserved.</copyright>
    <pubDate>${rfc822(now)}</pubDate>
    <lastBuildDate>${rfc822(now)}</lastBuildDate>
    <managingEditor>support@lasermercury.ir (Mercury Support)</managingEditor>
    <webMaster>support@lasermercury.ir (Mercury Support)</webMaster>
    <generator>Next.js</generator>
    <ttl>60</ttl>
    <sy:updatePeriod>weekly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <image>
      <url>${BASE_URL}/logo.svg</url>
      <title>Mercury GP</title>
      <link>${BASE_URL}</link>
      <width>144</width>
      <height>144</height>
      <description>Mercury GP — Premium At-Home IPL Hair-Reduction Device</description>
    </image>
${items}
  </channel>
</rss>`

  return new NextResponse(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Robots-Tag': 'noindex, follow',
    },
  })
}
