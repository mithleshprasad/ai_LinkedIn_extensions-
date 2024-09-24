import React from 'react';
import './Board.css';  // Include styles for proper grid layout

const Board = ({ board, onClick, winningCells }) => {
  return (
    <div className="board-grid">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${winningCells.some(([r, c]) => r === rowIndex && c === colIndex) ? 'winning' : ''}`}
              onClick={() => onClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
