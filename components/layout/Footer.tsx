import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react'

const quickLinks = [
  { href: '/listings?type=buy', label: 'Buy a Property' },
  { href: '/listings?type=rent', label: 'Rent / Lease' },
  { href: '/listings?category=luxury', label: 'Luxury Homes' },
  { href: '/listings?category=commercial', label: 'Commercial' },
  { href: '/listings?category=land', label: 'Land & Plots' },
  { href: '/listings?category=pg', label: 'PG / Co-living' },
]

const pageLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/listings', label: 'All Properties' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-cream-300">
      {/* Top section */}
      <div className="container-max section-padding py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center shadow-gold">
              <span className="text-navy font-serif font-bold text-sm">PP</span>
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-white leading-none">Prestige</span>
              <span className="block text-[10px] font-medium text-gold-500 leading-none tracking-widest uppercase">Properties</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-navy-200 mb-5">
            Bangalore's trusted real estate consultant connecting discerning clients with exceptional properties since 2012.
          </p>
          <div className="flex gap-3">
            {[
              { icon: Instagram, href: '#', label: 'Instagram' },
              { icon: Facebook, href: '#', label: 'Facebook' },
              { icon: Youtube, href: '#', label: 'YouTube' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full bg-navy-700 hover:bg-gold-500 flex items-center justify-center transition-colors group"
              >
                <Icon className="w-4 h-4 text-navy-200 group-hover:text-navy" />
              </a>
            ))}
          </div>
        </div>

        {/* Property types */}
        <div>
          <h4 className="font-serif font-semibold text-white mb-4 text-base">Browse Properties</h4>
          <ul className="space-y-2">
            {quickLinks.map(l => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-navy-200 hover:text-gold-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-gold-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Page links */}
        <div>
          <h4 className="font-serif font-semibold text-white mb-4 text-base">Company</h4>
          <ul className="space-y-2">
            {pageLinks.map(l => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-navy-200 hover:text-gold-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-gold-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-serif font-semibold text-white mb-4 text-base">Get in Touch</h4>
          <ul className="space-y-3">
            <li>
              <a href="tel:+919876543210" className="flex items-start gap-3 text-sm text-navy-200 hover:text-gold-400 transition-colors group">
                <Phone className="w-4 h-4 mt-0.5 text-gold-500 shrink-0" />
                +91 98765 43210
              </a>
            </li>
            <li>
              <a href="mailto:arjun@prestigeproperties.in" className="flex items-start gap-3 text-sm text-navy-200 hover:text-gold-400 transition-colors group">
                <Mail className="w-4 h-4 mt-0.5 text-gold-500 shrink-0" />
                arjun@prestigeproperties.in
              </a>
            </li>
            <li>
              <div className="flex items-start gap-3 text-sm text-navy-200">
                <MapPin className="w-4 h-4 mt-0.5 text-gold-500 shrink-0" />
                <span>12/A, Lavelle Road,<br />Bangalore — 560 001</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-navy-700" />

      {/* Bottom bar */}
      <div className="container-max section-padding py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-navy-300">
        <p>© {new Date().getFullYear()} Prestige Properties. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-gold-400 transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-gold-400 transition-colors">RERA Registration</Link>
        </div>
      </div>
    </footer>
  )
}
