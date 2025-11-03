import React from "react";
import GamePanel2 from "./components/GamePanel2"; // your second game logic
import OSRSSkills from "./components/OSRSSkills"; // your skill names + icons
import { Link } from "react-router-dom";

export default function OSRSSkillsGame() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mt-6">Rollaskillscape: OSRS Skills</h1>

      {/* The game panel using your OSRS skills data */}
      <GamePanel2 skillData={OSRSSkills} />

      {/* Navigation back to main game */}
      <div className="mt-10">
        <Link
          to="/"
          className="px-6 py-3 bg-yellow-600 rounded-xl hover:bg-yellow-700 transition"
        >
          Back to Main Game
        </Link>
      </div>
    </div>
  );
}
