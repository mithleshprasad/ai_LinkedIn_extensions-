import React, { useState } from 'react';
import Board from './Board';
import { Button, Form } from 'react-bootstrap';

const Game = () => {
  const createBoard = (size) => {
    return Array.from({ length: size }, () => Array(size).fill(null));
  };

  const [n, setN] = useState(3); // Grid size (n x n)
  const [m, setM] = useState(3); // Win streak (m)
  const [board, setBoard] = useState(createBoard(3)); // Initialize with createBoard
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);
  const [isDraw, setIsDraw] = useState(false); // State to track if the game is a draw

  const handleGridChange = (e) => {
    const newSize = Math.max(3, Math.min(10, parseInt(e.target.value)));
    setN(newSize);
    setBoard(createBoard(newSize)); // Create new board based on the new grid size
    resetGame();
  };

  const handleWinStreakChange = (e) => {
    setM(Math.max(3, Math.min(n, parseInt(e.target.value))));
  };

  const handleClick = (row, col) => {
    if (board[row][col] || winner) return;

    const newBoard = board.map((rowArr, i) =>
      rowArr.map((cell, j) => (i === row && j === col ? (xIsNext ? 'X' : 'O') : cell))
    );
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const winningCells = checkWinner(newBoard);
    if (winningCells) {
      setWinner(xIsNext ? 'X' : 'O');
      setWinningCells(winningCells);
      updateLeaderboard(xIsNext ? 'X' : 'O');
    } else if (checkDraw(newBoard)) {
      setIsDraw(true); // Set draw state if the game is a draw
    }
  };

  const checkWinner = (newBoard) => {
    // Horizontal, vertical, and diagonal checks
    const directions = [
      [0, 1], // Horizontal
      [1, 0], // Vertical
      [1, 1], // Diagonal from top-left to bottom-right
      [1, -1], // Diagonal from top-right to bottom-left
    ];

    const checkLine = (startRow, startCol, dirRow, dirCol) => {
      const currentPlayer = newBoard[startRow][startCol];
      if (!currentPlayer) return null;

      let cells = [[startRow, startCol]];
      for (let i = 1; i < m; i++) {
        const newRow = startRow + dirRow * i;
        const newCol = startCol + dirCol * i;
        if (
          newRow >= 0 &&
          newRow < n &&
          newCol >= 0 &&
          newCol < n &&
          newBoard[newRow][newCol] === currentPlayer
        ) {
          cells.push([newRow, newCol]);
        } else {
          break;
        }
      }

      return cells.length === m ? cells : null;
    };

    // Iterate through each cell on the board
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        for (const [dirRow, dirCol] of directions) {
          const winningCells = checkLine(row, col, dirRow, dirCol);
          if (winningCells) return winningCells;
        }
      }
    }
    return null;
  };

  const checkDraw = (newBoard) => {
    return newBoard.every(row => row.every(cell => cell !== null)) && !winner;
  };

  const resetGame = () => {
    setBoard(createBoard(n)); // Reset the board to the current grid size
    setXIsNext(true);
    setWinner(null);
    setWinningCells([]);
    setIsDraw(false); // Reset the draw state
  };

  const updateLeaderboard = (winner) => {
    const savedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const playerIndex = savedLeaderboard.findIndex((entry) => entry.player === winner);

    if (playerIndex > -1) {
      savedLeaderboard[playerIndex].wins += 1;
    } else {
      savedLeaderboard.push({ player: winner, wins: 1 });
    }

    localStorage.setItem('leaderboard', JSON.stringify(savedLeaderboard));
  };

  return (
    <div className='d-flex justify-content-center'>
      <div className="mt-4 col-md-3">
        <Form>
          <Form.Group controlId="gridSize">
            <Form.Label>Grid Size (n)</Form.Label>
            <Form.Control
              type="number"
              value={n}
              onChange={handleGridChange}
              min="3"
              max="10"
            />
          </Form.Group>

          <Form.Group controlId="winStreak">
            <Form.Label>Win Streak (m)</Form.Label>
            <Form.Control
              type="number"
              value={m}
              onChange={handleWinStreakChange}
              min="3"
              max={n}
            />
          </Form.Group>
        </Form>

        <Button variant="primary" className="mt-3 mb-3" onClick={resetGame}>
          Create & Reset 
        </Button>
        <div className='justify-content-center'>
          <Board board={board} onClick={handleClick} winningCells={winningCells} />
        </div>
        {winner && (
          <div className='bg-success text-light p-2 mt-3 rounded'>
            <h2 className="mt-4 text-center">Player {winner} Wins!</h2>
          </div>
        )}
        {isDraw && (
          <div className='bg-warning text-dark p-2 mt-3 rounded'>
            <h2 className="mt-4 text-center">It's a Draw!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
