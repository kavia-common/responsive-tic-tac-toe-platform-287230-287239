import React from 'react';

// PUBLIC_INTERFACE
export default function MoveHistory({ history, jumpTo, currentStep }) {
  /** Renders list of moves to allow jumping to a previous move. */
  return (
    <div className="history-card">
      <strong>Move History</strong>
      <ul className="history-list">
        {history.map((entry, move) => {
          let description;
          if (!entry.move) {
            description = 'Go to game start';
          } else {
            const { index, player } = entry.move;
            const row = Math.floor(index / 3) + 1;
            const col = (index % 3) + 1;
            description = `Go to move #${move} (${player} @ r${row}c${col})`;
          }
          const isCurrent = move === currentStep;
          return (
            <li key={move} className="history-item">
              <span style={{ color: isCurrent ? 'var(--primary)' : 'var(--muted)', fontWeight: isCurrent ? 700 : 500 }}>
                {isCurrent ? '• ' : ''} {entry.move ? `${entry.move.player}` : 'Start'}
              </span>
              <button
                className="btn"
                aria-current={isCurrent ? 'step' : undefined}
                onClick={() => jumpTo(move)}
                disabled={isCurrent}
                style={isCurrent ? { opacity: 0.6, cursor: 'default' } : {}}
              >
                {description}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
