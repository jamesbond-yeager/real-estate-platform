'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, Maximize, MapPin, Heart, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'
import { cn, categoryLabel, typeLabel, getStatusColor, getStatusLabel } from '@/lib/utils'
import type { Listing } from '@/types/listing'
import { useState } from 'react'

interface Props {
  listing: Listing
  index?: number
}

export default function ListingCard({ listing, index = 0 }: Props) {
  const [wishlist, setWishlist] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group card-base overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          <Badge variant="navy" className="text-[10px] px-2 py-0.5 bg-navy/80 text-white backdrop-blur-sm">
            {typeLabel(listing.type)}
          </Badge>
          {listing.featured && (
            <Badge variant="gold" className="text-[10px] px-2 py-0.5">Featured</Badge>
          )}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/90 text-white backdrop-blur-sm">
            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Verified
          </span>
        </div>

        {/* Status */}
        <div className="absolute top-3 right-10">
          <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full', getStatusColor(listing.status))}>
            {getStatusLabel(listing.status)}
          </span>
        </div>

        {/* Wishlist */}
        <button
          onClick={e => { e.preventDefault(); setWishlist(!wishlist) }}
          aria-label="Save to wishlist"
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 dark:bg-navy/80 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-navy transition-colors"
        >
          <Heart className={cn('w-4 h-4 transition-colors', wishlist ? 'fill-red-500 text-red-500' : 'text-gray-400')} />
        </button>

        {/* Price on image bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/70 to-transparent p-3 pt-8">
          <span className="text-white font-serif font-bold text-xl">{listing.priceLabel}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-navy-200 mb-2">
          <MapPin className="w-3 h-3 text-gold-500" />
          <span className="truncate">{listing.location}</span>
        </div>

        <h3 className="font-serif font-semibold text-navy dark:text-cream text-base leading-snug mb-3 line-clamp-2 group-hover:text-gold-500 dark:group-hover:text-gold-400 transition-colors">
          <Link href={`/listings/${listing.id}`} className="hover:underline decoration-gold-500 underline-offset-2">
            {listing.title}
          </Link>
        </h3>

        {/* Specs */}
        <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-navy-200 mb-4">
          {listing.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-gold-500" /> {listing.bedrooms} Bed
            </span>
          )}
          {listing.bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-gold-500" /> {listing.bathrooms} Bath
            </span>
          )}
          <span className="flex items-center gap-1">
            <Maximize className="w-3.5 h-3.5 text-gold-500" /> {listing.area.toLocaleString()} {listing.areaUnit}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          <Badge variant="navy" className="text-[10px] shrink-0">{categoryLabel(listing.category)}</Badge>

          <Link
            href={`/listings/${listing.id}`}
            className="text-xs font-semibold text-gold-500 hover:text-gold-600 underline underline-offset-2"
          >
            View Details →
          </Link>
        </div>

        {/* Enquiry — jumps to the enquiry form on the detail page, which submits title + location */}
        <Link
          href={`/listings/${listing.id}#enquire`}
          aria-label={`Enquire about ${listing.title}`}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl bg-gold-500/10 hover:bg-gold-500 text-gold-600 dark:text-gold-400 hover:text-navy dark:hover:text-navy text-xs font-semibold transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
          Enquire about this property
        </Link>
      </div>
    </motion.article>
  )
}
