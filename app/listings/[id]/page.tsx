import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import listingsData from '@/data/listings.json'
import type { Listing } from '@/types/listing'
import PropertyGallery from '@/components/listings/PropertyGallery'
import EnquiryForm from '@/components/forms/EnquiryForm'
import EMICalculator from '@/components/ui/EMICalculator'
import Badge from '@/components/ui/Badge'
import { categoryLabel, typeLabel, getStatusColor, getStatusLabel } from '@/lib/utils'
import ShareButton from '@/components/ui/ShareButton'
import {
  Bed, Bath, Maximize, MapPin, Calendar, Car, Layers, ArrowLeft,
  CheckCircle2, Send
} from 'lucide-react'

const ALL_LISTINGS = listingsData as Listing[]

export function generateStaticParams() {
  return ALL_LISTINGS.map(l => ({ id: l.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const listing = ALL_LISTINGS.find(l => l.id === id)
  if (!listing) return {}

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com'
  return {
    title: listing.title,
    description: listing.description.slice(0, 160),
    openGraph: {
      title: listing.title,
      description: listing.description.slice(0, 160),
      images: [{ url: listing.images[0], width: 1200, height: 800, alt: listing.title }],
      type: 'website',
      url: `${siteUrl}/listings/${listing.id}`,
    },
    alternates: { canonical: `${siteUrl}/listings/${listing.id}` },
  }
}

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const listing = ALL_LISTINGS.find(l => l.id === id)
  if (!listing) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com'

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.title,
    description: listing.description,
    url: `${siteUrl}/listings/${listing.id}`,
    image: listing.images,
    address: {
      '@type': 'PostalAddress',
      addressLocality: listing.location,
      addressCountry: 'IN',
    },
    price: listing.priceLabel,
    numberOfRooms: listing.bedrooms || undefined,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: listing.area,
      unitText: listing.areaUnit,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: listing.lat,
      longitude: listing.lng,
    },
  }

  const specs = [
    listing.bedrooms > 0 && { icon: Bed, label: 'Bedrooms', value: listing.bedrooms },
    listing.bathrooms > 0 && { icon: Bath, label: 'Bathrooms', value: listing.bathrooms },
    { icon: Maximize, label: 'Area', value: `${listing.area.toLocaleString()} ${listing.areaUnit}` },
    listing.parking > 0 && { icon: Car, label: 'Parking', value: listing.parking },
    listing.yearBuilt && { icon: Calendar, label: 'Year Built', value: listing.yearBuilt },
    listing.floor && { icon: Layers, label: 'Floor', value: listing.floor },
    listing.facing && { icon: MapPin, label: 'Facing', value: listing.facing },
    listing.furnishing && { icon: CheckCircle2, label: 'Furnishing', value: listing.furnishing.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) },
  ].filter(Boolean) as { icon: React.ElementType; label: string; value: string | number }[]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-20 lg:pt-24">
        {/* Breadcrumb */}
        <div className="section-padding py-4 border-b border-cream-300 dark:border-navy-700">
          <div className="container-max flex items-center gap-2 text-sm text-gray-500 dark:text-navy-200">
            <Link href="/" className="hover:text-gold-500 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/listings" className="hover:text-gold-500 transition-colors">Properties</Link>
            <span>/</span>
            <span className="text-navy dark:text-cream line-clamp-1">{listing.title}</span>
          </div>
        </div>

        <div className="section-padding py-10">
          <div className="container-max">
            <Link href="/listings" className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-navy-200 hover:text-gold-500 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Listings
            </Link>

            <div className="grid lg:grid-cols-3 gap-10">
              {/* Left col */}
              <div className="lg:col-span-2 space-y-8">
                {/* Gallery */}
                <PropertyGallery images={listing.images} title={listing.title} />

                {/* Title area */}
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="navy">{typeLabel(listing.type)}</Badge>
                      <Badge variant="gold">{categoryLabel(listing.category)}</Badge>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(listing.status)}`}>
                        {getStatusLabel(listing.status)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        Verified Listing
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <ShareButton title={listing.title} />
                    </div>
                  </div>

                  <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-navy dark:text-cream mb-2">
                    {listing.title}
                  </h1>

                  <div className="flex items-center gap-2 text-gray-600 dark:text-navy-200 mb-4">
                    <MapPin className="w-4 h-4 text-gold-500" />
                    <span className="text-sm">{listing.location}</span>
                  </div>

                  <p className="font-serif text-3xl sm:text-4xl font-bold text-gold-500">{listing.priceLabel}</p>

                  <a href="#enquire" className="btn-primary text-sm mt-5 inline-flex">
                    <Send className="w-4 h-4" />
                    Enquire about this property
                  </a>
                </div>

                {/* Specs grid */}
                <div>
                  <h2 className="font-serif text-xl font-semibold text-navy dark:text-cream mb-4">Property Details</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {specs.map(spec => (
                      <div key={spec.label} className="bg-cream-50 dark:bg-navy-800 rounded-2xl p-4 flex flex-col items-center text-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-gold-500/10 flex items-center justify-center">
                          <spec.icon className="w-4 h-4 text-gold-500" />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-navy-200">{spec.label}</p>
                        <p className="font-semibold text-navy dark:text-cream text-sm leading-tight">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="font-serif text-xl font-semibold text-navy dark:text-cream mb-4">About This Property</h2>
                  <p className="text-gray-600 dark:text-navy-100 leading-relaxed text-base">{listing.description}</p>
                </div>

                {/* Amenities */}
                {listing.amenities.length > 0 && (
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-navy dark:text-cream mb-4">Amenities</h2>
                    <div className="flex flex-wrap gap-2">
                      {listing.amenities.map(a => (
                        <div key={a} className="flex items-center gap-2 px-3 py-2 bg-cream-100 dark:bg-navy-800 rounded-xl text-sm text-navy dark:text-cream">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                          {a}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Map */}
                <div>
                  <h2 className="font-serif text-xl font-semibold text-navy dark:text-cream mb-4">Location</h2>
                  <div className="rounded-2xl overflow-hidden aspect-video border border-cream-300 dark:border-navy-600">
                    <iframe
                      title={`Map — ${listing.location}`}
                      src={`https://maps.google.com/maps?q=${listing.lat},${listing.lng}&z=14&output=embed`}
                      width="100%"
                      height="100%"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="border-0 w-full h-full"
                    />
                  </div>
                </div>

                {/* EMI calculator for sale listings */}
                {listing.type === 'buy' && (
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-navy dark:text-cream mb-4">EMI Calculator</h2>
                    <EMICalculator defaultPrice={Math.round(listing.price * 0.8)} />
                  </div>
                )}
              </div>

              {/* Right sticky col */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-5">
                  {/* Enquiry form card */}
                  <div id="enquire" className="card-base p-6 scroll-mt-28">
                    <h3 className="font-serif text-lg font-semibold text-navy dark:text-cream mb-1">
                      Interested in this property?
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-navy-200 mb-5">
                      Send an enquiry and I&apos;ll get back to you within 2 hours.
                    </p>
                    <EnquiryForm listingId={listing.id} listingTitle={listing.title} listingLocation={listing.location} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
