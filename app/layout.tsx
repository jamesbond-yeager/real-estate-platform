import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import CallbackWidget from '@/components/forms/CallbackWidget'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com'),
  title: {
    default: 'Prestige Properties — Premium Real Estate in Bangalore',
    template: '%s | Prestige Properties',
  },
  description:
    'Find your dream home with Bangalore\'s trusted real estate expert. Residential, commercial, luxury villas, land, and PG accommodations. Call today for a free consultation.',
  keywords: ['real estate bangalore', 'property for sale bangalore', 'luxury villas', 'apartments', 'commercial property', 'land plots', 'PG accommodation'],
  authors: [{ name: 'Prestige Properties' }],
  creator: 'Prestige Properties',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Prestige Properties',
    title: 'Prestige Properties — Premium Real Estate in Bangalore',
    description: 'Find your dream home with Bangalore\'s trusted real estate expert.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Prestige Properties' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prestige Properties — Premium Real Estate in Bangalore',
    description: 'Find your dream home with Bangalore\'s trusted real estate expert.',
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
        <WhatsAppButton />
        <CallbackWidget />
      </body>
    </html>
  )
}
