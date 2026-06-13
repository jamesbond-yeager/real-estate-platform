'use client'
import { useState } from 'react'
import { calcEMI } from '@/lib/utils'
import { Calculator } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  defaultPrice?: number
}

export default function EMICalculator({ defaultPrice = 5000000 }: Props) {
  const [principal, setPrincipal] = useState(defaultPrice)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)
  const [open, setOpen] = useState(false)

  const emi = calcEMI(principal, rate, tenure)
  const totalPayable = emi * tenure * 12
  const totalInterest = totalPayable - principal

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

  return (
    <div className="rounded-2xl border border-cream-300 dark:border-navy-600 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 bg-navy/5 dark:bg-navy-800 hover:bg-navy/10 dark:hover:bg-navy-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-gold-500" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-navy dark:text-cream text-sm">EMI Calculator</p>
            {!open && <p className="text-xs text-gray-500 dark:text-navy-200">Tap to estimate monthly payments</p>}
            {open && <p className="text-xs text-gold-500 font-medium">{fmt(emi)} / month</p>}
          </div>
        </div>
        <span className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 space-y-5 bg-white dark:bg-navy-900">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-navy-600 dark:text-cream-300">Loan Amount</label>
                  <span className="text-sm font-semibold text-gold-500">{fmt(principal)}</span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={100000000}
                  step={500000}
                  value={principal}
                  onChange={e => setPrincipal(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹5L</span><span>₹10 Cr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-navy-600 dark:text-cream-300">Interest Rate (p.a.)</label>
                  <span className="text-sm font-semibold text-gold-500">{rate}%</span>
                </div>
                <input
                  type="range"
                  min={6}
                  max={18}
                  step={0.25}
                  value={rate}
                  onChange={e => setRate(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>6%</span><span>18%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-navy-600 dark:text-cream-300">Loan Tenure</label>
                  <span className="text-sm font-semibold text-gold-500">{tenure} years</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={tenure}
                  onChange={e => setTenure(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>5 yrs</span><span>30 yrs</span>
                </div>
              </div>

              {/* Results */}
              <div className="rounded-xl bg-navy/5 dark:bg-navy-800 p-4 grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-xs text-gray-500 dark:text-navy-200 mb-1">Monthly EMI</p>
                  <p className="text-base font-bold text-gold-500">{fmt(emi)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-navy-200 mb-1">Total Interest</p>
                  <p className="text-base font-bold text-navy dark:text-cream">{fmt(totalInterest)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-navy-200 mb-1">Total Payable</p>
                  <p className="text-base font-bold text-navy dark:text-cream">{fmt(totalPayable)}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
