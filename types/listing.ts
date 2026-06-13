export type ListingType = 'buy' | 'rent' | 'lease'

export type ListingCategory =
  | 'residential'
  | 'apartment'
  | 'villa'
  | 'pg'
  | 'land'
  | 'resort'
  | 'commercial'
  | 'luxury'

export type ListingStatus = 'available' | 'sold' | 'rented' | 'under_offer'

export interface Listing {
  id: string
  title: string
  type: ListingType
  category: ListingCategory
  price: number           // in INR (raw number)
  priceLabel: string      // formatted: "₹5.5 Cr" or "₹45,000/mo"
  location: string        // display string: "Whitefield, Bangalore"
  lat: number
  lng: number
  bedrooms: number        // 0 for commercial/land
  bathrooms: number       // 0 for land
  area: number
  areaUnit: 'sq ft' | 'sq m' | 'acres' | 'cents'
  images: string[]        // array of URLs, first is thumbnail
  description: string
  status: ListingStatus
  featured: boolean
  amenities: string[]
  yearBuilt: number | null
  parking: number
  furnishing?: 'furnished' | 'semi-furnished' | 'unfurnished'
  facing?: string         // "East", "North-East", etc.
  floor?: string          // "3rd of 12" for apartments
}
