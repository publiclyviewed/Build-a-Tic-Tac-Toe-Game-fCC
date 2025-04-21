import React from "react";
import translations from "../translations";
import "./Scoreboard.css";

const Scoreboard = ({ scores, language }) => {
  const t = translations[language] || translations.en;

  return (
    <div className="scoreboard">
      <span>{t.playAsX}: {scores.X}</span>
      <span>{t.playAsO}: {scores.O}</span>
      <span>{t.draw}: {scores.draws}</span>
    </div>
  );
};

export default Scoreboard;
