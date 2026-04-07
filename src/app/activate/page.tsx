'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Key, CheckCircle, XCircle, Clipboard } from 'lucide-react'

interface ActivationResult {
  plan: string
  features: string[]
}

export default function ActivatePage() {
  const [licenseKey, setLicenseKey] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ActivationResult | null>(null)
  const [error, setError] = useState('')

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setLicenseKey(text.trim())
    } catch {
      // Clipboard access denied
    }
  }

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!licenseKey.trim()) { setError('Please enter a license key.'); return }
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey: licenseKey.trim(), email }),
      })
      const data = await res.json()
      if (data.success) setResult(data)
      else setError(data.error || 'Activation failed.')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4" style={{ background: '#0A0A0F' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-gold rounded-3xl p-10 text-center max-w-md glow-gold"
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold font-serif mb-2">License Activated!</h2>
          <p className="text-white/50 text-sm mb-6">
            Your <span className="text-yellow-400 font-semibold capitalize">{result.plan}</span> plan is now active.
          </p>
          <div className="space-y-2 text-left mb-6">
            {result.features.map((f: string) => (
              <div key={f} className="flex items-center gap-2 text-sm text-white/70">
                <CheckCircle className="w-4 h-4 text-yellow-400 shrink-0" /> {f}
              </div>
            ))}
          </div>
          <a href="/explore" className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold rounded-xl">
            Start Exploring →
          </a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4" style={{ background: '#0A0A0F' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center w-16 h-16 glass-gold rounded-2xl mb-4">
            <Key className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-3xl font-bold font-serif mb-2">Activate License</h1>
          <p className="text-white/50 text-sm">Enter your license key to unlock full access.</p>
        </div>

        <form onSubmit={handleActivate} className="glass rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm text-white/60 mb-1">License Key *</label>
            <div className="relative">
              <input
                type="text"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-white/20 focus:outline-none focus:border-yellow-400/50 font-mono transition-colors"
              />
              <button
                type="button"
                onClick={handlePaste}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-yellow-400 transition-colors"
                title="Paste from clipboard"
              >
                <Clipboard className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-1">Email (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 transition-colors"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 px-3 py-2 rounded-lg">
              <XCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !licenseKey.trim()}
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-amber-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Activating...' : 'Activate License'}
          </button>

          <p className="text-center text-xs text-white/30">
            Don&apos;t have a key?{' '}
            <a href="/payment" className="text-yellow-400 hover:underline">Purchase one here</a>
          </p>
        </form>
      </motion.div>
    </div>
  )
}
