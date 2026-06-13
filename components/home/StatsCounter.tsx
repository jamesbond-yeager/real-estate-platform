'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 500, suffix: '+', label: 'Properties Sold', desc: 'Across residential & commercial segments' },
  { value: 350, suffix: '+', label: 'Happy Clients', desc: 'Who trusted us with their dream' },
  { value: 12, suffix: '+', label: 'Years Experience', desc: 'In Bangalore real estate market' },
  { value: 8, suffix: '', label: 'Cities Covered', desc: 'Tier-1 and tier-2 markets across South India' },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + increment, target)
      setCount(Math.round(current))
      if (current >= target) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function StatsCounter() {
  return (
    <section className="section-padding bg-navy dark:bg-navy-950">
      <div className="container-max">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-serif text-4xl sm:text-5xl font-bold text-gold-400 mb-2">
                <Counter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-semibold text-white text-base mb-1">{stat.label}</p>
              <p className="text-navy-200 text-sm leading-relaxed hidden sm:block">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
