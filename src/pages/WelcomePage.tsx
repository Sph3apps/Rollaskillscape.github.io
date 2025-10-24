
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {ArrowRight, Dice6, Clock, Target, Sparkles} from 'lucide-react'

interface WelcomePageProps {
  t: (key: string) => string
}

const WelcomePage: React.FC<WelcomePageProps> = ({ t }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass-panel fade-in-up p-8 max-w-4xl w-full"
      >
        {/* Title */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-['Eagle_Lake'] text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 glow-animation">
            ROLLASKILLSCAPE
          </h1>
          <p 
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t('intro') }}
          />
        </motion.div>

        {/* Features Grid */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6 mb-8">
          {/* How to Play */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Dice6 className="w-8 h-8 text-yellow-400" />
              <h3 className="text-xl font-semibold text-yellow-400">
                {t('how_to')}
              </h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                {t('choose_mode')}
              </li>
              <li className="flex items-start gap-3">
                <Target className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                {t('roll_skill')}
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                {t('train_skill')}
              </li>
            </ul>
          </div>

          {/* Why Play */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-green-400" />
              <h3 className="text-xl font-semibold text-green-400">
                {t('why_play')}
              </h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2.5 flex-shrink-0"></div>
                {t('rediscover')}
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2.5 flex-shrink-0"></div>
                {t('break_cycle')}
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2.5 flex-shrink-0"></div>
                {t('make_fun')}
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Re-roll Info */}
        <motion.div variants={itemVariants} className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src="https://emoji.gg/assets/emoji/6300_scapedance.gif" 
              alt="Re-RollaSkill" 
              className="w-12 h-12 rounded-lg"
            />
            <h3 className="text-xl font-semibold text-yellow-400">
              {t('reroll')}
            </h3>
          </div>
          <p className="text-gray-300">
            {t('reroll_desc')}
          </p>
        </motion.div>

        {/* Ready Section */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-lg text-yellow-400 font-semibold mb-6 glow-animation">
            {t('ready')}
          </p>
          <Link to="/game">
            <button className="btn-primary inline-flex items-center gap-3 text-lg px-8 py-4">
              {t('lets_roll')}
              <ArrowRight className="w-6 h-6" />
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default WelcomePage
