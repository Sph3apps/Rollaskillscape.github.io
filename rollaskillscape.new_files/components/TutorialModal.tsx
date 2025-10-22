
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TutorialModalProps {
  isOpen: boolean
  onClose: () => void
  dict: any
}

const TutorialModal: React.FC<TutorialModalProps> = ({
  isOpen,
  onClose,
  dict
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-tutorial border-2 border-border rounded-xl p-8 max-w-md mx-4 text-left"
          >
            <h2 className="text-2xl font-bold text-accent mb-4">
              Welcome to RollaSkillScape!
            </h2>
            <p className="text-primary mb-4">
              This game helps you discover new RuneScape skills by rolling randomly and challenging yourself to new goals.
            </p>
            <ul className="text-primary space-y-2 mb-6">
              <li>• Pick a <strong>Game Mode</strong>—by time or levels.</li>
              <li>• Click <strong>Roll a Skill</strong> for your next adventure!</li>
              <li>• Track your roll <strong>History</strong> and earn <span className="badge">Badges</span> for unique skill rolls!</li>
              <li>• Customize <strong>Language, Theme, Font Size</strong> easily from the top controls.</li>
            </ul>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="btn"
              >
                Got it!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TutorialModal
