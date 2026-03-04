import { useState, useEffect, type ReactNode } from 'react'

const PROTECTED_PASSWORD = '&£IDHJSIJDNIQJSN'
const SESSION_KEY = 'portfolio_protected_unlocked'

interface PasswordProtectedProps {
  children: ReactNode
}

function PasswordProtected({ children }: PasswordProtectedProps) {
  const [unlocked, setUnlocked] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if already unlocked in this session
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      setUnlocked(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === PROTECTED_PASSWORD) {
      setUnlocked(true)
      sessionStorage.setItem(SESSION_KEY, 'true')
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  if (unlocked) {
    return <>{children}</>
  }

  return (
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
      <div className="container" style={{ maxWidth: '400px', textAlign: 'center' }}>
        <h2>🔒 Protected Content</h2>
        <p style={{ marginBottom: '1.5rem' }}>This page requires a password to view.</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{
              padding: '0.75rem',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              textAlign: 'center'
            }}
            autoFocus
          />
          {error && <p style={{ color: '#e74c3c', margin: 0 }}>{error}</p>}
          <button
            type="submit"
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: '#00bcd4',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Unlock
          </button>
        </form>
      </div>
    </section>
  )
}

export default PasswordProtected
