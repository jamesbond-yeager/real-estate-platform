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
  CheckCircle2
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
                  <div className="card-base p-6">
                    <h3 className="font-serif text-lg font-semibold text-navy dark:text-cream mb-1">
                      Interested in this property?
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-navy-200 mb-5">
                      Send an enquiry and I&apos;ll get back to you within 2 hours.
                    </p>
                    <EnquiryForm listingId={listing.id} listingTitle={listing.title} listingLocation={listing.location} />
                  </div>

                  {/* Direct contact card */}
                  <div className="card-base p-5 flex flex-col gap-3">
                    <p className="font-semibold text-navy dark:text-cream text-sm">Prefer to contact directly?</p>
                    <a
                      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '910000000000'}?text=${encodeURIComponent(`Hi, I'm interested in ${listing.title} located in ${listing.location}. Please share more details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5C] text-white text-sm font-semibold transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Chat on WhatsApp
                    </a>
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
