import { useState, useRef, useEffect } from 'react'

type Msg = { role: 'user' | 'assistant'; content: string }

const GREETING: Msg = {
  role: 'assistant',
  content: 'Hi! Ask me anything about Thomas or this portfolio.',
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([GREETING])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, sending])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const send = async () => {
    const question = input.trim()
    if (!question || sending) return

    // Send prior turns for context, but not the canned greeting.
    const history = messages.filter((m) => m !== GREETING)
    const next: Msg[] = [...messages, { role: 'user', content: question }]
    setMessages(next)
    setInput('')
    setSending(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...history, { role: 'user', content: question }] }),
      })
      const data = await res.json().catch(() => ({}))
      const reply = res.ok
        ? data.reply
        : data.error ?? 'Something went wrong on my end. Try again in a moment.'
      setMessages([...next, { role: 'assistant', content: reply }])
    } catch {
      setMessages([
        ...next,
        { role: 'assistant', content: "I couldn't reach the server — check your connection and try again." },
      ])
    } finally {
      setSending(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {isOpen && (
        <div
          role="dialog"
          aria-label="Portfolio assistant"
          style={{
            width: '300px',
            height: '400px',
            backgroundColor: 'var(--bg-color, white)',
            color: 'var(--text-color, black)',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '10px',
            overflow: 'hidden',
          }}
        >
          <div style={{ backgroundColor: '#00bcd4', color: 'white', padding: '10px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
            <span>Portfolio Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
            >
              X
            </button>
          </div>

          <div
            ref={scrollRef}
            aria-live="polite"
            style={{ flex: 1, padding: '10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.role === 'user' ? '#00bcd4' : '#eee',
                  color: msg.role === 'user' ? 'white' : 'black',
                  padding: '8px 12px',
                  borderRadius: '15px',
                  maxWidth: '80%',
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {msg.content}
              </div>
            ))}
            {sending && (
              <div style={{ alignSelf: 'flex-start', backgroundColor: '#eee', color: '#666', padding: '8px 12px', borderRadius: '15px', fontStyle: 'italic' }}>
                typing…
              </div>
            )}
          </div>

          <div style={{ display: 'flex', borderTop: '1px solid #ccc', padding: '10px' }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              maxLength={1000}
              disabled={sending}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask a question..."
              aria-label="Ask a question"
              style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '5px' }}
            />
            <button
              onClick={send}
              disabled={sending || !input.trim()}
              style={{
                padding: '8px 12px',
                backgroundColor: sending || !input.trim() ? '#9fd8e0' : '#00bcd4',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: sending || !input.trim() ? 'default' : 'pointer',
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open portfolio assistant"
          style={{
            backgroundColor: '#00bcd4',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          💬
        </button>
      )}
    </div>
  )
}
