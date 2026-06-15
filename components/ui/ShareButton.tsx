'use client'

import { Share2 } from 'lucide-react'

export default function ShareButton({ title }: { title: string }) {
  return (
    <button
      onClick={() => navigator.share?.({ title, url: window.location.href })}
      className="p-2 rounded-lg border border-cream-300 dark:border-navy-600 text-gray-500 dark:text-navy-200 hover:border-gold-500 hover:text-gold-500 transition-colors"
      aria-label="Share"
    >
      <Share2 className="w-4 h-4" />
    </button>
  )
}
