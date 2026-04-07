'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Star, Clock } from 'lucide-react'
import Link from 'next/link'

const categories = ['All', 'Historical', 'Nature', 'Culture', 'Food']

const landmarks = [
  {
    name: 'Roman Theatre of Guelma',
    category: 'Historical',
    location: 'City Center, Guelma',
    rating: 4.9,
    hours: '8:00 AM – 6:00 PM',
    desc: 'A remarkably preserved 2nd-century Roman amphitheatre, one of the best in North Africa. Still hosts cultural events today.',
    gradient: 'from-purple-900 to-indigo-950',
    color: 'bg-purple-500/20 text-purple-400',
  },
  {
    name: 'Ain Larbi Hot Springs',
    category: 'Nature',
    location: 'Ain Larbi, 15km from Guelma',
    rating: 4.7,
    hours: 'Open 24/7',
    desc: 'Natural thermal springs surrounded by lush greenery. Rich in minerals, historically believed to have healing properties.',
    gradient: 'from-emerald-900 to-teal-950',
    color: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    name: 'Hammam Debagh',
    category: 'Historical',
    location: 'Hammam Debagh, 12km NW',
    rating: 4.8,
    hours: '6:00 AM – 8:00 PM',
    desc: 'Ancient Roman thermal baths over 2,000 years old. Steaming natural pools cascade over limestone formations.',
    gradient: 'from-amber-900 to-orange-950',
    color: 'bg-amber-500/20 text-amber-400',
  },
  {
    name: 'Guelma Archaeological Museum',
    category: 'Culture',
    location: 'Place de la République',
    rating: 4.5,
    hours: '9:00 AM – 5:00 PM',
    desc: 'Houses remarkable Roman artifacts, mosaics, and statues excavated from the ancient city of Calama.',
    gradient: 'from-blue-900 to-cyan-950',
    color: 'bg-blue-500/20 text-blue-400',
  },
  {
    name: 'Medjez Amar Forest',
    category: 'Nature',
    location: 'Medjez Amar, 20km S',
    rating: 4.6,
    hours: 'Sunrise – Sunset',
    desc: 'Lush cork oak and pine forest, ideal for hiking, picnics, and birdwatching. Cool and tranquil year-round.',
    gradient: 'from-green-900 to-lime-950',
    color: 'bg-green-500/20 text-green-400',
  },
  {
    name: 'Guelma Central Souk',
    category: 'Food',
    location: 'Old Town, Guelma',
    rating: 4.4,
    hours: '7:00 AM – 9:00 PM',
    desc: 'A vibrant traditional market selling spices, local crafts, fresh produce, and Algerian street food.',
    gradient: 'from-rose-900 to-red-950',
    color: 'bg-rose-500/20 text-rose-400',
  },
  {
    name: 'Bou Hamdane Village',
    category: 'Historical',
    location: 'Bou Hamdane, 30km E',
    rating: 4.3,
    hours: 'Open all day',
    desc: 'Traditional Algerian village preserving centuries of Berber and Ottoman architectural heritage.',
    gradient: 'from-yellow-900 to-amber-950',
    color: 'bg-yellow-500/20 text-yellow-400',
  },
  {
    name: 'Héliopolis Memorial',
    category: 'Historical',
    location: 'Héliopolis, 8km W',
    rating: 4.6,
    hours: '8:00 AM – 5:00 PM',
    desc: 'A powerful memorial commemorating the May 1945 massacres, a pivotal moment in Algerian independence history.',
    gradient: 'from-slate-800 to-gray-950',
    color: 'bg-slate-500/20 text-slate-400',
  },
  {
    name: 'Guelma Cathedral',
    category: 'Historical',
    location: 'Rue Didouche Mourad',
    rating: 4.2,
    hours: '9:00 AM – 6:00 PM',
    desc: 'A beautiful French colonial-era cathedral, now a cultural center, showcasing stunning neo-Byzantine architecture.',
    gradient: 'from-sky-900 to-blue-950',
    color: 'bg-sky-500/20 text-sky-400',
  },
]

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? landmarks
    : landmarks.filter((l) => l.category === activeCategory)

  return (
    <div className="min-h-screen pt-20 px-4 pb-16" style={{ background: '#0A0A0F' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 pt-8"
        >
          <h1 className="text-5xl font-bold font-serif mb-4">
            Explore <span className="gold-gradient">Guelma</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto">
            Discover {landmarks.length} remarkable destinations across Guelma and its surroundings.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-black'
                  : 'glass text-white/60 hover:text-white hover:border-yellow-400/30 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((lm, i) => (
            <motion.div
              key={lm.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className={`h-44 bg-gradient-to-br ${lm.gradient} flex items-center justify-center relative`}>
                <MapPin className="w-10 h-10 text-white/20 group-hover:text-white/50 transition-colors duration-300" />
                <div className="absolute top-3 right-3 flex items-center gap-1 glass px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-white/80">{lm.rating}</span>
                </div>
              </div>
              <div className="p-5">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${lm.color}`}>
                  {lm.category}
                </span>
                <h3 className="font-bold text-lg font-serif mb-1">{lm.name}</h3>
                <div className="flex items-center gap-1 text-white/40 text-xs mb-3">
                  <MapPin className="w-3 h-3" /> {lm.location}
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">{lm.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-white/40 text-xs">
                    <Clock className="w-3 h-3" /> {lm.hours}
                  </div>
                  <Link href="/map" className="text-yellow-400 text-xs hover:text-yellow-300 transition-colors">
                    View on Map →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
