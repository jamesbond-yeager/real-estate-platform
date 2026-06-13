'use client'
import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ListingCard from '@/components/listings/ListingCard'
import ListingFilters, { type FilterState } from '@/components/listings/ListingFilters'
import listingsData from '@/data/listings.json'
import type { Listing } from '@/types/listing'
import { Search } from 'lucide-react'

const ALL_LISTINGS = listingsData as Listing[]

export default function ListingsPage() {
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState<FilterState>({
    type: searchParams.get('type') ?? '',
    category: searchParams.get('category') ?? '',
    location: searchParams.get('location') ?? '',
    minPrice: 0,
    maxPrice: 200000000,
    minBeds: 0,
    sort: 'featured',
  })

  // Sync URL params on mount only
  useEffect(() => {
    setFilters(f => ({
      ...f,
      type: searchParams.get('type') ?? f.type,
      category: searchParams.get('category') ?? f.category,
      location: searchParams.get('location') ?? f.location,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtered = useMemo(() => {
    let list = [...ALL_LISTINGS]

    if (filters.type) list = list.filter(l => l.type === filters.type)
    if (filters.category) list = list.filter(l => l.category === filters.category)
    if (filters.location) {
      const q = filters.location.toLowerCase()
      list = list.filter(l => l.location.toLowerCase().includes(q))
    }
    if (filters.minBeds > 0) list = list.filter(l => l.bedrooms >= filters.minBeds)
    list = list.filter(l => l.price >= filters.minPrice && l.price <= filters.maxPrice)

    // Sort
    if (filters.sort === 'price_asc') list.sort((a, b) => a.price - b.price)
    else if (filters.sort === 'price_desc') list.sort((a, b) => b.price - a.price)
    else if (filters.sort === 'newest') list.sort((a, b) => (b.yearBuilt ?? 0) - (a.yearBuilt ?? 0))
    else list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))

    return list
  }, [filters])

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
            {ALL_LISTINGS.length} curated properties across Bangalore and South India.
          </p>
        </div>
      </div>

      <div className="section-padding py-10">
        <div className="container-max">
          <ListingFilters filters={filters} onChange={setFilters} />

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-cream-200 dark:bg-navy-700 flex items-center justify-center mb-4">
                <Search className="w-7 h-7 text-gray-400" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-navy dark:text-cream mb-2">No properties found</h3>
              <p className="text-gray-500 dark:text-navy-200 text-sm max-w-xs">
                Try adjusting your filters or{' '}
                <button
                  onClick={() => setFilters({ type: '', category: '', location: '', minPrice: 0, maxPrice: 200000000, minBeds: 0, sort: 'featured' })}
                  className="text-gold-500 underline"
                >
                  clear them all
                </button>
                .
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 dark:text-navy-200 mb-5">
                Showing <strong className="text-navy dark:text-cream">{filtered.length}</strong> properties
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((listing, i) => (
                  <ListingCard key={listing.id} listing={listing} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
