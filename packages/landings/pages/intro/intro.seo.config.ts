/* eslint-disable max-len */
import type { NextSeoProps } from 'next-seo'

export const NEXT_SEO: NextSeoProps = {
  title: 'HEQS Intro',
  description:
    'HEQS  is a SaaS appplication that allows you to improve your operations  by decisionmaking based on a reliable data',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.url.ie/a',
    title: 'Open Graph Title A',
    description: 'Open Graph Description A',
    images: [
      {
        url: 'https://www.test.ie/og-image-a-01.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt A',
        type: 'image/jpeg',
        secureUrl: 'https://www.test.ie/secure-og-image-a-01.jpg'
      }
    ],
    siteName: 'SiteName A'
  },
  twitter: {
    handle: '@handlea',
    site: '@sitea',
    cardType: 'summary_large_image'
  }
}
