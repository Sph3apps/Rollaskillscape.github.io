
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {Dice6, RotateCcw, History, ArrowLeft} from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

interface GamePageProps {
  t: (key: string) => string
}

const GamePage: React.FC<GamePageProps> = ({ t }) => {
  const [gameMode, setGameMode] = useState<'time' | 'level'>('time')
  const [isRolling, setIsRolling] = useState(false)
  const [currentResult, setCurrentResult] = useState<any>(null)

  const skills = [
    "Agility", "Attack", "Constitution", "Construction", "Cooking", "Crafting",
    "Defence", "Divination", "Dungeoneering", "Farming", "Firemaking", "Fishing",
    "Fletching", "Herblore", "Hunter", "Invention", "Magic", "Mining", "Prayer",
    "Ranged", "Runecrafting", "Slayer", "Smithing", "Strength", "Summoning",
    "Thieving", "Woodcutting"
  ]

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

  const rollTime = () => {
    const options = [
      "Skill for 30 minutes",
      "Skill for 1 hour", 
      "Skill for 1 hour 30 mins",
      "Skill for 2 hours",
      "Skill until next level",
      "Re-roll (6)"
    ]
    return options[Math.floor(Math.random() * options.length)]
  }

  const rollLevel = () => {
    const roll = Math.floor(Math.random() * 6) + 1
    if (roll === 6) return "Re-roll (6)"
    return `Gain ${roll} level${roll > 1 ? "s" : ""} before next roll`
  }

  const getRandomSkill = () => {
    return skills[Math.floor(Math.random() * skills.length)]
  }

  const saveToHistory = (skill: string, task: string, mode: string) => {
    const historyEntry = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      skill,
      task,
      mode,
      timestamp: Date.now()
    }
    
    const history = JSON.parse(localStorage.getItem('rollaHistory') || '[]')
    history.unshift(historyEntry)
    
    // Keep only last 10 entries
    if (history.length > 10) {
      history.splice(10)
    }
    
    localStorage.setItem('rollaHistory', JSON.stringify(history))
  }

  const rollSkill = async () => {
    setIsRolling(true)
    
    // Animation duration
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const skill = getRandomSkill()
    const task = gameMode === 'time' ? rollTime() : rollLevel()
    
    if (task === "Re-roll (6)") {
      setCurrentResult({
        type: 'reroll',
        skill: 'Re-RollaSkill',
        task: '',
        isReroll: true
      })
      saveToHistory("Re-RollaSkill", "", gameMode)
      toast.success("🎲 Re-roll! Try again!")
    } else {
      setCurrentResult({
        type: 'skill',
        skill,
        task,
        isReroll: false
      })
      saveToHistory(skill, task, gameMode)
      toast.success(`🎯 ${skill} rolled!`)
    }
    
    setIsRolling(false)
  }

  const clearHistory = () => {
    localStorage.removeItem('rollaHistory')
    toast.success("🗑️ History cleared!")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 max-w-4xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-['Eagle_Lake'] text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            {t('welcome_game').replace('<br>', '')}
          </h1>
        </div>

        {/* Mode Selection */}
        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-300 mb-4 text-center">
            {t('select_mode')}
          </label>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setGameMode('time')}
              className={`px-6 py-3 rounded-xl border-2 transition-all ${
                gameMode === 'time'
                  ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                  : 'border-white/20 text-gray-300 hover:border-white/40'
              }`}
            >
              ⏰ Time Mode
            </button>
            <button
              onClick={() => setGameMode('level')}
              className={`px-6 py-3 rounded-xl border-2 transition-all ${
                gameMode === 'level'
                  ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                  : 'border-white/20 text-gray-300 hover:border-white/40'
              }`}
            >
              📊 Level Mode
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={rollSkill}
            disabled={isRolling}
            className="btn-primary inline-flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Dice6 className={`w-6 h-6 ${isRolling ? 'animate-spin' : ''}`} />
            {isRolling ? 'Rolling...' : t('roll_skill_btn')}
          </button>
          
          <button
            onClick={clearHistory}
            className="btn-secondary inline-flex items-center gap-3"
          >
            <RotateCcw className="w-5 h-5" />
            {t('clear_history_btn')}
          </button>
          
          <Link to="/history">
            <button className="btn-secondary inline-flex items-center gap-3">
              <History className="w-5 h-5" />
              View History
            </button>
          </Link>
        </div>

        {/* Result Display */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-8 min-h-[200px] flex items-center justify-center">
          {isRolling ? (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <img
                  src={skillIcons[skills[Math.floor(Math.random() * skills.length)]]}
                  alt="Rolling"
                  className="skill-icon rolling"
                />
                <span className="text-2xl font-semibold text-white">
                  {skills[Math.floor(Math.random() * skills.length)]}
                </span>
              </div>
              <p className="text-gray-400">🎲 Rolling your fate...</p>
            </motion.div>
          ) : currentResult ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center w-full"
            >
              {currentResult.isReroll ? (
                <div>
                  <img
                    src="https://emoji.gg/assets/emoji/6300_scapedance.gif"
                    alt="Re-RollaSkill"
                    className="w-16 h-16 mx-auto mb-4 rounded-lg"
                  />
                  <h3 className="text-2xl font-semibold text-yellow-400 mb-2">
                    {t('reroll')}
                  </h3>
                  <p className="text-gray-300">{t('reroll_desc')}</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <img
                      src={skillIcons[currentResult.skill]}
                      alt={currentResult.skill}
                      className="skill-icon"
                    />
                    <span className="text-3xl font-semibold text-white">
                      {currentResult.skill}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xl text-gray-300">
                      <span className="text-yellow-400 font-semibold">Task:</span> {currentResult.task}
                    </p>
                    <p className="text-lg text-gray-400">
                      💡 <em>Train {currentResult.skill} → {currentResult.task}</em>
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="text-center text-gray-400">
              <Dice6 className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Click "Roll A Skill" to start your adventure!</p>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link to="/">
            <button className="btn-secondary inline-flex items-center gap-3">
              <ArrowLeft className="w-5 h-5" />
              {t('back_to_Rules')}
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default GamePage
