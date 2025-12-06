import React from 'react';
import './App.css';
import Game from './components/Game';

// PUBLIC_INTERFACE
function App() {
  /** Root shell for the Tic Tac Toe app. Applies Ocean Professional theme and renders Game. */
  return (
    <div className="app-root ocean-bg">
      <div className="app-container">
        <Game />
      </div>
    </div>
  );
}

export default App;
