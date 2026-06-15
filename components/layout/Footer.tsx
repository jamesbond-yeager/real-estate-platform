import Link from 'next/link'
import { Instagram, Facebook, Youtube, Linkedin } from 'lucide-react'

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
              <span className="text-navy font-serif font-bold text-sm">SK</span>
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-white leading-none">SK</span>
              <span className="block text-[10px] font-medium text-gold-500 leading-none tracking-widest uppercase">Properties</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-navy-200 mb-5">
            SK Properties — Bangalore&apos;s trusted real estate consultant. Houses for rent, flats, land, luxury villas &amp; PG accommodation.
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
          <p className="text-sm text-navy-200 mb-4 leading-relaxed">
            The fastest way to reach us is via WhatsApp. We typically reply within minutes.
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '910000000000'}?text=${encodeURIComponent("Hi! I'd like to enquire about a property.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 text-white text-sm font-semibold transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-navy-700" />

      {/* Bottom bar */}
      <div className="container-max section-padding py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-navy-300">
        <p>© {new Date().getFullYear()} SK Properties. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-gold-400 transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-gold-400 transition-colors">RERA Registration</Link>
        </div>
      </div>
    </footer>
  )
}
