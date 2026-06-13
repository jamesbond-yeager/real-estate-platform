'use client'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'navy' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  asChild?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-gold-500 hover:bg-gold-600 text-navy shadow-gold hover:shadow-gold-lg',
  secondary: 'border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-navy',
  navy: 'bg-navy hover:bg-navy-800 dark:bg-navy-700 dark:hover:bg-navy-600 text-cream',
  ghost: 'text-navy dark:text-cream hover:bg-cream-200 dark:hover:bg-navy-700',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-6 py-3 text-base rounded-xl gap-2',
  lg: 'px-8 py-4 text-lg rounded-xl gap-2',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-200',
          'hover:-translate-y-0.5 active:translate-y-0',
          'focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export default Button
