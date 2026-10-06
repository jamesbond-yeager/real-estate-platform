'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PhoneCall, X, CheckCircle2, ChevronDown, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitToSheet } from '@/lib/submitToSheet'

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile'),
})
type FormData = z.infer<typeof schema>

export default function CallbackWidget() {
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setSubmitError(null)
    try {
      await submitToSheet({
        source: 'callback_widget',
        timestamp: new Date().toISOString(),
        name: data.name,
        phone: data.phone,
      })
      setDone(true)
    } catch {
      setSubmitError('Failed to send. Please try again.')
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 right-0 w-72 bg-white dark:bg-navy-800 rounded-2xl shadow-card-hover border border-cream-300 dark:border-navy-600 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-navy dark:bg-navy-900">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-gold-500" />
                <p className="text-sm font-semibold text-white">Get a Callback</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4">
              {done ? (
                <div className="flex flex-col items-center gap-2 py-4 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  <p className="font-semibold text-navy dark:text-cream text-sm">Callback requested!</p>
                  <p className="text-xs text-gray-500 dark:text-navy-200">Thanks, we&apos;ll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <div>
                    <input
                      {...register('name')}
                      placeholder="Your name"
                      className="input-base text-sm py-2.5"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name.message}</p>}
                  </div>
                  <div>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="Mobile number"
                      className="input-base text-sm py-2.5"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-0.5">{errors.phone.message}</p>}
                  </div>

                  {submitError && (
                    <div className="flex items-start gap-1.5 text-xs text-red-600 dark:text-red-400">
                      <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      {submitError}
                    </div>
                  )}

                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full text-sm py-2.5">
                    {isSubmitting
                      ? <span className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                      : <PhoneCall className="w-4 h-4" />
                    }
                    Call Me Back
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Request a callback"
        className="flex items-center gap-2 px-4 py-2.5 bg-navy dark:bg-navy-700 text-white rounded-full shadow-navy hover:bg-navy-800 dark:hover:bg-navy-600 transition-colors text-sm font-medium"
      >
        {open ? <ChevronDown className="w-4 h-4" /> : <PhoneCall className="w-4 h-4 text-gold-400" />}
        {!open && 'Callback'}
      </button>
    </div>
  )
}
