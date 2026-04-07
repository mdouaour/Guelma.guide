'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { MapPin, Layers } from 'lucide-react'

const LeafletMap = dynamic(() => import('@/components/LeafletMap'), { ssr: false })

const landmarks = [
  { name: 'Roman Theatre', lat: 36.4621, lng: 7.4247, category: 'Historical' },
  { name: 'Ain Larbi Springs', lat: 36.5120, lng: 7.3850, category: 'Nature' },
  { name: 'Hammam Debagh', lat: 36.5041, lng: 7.3234, category: 'Historical' },
  { name: 'Guelma Museum', lat: 36.4640, lng: 7.4260, category: 'Culture' },
  { name: 'Medjez Amar Forest', lat: 36.4180, lng: 7.4100, category: 'Nature' },
  { name: 'Central Souk', lat: 36.4610, lng: 7.4230, category: 'Food' },
  { name: 'Bou Hamdane', lat: 36.4530, lng: 7.5100, category: 'Historical' },
  { name: 'Héliopolis Memorial', lat: 36.4750, lng: 7.3800, category: 'Historical' },
  { name: 'Guelma Cathedral', lat: 36.4625, lng: 7.4255, category: 'Historical' },
]

export default function MapPage() {
  const [selected, setSelected] = useState<typeof landmarks[0] | null>(null)

  return (
    <div className="min-h-screen pt-16 flex flex-col" style={{ background: '#0A0A0F' }}>
      <div className="flex-1 relative flex">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-72 glass border-r border-white/10 overflow-y-auto z-10 shrink-0"
        >
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-yellow-400" />
              <span className="font-semibold text-sm">Landmarks</span>
            </div>
            <p className="text-white/40 text-xs mt-1">{landmarks.length} locations</p>
          </div>
          <div className="p-2">
            {landmarks.map((lm) => (
              <button
                key={lm.name}
                onClick={() => setSelected(lm)}
                className={`w-full text-left px-3 py-3 rounded-lg mb-1 transition-all duration-200 ${
                  selected?.name === lm.name
                    ? 'glass-gold'
                    : 'hover:glass'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className={`w-4 h-4 shrink-0 ${selected?.name === lm.name ? 'text-yellow-400' : 'text-white/40'}`} />
                  <div>
                    <div className="text-sm font-medium">{lm.name}</div>
                    <div className="text-xs text-white/40">{lm.category}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Map area */}
        <div className="flex-1 relative">
          <LeafletMap landmarks={landmarks} onMarkerClick={setSelected} />

          {/* Selected info overlay */}
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-gold rounded-xl px-6 py-3 flex items-center gap-3"
            >
              <MapPin className="w-4 h-4 text-yellow-400" />
              <div>
                <div className="font-semibold text-sm">{selected.name}</div>
                <div className="text-xs text-white/50">{selected.category} · {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}</div>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white ml-2 text-lg leading-none">×</button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
