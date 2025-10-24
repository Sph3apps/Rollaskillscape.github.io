
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {X, Home, Gamepad2, History, Palette, Globe} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  theme: string
  language: string
  onThemeChange: (theme: string) => void
  onLanguageChange: (language: string) => void
  t: (key: string) => string
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  theme,
  language,
  onThemeChange,
  onLanguageChange,
  t
}) => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: t('welcome'), icon: Home },
    { path: '/game', label: t('game'), icon: Gamepad2 },
    { path: '/history', label: t('history'), icon: History }
  ]

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'est', name: 'Eesti', flag: '🇪🇪' },
    { code: 'ger', name: 'Deutsch', flag: '🇩🇪' }
  ]

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-black/90 backdrop-blur-xl border-r border-white/10 z-50 lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://i.postimg.cc/HWQZDzKv/f847b95c-ccff-4310-9bb7-c19ae8d300e3-removebg-preview.png"
                    alt="RollaSkillScape"
                    className="w-8 h-8 rounded-lg"
                  />
                  <span className="text-lg font-bold text-white font-['Eagle_Lake']">
                    RollaSkillScape
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Navigation */}
              <div className="flex-1 p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                    Navigation
                  </h3>
                  <div className="space-y-2">
                    {navItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={onClose}
                          className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                            location.pathname === item.path
                              ? 'bg-yellow-400/20 text-yellow-400'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* Theme Selector */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    {t('theme')}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => onThemeChange('dark')}
                      className={`p-3 rounded-lg border transition-all ${
                        theme === 'dark' 
                          ? 'border-yellow-400 bg-yellow-400/10' 
                          : 'border-white/20 hover:border-white/30'
                      }`}
                    >
                      <div className="w-full h-6 bg-gradient-to-br from-gray-900 to-black rounded mb-2"></div>
                      <span className="text-sm text-white">Dark</span>
                    </button>
                    <button
                      onClick={() => onThemeChange('light')}
                      className={`p-3 rounded-lg border transition-all ${
                        theme === 'light' 
                          ? 'border-blue-400 bg-blue-400/10' 
                          : 'border-white/20 hover:border-white/30'
                      }`}
                    >
                      <div className="w-full h-6 bg-gradient-to-br from-blue-50 to-white rounded mb-2"></div>
                      <span className="text-sm text-white">Light</span>
                    </button>
                  </div>
                </div>

                {/* Language Selector */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {t('language')}
                  </h3>
                  <div className="space-y-2">
                    {languages.map(({ code, name, flag }) => (
                      <button
                        key={code}
                        onClick={() => onLanguageChange(code)}
                        className={`w-full p-3 rounded-lg border transition-all text-left ${
                          language === code 
                            ? 'border-yellow-400 bg-yellow-400/10' 
                            : 'border-white/20 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{flag}</span>
                          <span className="text-white">{name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
