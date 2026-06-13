'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin } from 'lucide-react'

const propertyTypes = [
  { value: '', label: 'All Types' },
  { value: 'buy', label: 'Buy' },
  { value: 'rent', label: 'Rent' },
  { value: 'lease', label: 'Lease' },
]

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'residential', label: 'Residential' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'land', label: 'Land / Plot' },
  { value: 'resort', label: 'Resort' },
  { value: 'pg', label: 'PG / Co-living' },
]

export default function SearchBar() {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')
  const [category, setCategory] = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (type) params.set('type', type)
    if (category) params.set('category', category)
    router.push(`/listings?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="relative bg-white/95 dark:bg-navy-900/95 backdrop-blur-md rounded-2xl shadow-navy p-3 flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto"
    >
      {/* Location input */}
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500" />
        <input
          type="text"
          placeholder="City, locality or landmark…"
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="w-full pl-9 pr-4 py-3 bg-transparent text-navy dark:text-cream text-sm placeholder-gray-400 dark:placeholder-navy-300 focus:outline-none"
        />
      </div>

      <div className="hidden sm:block w-px bg-cream-300 dark:bg-navy-600 self-stretch my-2" />

      {/* Type select */}
      <select
        value={type}
        onChange={e => setType(e.target.value)}
        className="flex-1 px-4 py-3 bg-transparent text-navy dark:text-cream text-sm focus:outline-none cursor-pointer appearance-none"
      >
        {propertyTypes.map(t => (
          <option key={t.value} value={t.value} className="bg-white dark:bg-navy-900">
            {t.label}
          </option>
        ))}
      </select>

      <div className="hidden sm:block w-px bg-cream-300 dark:bg-navy-600 self-stretch my-2" />

      {/* Category select */}
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="flex-1 px-4 py-3 bg-transparent text-navy dark:text-cream text-sm focus:outline-none cursor-pointer appearance-none"
      >
        {categories.map(c => (
          <option key={c.value} value={c.value} className="bg-white dark:bg-navy-900">
            {c.label}
          </option>
        ))}
      </select>

      {/* Search button */}
      <button
        type="submit"
        className="btn-primary text-sm px-6 py-3 shrink-0 rounded-xl"
      >
        <Search className="w-4 h-4" />
        <span>Search</span>
      </button>
    </form>
  )
}
