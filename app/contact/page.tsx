import type { Metadata } from 'next'
import { Mail } from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — Book a Free Consultation',
  description: 'Contact SK Properties for personalised real estate advice in Bangalore. Looking to buy property, rent a flat, or find PG accommodation? Fill in the form and we will get back to you shortly.',
}

export default function ContactPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Header */}
      <div className="section-padding bg-navy dark:bg-navy-950 py-12">
        <div className="container-max text-center">
          <span className="inline-block px-4 py-1 rounded-full border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-4">
            Let&apos;s Talk
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            Get in Touch
          </h1>
          <p className="text-navy-200 max-w-xl mx-auto">
            I respond to every enquiry personally. Tell me what you&apos;re looking for and I&apos;ll make it happen.
          </p>
        </div>
      </div>

      <div className="section-padding py-12">
        <div className="container-max grid lg:grid-cols-5 gap-12">
          {/* Left — what happens next */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <h2 className="font-serif text-xl font-semibold text-navy dark:text-cream mb-2">
                How it works
              </h2>
              <p className="text-sm text-gray-500 dark:text-navy-200 leading-relaxed">
                Send us a message using the form and we&apos;ll get back to you shortly with personalised recommendations.
              </p>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-gold-500/10 border border-gold-500/20">
              <div className="w-12 h-12 rounded-2xl bg-gold-500 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-navy" />
              </div>
              <div>
                <p className="font-semibold text-navy dark:text-cream">Tell us what you need</p>
                <p className="text-xs text-gray-500 dark:text-navy-200 mt-0.5">
                  Location, budget and timeline help us find the right match faster.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-cream-50 dark:bg-navy-800 border border-cream-200 dark:border-navy-700">
              <p className="text-sm font-semibold text-navy dark:text-cream mb-1">Prefer a quick callback?</p>
              <p className="text-xs text-gray-500 dark:text-navy-200 leading-relaxed">
                Use the Callback button in the corner of the page and we&apos;ll get back to you shortly.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="card-base p-6 sm:p-8">
              <h2 className="font-serif text-2xl font-semibold text-navy dark:text-cream mb-1">
                Send a Message
              </h2>
              <p className="text-sm text-gray-500 dark:text-navy-200 mb-6">
                Fill in as much detail as you can — it helps me find the perfect match faster.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
