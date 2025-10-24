
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {Menu, Palette, Globe, ChevronLeft, ChevronRight} from 'lucide-react'
import { motion } from 'framer-motion'

interface NavbarProps {
  onMenuClick: () => void
  onLeftSidebarToggle: () => void
  onRightSidebarToggle: () => void
  theme: string
  language: string
  leftSidebarOpen: boolean
  rightSidebarOpen: boolean
}

const Navbar: React.FC<NavbarProps> = ({
  onMenuClick,
  onLeftSidebarToggle,
  onRightSidebarToggle,
  theme,
  language,
  leftSidebarOpen,
  rightSidebarOpen
}) => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Welcome' },
    { path: '/game', label: 'Game' },
    { path: '/history', label: 'History' }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Desktop Sidebar Controls */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>

            {/* Desktop Theme Sidebar Toggle */}
            <button
              onClick={onLeftSidebarToggle}
              className="hidden lg:flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Palette className="w-5 h-5 text-white" />
              {leftSidebarOpen ? (
                <ChevronLeft className="w-4 h-4 text-white" />
              ) : (
                <ChevronRight className="w-4 h-4 text-white" />
              )}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="https://i.postimg.cc/HWQZDzKv/f847b95c-ccff-4310-9bb7-c19ae8d300e3-removebg-preview.png"
                alt="RollaSkillScape"
                className="w-10 h-10 rounded-lg"
              />
              <span className="hidden sm:block text-xl font-bold text-white font-['Eagle_Lake']">
                RollaSkillScape
              </span>
            </Link>
          </div>

          {/* Center - Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-yellow-400/20 text-yellow-400'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section - Desktop Language Sidebar Toggle */}
          <div className="flex items-center gap-4">
            {/* Current Status Indicators (Desktop) */}
            <div className="hidden lg:flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Palette className="w-4 h-4" />
                {theme === 'dark' ? '🌙' : '☀️'}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                {language.toUpperCase()}
              </span>
            </div>

            {/* Desktop Language Sidebar Toggle */}
            <button
              onClick={onRightSidebarToggle}
              className="hidden lg:flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {rightSidebarOpen ? (
                <ChevronRight className="w-4 h-4 text-white" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-white" />
              )}
              <Globe className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
