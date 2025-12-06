const LINES = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6],         // diagonals
];

// PUBLIC_INTERFACE
export function calculateWinner(squares) {
  /**
   * Returns { winner: 'X'|'O', line: [i,j,k] } if there is a winner, otherwise null.
   */
  for (const line of LINES) {
    const [a,b,c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return null;
}

// PUBLIC_INTERFACE
export function isBoardFull(squares) {
  /** Returns true if the board has no empty cells. */
  return squares.every((v) => v != null);
}

function emptyIndices(squares) {
  const out = [];
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) out.push(i);
  }
  return out;
}

// Try immediate win or block
function findImmediate(squares, aiMark, humanMark) {
  // Win
  for (const i of emptyIndices(squares)) {
    const copy = squares.slice();
    copy[i] = aiMark;
    if (calculateWinner(copy)?.winner === aiMark) return i;
  }
  // Block
  for (const i of emptyIndices(squares)) {
    const copy = squares.slice();
    copy[i] = humanMark;
    if (calculateWinner(copy)?.winner === humanMark) return i;
  }
  return null;
}

function chooseFromPreferred(squares, prefs) {
  for (const idx of prefs) {
    if (squares[idx] == null) return idx;
  }
  return null;
}

// PUBLIC_INTERFACE
export function getBestAIMove(squares, aiMark = 'O', humanMark = 'X') {
  /**
   * Heuristic AI: win -> block -> center -> corners -> sides.
   * Works well on 3x3 without heavy computation.
   */
  // If game already over, do nothing
  if (calculateWinner(squares) || isBoardFull(squares)) return null;

  const immediate = findImmediate(squares, aiMark, humanMark);
  if (immediate != null) return immediate;

  // Center
  if (squares[4] == null) return 4;

  // Corners
  const corner = chooseFromPreferred(squares, [0,2,6,8]);
  if (corner != null) return corner;

  // Sides
  const side = chooseFromPreferred(squares, [1,3,5,7]);
  if (side != null) return side;

  // Fallback
  const empties = emptyIndices(squares);
  return empties.length ? empties[0] : null;
}
