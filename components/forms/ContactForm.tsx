'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Send, AlertCircle } from 'lucide-react'
import { submitToSheet } from '@/lib/submitToSheet'

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email('Invalid email'),
  interest: z.string().min(1, 'Select your primary interest'),
  budget: z.string().min(1, 'Select a budget range'),
  transactionType: z.string().min(1, 'Select buy / rent / lease'),
  timeline: z.string().min(1, 'Select your move-in timeline'),
  financing: z.string().min(1, 'Select financing preference'),
  message: z.string().optional(),
})
type FormData = z.infer<typeof schema>

const interests = ['Residential Home', 'Apartment', 'Villa', 'Luxury Property', 'Commercial Space', 'Land / Plot', 'Resort', 'PG / Co-living']
const budgets = ['Under ₹20 Lakh', '₹20L – ₹50L', '₹50L – ₹1 Cr', '₹1 Cr – ₹3 Cr', '₹3 Cr – ₹10 Cr', 'Above ₹10 Cr']
const timelines = ['Immediately', 'Within 1 month', '1–3 months', '3–6 months', '6–12 months', 'Just exploring']
const financingOptions = ['Self-funded (no loan)', 'Home loan pre-approved', 'Home loan required', 'Partially financed', 'Undecided']

export default function ContactForm() {
  const [done, setDone] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setSubmitError(null)
    try {
      await submitToSheet({
        source: 'main_contact_form',
        timestamp: new Date().toISOString(),
        name: data.name,
        phone: data.phone,
        email: data.email,
        propertyInterest: data.interest,
        budget: data.budget,
        transactionType: data.transactionType,
        timeline: data.timeline,
        financing: data.financing,
        message: data.message ?? '',
      })
      setDone(true)
    } catch {
      setSubmitError('Could not send your message. Please check your connection and try again, or call us directly.')
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle2 className="w-16 h-16 text-emerald-500" />
        <h3 className="font-serif text-2xl font-bold text-navy dark:text-cream">Message Received!</h3>
        <p className="text-gray-600 dark:text-navy-200 max-w-sm">
          Thank you for reaching out. I typically respond within 2 hours during business hours.
          For urgent queries:{' '}
          <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '910000000000'}`} target="_blank" rel="noopener noreferrer" className="text-gold-500 font-semibold">Chat on WhatsApp</a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label-base">Full Name *</label>
          <input {...register('name')} placeholder="Your full name" className="input-base" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label-base">Mobile Number *</label>
          <input {...register('phone')} type="tel" placeholder="10-digit mobile" className="input-base" />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="label-base">Email Address *</label>
        <input {...register('email')} type="email" placeholder="you@example.com" className="input-base" />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label-base">Property Interest *</label>
          <select {...register('interest')} className="input-base">
            <option value="">Select category</option>
            {interests.map(i => <option key={i}>{i}</option>)}
          </select>
          {errors.interest && <p className="text-red-500 text-xs mt-1">{errors.interest.message}</p>}
        </div>
        <div>
          <label className="label-base">Transaction Type *</label>
          <select {...register('transactionType')} className="input-base">
            <option value="">Buy / Rent / Lease</option>
            <option>Buy</option>
            <option>Rent</option>
            <option>Lease</option>
          </select>
          {errors.transactionType && <p className="text-red-500 text-xs mt-1">{errors.transactionType.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label-base">Budget Range *</label>
          <select {...register('budget')} className="input-base">
            <option value="">Select budget</option>
            {budgets.map(b => <option key={b}>{b}</option>)}
          </select>
          {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>}
        </div>
        <div>
          <label className="label-base">Move-in Timeline *</label>
          <select {...register('timeline')} className="input-base">
            <option value="">Select timeline</option>
            {timelines.map(t => <option key={t}>{t}</option>)}
          </select>
          {errors.timeline && <p className="text-red-500 text-xs mt-1">{errors.timeline.message}</p>}
        </div>
      </div>

      <div>
        <label className="label-base">Financing Preference *</label>
        <select {...register('financing')} className="input-base">
          <option value="">Select option</option>
          {financingOptions.map(f => <option key={f}>{f}</option>)}
        </select>
        {errors.financing && <p className="text-red-500 text-xs mt-1">{errors.financing.message}</p>}
      </div>

      <div>
        <label className="label-base">Additional Message</label>
        <textarea
          {...register('message')}
          rows={4}
          placeholder="Tell me more about what you're looking for — location preferences, must-haves, dealbreakers…"
          className="input-base resize-none"
        />
      </div>

      {submitError && (
        <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          {submitError}
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full text-base py-4">
        {isSubmitting ? (
          <span className="w-5 h-5 border-2 border-navy border-t-transparent rounded-full animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
        Send Message — I&apos;ll Respond Within 2 Hours
      </button>
    </form>
  )
}
