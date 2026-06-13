'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Home, Building2, Trees, Hotel, Briefcase, Gem, Users, Tag,
} from 'lucide-react'

const categories = [
  {
    icon: Home,
    label: 'Buy a Home',
    sub: 'Houses, villas & apartments',
    href: '/listings?type=buy',
    color: 'from-blue-500/10 to-blue-500/5',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: Tag,
    label: 'Rent / Lease',
    sub: 'Residential & commercial',
    href: '/listings?type=rent',
    color: 'from-emerald-500/10 to-emerald-500/5',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: Users,
    label: 'PG / Co-living',
    sub: 'Premium managed stays',
    href: '/listings?category=pg',
    color: 'from-purple-500/10 to-purple-500/5',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    icon: Trees,
    label: 'Land & Plots',
    sub: 'Residential & farm land',
    href: '/listings?category=land',
    color: 'from-amber-500/10 to-amber-500/5',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    icon: Hotel,
    label: 'Resorts',
    sub: 'Buy or lease a resort',
    href: '/listings?category=resort',
    color: 'from-teal-500/10 to-teal-500/5',
    iconColor: 'text-teal-600 dark:text-teal-400',
  },
  {
    icon: Briefcase,
    label: 'Commercial',
    sub: 'Offices, retail & warehouses',
    href: '/listings?category=commercial',
    color: 'from-red-500/10 to-red-500/5',
    iconColor: 'text-red-600 dark:text-red-400',
  },
  {
    icon: Building2,
    label: 'Apartments',
    sub: 'Ready & under construction',
    href: '/listings?category=apartment',
    color: 'from-indigo-500/10 to-indigo-500/5',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    icon: Gem,
    label: 'Luxury',
    sub: 'Ultra-premium properties',
    href: '/listings?category=luxury',
    color: 'from-gold-500/10 to-gold-500/5',
    iconColor: 'text-gold-600 dark:text-gold-400',
  },
]

export default function CategoryGrid() {
  return (
    <section className="section-padding bg-cream-50 dark:bg-navy-950">
      <div className="container-max">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 text-xs font-semibold tracking-widest uppercase mb-4">
              Browse by Type
            </span>
            <h2 className="section-heading">Every Kind of Property,<br />
              <span className="text-gold-500 italic">One Expert</span>
            </h2>
            <div className="gold-divider mx-auto mt-5 mb-5" />
            <p className="section-sub mx-auto text-center">
              Whether you&apos;re buying, renting, or investing — I cover the full spectrum of real estate needs.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link
                href={cat.href}
                className="group card-base p-5 flex flex-col items-start gap-3 hover:border-gold-500 border border-transparent transition-all duration-300 block"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <cat.icon className={`w-6 h-6 ${cat.iconColor}`} />
                </div>
                <div>
                  <p className="font-semibold text-navy dark:text-cream text-sm leading-tight group-hover:text-gold-500 dark:group-hover:text-gold-400 transition-colors">
                    {cat.label}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-navy-200 mt-0.5">{cat.sub}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
