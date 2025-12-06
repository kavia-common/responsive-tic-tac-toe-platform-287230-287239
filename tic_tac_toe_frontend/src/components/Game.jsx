import React, { useEffect, useMemo, useRef, useState } from 'react';
import Board from './Board';
import StatusBar from './StatusBar';
import Controls from './Controls';
import MoveHistory from './MoveHistory';
import { calculateWinner, getBestAIMove, isBoardFull } from '../utils/game';

// PUBLIC_INTERFACE
export default function Game() {
  /**
   * The main game controller component.
   * Manages state: board, turn, mode, history; performs winner/draw checks; invokes AI when needed.
   */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState('pvp'); // 'pvp' or 'cpu'
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), move: null }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [aiDelayMs] = useState(450);

  const winnerInfo = useMemo(() => calculateWinner(squares), [squares]);
  const winner = winnerInfo?.winner ?? null;
  const winningLine = winnerInfo?.line ?? [];
  const nextPlayer = xIsNext ? 'X' : 'O';
  const draw = !winner && isBoardFull(squares);

  const aiShouldPlay = mode === 'cpu' && !winner && !draw && nextPlayer === 'O';
  const statusLiveRef = useRef(null);

  // AI move after user's turn
  useEffect(() => {
    if (!aiShouldPlay) return;
    const id = setTimeout(() => {
      const move = getBestAIMove(squares, 'O', 'X');
      if (move != null) {
        handlePlay(move);
      }
    }, aiDelayMs);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiShouldPlay, squares]);

  // Announce status changes for screen readers
  useEffect(() => {
    const el = statusLiveRef.current;
    if (!el) return;
    if (winner) {
      el.textContent = `Game over. ${winner} wins.`;
    } else if (draw) {
      el.textContent = 'Game over. Draw.';
    } else {
      el.textContent = `Turn: ${nextPlayer}`;
    }
  }, [winner, draw, nextPlayer]);

  const handlePlay = (index) => {
    if (winner || squares[index]) return;
    if (mode === 'cpu' && nextPlayer === 'O') return; // prevent user from acting on AI's turn

    const newSquares = squares.slice();
    newSquares[index] = nextPlayer;

    const newHistory = history.slice(0, stepNumber + 1).concat([{ squares: newSquares, move: { index, player: nextPlayer } }]);
    setSquares(newSquares);
    setHistory(newHistory);
    setStepNumber(newHistory.length - 1);
    setXIsNext(!xIsNext);
  };

  // PUBLIC_INTERFACE
  const restart = () => {
    /** Reset the game state to initial. */
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setHistory([{ squares: Array(9).fill(null), move: null }]);
    setStepNumber(0);
  };

  // PUBLIC_INTERFACE
  const switchMode = (newMode) => {
    /**
     * Switch game mode between 'pvp' and 'cpu' without reloading the page.
     * Resets the game for clarity.
     */
    setMode(newMode);
    restart();
  };

  const jumpTo = (moveIndex) => {
    const snapshot = history[moveIndex];
    if (!snapshot) return;
    setSquares(snapshot.squares);
    setStepNumber(moveIndex);
    setXIsNext(moveIndex % 2 === 0);
  };

  return (
    <div className="card">
      <div className="header" role="banner">
        <div className="header-title">
          <span className="brand-pill" aria-hidden>Ocean</span>
          <h1 className="title" aria-label="Tic Tac Toe">Tic Tac Toe</h1>
        </div>
        <div className="controls">
          <div className="mode-switch" role="group" aria-label="Game mode selector">
            <button
              className={`mode-option ${mode === 'pvp' ? 'active' : ''}`}
              onClick={() => switchMode('pvp')}
              aria-pressed={mode === 'pvp'}
            >
              PvP
            </button>
            <button
              className={`mode-option ${mode === 'cpu' ? 'active' : ''}`}
              onClick={() => switchMode('cpu')}
              aria-pressed={mode === 'cpu'}
            >
              Vs CPU
            </button>
          </div>
          <button className="btn btn-primary btn-icon" onClick={restart} aria-label="Restart game">
            🔄 Restart
          </button>
        </div>
      </div>

      <div className="content">
        <div className="game-layout">
          <Board
            squares={squares}
            winningLine={winningLine}
            onPlay={handlePlay}
            disabled={Boolean(winner) || draw || (mode === 'cpu' && nextPlayer === 'O')}
          />
          <div className="sidebar">
            <StatusBar nextPlayer={nextPlayer} winner={winner} draw={draw} mode={mode} />
            <div aria-live="polite" aria-atomic="true" style={{ position: 'absolute', height: 0, width: 0, overflow: 'hidden' }} ref={statusLiveRef} />
            <MoveHistory history={history} jumpTo={jumpTo} currentStep={stepNumber} />
            <div className="footer-controls">
              <button className="btn" onClick={() => switchMode(mode === 'pvp' ? 'cpu' : 'pvp')}>
                Switch to {mode === 'pvp' ? 'CPU' : 'PvP'}
              </button>
              <button className="btn btn-ghost" onClick={restart}>New Game</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
