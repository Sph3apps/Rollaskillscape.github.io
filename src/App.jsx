import React, { useState, useEffect, useRef } from 'react'
import WelcomeScreen from './components/WelcomeScreen.jsx'
import GamePanel from './components/GamePanel.jsx'
import Navigation from './components/Navigation.jsx'
import translations  from './utils/translations.js'
import { skills, skillIcons } from './utils/skills'

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome')
  const [language, setLanguage] = useState('en')
  const [theme, setTheme] = useState('dark')
  const [zoom, setZoom] = useState(1.0)
  const [navOpen, setNavOpen] = useState(false)
  const [history, setHistory] = useState([])
  
  const contentRef = useRef(null)

  useEffect(() => {
    const savedLang = localStorage.getItem('rollaLang') || 'en'
    const savedTheme = localStorage.getItem('rollaTheme') || 'dark'
    const savedHistory = JSON.parse(localStorage.getItem('rollaHistory') || '[]')
    
    setLanguage(savedLang)
    setTheme(savedTheme)
    setHistory(savedHistory)
    
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('rollaTheme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('rollaLang', language)
  }, [language])

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.transform = `scale(${zoom})`
    }
  }, [zoom])

  const handleZoomIn = () => {
    if (zoom < 1.5) {
      setZoom(prev => Math.round((prev + 0.1) * 10) / 10)
    }
  }

  const handleZoomOut = () => {
    if (zoom > 0.7) {
      setZoom(prev => Math.round((prev - 0.1) * 10) / 10)
    }
  }

  const saveToHistory = (skill, task, mode) => {
    const historyEntry = {
      time: new Date().toLocaleTimeString(),
      skill,
      task,
      mode
    }
    
    const newHistory = [historyEntry, ...history].slice(0, 10)
    setHistory(newHistory)
    localStorage.setItem('rollaHistory', JSON.stringify(newHistory))
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('rollaHistory')
  }

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  return (
    <div className="app">
      <Navigation
        isOpen={navOpen}
        onToggle={() => setNavOpen(!navOpen)}
        onClose={() => setNavOpen(false)}
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onThemeChange={setTheme}
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onBackToWelcome={() => {
          setCurrentScreen('welcome')
          setNavOpen(false)
        }}
        t={t}
      />

      <div className="page-container" ref={contentRef}>
        {currentScreen === 'welcome' ? (
          <WelcomeScreen
            onStartGame={() => setCurrentScreen('game')}
            t={t}
          />
        ) : (
          <GamePanel
            onBackToWelcome={() => setCurrentScreen('welcome')}
            history={history}
            onSaveToHistory={saveToHistory}
            onClearHistory={clearHistory}
            skills={skills}
            skillIcons={skillIcons}
            t={t}
          />
        )}
      </div>
    </div>
  )
}

export default App
