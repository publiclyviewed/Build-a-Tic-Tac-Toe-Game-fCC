import React from "react";
import "./GameModeSelector.css";
import translations from "../translations";

const GameModeSelector = ({ onSelectMode, language, setLanguage }) => {
  const t = translations[language] || translations.en;

  return (
    <div className="game-mode-selector">
      <h2>{t.gameTitle}</h2>

      <button
        className="language-toggle"
        onClick={() => setLanguage(prev => (prev === "en" ? "ja" : "en"))}
      >
        {language === "en" ? "日本語" : "English"}
      </button>

      <h3>{t.selectMode}</h3>

      <button onClick={() => onSelectMode("pvc")}>
        {t.playerVsComputer}
      </button>

      <button onClick={() => onSelectMode("pvp")}>
        {t.playerVsPlayer}
      </button>
    </div>
  );
};

export default GameModeSelector;
