const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridWidth = 10; // Width of the grid (number of blocks)
const gridHeight = 20; // Height of the grid (number of blocks)
const blockSize = 30; // Size of each square block in pixels
let score = 0; // Player's score
let gameInterval; // Interval for the game loop
let currentTetromino; // The current tetromino falling
let grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill(0)); // 10x20 game grid

// Tetromino shapes (7 distinct shapes)
const tetrominoes = [
  [[1, 1, 1, 1]],            // I shape
  [[1, 1], [1, 1]],           // O shape
  [[1, 1, 1], [0, 1, 0]],     // T shape
  [[1, 1, 0], [0, 1, 1]],     // Z shape
  [[0, 1, 1], [1, 1, 0]],     // S shape
  [[1, 1, 1], [1, 0, 0]],     // L shape
  [[1, 1, 1], [0, 0, 1]]      // J shape
];

// Draw a block on the canvas
function drawBlock(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
  ctx.strokeStyle = 'black';
  ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
}

// Generate a random tetromino
function createTetromino() {
  const shape = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
  return {
    shape,
    x: Math.floor(gridWidth / 2) - Math.floor(shape[0].length / 2),
    y: 0
  };
}

// Check for collisions
function collision(x, y, shape) {
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] && (
          x + col < 0 || x + col >= gridWidth || y + row >= gridHeight || grid[y + row][x + col])) {
        return true;
      }
    }
  }
  return false;
}

// Move tetromino down
function moveTetrominoDown() {
  if (!collision(currentTetromino.x, currentTetromino.y + 1, currentTetromino.shape)) {
    currentTetromino.y++; // Move down if no collision
  } else {
    mergeTetromino();
    currentTetromino = createTetromino(); // Create a new tetromino
    if (collision(currentTetromino.x, currentTetromino.y, currentTetromino.shape)) {
      gameOver(); // End the game if the new tetromino collides
    }
  }
  drawGrid(); // Redraw the grid after moving down
}

// Merge tetromino into the grid
function mergeTetromino() {
  currentTetromino.shape.forEach((row, rowIndex) => {
    row.forEach((block, colIndex) => {
      if (block) {
        grid[currentTetromino.y + rowIndex][currentTetromino.x + colIndex] = 1;
      }
    });
  });
  clearLines();
}

// Clear full lines from the grid
function clearLines() {
  grid = grid.filter(row => row.some(block => block === 0)); // Remove filled rows
  const clearedRows = gridHeight - grid.length;
  for (let i = 0; i < clearedRows; i++) {
    grid.unshift(Array(gridWidth).fill(0)); // Add empty rows at the top
  }
  score += clearedRows * 10; // Increase score based on cleared rows
  document.getElementById('score').innerText = score; // Update score display
}

// Draw the grid and the current tetromino
function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  for (let row = 0; row < gridHeight; row++) {
    for (let col = 0; col < gridWidth; col++) {
      if (grid[row][col]) {
        drawBlock(col, row, 'blue'); // Draw existing blocks on the grid
      }
    }
  }
  currentTetromino.shape.forEach((row, rowIndex) => {
    row.forEach((block, colIndex) => {
      if (block) {
        drawBlock(currentTetromino.x + colIndex, currentTetromino.y + rowIndex, 'red'); // Draw the current tetromino
      }
    });
  });
}

// Rotate the current tetromino 90 degrees clockwise
function rotateTetromino() {
  const rotatedShape = currentTetromino.shape[0].map((val, index) =>
    currentTetromino.shape.map(row => row[index]).reverse()
  );
  
  // Check if the rotation is valid, adjust position if near walls
  if (!collision(currentTetromino.x, currentTetromino.y, rotatedShape)) {
    currentTetromino.shape = rotatedShape;
  } else if (!collision(currentTetromino.x - 1, currentTetromino.y, rotatedShape)) {
    // Shift left if there's space
    currentTetromino.x--;
    currentTetromino.shape = rotatedShape;
  } else if (!collision(currentTetromino.x + 1, currentTetromino.y, rotatedShape)) {
    // Shift right if there's space
    currentTetromino.x++;
    currentTetromino.shape = rotatedShape;
  }
}

// Handle game over scenario
function gameOver() {
  clearInterval(gameInterval); // Stop the game loop
  alert('Game Over!'); // Show game over message
}

// Handle keypress for movement and rotation
document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' && !collision(currentTetromino.x - 1, currentTetromino.y, currentTetromino.shape)) {
    currentTetromino.x--; // Move tetromino left
  } else if (event.key === 'ArrowRight' && !collision(currentTetromino.x + 1, currentTetromino.y, currentTetromino.shape)) {
    currentTetromino.x++; // Move tetromino right
  } else if (event.key === 'ArrowDown') {
    moveTetrominoDown(); // Move tetromino down faster
  } else if (event.key === 'ArrowUp') {
    rotateTetromino(); // Rotate tetromino
  }
  drawGrid(); // Redraw the grid after keypress
});

// Start the game when the Start button is clicked
document.getElementById('startButton').addEventListener('click', () => {
  score = 0; // Reset the score
  grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill(0)); // Reset the grid
  currentTetromino = createTetromino(); // Create the first tetromino
  gameInterval = setInterval(moveTetrominoDown, 500); // Start the game loop with a 500ms interval
  drawGrid(); // Initial draw of the grid
});

