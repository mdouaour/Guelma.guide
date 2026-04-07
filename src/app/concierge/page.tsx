'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, MessageCircle } from 'lucide-react'

interface Message {
  role: 'user' | 'ai'
  text: string
  id: number
}

const aiResponses: Record<string, string> = {
  default: "I'd be happy to help you explore Guelma! Ask me about landmarks, local food, transportation, or the best times to visit.",
  visit: "The best time to visit Guelma is spring (March–May) or autumn (September–November). You'll enjoy mild weather perfect for exploring the Roman Theatre and outdoor springs. Summer can be hot (35°C+) but the thermal baths are refreshing!",
  hammam: "Hammam Debagh is about 12km northwest of Guelma city. You can take a local taxi (service) from the main bus station for around 100–200 DA, or rent a car. It's open from 6:00 AM to 8:00 PM daily. Bring a towel and swimwear!",
  food: "Guelma's local specialties include Chakhchoukha (layered flatbread with stew), Berkoukes (small pasta in lamb broth), and Baklawa sweets. The Central Souk has the best street food. Try Café Riche near the Roman Theatre for traditional coffee.",
  hotel: "Near the Roman Theatre, you'll find Hotel Cirta and several guesthouses on Rue Colonel Amirouche. For a more traditional experience, stay in a local riad in the old town. Budget options start at 2,500–4,000 DA/night.",
  theatre: "The Roman Theatre of Guelma was built in the 2nd century AD during the Roman era when the city was called Calama. It could seat 4,000 spectators! Today it's one of the best-preserved Roman theatres in North Africa and still hosts the annual Guelma Theatre Festival.",
}

const suggestions = [
  "Best time to visit?",
  "How to get to Hammam Debagh?",
  "Local food recommendations?",
  "Nearest hotels to Roman Theatre?",
  "Tell me about the Roman Theatre",
]

const history = [
  { id: 1, title: "Planning a weekend trip", date: "Yesterday" },
  { id: 2, title: "Hot springs info", date: "2 days ago" },
  { id: 3, title: "Local food guide", date: "Last week" },
]

function getAIResponse(text: string): string {
  const lower = text.toLowerCase()
  if (lower.includes('time') || lower.includes('when') || lower.includes('best')) return aiResponses.visit
  if (lower.includes('hammam') || lower.includes('debagh') || lower.includes('get to') || lower.includes('transport')) return aiResponses.hammam
  if (lower.includes('food') || lower.includes('eat') || lower.includes('restaurant')) return aiResponses.food
  if (lower.includes('hotel') || lower.includes('stay') || lower.includes('accommodation')) return aiResponses.hotel
  if (lower.includes('theatre') || lower.includes('theater') || lower.includes('roman')) return aiResponses.theatre
  return aiResponses.default
}

export default function ConciergePage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Welcome to GuelmaGuide AI! 🌟 I'm your personal guide to Guelma, Algeria. Ask me anything — landmarks, local tips, transport, food, or history!", id: 0 },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { role: 'user', text: text.trim(), id: Date.now() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    await new Promise((r) => setTimeout(r, 800 + Math.random() * 700))

    const aiMsg: Message = { role: 'ai', text: getAIResponse(text), id: Date.now() + 1 }
    setMessages((prev) => [...prev, aiMsg])
    setIsTyping(false)
  }

  return (
    <div className="min-h-screen pt-16 flex" style={{ background: '#0A0A0F' }}>
      {/* Sidebar */}
      <div className="hidden lg:flex w-64 glass border-r border-white/10 flex-col">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="font-semibold text-sm">AI Concierge</span>
          </div>
        </div>
        <div className="p-3 flex-1 overflow-y-auto">
          <p className="text-white/30 text-xs px-2 mb-2">Recent</p>
          {history.map((h) => (
            <button
              key={h.id}
              className="w-full text-left px-3 py-2 rounded-lg hover:glass transition-all mb-1"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3 h-3 text-white/30" />
                <div>
                  <div className="text-xs text-white/70 truncate">{h.title}</div>
                  <div className="text-xs text-white/30">{h.date}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-3`}
              >
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-xs font-bold text-black shrink-0">
                    AI
                  </div>
                )}
                <div
                  className={`max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-yellow-500 to-amber-500 text-black rounded-br-sm font-medium'
                      : 'glass-gold text-white/85 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-xs font-bold text-black shrink-0">
                AI
              </div>
              <div className="glass-gold px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                      className="w-1.5 h-1.5 rounded-full bg-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="shrink-0 px-3 py-1.5 glass text-xs text-white/60 hover:text-yellow-400 border border-white/10 hover:border-yellow-400/30 rounded-full transition-all"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 glass">
          <div className="flex gap-3 max-w-3xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask me anything about Guelma..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 transition-colors"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              className="px-4 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-black rounded-xl hover:from-yellow-400 hover:to-amber-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
