'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Priya & Rohit Mehta',
    role: 'Bought a Villa in Whitefield',
    photo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=200&q=80',
    rating: 5,
    text: 'Arjun made the entire process seamless. He understood exactly what we wanted — a home with a garden for our kids and good connectivity to the tech corridor — and found us the perfect villa within 3 weeks. His legal and documentation guidance was invaluable.',
  },
  {
    name: 'Kiran Rao',
    role: 'Commercial property investor',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    rating: 5,
    text: 'I\'ve worked with multiple brokers over the years, but Arjun stands apart. He doesn\'t just show you listings — he brings genuine market insight. I invested in two commercial units on his recommendation and both have yielded exceptional returns.',
  },
  {
    name: 'Dr. Ananya Krishnan',
    role: 'Rented a PG near Koramangala',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
    rating: 5,
    text: 'As a medical resident relocating to Bangalore, I had very specific requirements on location and budget. Arjun was incredibly patient and responsive — always available, even on evenings. Found me a wonderful co-living space in just two days.',
  },
  {
    name: 'The Nair Family',
    role: 'Sold a heritage bungalow in Indiranagar',
    photo: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=200&q=80',
    rating: 5,
    text: 'Selling our ancestral property was emotionally difficult. Arjun handled it with the utmost sensitivity, getting us 12% above our asking price through a well-orchestrated bidding process. We couldn\'t have asked for a better outcome.',
  },
]

export default function Testimonials() {
  const [idx, setIdx] = useState(0)
  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIdx(i => (i + 1) % testimonials.length)

  const t = testimonials[idx]

  return (
    <section className="section-padding bg-navy dark:bg-navy-950 overflow-hidden relative">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gold-500/5 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-gold-500/5 pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-4">
            What Clients Say
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Stories of{' '}
            <span className="text-gold-400 italic">Happy Clients</span>
          </h2>
          <div className="gold-divider mx-auto mt-5" />
        </div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white/5 dark:bg-navy-800/50 border border-white/10 rounded-3xl p-8 sm:p-10 text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/90 text-base sm:text-lg leading-relaxed italic mb-8">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold-500/50">
                  <Image src={t.photo} alt={t.name} fill className="object-cover" sizes="56px" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-gold-400 text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-white/20 text-white hover:border-gold-500 hover:text-gold-500 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === idx ? 'bg-gold-500 w-6' : 'bg-white/30 hover:bg-white/60'}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-white/20 text-white hover:border-gold-500 hover:text-gold-500 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
