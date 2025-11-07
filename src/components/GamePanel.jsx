import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

const GamePanel = ({
  onBackToWelcome,
  history,
  onSaveToHistory,
  onClearHistory,
  skills,
  skillIcons,
  t
}) => {
  const [mode, setMode] = useState('time');
  const [output, setOutput] = useState('');
  const [isRolling, setIsRolling] = useState(false);

  const rerollIcon = "https://emoji.gg/assets/emoji/6300_scapedance.gif";

  const rollTime = () => {
  const t_val = Math.floor(Math.random() * 6) + 1;
  switch (t_val) {
    case 1: return t('skill_30min');
    case 2: return t('skill_1hour');
    case 3: return t('skill_1hour30');
    case 4: return t('skill_2hours');
    case 5: return t('skill_next_level');
    case 6: return t('reroll_result');
    default: return "Skill for ??";
  }
};


 const rollLevel = () => {
  const l = Math.floor(Math.random() * 6) + 1;
  if (l === 6) return t('reroll_result');
  const plural = l > 1 ? 's' : '';
  return t('gain_levels').replace('{levels}', l).replace('{plural}', plural);
};


  const getRandomSkill = () => {
    const index = Math.floor(Math.random() * skills.length);
    return skills[index];
  };

  const animateSkillRoll = (duration, finalCallback) => {
    setIsRolling(true);
    let ticks = 0;
    const totalTicks = duration / 80;

    const interval = setInterval(() => {
      const skill = getRandomSkill();
      setOutput(
        `<div class="skill-display">
          <img src="${skillIcons[skill]}" class="skill-icon" alt="${skill}"> 
          ${skill}
        </div>`
      );
      ticks++;
      if (ticks > totalTicks) {
        clearInterval(interval);
        setIsRolling(false);
        finalCallback();
      }
    }, 80);
  };

  const rollAll = () => {
    animateSkillRoll(1700, () => {
      const skill = getRandomSkill();
      let task = (mode === "time") ? rollTime() : rollLevel();

      if (task === "Re-roll (6)") {
        const rerollHtml = `
          <div style="text-align: center;">
            <img src="${rerollIcon}" alt="Re-RollaSkill" style="width:52px;height:52px;vertical-align:middle;margin-bottom:5px;">
            <br> 
            <strong>${t('reroll')}</strong>
            <br>
            ${t('reroll_desc')}
          </div>
        `;
        setOutput(rerollHtml);
        onSaveToHistory("Re-RollaSkill", "", mode);
        return;

const result = `
  <p>Skill ➜ <strong>
    <span class="skill-display">
      <img src="${skillIcons[skill]}" class="skill-icon" alt="${skill}"> 
      ${skill}
    </span>
  </strong></p> 
  <p>${mode === "time" ? t('time_label') : t('levels_label')} ➜ <strong>${task}</strong></p> 
  <hr> 
  <p>💡 <em>${t('train_text')} ${skill} → ${task}</em></p>
`;
  });  
};

}
  const renderHistory = () => {
    if (history.length === 0) {
      return <em>{t('no_rolls')}</em>;
    };

    return (
      <>
        <strong>{t('roll_history')}</strong><br /><br />
        {history.map((h, index) => (
          <div key={index}>
            {h.skill === "Re-RollaSkill" ? (
              `[${h.time}] Re-RollaSkill`
            ) : (
              `[${h.time}] ${h.skill} → ${h.task} (${h.mode === "time" ? "T" : "L"})`
            )}
            <br />
          </div>
        ))}
      </>
    );
  };


  return (
    <div className="glass-card game-panel active">
      <p dangerouslySetInnerHTML={{ __html: t('welcome_game') }} />

      <label htmlFor="modeSelect">{t('select_mode')}</label>
      <select
        id="modeSelect"
        value={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        <option value="time">Time Mode</option>
        <option value="level">Level Mode</option>
      </select>

      <br />

      <button onClick={rollAll} disabled={isRolling}>
        {t('roll_skill_btn')}
      </button>

      <button onClick={onClearHistory}>
        {t('clear_history_btn')}
      </button>

      <div
        className={`result ${isRolling ? 'rolling' : ''}`}
        dangerouslySetInnerHTML={{ __html: output }}
      />

      <div className="history">
        {renderHistory()}
      </div>

      {/* Bottom navigation buttons */}
      <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
        <button onClick={onBackToWelcome}>
          {t('back_to_Rules')}
        </button>
        <Link
          to="/osrs"
          className="px-6 py-3 bg-yellow-600 rounded-xl hover:bg-yellow-700 transition"
        >
          Play OSRS Skills Version
        </Link>
      </div>
    </div>
  );
};

export default GamePanel;
