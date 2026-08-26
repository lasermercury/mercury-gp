import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/layout/providers";
import { JsonLd } from "@/components/layout/json-ld";
import { LoadingBar } from "@/components/layout/loading-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = 'https://lasermercury.ir'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a1628' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || BASE_URL),
  title: {
    default: "Mercury GP — Premium At-Home IPL Hair-Reduction Device",
    template: "%s | Mercury GP",
  },
  description:
    "Discover Mercury GP, a refined at-home IPL hair-reduction device designed for your routine. Learn about IPL technology, safety guidance, treatment planning, and smart tools to help you decide. Based on clinical research and dermatological standards.",
  keywords: [
    "Mercury GP",
    "IPL",
    "IPL hair reduction",
    "at-home IPL",
    "home hair removal",
    "IPL device",
    "intense pulsed light",
    "hair removal device",
    "personal care",
    "Fitzpatrick scale",
    "IPL safety",
    "IPL treatment schedule",
    "home laser hair removal",
    "IPL vs laser",
    "Mercury Laser IPL",
  ],
  authors: [
    { name: "Mercury Medical Content Team", url: BASE_URL },
  ],
  creator: "Mercury",
  publisher: "Mercury",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/logo.svg", sizes: "any", type: "image/svg+xml" },
    ],
    apple: "/logo.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Mercury GP — Premium At-Home IPL Hair-Reduction Device",
    description:
      "Discover Mercury GP, a refined at-home IPL hair-reduction device designed for your routine. Expert IPL guidance, safety tools, and treatment planning.",
    type: "website",
    siteName: "Mercury GP",
    locale: "en_US",
    alternateLocale: "fa_IR",
    images: [
      {
        url: "/images/mercury-gp-product-ad.jpg",
        width: 720,
        height: 720,
        alt: "Mercury GP — IPL Hair-Reduction Device",
        type: "image/jpeg",
      },
    ],
    emails: ["support@lasermercury.ir"],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercury GP — Premium At-Home IPL Hair-Reduction Device',
    description:
      'Discover Mercury GP, a refined at-home IPL hair-reduction device designed for your routine.',
    images: ['/images/mercury-gp-product-ad.jpg'],
    site: '@mercurygp',
    creator: '@mercurygp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'news-keywords': true,
    },
    otherBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      'en-US': '/',
      'fa-IR': '/?lang=fa',
    },
    media: {
      'only screen and (max-width: 640px)': '/?view=mobile',
    },
    types: {
      'application/rss+xml': `${BASE_URL}/feed.xml`,
    },
  },
  category: 'Health > Beauty > Hair Removal',
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE_HERE',
    yandex: 'YOUR_YANDEX_VERIFICATION_CODE_HERE',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Mercury GP',
    'msapplication-TileColor': '#0a1628',
    'msapplication-tap-highlight': 'no',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Search Console Verification — replace with your actual code */}
        {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /> */}

        {/* Google Analytics 4 — replace G-XXXXXXXXXX with your actual Measurement ID */}
        {/* GA4 is loaded via Script component in the body for better performance */}

        {/* Google Tag Manager — replace GTM-XXXXXXX with your actual container ID */}
        {/* <Script id="gtm" strategy="afterInteractive">
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-XXXXXXX');
        </Script> */}

        {/* Preconnect to Google and social platforms */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* Vazirmatn for Persian/Farsi text */}
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* Hreflang alternates for multilingual SEO */}
        <link rel="alternate" hrefLang="en" href="/" />
        <link rel="alternate" hrefLang="fa" href="/?lang=fa" />
        <link rel="alternate" hrefLang="x-default" href="/" />

        {/* RSS feed auto-discovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Mercury GP — IPL Hair-Reduction Knowledge Base"
          href={`${BASE_URL}/feed.xml`}
        />

        {/* Canonical */}
        <link rel="canonical" href={BASE_URL} />

        {/* PWA / mobile app meta */}
        <meta name="theme-color" content="#0a1628" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Mercury GP" />

        {/* Structured data for GEO/AIO — entity recognition signals */}
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {/* Google Analytics 4 — uncomment and replace G-XXXXXXXXXX */}
        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        </Script> */}

        {/* GTM noscript fallback — uncomment and replace GTM-XXXXXXX */}
        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0" width="0" style={{display:'none',visibility:'hidden'}}
          />
        </noscript> */}

        <Providers>{children}</Providers>
        <Suspense fallback={null}><LoadingBar /></Suspense>
        <Toaster />
      </body>
    </html>
  );
}