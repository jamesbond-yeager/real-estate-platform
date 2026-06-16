'use client'
import { SlidersHorizontal, X, MapPin } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export interface FilterState {
  type: string
  category: string
  location: string
  minPrice: number
  maxPrice: number
  minBeds: number
  sort: string
}

interface Props {
  filters: FilterState
  onChange: (f: FilterState) => void
}

const types = [
  { value: '', label: 'All' },
  { value: 'buy', label: 'Buy' },
  { value: 'rent', label: 'Rent' },
  { value: 'lease', label: 'Lease' },
]

const categories = [
  { value: '', label: 'All' },
  { value: 'residential', label: 'Residential' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'land', label: 'Land' },
  { value: 'resort', label: 'Resort' },
  { value: 'pg', label: 'PG' },
]

const sortOptions = [
  { value: 'featured', label: 'Featured First' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'newest', label: 'Newest First' },
]

const bedOptions = [0, 1, 2, 3, 4]

function fmt(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(0)}Cr`
  if (n >= 100000) return `₹${(n / 100000).toFixed(0)}L`
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`
  return `₹${n}`
}

export default function ListingFilters({ filters, onChange }: Props) {
  const [open, setOpen] = useState(false)

  function set<K extends keyof FilterState>(key: K, val: FilterState[K]) {
    onChange({ ...filters, [key]: val })
  }

  const activeCount = [
    filters.type, filters.category, filters.location,
    filters.minBeds > 0 ? '1' : '',
    filters.minPrice > 0 ? '1' : '',
    filters.maxPrice < 200000000 ? '1' : '',
  ].filter(Boolean).length

  return (
    <div className="mb-8">
      {/* Top bar */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Sort */}
        <select
          value={filters.sort}
          onChange={e => set('sort', e.target.value)}
          className="input-base w-auto text-sm py-2.5 pr-8"
        >
          {sortOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>

        {/* Type pills */}
        <div className="flex gap-2 flex-wrap">
          {types.map(t => (
            <button
              key={t.value}
              onClick={() => set('type', t.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                filters.type === t.value
                  ? 'bg-gold-500 text-navy border-gold-500 shadow-gold'
                  : 'bg-white dark:bg-navy-800 text-navy dark:text-cream border-cream-300 dark:border-navy-600 hover:border-gold-500'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Location search — always visible */}
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gold-500 pointer-events-none" />
          <input
            type="text"
            value={filters.location}
            onChange={e => set('location', e.target.value)}
            placeholder="Search by location…"
            className="input-base text-sm pl-8 pr-8 py-2.5 w-full"
          />
          {filters.location && (
            <button
              onClick={() => set('location', '')}
              aria-label="Clear location"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-cream"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Advanced filters toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full border border-cream-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy dark:text-cream text-sm hover:border-gold-500 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-gold-500 text-navy text-xs font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>

        {/* Clear */}
        {activeCount > 0 && (
          <button
            onClick={() => onChange({ type: '', category: '', location: '', minPrice: 0, maxPrice: 200000000, minBeds: 0, sort: 'featured' })}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
          >
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      {/* Advanced panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-5 bg-white dark:bg-navy-800 rounded-2xl border border-cream-300 dark:border-navy-600 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Category */}
              <div>
                <label className="label-base">Category</label>
                <select value={filters.category} onChange={e => set('category', e.target.value)} className="input-base text-sm">
                  {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>

              {/* Min bedrooms */}
              <div>
                <label className="label-base">Min. Bedrooms</label>
                <div className="flex gap-2">
                  {bedOptions.map(n => (
                    <button
                      key={n}
                      onClick={() => set('minBeds', n)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        filters.minBeds === n
                          ? 'bg-gold-500 text-navy border-gold-500'
                          : 'border-cream-300 dark:border-navy-600 text-navy dark:text-cream hover:border-gold-500'
                      }`}
                    >
                      {n === 0 ? 'Any' : n === 4 ? '4+' : n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <div className="flex justify-between">
                  <label className="label-base">Max Price</label>
                  <span className="text-xs text-gold-500 font-medium">{fmt(filters.maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200000000}
                  step={1000000}
                  value={filters.maxPrice}
                  onChange={e => set('maxPrice', Number(e.target.value))}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹0</span><span>₹20 Cr</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
