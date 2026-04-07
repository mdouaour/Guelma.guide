'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Upload, CheckCircle, Copy, ArrowRight } from 'lucide-react'

const plans = [
  { id: 'standard', name: 'Standard', price: '3,500 DA', features: ['100+ Landmarks', 'AI Concierge', 'Interactive Map', 'Offline Access'] },
  { id: 'pro', name: 'Pro', price: '7,500 DA', features: ['Everything in Standard', 'Priority Support', 'Early Access Features', 'Commercial Use'] },
]

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState('standard')
  const [form, setForm] = useState({ email: '', ref: '' })
  const [file, setFile] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const ccpAccount = '1234567890 / Clé 12'

  const handleCopy = () => {
    navigator.clipboard.writeText(ccpAccount)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || !form.ref) { setError('Please fill all fields.'); return }
    setLoading(true)
    setError('')

    const fd = new FormData()
    fd.append('email', form.email)
    fd.append('transactionRef', form.ref)
    fd.append('plan', selectedPlan)
    if (file) fd.append('receipt', file)

    try {
      const res = await fetch('/api/payment/submit', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) setSubmitted(true)
      else setError(data.error || 'Submission failed. Please try again.')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4" style={{ background: '#0A0A0F' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass rounded-3xl p-10 text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold font-serif mb-3">Payment Received!</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            Your receipt has been submitted for review. We&apos;ll send your license key to <strong className="text-white/80">{form.email}</strong> within 24 hours.
          </p>
          <a href="/activate" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-semibold rounded-xl">
            Go to Activation <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-16" style={{ background: '#0A0A0F' }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-8 mb-10"
        >
          <h1 className="text-4xl font-bold font-serif mb-3">
            Activate <span className="gold-gradient">GuelmaGuide AI</span>
          </h1>
          <p className="text-white/50">Choose your plan and complete your CCP payment below.</p>
        </motion.div>

        {/* Plan Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {plans.map((plan) => (
            <motion.button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              whileHover={{ scale: 1.02 }}
              className={`text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
                selectedPlan === plan.id
                  ? 'glass-gold border-yellow-400/60 glow-gold'
                  : 'glass border-white/10 hover:border-white/20'
              }`}
            >
              <div className="text-lg font-bold font-serif mb-1">{plan.name}</div>
              <div className="text-2xl font-bold gold-gradient mb-3">{plan.price}</div>
              <ul className="space-y-1">
                {plan.features.map((f) => (
                  <li key={f} className="text-xs text-white/50 flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-yellow-400 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </motion.button>
          ))}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-yellow-400" /> CCP Payment Instructions
          </h2>
          <ol className="space-y-4">
            {[
              {
                step: 1,
                title: 'Transfer payment to CCP account',
                content: (
                  <div className="flex items-center justify-between glass px-4 py-2 rounded-lg mt-1">
                    <code className="text-yellow-400 text-sm">{ccpAccount}</code>
                    <button onClick={handleCopy} className="text-white/40 hover:text-white transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                    {copied && <span className="text-xs text-emerald-400 ml-2">Copied!</span>}
                  </div>
                ),
              },
              { step: 2, title: 'Take a clear photo of your payment receipt' },
              { step: 3, title: 'Upload the receipt and fill in your details below' },
              { step: 4, title: 'Submit and wait for your license key by email (max 24h)' },
            ].map((item) => (
              <li key={item.step} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <div className="text-sm text-white/80">{item.title}</div>
                  {'content' in item && item.content}
                </div>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-lg mb-2">Your Details</h2>

          <div>
            <label className="block text-sm text-white/60 mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-1">Transaction Reference *</label>
            <input
              type="text"
              required
              value={form.ref}
              onChange={(e) => setForm({ ...form, ref: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 transition-colors"
              placeholder="e.g. TXN-2024-XXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-1">Upload Receipt</label>
            <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-yellow-400/40 transition-colors">
              <Upload className="w-6 h-6 text-white/30 mb-2" />
              <span className="text-sm text-white/40">
                {file ? file.name : 'Click to upload receipt image'}
              </span>
              <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </label>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-amber-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? 'Submitting...' : (<>Submit Payment <ArrowRight className="w-4 h-4" /></>)}
          </button>
        </form>
      </div>
    </div>
  )
}
