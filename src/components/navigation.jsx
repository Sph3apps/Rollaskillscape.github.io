import React, { useEffect } from 'react'

const Navigation = ({
  isOpen,
  onToggle,
  onClose,
  language,
  onLanguageChange,
  theme,
  onThemeChange,
  zoom,
  onZoomIn,
  onZoomOut,
  onBackToWelcome,
  t
}) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      const nav = document.querySelector('.popup-nav')
      const toggle = document.querySelector('.nav-toggle')
      
      if (nav && !nav.contains(e.target) && e.target !== toggle) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen, onClose])

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'est', label: 'Eesti' },
    { value: 'ger', label: 'Deutsch' }
  ]

  const themes = [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'eye-saver', label: 'Eye Saver' }
  ]

  return (
    <>
      <button className="nav-toggle" onClick={onToggle}>
        ☰
      </button>
      
      <nav className={`popup-nav ${isOpen ? 'open' : ''}`}>
        <h2>RollaSkillScape Menu</h2>
        
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          {languages.map(lang => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
        
        <select
          value={theme}
          onChange={(e) => onThemeChange(e.target.value)}
        >
          {themes.map(themeOption => (
            <option key={themeOption.value} value={themeOption.value}>
              {themeOption.label}
            </option>
          ))}
        </select>
        
        <div className="zoom-controls">
          <button onClick={onZoomOut}>−</button>
          <span>{Math.round(zoom * 100)}%</span>
          <button onClick={onZoomIn}>+</button>
        </div>
        
        <button className="back-btn" onClick={onBackToWelcome}>
          Back to Welcome
        </button>
      </nav>
    </>
  )
}

export default Navigation
