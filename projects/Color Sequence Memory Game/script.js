const colorSquares = document.querySelectorAll('.color-square');
const levelElement = document.getElementById('level');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const startButton = document.getElementById('start-button');

let sequence = [];
let playerSequence = [];
let level = 1;
let score = 0;
let highScore = 0;
let gameActive = false;

const colors = ['red', 'blue', 'green', 'yellow'];

function nextSequence() {
  playerSequence = [];
  level++;
  levelElement.textContent = level;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  sequence.push(randomColor);
  playSequence();
}

function playSequence() {
  let i = 0;
  const intervalId = setInterval(() => {
    const colorSquare = document.querySelector(`.${sequence[i]}`);
    colorSquare.style.opacity = 1;
    setTimeout(() => {
      colorSquare.style.opacity = 0.6;
    }, 500);
    i++;
    if (i === sequence.length) {
      clearInterval(intervalId);
    }
  }, 1000);
}

function checkSequence(color) {
  playerSequence.push(color);
  const index = playerSequence.length - 1;
  if (playerSequence[index] !== sequence[index]) {
    gameOver();
    return;
  }
  score++;
  scoreElement.textContent = score;
  if (playerSequence.length === sequence.length) {
    setTimeout(nextSequence, 1000);
  }
}

function gameOver() {
  gameActive = false;
  if (score > highScore) {
    highScore = score;
    highScoreElement.textContent = highScore;
  }
  alert(`Game Over! Your score: ${score}`);
  resetGame();
}

function resetGame() {
  sequence = [];
  playerSequence = [];
  level = 1;
  score = 0;
  levelElement.textContent = level;
  scoreElement.textContent = score;
}

function startGame() {
  gameActive = true;
  resetGame();
  nextSequence();
}

colorSquares.forEach(square => {
  square.addEventListener('click', () => {
    if (!gameActive) return;
    const color = square.classList[1];
    checkSequence(color);
  });
});

startButton.addEventListener('click', startGame);