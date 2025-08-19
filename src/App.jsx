import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Leaf, Sparkles, RefreshCw } from 'lucide-react'

const FUN_FACTS = [
  'Every minute, an area of forest equivalent to 20 football fields is lost worldwide.',
  'Mangroves sequester carbon much faster per area than many other forests.',
  'A single mature tree can absorb ~22 kg CO₂ per year (varies by species).',
  'Reforestation helps stabilize local rainfall and reduces erosion.'
]

// Floating leaves animation
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-green-300 opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 40 + 20}px`
          }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 360]
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            delay: Math.random() * 10
          }}
        >
          🍃
        </motion.div>
      ))}
    </div>
  )
}

// Moving gradient header
function Header() {
  return (
    <motion.div
      className="flex items-center gap-3 p-4 text-white relative z-10"
      style={{
        background: 'linear-gradient(270deg, #059669, #13bf86, #34d399)',
        backgroundSize: '600% 600%'
      }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
    >
      <div className="p-2 bg-white/10 rounded-md">
        <Leaf size={26} />
      </div>
      <div>
        <h1 className="text-lg font-semibold">DeforestBot</h1>
        <p className="text-xs opacity-80">Friendly forest facts & planting tips</p>
      </div>
      <div className="ml-auto text-sm opacity-90 flex items-center gap-2">
        <Sparkles size={16} />
        <span>PlantGrow</span>
      </div>
    </motion.div>
  )
}

// Chat bubble component
function Message({ role, content }) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className={`${isUser
            ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white'
            : 'bg-white shadow-sm text-gray-800'
          } max-w-[82%] px-4 py-3 rounded-2xl`}
      >
        <div style={{ whiteSpace: 'pre-wrap' }}>{content}</div>
      </motion.div>
    </div>
  )
}

export default function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi — I’m DeforestBot 🌱 Ask me anything about forests, or type "help".' }
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const scrollRef = useRef(null)
  const factIdx = useRef(0)

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  // Fun fact every 5 min
  useEffect(() => {
    const id = setInterval(() => {
      const fact = FUN_FACTS[factIdx.current % FUN_FACTS.length]
      factIdx.current += 1
      setMessages(m => [...m, { role: 'assistant', content: `🌿 Fun fact: ${fact}` }])
    }, 300000)
    return () => clearInterval(id)
  }, [])

  const sendMessage = async () => {
    if (!input.trim() || sending) return
    setError(null)
    const userMsg = { role: 'user', content: input }
    setMessages(m => [...m, userMsg])
    setInput('')
    setSending(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data?.error || 'Server error')
        setMessages(m => [...m, { role: 'assistant', content: '❌ Something went wrong. Try again.' }])
        return
      }

      const botText = data?.choices?.[0]?.message?.content || data?.output || 'No response'
      setMessages(m => [...m, { role: 'assistant', content: botText }])
    } catch (err) {
      setError(err.message || 'Network error')
      setMessages(m => [...m, { role: 'assistant', content: '⚠️ Error contacting server.' }])
    } finally {
      setSending(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const resetConversation = () => {
    setMessages([{ role: 'assistant', content: 'Hi — I’m DeforestBot 🌱 Ask me anything about forests, or type "help".' }])
  }

  return (
    <div className="relative min-h-screen bg-forest-gradient flex items-center justify-center p-6">
      <AnimatedBackground />

      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-green-400 hover:shadow-green-300/60 transition-all overflow-hidden flex flex-col relative z-10">
        <Header />

        <div className="flex-1 p-4 md:p-6 overflow-auto" ref={scrollRef} style={{ minHeight: 420 }}>
          <div className="space-y-4">
            <AnimatePresence initial={false} mode="popLayout">
              {messages.map((m, i) => (
                <motion.div key={i} layout>
                  <Message role={m.role} content={m.content} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="p-4 border-t bg-white flex items-center gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
            placeholder="Ask about deforestation..."
            className="flex-1 resize-none rounded-xl border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
          />
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ rotate: 90 }}
              onClick={resetConversation}
              title="Reset conversation"
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <RefreshCw size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={sendMessage}
              disabled={sending}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-medium text-white shadow-md ${sending ? 'bg-green-300 cursor-wait' : 'bg-green-600 hover:bg-green-700'}`}>
              <Send size={16} />
              <span>{sending ? 'Sending...' : 'Send'}</span>
            </motion.button>
          </div>
        </div>

        <div className="text-xs text-gray-500 p-3 text-center">
          🌱 Powered by OpenRouter — Be kind to forests
        </div>
      </div>
    </div>
  )
}
