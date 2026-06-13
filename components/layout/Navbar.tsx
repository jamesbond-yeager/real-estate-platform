'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/listings', label: 'Properties' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  const isHome = pathname === '/'

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled || !isHome
          ? 'bg-white/95 dark:bg-navy-950/95 backdrop-blur-md shadow-sm border-b border-cream-300 dark:border-navy-700'
          : 'bg-transparent'
      )}
    >
      <div className="container-max section-padding py-0">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center shadow-gold">
              <span className="text-navy font-serif font-bold text-sm">PP</span>
            </div>
            <div>
              <span
                className={cn(
                  'font-serif font-bold text-lg leading-none transition-colors',
                  scrolled || !isHome ? 'text-navy dark:text-cream' : 'text-white'
                )}
              >
                Prestige
              </span>
              <span className="block text-[10px] font-medium text-gold-500 leading-none tracking-widest uppercase">
                Properties
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                  pathname === link.href
                    ? 'text-gold-500 bg-gold-500/10'
                    : scrolled || !isHome
                      ? 'text-navy-600 dark:text-cream-300 hover:text-navy dark:hover:text-cream hover:bg-cream-200 dark:hover:bg-navy-700'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+919876543210"
              className={cn(
                'hidden sm:flex items-center gap-2 text-sm font-medium transition-colors',
                scrolled || !isHome ? 'text-navy dark:text-cream' : 'text-white'
              )}
            >
              <Phone className="w-4 h-4 text-gold-500" />
              <span className="hidden md:block">+91 98765 43210</span>
            </a>
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden lg:inline-flex btn-primary text-sm px-5 py-2.5"
            >
              Get Free Consultation
            </Link>
            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                scrolled || !isHome
                  ? 'text-navy dark:text-cream hover:bg-cream-200 dark:hover:bg-navy-700'
                  : 'text-white hover:bg-white/10'
              )}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-white dark:bg-navy-900 border-t border-cream-300 dark:border-navy-700"
          >
            <div className="container-max section-padding py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-gold-500 bg-gold-500/10'
                      : 'text-navy dark:text-cream hover:bg-cream-200 dark:hover:bg-navy-700'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-cream-300 dark:border-navy-700 flex flex-col gap-3">
                <a href="tel:+919876543210" className="flex items-center gap-2 text-sm font-medium text-navy dark:text-cream px-4">
                  <Phone className="w-4 h-4 text-gold-500" /> +91 98765 43210
                </a>
                <Link href="/contact" className="btn-primary text-sm mx-4 justify-center">
                  Get Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
