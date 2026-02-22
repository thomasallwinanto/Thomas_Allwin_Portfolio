import { useState, useEffect } from 'react'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('site-theme')
    return stored === 'dark'
  })

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
    localStorage.setItem('site-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <button
      id="theme-toggle"
      className="theme-toggle-btn"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      type="button"
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}

export default ThemeToggle
