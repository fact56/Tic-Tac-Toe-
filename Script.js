// Select elements
const board = document.querySelectorAll('.cell');
const result = document.getElementById('result');
const resetButton = document.getElementById('reset');

// Game variables
let currentPlayer = 'X'; // Start with 'X'
let gameActive = true; // Game state
let boardState = ['', '', '', '', '', '', '', '', '']; // Empty board

// Emojis for players
const emojis = { X: '❌', O: '⭕' };

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Cell click event
board.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (gameActive && boardState[index] === '') {
      // Update the board state
      boardState[index] = currentPlayer;
      cell.textContent = emojis[currentPlayer];
      cell.classList.add('taken');

      // Check for winner
      checkWinner();

      // Switch players
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  });
});

// Check for winner or draw
function checkWinner() {
  let winner = null;

  // Check each winning combination
  winningCombinations.forEach((combination) => {
    const [a, b, c] = combination;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      winner = boardState[a];
    }
  });

  // Handle results
  if (winner) {
    gameActive = false;
    result.innerHTML = `<p>🎉 ${emojis[winner]} Wins! 💖</p>`;
  } else if (!boardState.includes('')) {
    gameActive = false;
    result.innerHTML = `<p>😢 It's a Draw!</p>`;
  }
}

// Reset game
resetButton.addEventListener('click', () => {
  boardState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  result.innerHTML = '';
  board.forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
});
