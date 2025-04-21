import React from "react";
import translations from "../translations";
import './SymbolSelection.css';

const SymbolSelection = ({ onSelect, onBack, language }) => {
  const t = translations[language] || translations.en;

  return (
    <div className="symbol-selection">
      <h3>{t.selectSymbol}</h3>
      <div className="button-container">
        <button onClick={() => onSelect("X")}>{t.playAsX}</button>
        <button onClick={() => onSelect("O")}>{t.playAsO}</button>
      </div>
      <button className="back-to-menu" onClick={onBack}>{t.backToMenu}</button>
    </div>
  );
};

export default SymbolSelection;
