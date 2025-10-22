
import React from 'react'
import { Theme, Language } from '../App'

interface TopControlsProps {
  theme: Theme
  setTheme: (theme: Theme) => void
  language: Language
  setLanguage: (language: Language) => void
  fontSize: number
  setFontSize: (size: number) => void
}

const TopControls: React.FC<TopControlsProps> = ({
  theme,
  setTheme,
  language,
  setLanguage,
  fontSize,
  setFontSize
}) => {
  const changeFontSize = (delta: number) => {
    const newSize = Math.max(0.8, Math.min(1.23, fontSize + delta))
    setFontSize(newSize)
  }

  return (
    <div className="fixed top-3 right-3 z-50 bg-panel border-2 border-border rounded-lg p-3 shadow-lg">
      <div className="flex flex-col gap-2 min-w-0">
        {/* Language Selection */}
        <div className="flex items-center gap-2">
          <label htmlFor="language-select" className="text-primary text-sm whitespace-nowrap">
            🌐
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="select text-sm"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="est">Eesti</option>
            <option value="ger">Deutsch</option>
          </select>
        </div>

        {/* Theme Selection */}
        <div className="flex items-center gap-2">
          <label htmlFor="theme-select" className="text-primary text-sm whitespace-nowrap">
            🎨
          </label>
          <select
            id="theme-select"
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
            className="select text-sm"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        {/* Font Size Controls */}
        <div className="flex items-center gap-2">
          <span className="text-primary text-sm">A</span>
          <div className="flex gap-1">
            <button
              onClick={() => changeFontSize(-0.07)}
              className="btn-small text-xs px-2 py-1"
            >
              -
            </button>
            <button
              onClick={() => changeFontSize(0.07)}
              className="btn-small text-xs px-2 py-1"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopControls
