import React from 'react'

const WelcomeScreen = ({ onStartGame, t }) => {
  return (
    <>
      <div className="hero-title">ROLLASKILLSCAPE</div>
      <div className="subtitle">
        {t('intro')}
      </div>
      
      <div className="glass-card">
        <div className="welcome-section">
          <div>
            <strong>{t('how_to')}</strong>
            <ul>
              <li>{t('choose_mode')}</li>
              <li>{t('roll_skill')}</li>
              <li>{t('train_skill')}</li>
            </ul>
          </div>
          
          <div>
            <strong>{t('why_play')}</strong>
            <ul>
              <li>{t('rediscover')}</li>
              <li>{t('break_cycle')}</li>
              <li>{t('make_fun')}</li>
            </ul>
          </div>
          
          <div>
            <strong>{t('reroll')}</strong><br />
            <span>{t('reroll_desc')}</span>
          </div>
          
          <div className="ready-text">
            {t('ready')}
          </div>
        </div>
        
        <button className="cta-btn" onClick={onStartGame}>
          {t('lets_roll')}
        </button>
      </div>
      
      <footer>
        © 2025 RollaSkillScape — Crafted for Adventure
      </footer>
    </>
  )
}

export default WelcomeScreen
