'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import NotifySignup from '@/components/forms/NotifySignup'

export default function CTASection() {
  return (
    <section className="section-padding bg-white dark:bg-navy-900">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-navy-gradient p-8 sm:p-10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gold-gradient opacity-5" />
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-4">
                Book a Visit
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                Ready to See a Property?
              </h3>
              <p className="text-navy-200 mb-6 text-sm leading-relaxed">
                Schedule a site visit at your convenience. I handle all coordination — no hassles, just great homes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="btn-primary text-sm">
                  Book a Site Visit <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right — notify signup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 text-xs font-semibold tracking-wider uppercase mb-4">
              Never Miss a Listing
            </span>
            <h3 className="section-heading text-3xl mb-3">
              Get New Listings<br />
              <span className="text-gold-500 italic">Straight to Your Inbox</span>
            </h3>
            <p className="text-gray-600 dark:text-navy-100 text-sm mb-6 leading-relaxed">
              Be the first to know when a new property matches your criteria. No spam — only relevant updates.
            </p>
            <NotifySignup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
