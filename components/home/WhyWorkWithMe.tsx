'use client'
import { motion } from 'framer-motion'
import { CheckCircle2, Shield, Clock, TrendingUp, HeartHandshake, FileCheck } from 'lucide-react'

const pillars = [
  {
    icon: Shield,
    title: 'Verified Listings Only',
    desc: 'Every property is personally verified — title documents, encumbrance, and legal status checked before listing.',
  },
  {
    icon: HeartHandshake,
    title: 'No Pressure, Pure Guidance',
    desc: 'My commission follows your satisfaction. I take the time to understand your needs before showing a single property.',
  },
  {
    icon: TrendingUp,
    title: 'Market Intelligence',
    desc: '12 years of Bangalore market data means I know micro-market trends before they hit the news.',
  },
  {
    icon: Clock,
    title: 'End-to-End Support',
    desc: 'From shortlisting to registration — I coordinate legal, financial, and logistical aspects so you don\'t have to.',
  },
  {
    icon: FileCheck,
    title: 'RERA Compliant',
    desc: 'All transactions facilitated under RERA guidelines. Full transparency on pricing and timelines.',
  },
  {
    icon: CheckCircle2,
    title: 'Post-Sale Assistance',
    desc: 'Interiors, vastu advice, rental management after purchase — the relationship doesn\'t end at registration.',
  },
]

export default function WhyWorkWithMe() {
  return (
    <section className="section-padding bg-cream-50 dark:bg-navy-900">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 text-xs font-semibold tracking-widest uppercase mb-4">
            Why Work With Me
          </span>
          <h2 className="section-heading mb-4">
            Real Estate Done<br />
            <span className="text-gold-500 italic">Right</span>
          </h2>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-gray-600 dark:text-navy-100 leading-relaxed max-w-2xl mx-auto">
            I&apos;m not just a broker — I&apos;m a trusted advisor who has helped over 350 families and investors make
            the most significant financial decisions of their lives with confidence and clarity.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-base p-6 flex gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
                <p.icon className="w-5 h-5 text-gold-500" />
              </div>
              <div>
                <p className="font-semibold text-navy dark:text-cream text-sm mb-1">{p.title}</p>
                <p className="text-xs text-gray-500 dark:text-navy-200 leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
