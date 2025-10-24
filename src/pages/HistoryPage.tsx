
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {History, Trash2, Filter, ArrowLeft, Clock, Target} from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

interface HistoryPageProps {
  t: (key: string) => string
}

interface HistoryEntry {
  id: number
  time: string
  skill: string
  task: string
  mode: string
  timestamp: number
}

const HistoryPage: React.FC<HistoryPageProps> = ({ t }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [filter, setFilter] = useState<'all' | 'time' | 'level'>('all')

  const skillIcons: { [key: string]: string } = {
    "Agility": "https://i.postimg.cc/JhWsdyLB/Agility.webp",
    "Attack": "https://i.postimg.cc/jjrDkWb7/Attack.webp",
    "Constitution": "https://i.postimg.cc/9fjDN4hZ/Constitution.webp",
    "Construction": "https://i.postimg.cc/MG8nrcSB/Construction.webp",
    "Cooking": "https://i.postimg.cc/rpLDYdkW/Cooking.webp",
    "Crafting": "https://i.postimg.cc/FKQYnf40/Crafting.webp",
    "Defence": "https://i.postimg.cc/jjrDkWbz/Defence.webp",
    "Divination": "https://i.postimg.cc/KYr1XZG1/Divination.webp",
    "Dungeoneering": "https://i.postimg.cc/MGbnkW6c/Dungeoneering.webp",
    "Farming": "https://i.postimg.cc/Jhcsw1rD/Farming.webp",
    "Firemaking": "https://i.postimg.cc/cJMvqsxt/Firemaking.webp",
    "Fishing": "https://i.postimg.cc/3wCkMK8D/Fishing.webp",
    "Fletching": "https://i.postimg.cc/Jhcsw1rX/Fletching.webp",
    "Herblore": "https://i.postimg.cc/Jhcsw1rJ/Herblore.webp",
    "Hunter": "https://i.postimg.cc/HL4rGpYX/Hunter.webp",
    "Invention": "https://i.postimg.cc/vmL4RQY5/Invention.webp",
    "Magic": "https://i.postimg.cc/BvcjWqSx/Magic.webp",
    "Mining": "https://i.postimg.cc/R0QWrMS7/Mining.webp",
    "Prayer": "https://i.postimg.cc/TPqK8Rdj/Prayer.webp",
    "Ranged": "https://i.postimg.cc/d0mhMqsj/Ranged.webp",
    "Runecrafting": "https://i.postimg.cc/XvcrMVj8/Runecrafting.webp",
    "Slayer": "https://i.postimg.cc/PqzCGtXy/Slayer.webp",
    "Smithing": "https://i.postimg.cc/g0qx9Yz4/Smithing.webp",
    "Strength": "https://i.postimg.cc/hGbXFSDp/Strength.webp",
    "Summoning": "https://i.postimg.cc/k5F2rnJT/Summoning.webp",
    "Thieving": "https://i.postimg.cc/hGbXFSDC/Thieving.webp",
    "Woodcutting": "https://i.postimg.cc/nLYX8HFR/Woodcutting.webp"
  }

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem('rollaHistory') || '[]')
      setHistory(savedHistory)
    } catch (error) {
      setHistory([])
    }
  }

  const clearHistory = () => {
    localStorage.removeItem('rollaHistory')
    setHistory([])
    toast.success("🗑️ History cleared!")
  }

  const filteredHistory = history.filter(entry => {
    if (filter === 'all') return true
    return entry.mode === filter
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-['Eagle_Lake'] text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            Roll History
          </h1>
          <p className="text-gray-300 text-lg">
            Your last 10 skill rolls and adventures
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Filter */}
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    filter === 'all'
                      ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                      : 'border-white/20 text-gray-300 hover:border-white/40'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('time')}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    filter === 'time'
                      ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                      : 'border-white/20 text-gray-300 hover:border-white/40'
                  }`}
                >
                  <Clock className="w-4 h-4 inline mr-2" />
                  Time
                </button>
                <button
                  onClick={() => setFilter('level')}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    filter === 'level'
                      ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                      : 'border-white/20 text-gray-300 hover:border-white/40'
                  }`}
                >
                  <Target className="w-4 h-4 inline mr-2" />
                  Level
                </button>
              </div>
            </div>

            {/* Clear Button */}
            <button
              onClick={clearHistory}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear History
            </button>
          </div>
        </motion.div>

        {/* History List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 mb-8"
        >
          {filteredHistory.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="glass-panel p-8 text-center"
            >
              <History className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No rolls yet
              </h3>
              <p className="text-gray-400 mb-6">
                Start rolling skills to see your history here!
              </p>
              <Link to="/game">
                <button className="btn-primary">
                  Start Rolling
                </button>
              </Link>
            </motion.div>
          ) : (
            filteredHistory.map((entry, index) => (
              <motion.div
                key={entry.id}
                variants={itemVariants}
                className="glass-panel p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Skill Icon */}
                    {entry.skill === 'Re-RollaSkill' ? (
                      <img
                        src="https://emoji.gg/assets/emoji/6300_scapedance.gif"
                        alt="Re-RollaSkill"
                        className="w-12 h-12 rounded-lg"
                      />
                    ) : (
                      <img
                        src={skillIcons[entry.skill]}
                        alt={entry.skill}
                        className="skill-icon w-12 h-12"
                      />
                    )}

                    {/* Content */}
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-white">
                          {entry.skill}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          entry.mode === 'time' 
                            ? 'bg-blue-400/20 text-blue-400'
                            : 'bg-green-400/20 text-green-400'
                        }`}>
                          {entry.mode === 'time' ? 'TIME' : 'LEVEL'}
                        </span>
                      </div>
                      {entry.task && (
                        <p className="text-gray-300 mb-1">
                          {entry.task}
                        </p>
                      )}
                      <p className="text-sm text-gray-400">
                        {entry.time} • Roll #{filteredHistory.length - index}
                      </p>
                    </div>
                  </div>

                  {/* Mode Icon */}
                  <div className="text-gray-400">
                    {entry.mode === 'time' ? (
                      <Clock className="w-5 h-5" />
                    ) : (
                      <Target className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link to="/game">
            <button className="btn-secondary inline-flex items-center gap-3">
              <ArrowLeft className="w-5 h-5" />
              Back to Game
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default HistoryPage
