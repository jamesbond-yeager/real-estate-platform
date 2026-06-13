import { MetadataRoute } from 'next'
import listingsData from '@/data/listings.json'
import type { Listing } from '@/types/listing'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/listings`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  const listingPages: MetadataRoute.Sitemap = (listingsData as Listing[]).map(listing => ({
    url: `${siteUrl}/listings/${listing.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: listing.featured ? 0.9 : 0.8,
  }))

  return [...staticPages, ...listingPages]
}
