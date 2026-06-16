'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, Maximize, MapPin, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'
import { cn, categoryLabel, typeLabel, getStatusColor, getStatusLabel } from '@/lib/utils'
import type { Listing } from '@/types/listing'
import { useState } from 'react'

interface Props {
  listing: Listing
  index?: number
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function ListingCard({ listing, index = 0 }: Props) {
  const [wishlist, setWishlist] = useState(false)

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '910000000000'
  const waMessage = encodeURIComponent(
    `Hi, I'm interested in ${listing.title} located in ${listing.location}. Please share more details.`
  )
  const waHref = `https://wa.me/${phone}?text=${waMessage}`

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

          <div className="flex items-center gap-2">
            {/* WhatsApp quick-chat */}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp enquiry for ${listing.title}`}
              onClick={e => e.stopPropagation()}
              className="flex items-center justify-center w-7 h-7 rounded-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
            </a>

            <Link
              href={`/listings/${listing.id}`}
              className="text-xs font-semibold text-gold-500 hover:text-gold-600 underline underline-offset-2"
            >
              View Details →
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
