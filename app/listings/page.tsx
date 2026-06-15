import { Suspense } from 'react'
import listingsData from '@/data/listings.json'
import ListingsContent from '@/components/listings/ListingsContent'

export const metadata = {
  title: 'All Properties',
  description: 'Browse our curated portfolio of properties across Bangalore and South India.',
}

export default function ListingsPage() {
  const count = (listingsData as unknown[]).length

  return (
    <div className="pt-20 lg:pt-24">
      {/* Page header */}
      <div className="section-padding bg-navy dark:bg-navy-950 py-10 lg:py-16">
        <div className="container-max">
          <span className="inline-block px-4 py-1 rounded-full border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-4">
            Our Portfolio
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            All Properties
          </h1>
          <p className="text-navy-200 text-base">
            {count} curated properties across Bangalore and South India.
          </p>
        </div>
      </div>

      <Suspense>
        <ListingsContent />
      </Suspense>
    </div>
  )
}
