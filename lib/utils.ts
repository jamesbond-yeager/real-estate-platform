import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Listing, ListingCategory, ListingType } from '@/types/listing'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, type: ListingType): string {
  if (type === 'rent') {
    if (price < 100000) return `₹${price.toLocaleString('en-IN')}/mo`
    return `₹${(price / 100000).toFixed(1)}L/mo`
  }
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`
  if (price >= 100000) return `₹${(price / 100000).toFixed(0)} L`
  return `₹${price.toLocaleString('en-IN')}`
}

export function categoryLabel(cat: ListingCategory): string {
  const labels: Record<ListingCategory, string> = {
    residential: 'Residential',
    apartment: 'Apartment',
    villa: 'Villa',
    pg: 'PG / Co-living',
    land: 'Land / Plot',
    resort: 'Resort',
    commercial: 'Commercial',
    luxury: 'Luxury',
  }
  return labels[cat] ?? cat
}

export function typeLabel(type: ListingType): string {
  const labels: Record<ListingType, string> = {
    buy: 'For Sale',
    rent: 'For Rent',
    lease: 'For Lease',
  }
  return labels[type] ?? type
}

/** Calculate monthly EMI */
export function calcEMI(principal: number, annualRate: number, tenureYears: number): number {
  const r = annualRate / 12 / 100
  const n = tenureYears * 12
  if (r === 0) return principal / n
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

export function getStatusColor(status: Listing['status']): string {
  switch (status) {
    case 'available': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
    case 'sold': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    case 'rented': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    case 'under_offer': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
  }
}

export function getStatusLabel(status: Listing['status']): string {
  switch (status) {
    case 'available': return 'Available'
    case 'sold': return 'Sold'
    case 'rented': return 'Rented'
    case 'under_offer': return 'Under Offer'
  }
}
