'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Bell, CheckCircle2, AlertCircle } from 'lucide-react'
import { submitToSheet } from '@/lib/submitToSheet'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  interest: z.string().min(1, 'Please select a property type'),
})
type FormData = z.infer<typeof schema>

const interests = ['Buy a Home', 'Rent / Lease', 'Commercial', 'Land / Plot', 'Luxury', 'PG / Co-living']

export default function NotifySignup() {
  const [done, setDone] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setSubmitError(null)
    try {
      await submitToSheet({
        source: 'listing_alert_signup',
        timestamp: new Date().toISOString(),
        email: data.email,
        interest: data.interest,
      })
      setDone(true)
    } catch {
      setSubmitError('Could not sign you up. Please try again.')
    }
  }

  if (done) {
    return (
      <div className="flex items-center gap-3 p-5 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
        <div>
          <p className="font-semibold text-emerald-800 dark:text-emerald-300 text-sm">You&apos;re on the list!</p>
          <p className="text-emerald-700 dark:text-emerald-400 text-xs">We&apos;ll notify you the moment a matching property is listed.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Your email address"
          className="input-base"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <select {...register('interest')} className="input-base">
          <option value="">I&apos;m interested in…</option>
          {interests.map(i => <option key={i} value={i}>{i}</option>)}
        </select>
        {errors.interest && <p className="text-red-500 text-xs mt-1">{errors.interest.message}</p>}
      </div>

      {submitError && (
        <div className="flex items-start gap-2 text-xs text-red-600 dark:text-red-400">
          <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          {submitError}
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full text-sm">
        {isSubmitting ? (
          <span className="inline-block w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin" />
        ) : (
          <Bell className="w-4 h-4" />
        )}
        Notify Me of New Listings
      </button>
    </form>
  )
}
