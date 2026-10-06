import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CallbackWidget from '@/components/forms/CallbackWidget'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com'),
  title: {
    default: 'SK Properties — Buy, Rent & PG in Bangalore',
    template: '%s | SK Properties',
  },
  description:
    'Find houses for rent, flats for rent, properties to buy, plots & land, and PG accommodation in Bangalore. SK Properties — trusted real estate consultant with 12+ years of experience.',
  keywords: [
    'real estate Bangalore',
    'houses for rent Bangalore',
    'flats for rent Bangalore',
    'property for sale Bangalore',
    'buy property Bangalore',
    'PG accommodation Bangalore',
    'plots and land Bangalore',
    'luxury villas Bangalore',
    'apartments Bangalore',
    'commercial property Bangalore',
    'SK Properties',
  ],
  authors: [{ name: 'SK Properties' }],
  creator: 'SK Properties',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'SK Properties',
    title: 'SK Properties — Buy, Rent & PG in Bangalore',
    description:
      'Find houses for rent, flats for rent, properties to buy, plots & land, and PG accommodation in Bangalore. Trusted real estate consultant with 12+ years of experience.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'SK Properties — Real Estate Bangalore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SK Properties — Buy, Rent & PG in Bangalore',
    description:
      'Houses for rent, flats for rent, property for sale, plots & PG accommodation in Bangalore. 12+ years. 500+ properties.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e){}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CallbackWidget />
      </body>
    </html>
  )
}
