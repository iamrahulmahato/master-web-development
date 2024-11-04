const colorBoxes = document.querySelectorAll('.color-box');
const levelElement = document.getElementById('level');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start-btn');

let sequence = [];
let playerSequence = [];
let level = 1;
let score = 0;
let gameStarted = false;

const colors = ['red', 'green', 'blue', 'yellow'];

function startGame() {
  sequence = [];
  playerSequence = [];
  level = 1;
  score = 0;
  gameStarted = true;
  startButton.disabled = true;
  levelElement.textContent = level;
  scoreElement.textContent = score;
  nextSequence();
}

function nextSequence() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  sequence.push(randomColor);
  playSequence();
}

function playSequence() {
  let i = 0;
  const intervalId = setInterval(() => {
    const colorBox = document.querySelector(`.${sequence[i]}`);
    colorBox.style.opacity = 0.5;
    setTimeout(() => {
      colorBox.style.opacity = 1;
    }, 500);
    i++;
    if (i >= sequence.length) {
      clearInterval(intervalId);
    }
  }, 1000);
}

function handleColorClick(color) {
  if (!gameStarted) return;

  playerSequence.push(color);

  if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
    endGame();
    return;
  }

  score++;
  scoreElement.textContent = score;

  if (playerSequence.length === sequence.length) {
    level++;
    levelElement.textContent = level;
    playerSequence = [];
    setTimeout(nextSequence, 1000);
  }
}

function endGame() {
  alert(`Game Over! Your score: ${score}`);
  startButton.disabled = false;
  gameStarted = false;
}

colorBoxes.forEach(colorBox => {
  colorBox.addEventListener('click', () => {
    const color = colorBox.classList[1];
    handleColorClick(color);
  });
});

startButton.addEventListener('click', startGame);