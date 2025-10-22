
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WelcomePanel from './components/WelcomePanel'
import GamePanel from './components/GamePanel'
import TopControls from './components/TopControls'
import TutorialModal from './components/TutorialModal'
import { useLocalStorage } from './hooks/useLocalStorage'
import { translations } from './data/translations'

export type Theme = 'dark' | 'light'
export type Language = 'en' | 'es' | 'fr' | 'est' | 'ger'
export type GameMode = 'time' | 'level'

export interface HistoryEntry {
  time: string
  skill: string
  task: string
  mode: GameMode
}

function App() {
  const [currentPanel, setCurrentPanel] = useState<'welcome' | 'game'>('welcome')
  const [theme, setTheme] = useLocalStorage<Theme>('rollaTheme', 'dark')
  const [language, setLanguage] = useLocalStorage<Language>('rollaLang', 'en')
  const [fontSize, setFontSize] = useLocalStorage('rollaFontSize', 1)
  const [showTutorial, setShowTutorial] = useState(false)
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>('rollaHistory', [])

  useEffect(() => {
    const tutorialShown = localStorage.getItem('rollaTutorial')
    if (!tutorialShown) {
      setShowTutorial(true)
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}rem`
  }, [fontSize])

  const dict = translations[language] || translations.en

  const showGame = () => setCurrentPanel('game')
  const backToWelcome = () => setCurrentPanel('welcome')

  const addToHistory = (skill: string, task: string, mode: GameMode) => {
    const newEntry: HistoryEntry = {
      time: new Date().toLocaleTimeString(),
      skill,
      task,
      mode
    }
    const newHistory = [newEntry, ...history.slice(0, 9)]
    setHistory(newHistory)
  }

  const clearHistory = () => setHistory([])

  const closeTutorial = () => {
    setShowTutorial(false)
    localStorage.setItem('rollaTutorial', '1')
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed flex flex-col justify-center items-center font-eagle transition-all duration-300"
         style={{
           backgroundImage: 'url("https://storage.ko-fi.com/cdn/useruploads/db063a23-d9a5-498a-aaad-43f4fc4408d4_gielinor_map_rs3_wallpaper-1440p.png")',
           backgroundColor: theme === 'dark' ? '#161b21' : '#eef3fa'
         }}>
      
      <TopControls
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />

      <AnimatePresence mode="wait">
        {currentPanel === 'welcome' ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <WelcomePanel
              dict={dict}
              history={history}
              onShowGame={showGame}
            />
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <GamePanel
              dict={dict}
              history={history}
              onAddToHistory={addToHistory}
              onClearHistory={clearHistory}
              onBackToWelcome={backToWelcome}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <TutorialModal
        isOpen={showTutorial}
        onClose={closeTutorial}
        dict={dict}
      />
    </div>
  )
}

export default App
