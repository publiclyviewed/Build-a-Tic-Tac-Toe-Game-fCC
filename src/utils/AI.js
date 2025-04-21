export const computerMove = (board, computerSymbol, playerSymbol) => {
    const winCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
  
    const emptyIndices = board
      .map((val, idx) => (val === null ? idx : null))
      .filter(i => i !== null);
  
    const tryToWinOrBlock = (symbol) => {
      for (let combo of winCombos) {
        const [a, b, c] = combo;
        const values = [board[a], board[b], board[c]];
        const countSymbol = values.filter(v => v === symbol).length;
        const countEmpty = values.filter(v => v === null).length;
        if (countSymbol === 2 && countEmpty === 1) {
          const emptyIndex = combo.find(i => board[i] === null);
          return emptyIndex;
        }
      }
      return null;
    };
  
    // 1. Win if possible
    const winMove = tryToWinOrBlock(computerSymbol);
    if (winMove !== null) return winMove;
  
    // 2. Block player
    const blockMove = tryToWinOrBlock(playerSymbol);
    if (blockMove !== null) return blockMove;
  
    // 3. Take center
    if (board[4] === null) return 4;
  
    // 4. Take a corner
    const corners = [0, 2, 6, 8].filter(i => board[i] === null);
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];
  
    // 5. Pick random
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  };
  