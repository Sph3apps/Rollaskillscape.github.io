
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import WelcomePage from './pages/WelcomePage'
import GamePage from './pages/GamePage'
import HistoryPage from './pages/HistoryPage'
import { useTheme } from './hooks/useTheme'
import { useLanguage } from './hooks/useLanguage'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  // Desktop sidebar management
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false) // Close mobile sidebar on desktop
      } else {
        setLeftSidebarOpen(false) // Close desktop sidebars on mobile
        setRightSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initial check

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const closeSidebars = () => {
    setSidebarOpen(false)
    setLeftSidebarOpen(false)
    setRightSidebarOpen(false)
  }

  return (
    <Router>
      <div className="min-h-screen" data-theme={theme}>
        <Navbar 
          onMenuClick={() => setSidebarOpen(true)}
          onLeftSidebarToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
          onRightSidebarToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
          theme={theme}
          language={language}
          leftSidebarOpen={leftSidebarOpen}
          rightSidebarOpen={rightSidebarOpen}
        />

        {/* Mobile Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          theme={theme}
          language={language}
          onThemeChange={toggleTheme}
          onLanguageChange={setLanguage}
          t={t}
        />

        {/* Desktop Left Sidebar - Theme Controls */}
        <AnimatePresence>
          {leftSidebarOpen && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="fixed left-0 top-16 bottom-0 w-80 bg-black/20 backdrop-blur-xl border-r border-white/10 z-40 hidden lg:block"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white font-['Eagle_Lake']">
                    🎨 {t('theme_settings')}
                  </h3>
                  <button
                    onClick={() => setLeftSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <span className="text-white text-xl">×</span>
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="glass-panel p-4">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      {t('select_theme')}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => toggleTheme('dark')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          theme === 'dark' 
                            ? 'border-yellow-400 bg-yellow-400/10' 
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="w-full h-8 bg-gradient-to-br from-gray-900 to-black rounded-lg mb-2"></div>
                        <span className="text-sm text-white">Dark</span>
                      </button>
                      <button
                        onClick={() => toggleTheme('light')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          theme === 'light' 
                            ? 'border-blue-400 bg-blue-400/10' 
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="w-full h-8 bg-gradient-to-br from-blue-50 to-white rounded-lg mb-2"></div>
                        <span className="text-sm text-white">Light</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="glass-panel p-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Theme Preview</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{background: 'var(--accent)'}}></div>
                        <span className="text-sm" style={{color: 'var(--primary)'}}>Primary Accent</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{background: 'var(--secondary)'}}></div>
                        <span className="text-sm" style={{color: 'var(--secondary)'}}>Secondary Text</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Right Sidebar - Language Controls */}
        <AnimatePresence>
          {rightSidebarOpen && (
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="fixed right-0 top-16 bottom-0 w-80 bg-black/20 backdrop-blur-xl border-l border-white/10 z-40 hidden lg:block"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white font-['Eagle_Lake']">
                    🌐 {t('language_settings')}
                  </h3>
                  <button
                    onClick={() => setRightSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <span className="text-white text-xl">×</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { code: 'en', name: 'English', flag: '🇺🇸' },
                    { code: 'es', name: 'Español', flag: '🇪🇸' },
                    { code: 'fr', name: 'Français', flag: '🇫🇷' },
                    { code: 'est', name: 'Eesti', flag: '🇪🇪' },
                    { code: 'ger', name: 'Deutsch', flag: '🇩🇪' }
                  ].map(({ code, name, flag }) => (
                    <button
                      key={code}
                      onClick={() => setLanguage(code)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        language === code 
                          ? 'border-yellow-400 bg-yellow-400/10' 
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{flag}</span>
                        <div>
                          <div className="text-white font-medium">{name}</div>
                          <div className="text-gray-400 text-sm">{code.toUpperCase()}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay for desktop sidebars */}
        {(leftSidebarOpen || rightSidebarOpen) && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 hidden lg:block"
            onClick={closeSidebars}
          />
        )}

        {/* Main Content */}
        <main 
          className={`transition-all duration-300 ${
            window.innerWidth >= 1024 ? 'pt-16' : 'pt-16'
          }`}
          onClick={closeSidebars}
        >
          <Routes>
            <Route path="/" element={<WelcomePage t={t} />} />
            <Route path="/game" element={<GamePage t={t} />} />
            <Route path="/history" element={<HistoryPage t={t} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'var(--panel-bg)',
              color: 'var(--primary)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              backdropFilter: 'blur(20px)',
            },
          }}
        />
      </div>
    </Router>
  )
}

export default App
