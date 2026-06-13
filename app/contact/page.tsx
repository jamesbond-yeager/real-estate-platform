import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — Book a Free Consultation',
  description: 'Reach out to Arjun Sharma for personalised real estate advice. Call, WhatsApp, or fill the form — I respond within 2 hours.',
}

const contactMethods = [
  {
    icon: Phone,
    label: 'Call or WhatsApp',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
    desc: 'Mon – Sat, 9am – 8pm',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'arjun@prestigeproperties.in',
    href: 'mailto:arjun@prestigeproperties.in',
    desc: 'Typically reply within 2 hours',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: '12/A, Lavelle Road, Bangalore — 560 001',
    href: 'https://maps.google.com/?q=12.97,77.60',
    desc: 'By appointment only',
  },
  {
    icon: Clock,
    label: 'Office Hours',
    value: 'Mon – Sat: 9am to 8pm',
    href: null,
    desc: 'Sunday by appointment',
  },
]

export default function ContactPage() {
  const whatsappMsg = encodeURIComponent("Hi Arjun! I'd like to discuss a property. Are you available?")

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
          {/* Contact methods */}
          <div className="lg:col-span-2 space-y-6">
            {contactMethods.map(m => (
              <div key={m.label} className="flex gap-4">
                <div className="w-11 h-11 rounded-2xl bg-gold-500/10 flex items-center justify-center shrink-0">
                  <m.icon className="w-5 h-5 text-gold-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-navy-300 uppercase tracking-wider mb-0.5">{m.label}</p>
                  {m.href ? (
                    <a href={m.href} target={m.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="font-semibold text-navy dark:text-cream hover:text-gold-500 dark:hover:text-gold-400 transition-colors text-sm">
                      {m.value}
                    </a>
                  ) : (
                    <p className="font-semibold text-navy dark:text-cream text-sm">{m.value}</p>
                  )}
                  <p className="text-xs text-gray-400 dark:text-navy-300 mt-0.5">{m.desc}</p>
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/919876543210?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors group"
            >
              <MessageCircle className="w-6 h-6 text-[#25D366]" />
              <div>
                <p className="font-semibold text-navy dark:text-cream text-sm group-hover:text-[#20BD5C] transition-colors">Chat on WhatsApp</p>
                <p className="text-xs text-gray-500 dark:text-navy-200">Usually replies within minutes</p>
              </div>
            </a>

            {/* Embedded map */}
            <div className="rounded-2xl overflow-hidden aspect-video border border-cream-300 dark:border-navy-600">
              <iframe
                title="Office location"
                src="https://maps.google.com/maps?q=12.97,77.60&z=15&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0 w-full h-full"
              />
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
