'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Send, AlertCircle } from 'lucide-react'
import { submitToSheet } from '@/lib/submitToSheet'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  message: z.string().optional(),
  preferredTime: z.string().optional(),
})
type FormData = z.infer<typeof schema>

interface Props {
  listingId: string
  listingTitle: string
  listingLocation?: string
}

export default function EnquiryForm({ listingId, listingTitle, listingLocation }: Props) {
  const [done, setDone] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setSubmitError(null)
    try {
      await submitToSheet({
        source: 'property_enquiry',
        timestamp: new Date().toISOString(),
        name: data.name,
        phone: data.phone,
        email: data.email ?? '',
        listingId,
        listingTitle,
        listingLocation: listingLocation ?? '',
        preferredTime: data.preferredTime ?? '',
        message: data.message ?? '',
      })
      setDone(true)
    } catch {
      setSubmitError('Could not send your enquiry. Check your connection or call us directly.')
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        <p className="font-serif font-semibold text-navy dark:text-cream text-xl">Enquiry Sent!</p>
        <p className="text-gray-600 dark:text-navy-200 text-sm">
          I&apos;ll reach out to you within 2 hours. For urgent queries,{' '}
          <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '910000000000'}`} target="_blank" rel="noopener noreferrer" className="text-gold-500 font-medium">chat on WhatsApp</a>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="label-base">Full Name *</label>
        <input {...register('name')} placeholder="Your name" className="input-base" />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="label-base">Mobile Number *</label>
        <input {...register('phone')} type="tel" placeholder="10-digit mobile number" className="input-base" />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="label-base">Email (optional)</label>
        <input {...register('email')} type="email" placeholder="you@example.com" className="input-base" />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="label-base">Preferred Call Time</label>
        <select {...register('preferredTime')} className="input-base">
          <option value="">Any time</option>
          <option>Morning (9am – 12pm)</option>
          <option>Afternoon (12pm – 4pm)</option>
          <option>Evening (4pm – 8pm)</option>
        </select>
      </div>

      <div>
        <label className="label-base">Message (optional)</label>
        <textarea
          {...register('message')}
          rows={3}
          placeholder="Any specific questions about this property?"
          className="input-base resize-none"
        />
      </div>

      {submitError && (
        <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          {submitError}
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? (
          <span className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        Send Enquiry
      </button>

      <p className="text-xs text-gray-400 dark:text-navy-300 text-center">
        No spam. Your details are only shared with the listing agent.
      </p>
    </form>
  )
}
