# responsive-tic-tac-toe-platform-287230-287239

## Tic Tac Toe Frontend (Ocean Professional)

- Start: from tic_tac_toe_frontend, run `npm start` and open http://localhost:3000
- Modes:
  - PvP: two players alternate turns on the same device.
  - Vs CPU: you play as X; the computer plays O automatically after a short delay.
- Controls:
  - Mode switcher in the header toggles between PvP and CPU without reloading; switching resets the game.
  - Restart button resets the board.
  - Move History allows jumping to any previous move.
- Accessibility:
  - Cells are focusable; use Enter or Space to place a mark.
  - Arrow keys navigate between adjacent cells.
  - Status updates are announced via a live region.

Environment notes:
- No backend required. Optional env like REACT_APP_NODE_ENV can be used for logging if extended.