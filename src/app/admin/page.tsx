'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Users, CreditCard, Key, Copy, Check, RefreshCw, LogIn } from 'lucide-react'

const mockPayments = [
  { id: '1', email: 'test@example.com', ref: 'TXN-001', plan: 'standard', status: 'pending', date: '2025-01-15' },
  { id: '2', email: 'user2@gmail.com', ref: 'TXN-002', plan: 'pro', status: 'approved', date: '2025-01-14' },
  { id: '3', email: 'karim@mail.dz', ref: 'TXN-003', plan: 'standard', status: 'rejected', date: '2025-01-13' },
]

const mockLicenses = [
  { key: 'GUELMA-XXXX-1111-AAAA', plan: 'standard', email: 'user2@gmail.com', used: true, date: '2025-01-14' },
  { key: 'GUELMA-YYYY-2222-BBBB', plan: 'pro', email: null, used: false, date: '2025-01-15' },
]

const stats = [
  { label: 'Total Users', value: '12', icon: Users, color: 'text-blue-400' },
  { label: 'Active Licenses', value: '8', icon: Key, color: 'text-yellow-400' },
  { label: 'Pending Payments', value: '3', icon: CreditCard, color: 'text-orange-400' },
  { label: 'Revenue', value: '31,500 DA', icon: Shield, color: 'text-emerald-400' },
]

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: 'bg-orange-500/20 text-orange-400',
    approved: 'bg-emerald-500/20 text-emerald-400',
    rejected: 'bg-red-500/20 text-red-400',
  }
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[status] || ''}`}>
      {status}
    </span>
  )
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [secret, setSecret] = useState('')
  const [authError, setAuthError] = useState('')
  const [tab, setTab] = useState<'payments' | 'licenses'>('payments')
  const [generatedKey, setGeneratedKey] = useState('')
  const [generating, setGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [licenses, setLicenses] = useState(mockLicenses)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (secret.trim()) {
      setAuthed(true)
      setAuthError('')
    } else {
      setAuthError('Please enter the admin secret.')
    }
  }

  const generateKey = async () => {
    setGenerating(true)
    try {
      const res = await fetch('/api/admin/generate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
        body: JSON.stringify({ plan: 'standard' }),
      })
      const data = await res.json()
      if (data.key) {
        setGeneratedKey(data.key)
        setLicenses((prev) => [{ key: data.key, plan: 'standard', email: null, used: false, date: new Date().toISOString().split('T')[0] }, ...prev])
      }
    } catch {
      // If API not configured, generate a demo key locally
      const demoKey = `GUELMA-${Math.random().toString(36).substring(2,6).toUpperCase()}-${Date.now().toString(36).toUpperCase()}-DEMO`
      setGeneratedKey(demoKey)
    } finally {
      setGenerating(false)
    }
  }

  const copyKey = () => {
    navigator.clipboard.writeText(generatedKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!authed) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4" style={{ background: '#0A0A0F' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="text-center mb-6 pt-8">
            <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
            <h1 className="text-2xl font-bold font-serif">Admin Dashboard</h1>
            <p className="text-white/40 text-sm mt-1">Enter your admin secret to continue</p>
          </div>
          <form onSubmit={handleLogin} className="glass rounded-2xl p-6 space-y-4">
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Admin secret"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 transition-colors"
            />
            {authError && <p className="text-red-400 text-xs">{authError}</p>}
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold rounded-xl flex items-center justify-center gap-2">
              <LogIn className="w-4 h-4" /> Sign In
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-16" style={{ background: '#0A0A0F' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-8 mb-8">
          <h1 className="text-3xl font-bold font-serif mb-1">Admin <span className="gold-gradient">Dashboard</span></h1>
          <p className="text-white/40 text-sm">Manage payments, licenses, and users</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-5">
              <s.icon className={`w-5 h-5 ${s.color} mb-3`} />
              <div className="text-2xl font-bold font-serif">{s.value}</div>
              <div className="text-xs text-white/40 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tab Bar */}
        <div className="flex gap-2 mb-6">
          {(['payments', 'licenses'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${tab === t ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-black' : 'glass text-white/60 hover:text-white'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Payments Tab */}
        {tab === 'payments' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h2 className="font-semibold">Payment Submissions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-4 py-3 text-white/40 font-normal">Email</th>
                    <th className="text-left px-4 py-3 text-white/40 font-normal">Ref</th>
                    <th className="text-left px-4 py-3 text-white/40 font-normal">Plan</th>
                    <th className="text-left px-4 py-3 text-white/40 font-normal">Status</th>
                    <th className="text-left px-4 py-3 text-white/40 font-normal">Date</th>
                    <th className="text-left px-4 py-3 text-white/40 font-normal">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPayments.map((p) => (
                    <tr key={p.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="px-4 py-3 text-white/70">{p.email}</td>
                      <td className="px-4 py-3 text-white/50 font-mono text-xs">{p.ref}</td>
                      <td className="px-4 py-3"><span className="capitalize text-white/60">{p.plan}</span></td>
                      <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                      <td className="px-4 py-3 text-white/40 text-xs">{p.date}</td>
                      <td className="px-4 py-3">
                        {p.status === 'pending' && (
                          <div className="flex gap-2">
                            <button className="px-3 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors">Approve</button>
                            <button className="px-3 py-1 text-xs bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">Reject</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Licenses Tab */}
        {tab === 'licenses' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* Generate Key */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-semibold mb-4">Generate License Key</h2>
              <div className="flex flex-wrap gap-3 items-center">
                <button
                  onClick={generateKey}
                  disabled={generating}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-semibold rounded-xl hover:from-yellow-400 hover:to-amber-400 disabled:opacity-50 transition-all"
                >
                  {generating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
                  {generating ? 'Generating...' : 'Generate Key'}
                </button>
                {generatedKey && (
                  <div className="flex items-center gap-2 glass px-4 py-2.5 rounded-xl">
                    <code className="text-yellow-400 text-sm font-mono">{generatedKey}</code>
                    <button onClick={copyKey} className="text-white/40 hover:text-white transition-colors ml-2">
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Licenses Table */}
            <div className="glass rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h2 className="font-semibold">Issued Licenses</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left px-4 py-3 text-white/40 font-normal">Key</th>
                      <th className="text-left px-4 py-3 text-white/40 font-normal">Plan</th>
                      <th className="text-left px-4 py-3 text-white/40 font-normal">Email</th>
                      <th className="text-left px-4 py-3 text-white/40 font-normal">Status</th>
                      <th className="text-left px-4 py-3 text-white/40 font-normal">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {licenses.map((l) => (
                      <tr key={l.key} className="border-b border-white/5 hover:bg-white/2">
                        <td className="px-4 py-3 font-mono text-xs text-yellow-400/70">{l.key}</td>
                        <td className="px-4 py-3"><span className="capitalize text-white/60">{l.plan}</span></td>
                        <td className="px-4 py-3 text-white/50">{l.email || '—'}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${l.used ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {l.used ? 'Used' : 'Available'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-white/40 text-xs">{l.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
