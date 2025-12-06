import React from 'react';

export default function Square({ id, index, value, isWinning, disabled, onClick, onKeyNav }) {
  const markClass = value === 'X' ? 'x-mark' : value === 'O' ? 'o-mark' : '';
  const classes = ['square'];
  if (isWinning) classes.push('win');
  if (disabled && !value) classes.push('disabled');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disabled) {
        onClick();
      }
    } else if (onKeyNav) {
      onKeyNav(e);
    }
  };

  return (
    <div
      id={id}
      role="gridcell"
      aria-label={`Cell ${index + 1} ${value ? `with ${value}` : 'empty'}`}
      aria-selected={Boolean(isWinning)}
      tabIndex={0}
      className={classes.join(' ')}
      onClick={() => !disabled && onClick()}
      onKeyDown={handleKeyDown}
    >
      <span className={markClass} aria-hidden="true">
        {value ?? ''}
      </span>
    </div>
  );
}
