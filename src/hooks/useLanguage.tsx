
import { useState, useEffect } from 'react'

interface Translations {
  [key: string]: {
    [key: string]: string
  }
}

const translations: Translations = {
  en: {
    "welcome": "Welcome",
    "game": "Game", 
    "history": "History",
    "theme": "Theme",
    "language": "Language",
    "theme_settings": "Theme Settings",
    "language_settings": "Language Settings",
    "select_theme": "Select Theme",
    "intro": "Tired of training the same skills? Not sure what to do next? <br>Let randomness spice up your adventure—roll your next skill and jump in!",
    "how_to": "How To Play:",
    "choose_mode": "Choose a mode—Click \"game mode\" and choose time or level",
    "roll_skill": "Roll a skill—Click \"Roll a skill\" and watch the magic happen",
    "train_skill": "Train that skill—Stick with it until you've completed the task rolled",
    "why_play": "Why Play?",
    "rediscover": "Rediscover old skills you might have neglected.",
    "break_cycle": "Break the cycle of always training the same thing.",
    "make_fun": "Make skilling sessions more unpredictable and fun.",
    "reroll": "Re-RollaSkill",
    "reroll_desc": "Maybe grab a drink? grab something to eat? do some house work? or just simply Re-RollaSkill",
    "ready": "Ready to Roll A Skill? Click \"Let's Roll\"",
    "lets_roll": "Let's Roll!",
    "welcome_game": "Welcome adventurer!<br> Roll your fate, train your skill, and let destiny dictate your grind!",
    "select_mode": "Choose a game mode:",
    "roll_skill_btn": "Roll A Skill",
    "clear_history_btn": "Clear roll list",
    "back_to_Rules": "Back to Welcome",
  },
  es: {
    "welcome": "Bienvenido",
    "game": "Juego",
    "history": "Historial", 
    "theme": "Tema",
    "language": "Idioma",
    "theme_settings": "Configuración de Tema",
    "language_settings": "Configuración de Idioma",
    "select_theme": "Seleccionar Tema",
    "intro": "¿Cansado de entrenar las mismas habilidades? ¿No sabes qué hacer después? <br>Deja que la aleatoriedad anime tu aventura—¡gira para tu próxima habilidad y lánzate!",
    "how_to": "Cómo jugar:",
    "choose_mode": "Elige un modo—Haz clic en \"modo de juego\" y elige tiempo o nivel",
    "roll_skill": "Gira una habilidad—Haz clic en \"Girar una habilidad\" y observa la magia",
    "train_skill": "Entrena esa habilidad—Quédate con ella hasta que completes la tarea elegida",
    "why_play": "¿Por qué jugar?",
    "rediscover": "Redescubre habilidades antiguas que quizás hayas descuidado.",
    "break_cycle": "Rompe el ciclo de entrenar siempre lo mismo.",
    "make_fun": "Haz que las sesiones de habilidades sean más impredecibles y divertidas.",
    "reroll": "¿Repetir lanzamiento?",
    "reroll_desc": "¿Tal vez tomar una bebida? ¿Comer algo? ¿Hacer algunas tareas domésticas? ¿O simplemente Re-RollaSkill?",
    "ready": "¿Listo para lanzar? Haz clic en \"¡Vamos a lanzar!\"",
    "lets_roll": "¡Vamos a lanzar!",
    "welcome_game": "¡Bienvenido aventurero!<br> Lanza tu destino, entrena tu habilidad y deja que el destino dirija tu entrenamiento!",
    "select_mode": "Elige un modo de juego",
    "roll_skill_btn": "Girar una habilidad",
    "clear_history_btn": "Borrar historial",
    "back_to_Rules": "Volver a inicio",
  },
  fr: {
    "welcome": "Bienvenue",
    "game": "Jeu",
    "history": "Historique",
    "theme": "Thème", 
    "language": "Langue",
    "theme_settings": "Paramètres du Thème",
    "language_settings": "Paramètres de Langue",
    "select_theme": "Sélectionner le Thème",
    "intro": "Marre de toujours entraîner les mêmes compétences ? Vous ne savez pas quoi faire ensuite ? <br>Laissez le hasard pimenter votre aventure—lancez votre prochaine compétence et lancez-vous!",
    "how_to": "Comment jouer :",
    "choose_mode": "Choisissez un mode—Cliquez sur \"mode de jeu\" et choisissez temps ou niveau",
    "roll_skill": "Roulez une compétence—Cliquez sur \"Rouler une compétence\" et regardez la magie opérer",
    "train_skill": "Entraînez cette compétence—Continuez jusqu'à avoir complété la tâche tirée au sort",
    "why_play": "Pourquoi jouer ?",
    "rediscover": "Redécouvrez des compétences que vous avez peut-être négligées.",
    "break_cycle": "Brisez le cycle de toujours entraîner la même chose.",
    "make_fun": "Rendez les sessions d'entraînement plus imprévisibles et amusantes.",
    "reroll": "Relancer ?",
    "reroll_desc": "Peut-être prendre un verre ? Manger quelque chose ? Faire un peu de ménage ? Ou simplement Re-RollaSkill.",
    "ready": "Prêt à lancer ? Cliquez sur \"Lancer !\"",
    "lets_roll": "Lancer !",
    "welcome_game": "Bienvenue aventurier !<br> Lancez votre destin, entraînez votre compétence et laissez le hasard guider votre grind !",
    "select_mode": "Choisissez un mode de jeu :",
    "roll_skill_btn": "Rouler une compétence",
    "clear_history_btn": "Effacer l'historique",
    "back_to_Rules": "Retour à l'accueil",
  },
  est: {
    "welcome": "Tere tulemast",
    "game": "Mäng",
    "history": "Ajalugu",
    "theme": "Teema",
    "language": "Keel", 
    "theme_settings": "Teema Seaded",
    "language_settings": "Keele Seaded",
    "select_theme": "Vali Teema",
    "intro": "Väsinud samade oskuste treenimisest? Ei tea, mida järgmisena teha? <br>Lase juhusel oma seiklust vürtsitada—viska järgmine oskus ja asu tegutsema!",
    "how_to": "Kuidas mängida:",
    "choose_mode": "Vali režiim—Klõpsa \"mängurežiim\" ja vali aeg või tase",
    "roll_skill": "Viska oskus—Klõpsa \"Viska oskus\" ja vaata maagia sündi",
    "train_skill": "Treenige see oskus—Jätka, kuni ülesanne on täidetud",
    "why_play": "Miks mängida?",
    "rediscover": "Avasta ununenud oskuseid uuesti.",
    "break_cycle": "Murra rutiin, treeni midagi muud.",
    "make_fun": "Muuda oskuste treenimine ettearvamatumaks ja lõbusamaks.",
    "reroll": "Uuesti viskamine?",
    "reroll_desc": "Võib-olla võtad midagi juua? Sööd midagi? Teed natuke majapidamistöid? Või lihtsalt Re-RollaSkill.",
    "ready": "Oled valmis? Klõpsa \"Viska\"",
    "lets_roll": "Viska!",
    "welcome_game": "Tere tulemast, seikleja!<br> Vii end uude seiklusse, treeni oskuseid ja lase juhusel määrata järgmine grind!",
    "select_mode": "Vali mängurežiim:",
    "roll_skill_btn": "Viska oskus",
    "clear_history_btn": "Kustuta nimekiri",
    "back_to_Rules": "Tagasi algusesse",
  },
  ger: {
    "welcome": "Willkommen",
    "game": "Spiel",
    "history": "Geschichte",
    "theme": "Thema",
    "language": "Sprache",
    "theme_settings": "Thema Einstellungen", 
    "language_settings": "Sprach Einstellungen",
    "select_theme": "Thema Auswählen",
    "intro": "Müde, immer die gleichen Fertigkeiten zu trainieren? Nicht sicher, was als Nächstes kommt? <br>Lass Zufall dein Abenteuer würzen—rolle deine nächste Fertigkeit und leg los!",
    "how_to": "So spielst du:",
    "choose_mode": "Wähle einen Modus—Klicke auf \"Spielmodus\" und wähle Zeit oder Level",
    "roll_skill": "Rolle eine Fertigkeit—Klicke auf \"Fertigkeit rollen\" und erlebe die Magie",
    "train_skill": "Trainiere diese Fertigkeit—Bleib dabei, bis du die Aufgabe abgeschlossen hast",
    "why_play": "Warum spielen?",
    "rediscover": "Entdecke alte Fertigkeiten neu, die du vielleicht vernachlässigt hast.",
    "break_cycle": "Durchbreche den Zyklus, immer die gleiche Sache zu trainieren.",
    "make_fun": "Mach das Training unvorhersehbarer und spaßiger.",
    "reroll": "Nochmal rollen?",
    "reroll_desc": "Vielleicht etwas trinken? Etwas essen? Etwas Hausarbeit erledigen? Oder einfach Re-RollaSkill.",
    "ready": "Bereit zu rollen? Klicke \"Los geht's\"",
    "lets_roll": "Los geht's!",
    "welcome_game": "Willkommen Abenteurer!<br> Rolle dein Schicksal, trainiere deine Fertigkeit, und lass das Schicksal dein Training bestimmen!",
    "select_mode": "Wähle einen Spielmodus:",
    "roll_skill_btn": "Fertigkeit rollen",
    "clear_history_btn": "Liste löschen",
    "back_to_Rules": "Zurück zum Start",
  }
}

export const useLanguage = () => {
  const [language, setLanguageState] = useState<string>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('rollaLang') || 'en'
    setLanguageState(savedLanguage)
  }, [])

  const setLanguage = (lang: string) => {
    setLanguageState(lang)
    localStorage.setItem('rollaLang', lang)
  }

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  return { language, setLanguage, t }
}
