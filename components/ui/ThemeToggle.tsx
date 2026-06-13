'use client'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  if (!mounted) return <div className="w-9 h-9" />

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative w-9 h-9 rounded-full flex items-center justify-center',
        'transition-colors duration-200',
        'bg-cream-200 dark:bg-navy-700 hover:bg-cream-300 dark:hover:bg-navy-600',
        'focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2',
        className
      )}
    >
      {dark ? (
        <Sun className="w-4 h-4 text-gold-500" />
      ) : (
        <Moon className="w-4 h-4 text-navy-600 dark:text-cream" />
      )}
    </button>
  )
}
