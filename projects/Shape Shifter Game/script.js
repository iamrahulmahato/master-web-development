const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const startButton = document.getElementById('start-btn');

const shapes = ['square', 'circle', 'triangle'];
let currentShape = '';
let score = 0;
let lives = 3;
let gameInterval;

function startGame() {
  score = 0;
  lives = 3;
  scoreElement.textContent = score;
  livesElement.textContent = lives;
  startButton.disabled = true;
  canvas.addEventListener('click', handleCanvasClick);
  gameInterval = setInterval(drawShape, 1000);
}

function drawShape() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  currentShape = randomShape;

  switch (randomShape) {
    case 'square':
      ctx.fillRect(50, 50, 100, 100);
      break;
    case 'circle':
      ctx.beginPath();
      ctx.arc(100, 100, 50, 0, 2 * Math.PI);
      ctx.fill();
      break;
    case 'triangle':
      ctx.beginPath();
      ctx.moveTo(100, 50);
      ctx.lineTo(50, 150);
      ctx.lineTo(150, 150);
      ctx.closePath();
      ctx.fill();
      break;
  }
}

function handleCanvasClick(event) {
  const canvasRect = canvas.getBoundingClientRect();
  const clickX = event.clientX - canvasRect.left;
  const clickY = event.clientY - canvasRect.top;

  if (ctx.isPointInPath(clickX, clickY)) {
    score++;
    scoreElement.textContent = score;
  } else {
    lives--;
    livesElement.textContent = lives;
    if (lives === 0) {
      endGame();
    }
  }
}

function endGame() {
  clearInterval(gameInterval);
  canvas.removeEventListener('click', handleCanvasClick);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '24px Arial';
  ctx.fillText(`Game Over! Score: ${score}`, 50, 100);
  startButton.disabled = false;
}

startButton.addEventListener('click', startGame);