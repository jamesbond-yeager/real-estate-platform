import type { Metadata } from 'next'
import { MessageCircle } from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — Book a Free Consultation',
  description: 'Contact SK Properties for personalised real estate advice in Bangalore. Looking to buy property, rent a flat, or find PG accommodation? Chat on WhatsApp or fill the form — I respond within 2 hours.',
}

const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '910000000000'
const waMsg = encodeURIComponent("Hi! I'd like to discuss a property. Are you available?")

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
          {/* Left — WhatsApp CTA */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <h2 className="font-serif text-xl font-semibold text-navy dark:text-cream mb-2">
                Prefer instant replies?
              </h2>
              <p className="text-sm text-gray-500 dark:text-navy-200 leading-relaxed">
                WhatsApp is the fastest way to reach me. I typically reply within minutes during working hours.
              </p>
            </div>

            <a
              href={`https://wa.me/${waNumber}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#25D366] flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-navy dark:text-cream group-hover:text-[#20BD5C] transition-colors">
                  Chat on WhatsApp
                </p>
                <p className="text-xs text-gray-500 dark:text-navy-200 mt-0.5">Usually replies within minutes</p>
              </div>
            </a>

            <div className="p-5 rounded-2xl bg-cream-50 dark:bg-navy-800 border border-cream-200 dark:border-navy-700">
              <p className="text-sm font-semibold text-navy dark:text-cream mb-1">Or fill the form</p>
              <p className="text-xs text-gray-500 dark:text-navy-200 leading-relaxed">
                Leave your details and I&apos;ll reach out to you within 2 hours with personalised recommendations.
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
