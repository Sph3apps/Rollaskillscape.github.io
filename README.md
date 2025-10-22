# Rollaskillscape.github.io

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RollaSkillScape</title>
    <meta name="description" content="Discover new RuneScape skills by rolling randomly and challenging yourself to new goals">
    <link rel="icon" href="https://lumi.new/lumi.ing/logo.png" />
    <link href="https://fonts.googleapis.com/css2?family=Eagle+Lake&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #3b82f6;
            --secondary: #6b7280;
            --accent: #f59e0b;
            --background: #1f2937;
            --surface: #374151;
            --border: #4b5563;
            --text: #f9fafb;
            --text-muted: #d1d5db;
        }

        [data-theme="light"] {
            --primary: #2563eb;
            --secondary: #6b7280;
            --accent: #d97706;
            --background: #f9fafb;
            --surface: #ffffff;
            --border: #e5e7eb;
            --text: #1f2937;
            --text-muted: #6b7280;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Eagle Lake', cursive;
            background-color: var(--background);
            color: var(--text);
            min-height: 100vh;
            background-image: url('https://storage.ko-fi.com/cdn/useruploads/db063a23-d9a5-498a-aaad-43f4fc4408d4_gielinor_map_rs3_wallpaper-1440p.png');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: all 0.3s ease;
        }

        .top-controls {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 50;
            background: rgba(55, 65, 81, 0.9);
            backdrop-filter: blur(8px);
            border-radius: 0.5rem;
            padding: 0.75rem;
            border: 1px solid var(--border);
        }

        [data-theme="light"] .top-controls {
            background: rgba(255, 255, 255, 0.9);
        }

        @media (max-width: 640px) {
            .top-controls {
                padding: 0.5rem;
                top: 0.5rem;
                right: 0.5rem;
            }
        }

        @media (max-width: 480px) {
            .top-controls {
                position: relative;
                top: auto;
                right: auto;
                margin-bottom: 1rem;
                width: auto;
            }
        }

        .control-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            min-width: 0;
        }

        .control-row {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .control-label {
            color: var(--primary);
            font-size: 0.875rem;
            white-space: nowrap;
        }

        .select, .btn-small {
            background: var(--surface);
            color: var(--text);
            border: 1px solid var(--border);
            border-radius: 0.375rem;
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .select:hover, .btn-small:hover {
            border-color: var(--primary);
        }

        .select:focus, .btn-small:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .btn-small {
            min-width: 2rem;
            text-align: center;
        }

        .panel {
            background: rgba(55, 65, 81, 0.95);
            backdrop-filter: blur(12px);
            border-radius: 1rem;
            padding: 2rem;
            border: 1px solid var(--border);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            margin: 1rem;
            max-width: 90vw;
            width: 100%;
            transition: all 0.3s ease;
        }

        [data-theme="light"] .panel {
            background: rgba(255, 255, 255, 0.95);
        }

        .welcome-panel {
            max-width: 600px;
        }

        .game-panel {
            max-width: 700px;
        }

        .title {
            font-size: 2.5rem;
            font-weight: bold;
            color: var(--accent);
            margin-bottom: 1.5rem;
            text-align: center;
            letter-spacing: 0.05em;
        }

        @media (max-width: 640px) {
            .title {
                font-size: 2rem;
            }
        }

        .subtitle {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--accent);
            margin-bottom: 1rem;
            text-align: center;
        }

        .text-lg {
            font-size: 1.125rem;
            margin-bottom: 1rem;
        }

        .btn {
            background: linear-gradient(135deg, var(--primary), var(--accent));
            color: white;
            border: none;
            border-radius: 0.5rem;
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: inherit;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--accent), #ef4444);
            font-size: 1.25rem;
            padding: 1rem 2rem;
        }

        .result {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid var(--primary);
            border-radius: 0.5rem;
            padding: 1.5rem;
            margin: 1.5rem 0;
            text-align: center;
        }

        .history {
            background: rgba(55, 65, 81, 0.5);
            border-radius: 0.5rem;
            padding: 1rem;
            margin-top: 1rem;
            max-height: 200px;
            overflow-y: auto;
        }

        [data-theme="light"] .history {
            background: rgba(255, 255, 255, 0.5);
        }

        .skill-icon {
            width: 24px;
            height: 24px;
            display: inline-block;
            vertical-align: middle;
            margin: 0 4px;
        }

        .result .skill-icon {
            width: 32px;
            height: 32px;
        }

        .controls {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin: 1.5rem 0;
            flex-wrap: wrap;
        }

        .mode-selector {
            margin-bottom: 1.5rem;
            text-align: center;
        }

        .mode-selector label {
            display: block;
            color: var(--primary);
            margin-bottom: 0.5rem;
        }

        .history-entry {
            font-size: 0.875rem;
            margin: 0.25rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .history-title {
            color: var(--accent);
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        .no-history {
            text-align: center;
            color: var(--secondary);
            font-style: italic;
        }

        .fade-enter {
            opacity: 0;
            transform: scale(0.9);
        }

        .fade-enter-active {
            opacity: 1;
            transform: scale(1);
            transition: all 0.3s ease;
        }

        .fade-exit {
            opacity: 1;
            transform: scale(1);
        }

        .fade-exit-active {
            opacity: 0;
            transform: scale(0.9);
            transition: all 0.3s ease;
        }

        hr {
            border: none;
            border-top: 1px solid var(--border);
            margin: 1rem 0;
        }

        .tutorial-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .tutorial-content {
            background: var(--surface);
            border-radius: 1rem;
            padding: 2rem;
            max-width: 500px;
            margin: 1rem;
            border: 1px solid var(--border);
        }

        .tutorial-title {
            color: var(--accent);
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
            text-align: center;
        }

        .tutorial-text {
            margin-bottom: 1rem;
            line-height: 1.6;
        }

        .tutorial-close {
            display: block;
            margin: 1rem auto 0;
        }

        @media (max-width: 640px) {
            .panel {
                padding: 1.5rem;
                margin: 0.5rem;
            }
            
            .controls {
                flex-direction: column;
                align-items: center;
            }
            
            .btn {
                width: 100%;
                max-width: 200px;
            }
        }

        /* Preload icons to prevent loading issues */
        .icon-preloader {
            position: absolute;
            left: -9999px;
            top: -9999px;
            opacity: 0;
            pointer-events: none;
        }
    </style>
</head>
<body>
    <!-- Icon preloader - hidden but ensures all icons are loaded -->
    <div class="icon-preloader" id="icon-preloader"></div>

    <div id="app">
        <!-- Top Controls -->
        <div class="top-controls">
            <div class="control-group">
                <div class="control-row">
                    <span class="control-label">🌐</span>
                    <select id="language-select" class="select">
                        <option value="en">EN</option>
                        <option value="es">ES</option>
                        <option value="fr">FR</option>
                        <option value="est">ET</option>
                        <option value="ger">DE</option>
                    </select>
                </div>
                <div class="control-row">
                    <span class="control-label">🎨</span>
                    <select id="theme-select" class="select">
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                    </select>
                </div>
                <div class="control-row">
                    <span class="control-label">A</span>
                    <div style="display: flex; gap: 0.25rem;">
                        <button id="font-decrease" class="btn-small">-</button>
                        <button id="font-increase" class="btn-small">+</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div id="main-content">
            <!-- Welcome Panel -->
            <div id="welcome-panel" class="panel welcome-panel">
                <div class="title">ROLLASKILLSCAPE</div>
                <div id="welcome-content"></div>
                <div style="text-align: center; margin-top: 1.5rem;">
                    <button id="start-game" class="btn btn-primary">Let's Roll!</button>
                </div>
            </div>

            <!-- Game Panel -->
            <div id="game-panel" class="panel game-panel" style="display: none;">
                <div class="subtitle" id="game-title">Welcome to the Skill Roller!</div>
                
                <div class="mode-selector">
                    <label for="mode-select">Select Game Mode:</label>
                    <select id="mode-select" class="select">
                        <option value="time">Time Mode</option>
                        <option value="level">Level Mode</option>
                    </select>
                </div>

                <div class="controls">
                    <button id="roll-skill" class="btn">Roll Skill & Task</button>
                    <button id="clear-history" class="btn">Clear History</button>
                </div>

                <div id="result" class="result" style="display: none;"></div>

                <div class="history">
                    <div class="history-title">Roll History</div>
                    <div id="history-content" class="no-history">No rolls yet! Click "Roll Skill & Task" to begin.</div>
                </div>

                <div style="text-align: center; margin-top: 1.5rem;">
                    <button id="back-welcome" class="btn">Back to Welcome</button>
                </div>
            </div>
        </div>

        <!-- Tutorial Modal -->
        <div id="tutorial-modal" class="tutorial-overlay" style="display: none;">
            <div class="tutorial-content">
                <div class="tutorial-title">Welcome to RollaSkillScape!</div>
                <div class="tutorial-text" id="tutorial-text"></div>
                <button id="close-tutorial" class="btn tutorial-close">Got it!</button>
            </div>
        </div>
    </div>

    <script>
        // Translations
        const translations = {
            en: {
                intro: "Welcome to RollaSkillScape! This tool randomly selects RuneScape skills and gives you training goals to keep your gameplay fresh and exciting.",
                how_to: "How to play: Click 'Let's Roll!' to get started, then use 'Roll Skill & Task' to receive a random skill and training objective.",
                why_play: "Why play? Break out of your routine, discover neglected skills, and add an element of surprise to your RuneScape journey.",
                ready: "Ready to shake up your training?",
                lets_roll: "Let's Roll!",
                welcome_game: "Welcome to the Skill Roller!",
                select_mode: "Select Game Mode:",
                roll_skill_btn: "Roll Skill & Task",
                clear_history_btn: "Clear History",
                back_welcome: "Back to Welcome",
                roll_history: "Roll History",
                no_rolls: "No rolls yet! Click \"Roll Skill & Task\" to begin.",
                reroll_desc: "You got lucky! Roll again for a new challenge.",
                tutorial_title: "Welcome to RollaSkillScape!",
                tutorial_text: "This tool helps you discover new RuneScape training goals by randomly selecting skills and tasks. Choose between Time Mode (train for specific durations) or Level Mode (gain specific levels). Click 'Roll Skill & Task' to get started and break out of your routine!"
            },
            es: {
                intro: "¡Bienvenido a RollaSkillScape! Esta herramienta selecciona aleatoriamente habilidades de RuneScape y te da objetivos de entrenamiento para mantener tu juego fresco y emocionante.",
                how_to: "Cómo jugar: Haz clic en '¡Vamos a Rodar!' para comenzar, luego usa 'Rodar Habilidad y Tarea' para recibir una habilidad aleatoria y un objetivo de entrenamiento.",
                why_play: "¿Por qué jugar? Sal de tu rutina, descubre habilidades descuidadas y añade un elemento de sorpresa a tu viaje en RuneScape.",
                ready: "¿Listo para cambiar tu entrenamiento?",
                lets_roll: "¡Vamos a Rodar!",
                welcome_game: "¡Bienvenido al Rodador de Habilidades!",
                select_mode: "Seleccionar Modo de Juego:",
                roll_skill_btn: "Rodar Habilidad y Tarea",
                clear_history_btn: "Limpiar Historial",
                back_welcome: "Volver a Bienvenida",
                roll_history: "Historial de Rodadas",
                no_rolls: "¡Aún no hay rodadas! Haz clic en \"Rodar Habilidad y Tarea\" para comenzar.",
                reroll_desc: "¡Tuviste suerte! Rueda otra vez para un nuevo desafío.",
                tutorial_title: "¡Bienvenido a RollaSkillScape!",
                tutorial_text: "Esta herramienta te ayuda a descubrir nuevos objetivos de entrenamiento de RuneScape seleccionando aleatoriamente habilidades y tareas. Elige entre Modo Tiempo (entrena por duraciones específicas) o Modo Nivel (gana niveles específicos). ¡Haz clic en 'Rodar Habilidad y Tarea' para comenzar y salir de tu rutina!"
            },
            fr: {
                intro: "Bienvenue sur RollaSkillScape ! Cet outil sélectionne aléatoirement des compétences RuneScape et vous donne des objectifs d'entraînement pour garder votre jeu frais et passionnant.",
                how_to: "Comment jouer : Cliquez sur 'C'est parti !' pour commencer, puis utilisez 'Lancer Compétence et Tâche' pour recevoir une compétence aléatoire et un objectif d'entraînement.",
                why_play: "Pourquoi jouer ? Sortez de votre routine, découvrez des compétences négligées et ajoutez un élément de surprise à votre voyage RuneScape.",
                ready: "Prêt à bouleverser votre entraînement ?",
                lets_roll: "C'est parti !",
                welcome_game: "Bienvenue dans le Lanceur de Compétences !",
                select_mode: "Sélectionner le Mode de Jeu :",
                roll_skill_btn: "Lancer Compétence et Tâche",
                clear_history_btn: "Effacer l'Historique",
                back_welcome: "Retour à l'Accueil",
                roll_history: "Historique des Lancers",
                no_rolls: "Pas encore de lancers ! Cliquez sur \"Lancer Compétence et Tâche\" pour commencer.",
                reroll_desc: "Vous avez eu de la chance ! Relancez pour un nouveau défi.",
                tutorial_title: "Bienvenue sur RollaSkillScape !",
                tutorial_text: "Cet outil vous aide à découvrir de nouveaux objectifs d'entraînement RuneScape en sélectionnant aléatoirement des compétences et des tâches. Choisissez entre le Mode Temps (s'entraîner pendant des durées spécifiques) ou le Mode Niveau (gagner des niveaux spécifiques). Cliquez sur 'Lancer Compétence et Tâche' pour commencer et sortir de votre routine !"
            },
            est: {
                intro: "Tere tulemast RollaSkillScape'i! See tööriist valib juhuslikult RuneScape oskused ja annab sulle treeningeesmärgid, et hoida su mäng värske ja põnev.",
                how_to: "Kuidas mängida: Klõpsa 'Alustame!' alustamiseks, seejärel kasuta 'Veereta Oskus ja Ülesanne' juhuslik oskus ja treeningeesmärk saamiseks.",
                why_play: "Miks mängida? Murra oma rutiinist välja, avasta unustatud oskusi ja lisa oma RuneScape teekonnale üllatuse element.",
                ready: "Valmis oma treeningut segama?",
                lets_roll: "Alustame!",
                welcome_game: "Tere tulemast Oskuste Veeretajasse!",
                select_mode: "Vali Mängurežiim:",
                roll_skill_btn: "Veereta Oskus ja Ülesanne",
                clear_history_btn: "Kustuta Ajalugu",
                back_welcome: "Tagasi Tervitusse",
                roll_history: "Veeretamise Ajalugu",
                no_rolls: "Veel pole veeretatud! Klõpsa \"Veereta Oskus ja Ülesanne\" alustamiseks.",
                reroll_desc: "Sul vedas! Veereta uuesti uue väljakutse jaoks.",
                tutorial_title: "Tere tulemast RollaSkillScape'i!",
                tutorial_text: "See tööriist aitab sul avastada uusi RuneScape treeningeesmärke, valides juhuslikult oskusi ja ülesandeid. Vali Ajarezhiimi (treeni kindlaid kestusi) või Tasemerezhiimi (saavuta kindlaid tasemeid) vahel. Klõpsa 'Veereta Oskus ja Ülesanne' alustamiseks ja rutiinist väljumiseks!"
            },
            ger: {
                intro: "Willkommen bei RollaSkillScape! Dieses Tool wählt zufällig RuneScape-Fähigkeiten aus und gibt dir Trainingsziele, um dein Spiel frisch und aufregend zu halten.",
                how_to: "Wie zu spielen: Klicke auf 'Los geht's!' um zu beginnen, dann verwende 'Fähigkeit und Aufgabe würfeln' um eine zufällige Fähigkeit und ein Trainingsziel zu erhalten.",
                why_play: "Warum spielen? Durchbrich deine Routine, entdecke vernachlässigte Fähigkeiten und füge deiner RuneScape-Reise ein Überraschungselement hinzu.",
                ready: "Bereit, dein Training aufzumischen?",
                lets_roll: "Los geht's!",
                welcome_game: "Willkommen beim Fähigkeiten-Würfler!",
                select_mode: "Spielmodus auswählen:",
                roll_skill_btn: "Fähigkeit und Aufgabe würfeln",
                clear_history_btn: "Verlauf löschen",
                back_welcome: "Zurück zur Begrüßung",
                roll_history: "Würfel-Verlauf",
                no_rolls: "Noch keine Würfe! Klicke \"Fähigkeit und Aufgabe würfeln\" um zu beginnen.",
                reroll_desc: "Du hattest Glück! Würfle nochmal für eine neue Herausforderung.",
                tutorial_title: "Willkommen bei RollaSkillScape!",
                tutorial_text: "Dieses Tool hilft dir dabei, neue RuneScape-Trainingsziele zu entdecken, indem es zufällig Fähigkeiten und Aufgaben auswählt. Wähle zwischen Zeitmodus (trainiere für bestimmte Dauern) oder Levelmodus (erreiche bestimmte Level). Klicke 'Fähigkeit und Aufgabe würfeln' um zu beginnen und aus deiner Routine auszubrechen!"
            }
        };

        // Skills data
        const skills = [
            "Attack", "Strength", "Defence", "Ranged", "Prayer", "Magic", "Runecrafting",
            "Construction", "Hitpoints", "Agility", "Herblore", "Thieving", "Crafting",
            "Fletching", "Slayer", "Hunter", "Mining", "Smithing", "Fishing", "Cooking",
            "Firemaking", "Woodcutting", "Farming", "Summoning", "Dungeoneering", "Divination",
            "Invention", "Archaeology", "Necromancy"
        ];

        const skillIcons = {
            "Attack": "https://runescape.wiki/images/a/a4/Attack_icon.png",
            "Strength": "https://runescape.wiki/images/1/1b/Strength_icon.png",
            "Defence": "https://runescape.wiki/images/5/5c/Defence_icon.png",
            "Ranged": "https://runescape.wiki/images/1/19/Ranged_icon.png",
            "Prayer": "https://runescape.wiki/images/f/f2/Prayer_icon.png",
            "Magic": "https://runescape.wiki/images/5/5c/Magic_icon.png",
            "Runecrafting": "https://runescape.wiki/images/f/f5/Runecrafting_icon.png",
            "Construction": "https://runescape.wiki/images/f/f6/Construction_icon.png",
            "Hitpoints": "https://runescape.wiki/images/9/96/Hitpoints_icon.png",
            "Agility": "https://runescape.wiki/images/7/75/Agility_icon.png",
            "Herblore": "https://runescape.wiki/images/3/34/Herblore_icon.png",
            "Thieving": "https://runescape.wiki/images/4/4a/Thieving_icon.png",
            "Crafting": "https://runescape.wiki/images/c/cf/Crafting_icon.png",
            "Fletching": "https://runescape.wiki/images/f/fd/Fletching_icon.png",
            "Slayer": "https://runescape.wiki/images/7/76/Slayer_icon.png",
            "Hunter": "https://runescape.wiki/images/d/dd/Hunter_icon.png",
            "Mining": "https://runescape.wiki/images/4/4a/Mining_icon.png",
            "Smithing": "https://runescape.wiki/images/d/dd/Smithing_icon.png",
            "Fishing": "https://runescape.wiki/images/1/11/Fishing_icon.png",
            "Cooking": "https://runescape.wiki/images/f/f5/Cooking_icon.png",
            "Firemaking": "https://runescape.wiki/images/f/f0/Firemaking_icon.png",
            "Woodcutting": "https://runescape.wiki/images/f/f4/Woodcutting_icon.png",
            "Farming": "https://runescape.wiki/images/f/fc/Farming_icon.png",
            "Summoning": "https://runescape.wiki/images/1/1f/Summoning_icon.png",
            "Dungeoneering": "https://runescape.wiki/images/f/f2/Dungeoneering_icon.png",
            "Divination": "https://runescape.wiki/images/4/4d/Divination_icon.png",
            "Invention": "https://runescape.wiki/images/f/fe/Invention_icon.png",
            "Archaeology": "https://runescape.wiki/images/c/cc/Archaeology_icon.png",
            "Necromancy": "https://runescape.wiki/images/8/8f/Necromancy_icon.png"
        };

        const rerollIcon = "https://storage.ko-fi.com/cdn/useruploads/db063a23-d9a5-498a-aaad-43f4fc4408d4_reroll.png";

        // App state
        let currentLanguage = 'en';
        let currentTheme = 'dark';
        let currentFontSize = 1;
        let gameMode = 'time';
        let history = [];
        let isRolling = false;
        let iconsPreloaded = false;

        // Local storage helpers
        function getFromStorage(key, defaultValue) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch {
                return defaultValue;
            }
        }

        function setToStorage(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch {
                // Storage failed, continue without persistence
            }
        }

        // Preload all skill icons
        function preloadIcons() {
            if (iconsPreloaded) return;
            
            const preloader = document.getElementById('icon-preloader');
            
            // Preload skill icons
            Object.entries(skillIcons).forEach(([skill, url]) => {
                const img = new Image();
                img.src = url;
                img.alt = skill;
                img.onload = () => {
                    // Icon loaded successfully
                };
                img.onerror = () => {
                    console.warn(`Failed to load icon for ${skill}: ${url}`);
                };
                preloader.appendChild(img);
            });
            
            // Preload reroll icon
            const rerollImg = new Image();
            rerollImg.src = rerollIcon;
            rerollImg.alt = "Re-RollaSkill";
            preloader.appendChild(rerollImg);
            
            iconsPreloaded = true;
        }

        // Initialize app state from localStorage
        function initializeState() {
            currentLanguage = getFromStorage('rollaLang', 'en');
            currentTheme = getFromStorage('rollaTheme', 'dark');
            currentFontSize = getFromStorage('rollaFontSize', 1);
            history = getFromStorage('rollaHistory', []);

            // Apply theme
            document.documentElement.setAttribute('data-theme', currentTheme);
            document.body.style.fontSize = `${currentFontSize}rem`;

            // Update controls
            document.getElementById('language-select').value = currentLanguage;
            document.getElementById('theme-select').value = currentTheme;
        }

        // Game logic
        function rollTime() {
            const t = Math.floor(Math.random() * 6) + 1;
            switch (t) {
                case 1: return "Skill for 30 minutes";
                case 2: return "Skill for 1 hour";
                case 3: return "Skill for 1 hour 30 mins";
                case 4: return "Skill for 2 hours";
                case 5: return "Skill until next level";
                case 6: return "Re-roll (6)";
                default: return "Skill for ??";
            }
        }

        function rollLevel() {
            const l = Math.floor(Math.random() * 6) + 1;
            if (l === 6) return "Re-roll (6)";
            return `Gain ${l} level${l > 1 ? "s" : ""} before next roll`;
        }

        function getRandomSkill() {
            return skills[Math.floor(Math.random() * skills.length)];
        }

        function addToHistory(skill, task, mode) {
            const newEntry = {
                time: new Date().toLocaleTimeString(),
                skill: skill,
                task: task,
                mode: mode
            };
            history = [newEntry, ...history.slice(0, 9)];
            setToStorage('rollaHistory', history);
            updateHistoryDisplay();
        }

        function clearHistory() {
            history = [];
            setToStorage('rollaHistory', history);
            updateHistoryDisplay();
        }

        function updateHistoryDisplay() {
            const historyContent = document.getElementById('history-content');
            const dict = translations[currentLanguage] || translations.en;

            if (history.length === 0) {
                historyContent.innerHTML = `<div class="no-history">${dict.no_rolls}</div>`;
                return;
            }

            const historyHtml = history.map(entry => {
                if (entry.skill === "Re-RollaSkill") {
                    return `<div class="history-entry">
                        [${entry.time}] <img src="${rerollIcon}" alt="Re-RollaSkill" class="skill-icon" style="width: 20px; height: 20px;" /> Re-RollaSkill
                    </div>`;
                } else {
                    return `<div class="history-entry">
                        [${entry.time}] <img src="${skillIcons[entry.skill] || ''}" class="skill-icon" alt="${entry.skill}" onError="this.style.display='none'" /> ${entry.skill} → ${entry.task} (${entry.mode === "time" ? "T" : "L"})
                    </div>`;
                }
            }).join('');

            historyContent.innerHTML = historyHtml;
        }

        function animateSkillRoll() {
            isRolling = true;
            document.getElementById('roll-skill').disabled = true;
            
            let ticks = 0;
            const totalTicks = 18;
            const resultDiv = document.getElementById('result');
            resultDiv.style.display = 'block';

            const interval = setInterval(() => {
                const skill = getRandomSkill();
                const iconUrl = skillIcons[skill];
                
                resultDiv.innerHTML = `
                    <img src="${iconUrl}" class="skill-icon" alt="${skill}" onError="this.style.display='none'"> ${skill}
                `;
                
                ticks++;
                if (ticks > totalTicks) {
                    clearInterval(interval);
                    finalizeRoll();
                }
            }, 75);
        }

        function finalizeRoll() {
            const skill = getRandomSkill();
            let task = gameMode === 'time' ? rollTime() : rollLevel();
            const resultDiv = document.getElementById('result');
            
            if (task === "Re-roll (6)") {
                const rerollHtml = `
                    <img src="${rerollIcon}" alt="Re-RollaSkill" style="width:54px;height:54px;" onError="this.style.display='none'">
                    <br>Re-RollaSkill
                    <br>${translations[currentLanguage].reroll_desc}
                `;
                resultDiv.innerHTML = rerollHtml;
                addToHistory("Re-RollaSkill", "", gameMode);
            } else {
                const iconUrl = skillIcons[skill];
                const result = `
                    <p>Skill ➜ <img src="${iconUrl}" class="skill-icon" alt="${skill}" onError="this.style.display='none'"> ${skill}</p>
                    <p>${gameMode === "time" ? "Time" : "Levels"} ➜ ${task}</p>
                    <hr>
                    <p>💡 <em>Train ${skill} → ${task}</em></p>
                `;
                resultDiv.innerHTML = result;
                addToHistory(skill, task, gameMode);
            }
            
            isRolling = false;
            document.getElementById('roll-skill').disabled = false;
        }

        function updateContent() {
            const dict = translations[currentLanguage] || translations.en;
            
            // Update welcome content
            document.getElementById('welcome-content').innerHTML = `
                <p class="text-lg">${dict.intro}</p>
                <div style="margin-bottom: 1.5rem;">
                    <div>${dict.how_to}</div>
                    <div>${dict.why_play}</div>
                    <div>${dict.ready}</div>
                </div>
            `;
            
            // Update button texts
            document.getElementById('start-game').textContent = dict.lets_roll;
            document.getElementById('game-title').textContent = dict.welcome_game;
            document.querySelector('label[for="mode-select"]').textContent = dict.select_mode;
            document.getElementById('roll-skill').textContent = dict.roll_skill_btn;
            document.getElementById('clear-history').textContent = dict.clear_history_btn;
            document.getElementById('back-welcome').textContent = dict.back_welcome;
            document.querySelector('.history-title').textContent = dict.roll_history;
            
            // Update tutorial
            document.querySelector('.tutorial-title').textContent = dict.tutorial_title;
            document.getElementById('tutorial-text').textContent = dict.tutorial_text;
            document.getElementById('close-tutorial').textContent = "Got it!";
            
            updateHistoryDisplay();
        }

        function showPanel(panelId) {
            document.getElementById('welcome-panel').style.display = 'none';
            document.getElementById('game-panel').style.display = 'none';
            document.getElementById(panelId).style.display = 'block';
        }

        // Event listeners
        function setupEventListeners() {
            // Language change
            document.getElementById('language-select').addEventListener('change', (e) => {
                currentLanguage = e.target.value;
                setToStorage('rollaLang', currentLanguage);
                updateContent();
            });

            // Theme change
            document.getElementById('theme-select').addEventListener('change', (e) => {
                currentTheme = e.target.value;
                setToStorage('rollaTheme', currentTheme);
                document.documentElement.setAttribute('data-theme', currentTheme);
            });

            // Font size controls
            document.getElementById('font-decrease').addEventListener('click', () => {
                currentFontSize = Math.max(0.8, currentFontSize - 0.07);
                setToStorage('rollaFontSize', currentFontSize);
                document.body.style.fontSize = `${currentFontSize}rem`;
            });

            document.getElementById('font-increase').addEventListener('click', () => {
                currentFontSize = Math.min(1.23, currentFontSize + 0.07);
                setToStorage('rollaFontSize', currentFontSize);
                document.body.style.fontSize = `${currentFontSize}rem`;
            });

            // Game controls
            document.getElementById('start-game').addEventListener('click', () => {
                showPanel('game-panel');
            });

            document.getElementById('back-welcome').addEventListener('click', () => {
                showPanel('welcome-panel');
            });

            document.getElementById('mode-select').addEventListener('change', (e) => {
                gameMode = e.target.value;
            });

            document.getElementById('roll-skill').addEventListener('click', () => {
                if (!isRolling) {
                    animateSkillRoll();
                }
            });

            document.getElementById('clear-history').addEventListener('click', () => {
                clearHistory();
            });

            // Tutorial modal
            document.getElementById('close-tutorial').addEventListener('click', () => {
                document.getElementById('tutorial-modal').style.display = 'none';
                localStorage.setItem('rollaTutorial', '1');
            });

            // Keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && document.getElementById('welcome-panel').style.display !== 'none') {
                    document.getElementById('start-game').click();
                }
                if (e.key === ' ' && document.getElementById('game-panel').style.display !== 'none') {
                    e.preventDefault();
                    document.getElementById('roll-skill').click();
                }
                if (e.key === 'Escape' && document.getElementById('game-panel').style.display !== 'none') {
                    document.getElementById('back-welcome').click();
                }
            });
        }

        // Initialize app
        function init() {
            initializeState();
            preloadIcons(); // Preload all icons on app start
            setupEventListeners();
            updateContent();
            updateHistoryDisplay();

            // Show tutorial if first visit
            const tutorialShown = localStorage.getItem('rollaTutorial');
            if (!tutorialShown) {
                document.getElementById('tutorial-modal').style.display = 'flex';
            }
        }

        // Start the app when DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    </script>
</body>
</html>
