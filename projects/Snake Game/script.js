let gameArea = document.getElementById('game-area');
let scoreBox = document.getElementById('score-box');
let highscoreBox = document.getElementById('highscore-box');
let gameOverDiv = document.getElementById('game-over');
let gameOverMessage = document.getElementById('game-over-message');
let scoreMessage = document.createElement('p');
scoreMessage.id = 'score-message';
gameOverDiv.appendChild(scoreMessage); // Add score message to the game over div

const tileSize = 20;
const rows = 20;  // 400px height divided by 20px tiles
const cols = 30;  // 600px width divided by 20px tiles
let snake = [{ x: 14, y: 9 }]; // Start in the center of the new grid
let direction = { x: 0, y: 0 };
let apple = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
let score = 0;
let highScore = 0;
let gameInterval;

function drawSnake() {
  gameArea.innerHTML = '';
  snake.forEach((part, index) => {
    let snakePart = document.createElement('div');
    if (index === 0) {
      snakePart.classList.add('snake-head'); // Use the head image for the first part
    } else {
      snakePart.classList.add('snake-body'); // Use the body image for the rest
    }
    snakePart.style.left = part.x * tileSize + 'px';
    snakePart.style.top = part.y * tileSize + 'px';
    gameArea.appendChild(snakePart);
  });
}

function drawApple() {
  let appleElement = document.createElement('img');
  appleElement.src = 'apple.png'; // Replace with your actual apple image path
  appleElement.id = 'apple';
  appleElement.style.left = apple.x * tileSize + 'px';
  appleElement.style.top = apple.y * tileSize + 'px';
  gameArea.appendChild(appleElement);
}

function update() {
  let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check collision with walls
  if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows || checkCollision(head)) {
    gameOver();
    return;
  }

  snake.unshift(head);

  // Check if snake eats the apple
  if (head.x === apple.x && head.y === apple.y) {
    score += 10;
    if (score > highScore) {
      highScore = score;
    }
    apple = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
  } else {
    snake.pop();
  }

  drawSnake();
  drawApple();
  scoreBox.innerText = 'Score: ' + score;
  highscoreBox.innerText = 'High Score: ' + highScore;
}

function checkCollision(head) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function gameOver() {
  clearInterval(gameInterval);
  gameOverMessage.innerText = 'Game Over!';
  scoreMessage.innerText = 'Your Score was: ' + score;
  gameOverDiv.style.display = 'block';
}

function startGame() {
  gameOverDiv.style.display = 'none';
  score = 0;
  direction = { x: 0, y: 0 };
  snake = [{ x: 14, y: 9 }]; // Start snake in the middle of new grid
  apple = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
  gameInterval = setInterval(update, 200);
}

// Control the snake
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case 's':
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case 'a':
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case 'd':
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

startGame();
