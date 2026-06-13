import Link from 'next/link'
import ListingCard from '@/components/listings/ListingCard'
import listingsData from '@/data/listings.json'
import type { Listing } from '@/types/listing'

export default function FeaturedListings() {
  const featured = (listingsData as Listing[]).filter(l => l.featured).slice(0, 6)

  return (
    <section id="featured" className="section-padding bg-white dark:bg-navy-900">
      <div className="container-max">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 text-xs font-semibold tracking-widest uppercase mb-4">
              Handpicked for You
            </span>
            <h2 className="section-heading">
              Featured<br />
              <span className="text-gold-500 italic">Listings</span>
            </h2>
            <div className="gold-divider mt-5" />
          </div>
          <Link href="/listings" className="btn-secondary text-sm px-5 py-2.5 self-start sm:self-auto shrink-0">
            View All Properties →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
