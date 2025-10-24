
import { useState, useEffect } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState<string>('dark')

  useEffect(() => {
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('rollaTheme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = (newTheme?: string) => {
    const nextTheme = newTheme || (theme === 'dark' ? 'light' : 'dark')
    setTheme(nextTheme)
    localStorage.setItem('rollaTheme', nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  return { theme, toggleTheme }
}
