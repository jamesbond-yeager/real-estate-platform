'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import SearchBar from './SearchBar'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1582407947304-fd86f28320be?w=1920&q=90"
        alt="Luxury property"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/50 to-navy/85" />

      {/* Decorative gold lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient opacity-80" />

      {/* Content */}
      <div className="relative z-10 container-max section-padding text-center pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-gold-500/50 bg-gold-500/10 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-6">
            Bangalore&apos;s Premium Real Estate Expert
          </span>
        </motion.div>

        <motion.h1
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-6 text-balance"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        >
          Find Your{' '}
          <span className="text-gold-400 italic">Perfect</span>
          <br />
          Property
        </motion.h1>

        <motion.p
          className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          Over 500 premium properties — luxury villas, apartments, commercial spaces, land &amp; PG accommodations.
          Personalised service. Zero brokerage anxiety.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
        >
          <SearchBar />
        </motion.div>

        {/* Quick stats */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {[
            { label: 'Properties Listed', value: '500+' },
            { label: 'Happy Clients', value: '350+' },
            { label: 'Years Experience', value: '12+' },
            { label: 'Cities Covered', value: '8' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-serif font-bold text-gold-400">{stat.value}</p>
              <p className="text-white/60 text-xs sm:text-sm mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#featured"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-gold-400 transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown className="w-6 h-6" />
      </motion.a>
    </section>
  )
}
