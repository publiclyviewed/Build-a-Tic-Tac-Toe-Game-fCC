import React, { useEffect, useState, useCallback } from "react";
import Cell from "./Cell";
import PopupModal from "./PopupModal";
import { checkWinner } from "../utils/GameLogic";
import { computerMove } from "../utils/AI";
import translations from "../translations";
import './Board.css';

const Board = ({ playerSymbol, resetGame, updateScores, gameMode, goBackToMenu, language }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);

  const t = translations[language] || translations.en;
  const opponentSymbol = playerSymbol === "X" ? "O" : "X";

  const endGame = useCallback((winner) => {
    setGameOver(true);

    if (winner === playerSymbol) {
      setPopupMessage(t.win);
    } else if (winner === opponentSymbol) {
      setPopupMessage(t.lose);
    } else {
      setPopupMessage(t.draw);
    }

    updateScores(winner);
  }, [playerSymbol, opponentSymbol, t, updateScores]);

  const handleClick = (index) => {
    if (board[index] || gameOver) return;
    if (gameMode === "pvc" && currentPlayer !== playerSymbol) return;

    const updated = [...board];
    updated[index] = currentPlayer;
    setBoard(updated);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  useEffect(() => {
    if (gameOver) return;

    const winner = checkWinner(board);
    if (winner) {
      endGame(winner);
      return;
    }

    if (!board.includes(null)) {
      endGame(null);
      return;
    }

    if (gameMode === "pvc" && currentPlayer !== playerSymbol) {
      const move = computerMove(board, opponentSymbol, playerSymbol);
      if (move != null) {
        setTimeout(() => {
          setBoard(prev => {
            const newBoard = [...prev];
            newBoard[move] = opponentSymbol;
            return newBoard;
          });
          setCurrentPlayer(playerSymbol);
        }, 500);
      }
    }
  }, [board, currentPlayer, gameOver, playerSymbol, opponentSymbol, gameMode, endGame]);

  return (
    <div className="board-container">
      <button className="back-to-menu" onClick={goBackToMenu}>{t.backToMenu}</button>
      <div className="board">
        {board.map((value, index) => (
          <Cell key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>

      {popupMessage && (
        <PopupModal
          message={popupMessage}
          onClose={() => {
            setPopupMessage(null);
            resetGame();
          }}
          language={language}
        />
      )}
    </div>
  );
};

export default Board;
