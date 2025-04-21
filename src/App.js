import React, { useState } from "react";
import SymbolSelection from "./components/SymbolSelection";
import Board from "./components/Board";
import Scoreboard from "./components/Scoreboard";
import GameModeSelector from "./components/GameModeSelector";
import "./App.css";
import translations from "./translations";

function App() {
  const [language, setLanguage] = useState("en"); // "en" or "ja"
  const [playerSymbol, setPlayerSymbol] = useState("X");
  const [gameKey, setGameKey] = useState(0);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [gameMode, setGameMode] = useState(null);
  const [theme, setTheme] = useState("light");
  const [showGame, setShowGame] = useState(false);

  const toggleTheme = () =>
    setTheme(prev => (prev === "light" ? "dark" : "light"));

  const resetGame = () => setGameKey(prev => prev + 1);

  const updateScores = (winner) => {
    if (winner === "X" || winner === "O") {
      setScores(prev => ({ ...prev, [winner]: prev[winner] + 1 }));
    } else {
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

  const goBackToMenu = () => {
    setGameMode(null);
    setPlayerSymbol(null);
    setShowGame(false);
  };

  // Translate based on the current language
  const t = translations[language] || translations.en;

  if (!gameMode) {
    return (
      <GameModeSelector
        onSelectMode={setGameMode}
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  return (
    <div className={`app ${theme}`}>
      <header className="app-header translucent-box">
        <h1 className="title">{t.gameTitle}</h1>
        <button
          className="language-toggle"
          onClick={() => setLanguage(prev => (prev === "en" ? "ja" : "en"))}
        >
          {language === "en" ? "日本語" : "English"}
        </button>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? t.lightMode : t.darkMode}
        </button>
      </header>

      {!showGame && (
        <div className="translucent-box">
          <SymbolSelection
            onSelect={(symbol) => {
              setPlayerSymbol(symbol);
              setShowGame(true);
            }}
            onBack={goBackToMenu}
            language={language}  // Pass the language prop here
          />
        </div>
      )}

      {showGame && (
        <>
          <div className="translucent-box">
            <Scoreboard scores={scores} language={language} /> {/* Pass language */}
          </div>

          <div className="translucent-box">
            <Board
              key={gameKey}
              playerSymbol={playerSymbol}
              resetGame={resetGame}
              updateScores={updateScores}
              gameMode={gameMode}
              goBackToMenu={goBackToMenu}
              language={language}  
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
