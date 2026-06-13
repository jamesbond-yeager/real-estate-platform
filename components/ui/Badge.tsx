import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'gold' | 'navy' | 'green' | 'red' | 'amber'
}

const variantClasses = {
  gold: 'bg-gold-100 text-gold-800 dark:bg-gold-900/30 dark:text-gold-400',
  navy: 'bg-navy-100 text-navy dark:bg-navy-700 dark:text-cream-200',
  green: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
}

export default function Badge({ children, className, variant = 'navy' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
