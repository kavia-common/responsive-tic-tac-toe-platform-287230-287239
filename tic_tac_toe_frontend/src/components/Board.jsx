import React, { useCallback } from 'react';
import Square from './Square';

/**
 * Board renders the 3x3 grid. Keeps it purely presentational and accessible.
 */
export default function Board({ squares, winningLine = [], onPlay, disabled }) {
  const handleKeyNav = useCallback((e, index) => {
    // Optional arrow key navigation between squares
    const key = e.key;
    const row = Math.floor(index / 3);
    const col = index % 3;
    let targetIndex = null;

    if (key === 'ArrowRight' && col < 2) targetIndex = index + 1;
    if (key === 'ArrowLeft' && col > 0) targetIndex = index - 1;
    if (key === 'ArrowDown' && row < 2) targetIndex = index + 3;
    if (key === 'ArrowUp' && row > 0) targetIndex = index - 3;

    if (targetIndex != null) {
      const el = document.getElementById(`square-${targetIndex}`);
      if (el) el.focus();
      e.preventDefault();
    }
  }, []);

  return (
    <section className="board" aria-label="Tic Tac Toe board">
      <div className="board-grid" role="grid" aria-rowcount={3} aria-colcount={3}>
        {squares.map((value, idx) => {
          const isWin = winningLine.includes(idx);
          return (
            <Square
              key={idx}
              id={`square-${idx}`}
              index={idx}
              value={value}
              isWinning={isWin}
              disabled={disabled || Boolean(value)}
              onClick={() => onPlay(idx)}
              onKeyNav={(e) => handleKeyNav(e, idx)}
            />
          );
        })}
      </div>
    </section>
  );
}
