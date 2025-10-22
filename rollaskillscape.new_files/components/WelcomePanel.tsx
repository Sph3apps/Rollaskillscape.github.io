
import React from 'react'
import { HistoryEntry } from '../App'

interface WelcomePanelProps {
  dict: any
  history: HistoryEntry[]
  onShowGame: () => void
}

const WelcomePanel: React.FC<WelcomePanelProps> = ({ dict, onShowGame }) => {
  return (
    <div className="panel">
      <div className="text-4xl font-bold text-accent mb-6 tracking-wider">
        ROLLASKILLSCAPE
      </div>
      
      <p className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: dict.intro }} />
      
      <div className="mb-6">
        <div dangerouslySetInnerHTML={{ __html: dict.how_to }} />
        <div dangerouslySetInnerHTML={{ __html: dict.why_play }} />
        <div dangerouslySetInnerHTML={{ __html: dict.ready }} />
      </div>
      
      <button 
        onClick={onShowGame}
        className="btn-primary"
        autoFocus
      >
        {dict.lets_roll}
      </button>
    </div>
  )
}

export default WelcomePanel
