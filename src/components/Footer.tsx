import Link from 'next/link'
import { MapPin, Globe, Share2, AtSign } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#07070B] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg glass-gold flex items-center justify-center">
                <MapPin className="w-4 h-4 text-yellow-400" />
              </div>
              <span className="text-lg font-bold gold-gradient font-serif">GuelmaGuide AI</span>
            </div>
            <p className="text-white/50 text-sm max-w-xs leading-relaxed">
              Your intelligent companion for exploring Guelma, Algeria — ancient ruins, natural wonders, and vibrant culture.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="p-2 glass rounded-lg text-white/40 hover:text-yellow-400 transition-colors">
                <AtSign className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 glass rounded-lg text-white/40 hover:text-yellow-400 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 glass rounded-lg text-white/40 hover:text-yellow-400 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-3">Explore</h3>
            <ul className="space-y-2">
              {[
                { href: '/explore', label: 'All Landmarks' },
                { href: '/map', label: 'Interactive Map' },
                { href: '/concierge', label: 'AI Concierge' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/40 hover:text-white/70 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-3">Platform</h3>
            <ul className="space-y-2">
              {[
                { href: '/payment', label: 'Pricing' },
                { href: '/activate', label: 'Activate License' },
                { href: '/admin', label: 'Admin' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/40 hover:text-white/70 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">
            © 2025 GuelmaGuide AI. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Made with ❤️ for Guelma, Algeria
          </p>
        </div>
      </div>
    </footer>
  )
}
