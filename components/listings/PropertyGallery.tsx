'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  images: string[]
  title: string
}

export default function PropertyGallery({ images, title }: Props) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const prev = () => setActive(i => (i - 1 + images.length) % images.length)
  const next = () => setActive(i => (i + 1) % images.length)

  return (
    <>
      <div className="rounded-3xl overflow-hidden bg-cream-100 dark:bg-navy-800">
        {/* Main image */}
        <div className="relative aspect-[16/10] group cursor-pointer" onClick={() => setLightbox(true)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[active]}
                alt={`${title} — image ${active + 1}`}
                fill
                priority={active === 0}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); prev() }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={e => { e.stopPropagation(); next() }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Expand icon */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/40 backdrop-blur-sm rounded-full p-2">
              <Expand className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Counter */}
          <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs">
            {active + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={`relative w-20 h-14 shrink-0 rounded-xl overflow-hidden transition-all duration-200 ${
                  i === active ? 'ring-2 ring-gold-500 opacity-100' : 'opacity-50 hover:opacity-80'
                }`}
              >
                <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(false)}
          >
            <button
              onClick={() => setLightbox(false)}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
            >
              <X className="w-7 h-7" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={e => { e.stopPropagation(); prev() }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                >
                  <ChevronLeft className="w-10 h-10" />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); next() }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                >
                  <ChevronRight className="w-10 h-10" />
                </button>
              </>
            )}

            <div className="relative w-full max-w-5xl max-h-screen aspect-video mx-4" onClick={e => e.stopPropagation()}>
              <Image
                src={images[active]}
                alt={`${title} — fullscreen ${active + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
