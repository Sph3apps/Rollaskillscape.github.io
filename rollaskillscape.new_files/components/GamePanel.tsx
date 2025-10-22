
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { skills, skillIcons, rerollIcon } from '../data/skills'
import { GameMode, HistoryEntry } from '../App'

interface GamePanelProps {
  dict: any
  history: HistoryEntry[]
  onAddToHistory: (skill: string, task: string, mode: GameMode) => void
  onClearHistory: () => void
  onBackToWelcome: () => void
}

const GamePanel: React.FC<GamePanelProps> = ({
  dict,
  history,
  onAddToHistory,
  onClearHistory,
  onBackToWelcome
}) => {
  const [gameMode, setGameMode] = useState<GameMode>('time')
  const [isRolling, setIsRolling] = useState(false)
  const [currentResult, setCurrentResult] = useState<string>('')

  const rollTime = (): string => {
    const t = Math.floor(Math.random() * 6) + 1
    switch (t) {
      case 1: return "Skill for 30 minutes"
      case 2: return "Skill for 1 hour"
      case 3: return "Skill for 1 hour 30 mins"
      case 4: return "Skill for 2 hours"
      case 5: return "Skill until next level"
      case 6: return "Re-roll (6)"
      default: return "Skill for ??"
    }
  }

  const rollLevel = (): string => {
    const l = Math.floor(Math.random() * 6) + 1
    if (l === 6) return "Re-roll (6)"
    return `Gain ${l} level${l > 1 ? "s" : ""} before next roll`
  }

  const getRandomSkill = (): string => {
    return skills[Math.floor(Math.random() * skills.length)]
  }

  const animateSkillRoll = () => {
    setIsRolling(true)
    let ticks = 0
    const totalTicks = 18 // ~1.35 seconds at 75ms intervals

    const interval = setInterval(() => {
      const skill = getRandomSkill()
      setCurrentResult(`
        <img src="${skillIcons[skill]}" class="skill-icon" alt="${skill}"> ${skill}
      `)
      
      ticks++
      if (ticks > totalTicks) {
        clearInterval(interval)
        finalizeRoll()
      }
    }, 75)
  }

  const finalizeRoll = () => {
    const skill = getRandomSkill()
    let task = gameMode === 'time' ? rollTime() : rollLevel()
    
    if (task === "Re-roll (6)") {
      const rerollHtml = `
        <img src="${rerollIcon}" alt="Re-RollaSkill" style="width:54px;height:54px;">
        <br><strong>${dict.reroll}</strong>
        <br>${dict.reroll_desc}
      `
      setCurrentResult(rerollHtml)
      onAddToHistory("Re-RollaSkill", "", gameMode)
    } else {
      const result = `
        <p>Skill ➜ <strong><img src="${skillIcons[skill]}" class="skill-icon" alt="${skill}"> ${skill}</strong></p>
        <p>${gameMode === "time" ? "Time" : "Levels"} ➜ <strong>${task}</strong></p>
        <hr class="my-4 border-border">
        <p>💡 <em>Train ${skill} → ${task}</em></p>
      `
      setCurrentResult(result)
      onAddToHistory(skill, task, gameMode)
    }
    
    setIsRolling(false)
  }

  const rollAll = () => {
    if (!isRolling) {
      animateSkillRoll()
    }
  }

  const renderHistory = () => {
    if (history.length === 0) {
      return <div className="text-center text-secondary">{dict.no_rolls}</div>
    }

    return (
      <div>
        <strong className="text-accent">{dict.roll_history}</strong>
        <div className="mt-2 space-y-1">
          {history.map((entry, index) => (
            <div key={index} className="text-sm">
              {entry.skill === "Re-RollaSkill" ? (
                <span>
                  [{entry.time}] <img src={rerollIcon} alt="Re-RollaSkill" className="inline w-5 h-5" /> Re-RollaSkill
                </span>
              ) : (
                <span>
                  [{entry.time}] <img src={skillIcons[entry.skill] || ''} className="inline w-5 h-5" alt={entry.skill} /> {entry.skill} → {entry.task} ({entry.mode === "time" ? "T" : "L"})
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="panel"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-accent mb-4">{dict.welcome_game}</h2>
        
        <div className="mb-6">
          <label htmlFor="modeSelect" className="text-primary mb-2 block">
            {dict.select_mode}
          </label>
          <select
            id="modeSelect"
            value={gameMode}
            onChange={(e) => setGameMode(e.target.value as GameMode)}
            className="select"
          >
            <option value="time">Time Mode</option>
            <option value="level">Level Mode</option>
          </select>
        </div>

        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={rollAll}
            disabled={isRolling}
            className="btn"
          >
            {dict.roll_skill_btn}
          </button>
          <button
            onClick={onClearHistory}
            className="btn"
          >
            {dict.clear_history_btn}
          </button>
        </div>

        {currentResult && (
          <div 
            className="result mb-6 text-lg"
            dangerouslySetInnerHTML={{ __html: currentResult }}
          />
        )}

        <div className="history">
          {renderHistory()}
        </div>

        <button
          onClick={onBackToWelcome}
          className="btn mt-6"
        >
          {dict.back_welcome}
        </button>
      </div>
    </motion.div>
  )
}

export default GamePanel
