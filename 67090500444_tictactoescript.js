const cells = document.querySelectorAll('.cell');
const result = document.querySelector('.result');
const resetBtn = document.querySelector('.reset');
let board = Array(9).fill('');
let gameOver = false;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]             
];

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.dataset.index;

    if (board[index] === '' && !gameOver) {
      board[index] = 'X';
      cell.textContent = 'X';

      if (checkWin('X')) {
        result.textContent = '🎉 ผู้เล่น X ชนะ!';
        gameOver = true;
        return;
      }

      if (!board.includes('')) {
        result.textContent = '😐 เสมอกัน!';
        gameOver = true;
        return;
      }

      computerMove();
    }
  });
});

function computerMove() {
  let emptyIndexes = board
    .map((val, i) => (val === '' ? i : null))
    .filter(i => i !== null);

  if (emptyIndexes.length === 0 || gameOver) return;

  const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  board[randomIndex] = 'O';
  cells[randomIndex].textContent = 'O';

  if (checkWin('O')) {
    result.textContent = '🤖 ระบบ O ชนะ!';
    gameOver = true;
  } else if (!board.includes('')) {
    result.textContent = '😐 เสมอกัน!';
    gameOver = true;
  }
}

function checkWin(player) {
  return winPatterns.some(pattern => 
    pattern.every(index => board[index] === player)
  );
}

resetBtn.addEventListener('click', () => {
  board.fill('');
  cells.forEach(cell => cell.textContent = '');
  result.textContent = '';
  gameOver = false;
});
