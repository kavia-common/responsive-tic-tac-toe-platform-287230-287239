import React from 'react';

export default function StatusBar({ nextPlayer, winner, draw, mode }) {
  let label = '';
  let badgeClass = 'badge';
  if (winner) {
    label = `${winner} wins`;
    badgeClass += ' win';
  } else if (draw) {
    label = 'Draw';
    badgeClass += ' draw';
  } else {
    label = `Turn: ${nextPlayer}`;
    badgeClass += ' turn';
  }

  return (
    <div className="status-card" role="status" aria-live="polite">
      <div className="status-row">
        <div className={badgeClass}>
          {winner ? '🏆' : draw ? '🤝' : '🎮'} {label}
        </div>
        <div className="badge" style={{ background: 'rgba(17,24,39,0.06)', color: '#111827' }} aria-label="Mode">
          {mode === 'cpu' ? '🖥️ Vs CPU' : '👥 PvP'}
        </div>
      </div>
    </div>
  );
}
