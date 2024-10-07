const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const botModeBtn = document.getElementById("botModeBtn");
const difficultySelect = document.getElementById("difficultySelect");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const resetBtn = document.getElementById("resetBtn");

let maze = [];
let player = { x: 0, y: 0 };
let exit = { x: 0, y: 0 };
let cellSize = 20;
let mazeSize = 20;
let isPlaying = false;
let isBotMode = false;
let timer = 0;
let steps = 0; // Steps based scoring system
let intervalId;
let playerPath = [];
let vsBotBtn = null;

let currentMaze = [];
let currentPlayer = { x: 0, y: 0 };
let currentExit = { x: 0, y: 0 };

const difficulties = {
  easy: { size: 15, complexity: 0.3 },
  medium: { size: 20, complexity: 0.4 },
  hard: { size: 25, complexity: 0.5 },
};

// Initialize the maze
function initializeMaze() {
  const difficulty = difficulties[difficultySelect.value];
  mazeSize = difficulty.size;
  cellSize = canvas.width / mazeSize;

  currentMaze = generateMaze(mazeSize, mazeSize, difficulty.complexity);

  currentPlayer = { x: 1, y: 1 };
  currentExit = { x: mazeSize - 2, y: mazeSize - 2 };
  player = { ...currentPlayer };
  exit = { ...currentExit };
  playerPath = [{ ...player }];

  drawMaze();
}

// Generate a random maze using a DFS algorithm
function generateMaze(width, height, complexity) {
  const maze = Array(height)
    .fill()
    .map(() => Array(width).fill(1));
  const stack = [{ x: 1, y: 1 }];
  maze[1][1] = 0;

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const neighbors = getUnvisitedNeighbors(current, maze);

    if (neighbors.length > 0) {
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      maze[next.y][next.x] = 0;
      maze[current.y + (next.y - current.y) / 2][
        current.x + (next.x - current.x) / 2
      ] = 0;
      stack.push(next);
    } else {
      stack.pop();
    }
  }

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (maze[y][x] === 1 && Math.random() < complexity) {
        maze[y][x] = 0;
      }
    }
  }

  return maze;
}

// Get unvisited neighbors for maze generation
function getUnvisitedNeighbors(cell, maze) {
  const directions = [
    { dx: 0, dy: -2 },
    { dx: 2, dy: 0 },
    { dx: 0, dy: 2 },
    { dx: -2, dy: 0 },
  ];

  return directions
    .map((dir) => ({ x: cell.x + dir.dx, y: cell.y + dir.dy }))
    .filter(
      (neighbor) =>
        neighbor.x > 0 &&
        neighbor.x < maze[0].length - 1 &&
        neighbor.y > 0 &&
        neighbor.y < maze.length - 1 &&
        maze[neighbor.y][neighbor.x] === 1
    );
}

// Draw the maze and player path
function drawMaze() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the maze walls
  for (let y = 0; y < mazeSize; y++) {
    for (let x = 0; x < mazeSize; x++) {
      if (currentMaze[y][x] === 1) {
        ctx.fillStyle = "#2C3E50"; // Darker walls
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }

  // Draw the player path
  ctx.fillStyle = "rgba(52, 152, 219, 0.4)"; // Light blue path
  for (const pos of playerPath) {
    ctx.fillRect(pos.x * cellSize, pos.y * cellSize, cellSize, cellSize);
  }

  // Draw the player
  ctx.fillStyle = "#E74C3C"; // Red player
  ctx.fillRect(player.x * cellSize, player.y * cellSize, cellSize, cellSize);

  // Draw the exit
  ctx.fillStyle = "#27AE60"; // Green exit
  ctx.fillRect(exit.x * cellSize, exit.y * cellSize, cellSize, cellSize);
}

// Move the player in the maze
function movePlayer(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;

  if (
    newX >= 0 &&
    newX < mazeSize &&
    newY >= 0 &&
    newY < mazeSize &&
    currentMaze[newY][newX] === 0
  ) {
    player.x = newX;
    player.y = newY;
    playerPath.push({ ...player });
    steps++; // Count steps instead of complex score
    drawMaze();
    checkWin();
  }
}

// Check if the player has reached the exit
function checkWin() {
  if (player.x === exit.x && player.y === exit.y) {
    isPlaying = false;
    clearInterval(intervalId);
    updateScore();
    alert(`Congratulations! You escaped in ${steps} steps!`);
    showVsBotButton();
  }
}

// Update the score to reflect the number of steps
function updateScore() {
  scoreElement.textContent = `Steps: ${steps}`;
}

// Start the game
function startGame() {
  initializeMaze();
  isPlaying = true;
  isBotMode = false;
  timer = 0;
  steps = 0;
  playerPath = [{ ...player }];
  timerElement.textContent = "Time: 0s";
  scoreElement.textContent = "Steps: 0";
  startBtn.disabled = true;
  botModeBtn.disabled = true;
  difficultySelect.disabled = true;
  hideVsBotButton();

  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(() => {
    timer++;
    timerElement.textContent = `Time: ${timer}s`;
  }, 1000);
}

// Reset the game
function resetGame() {
  isPlaying = false;
  isBotMode = false;
  clearInterval(intervalId);
  startBtn.disabled = false;
  botModeBtn.disabled = false;
  difficultySelect.disabled = false;
  hideVsBotButton();
  initializeMaze();
  timer = 0;
  steps = 0;
  timerElement.textContent = "Time: 0s";
  scoreElement.textContent = "Steps: 0";
}

// Toggle bot mode and solve the maze
function toggleBotMode() {
  if (!isPlaying) {
    isBotMode = true;
    startGame();
    const path = solveMazeAStar();
    if (path) {
      animatePath(path);
    } else {
      alert("No path found!");
      resetGame();
    }
  }
}

// A* algorithm for bot solving
function solveMazeAStar() {
  const openSet = new PriorityQueue();
  const closedSet = new Set();
  const cameFrom = new Map();
  const gScore = new Map();
  const fScore = new Map();

  const startKey = `${player.x},${player.y}`;
  gScore.set(startKey, 0);
  fScore.set(startKey, heuristic(player, exit));
  openSet.enqueue(player, fScore.get(startKey));

  while (!openSet.isEmpty()) {
    const current = openSet.dequeue().element;
    const currentKey = `${current.x},${current.y}`;

    if (current.x === exit.x && current.y === exit.y) {
      return reconstructPath(cameFrom, current);
    }

    closedSet.add(currentKey);

    for (const neighbor of getValidNeighbors(current)) {
      const neighborKey = `${neighbor.x},${neighbor.y}`;
      if (closedSet.has(neighborKey)) continue;

      const tentativeGScore = gScore.get(currentKey) + 1;

      if (
        !gScore.has(neighborKey) ||
        tentativeGScore < gScore.get(neighborKey)
      ) {
        cameFrom.set(neighborKey, current);
        gScore.set(neighborKey, tentativeGScore);
        fScore.set(neighborKey, tentativeGScore + heuristic(neighbor, exit));

        if (!openSet.contains(neighbor)) {
          openSet.enqueue(neighbor, fScore.get(neighborKey));
        }
      }
    }
  }

  return null;
}

function getValidNeighbors(cell) {
  const directions = [
    { dx: 0, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
  ];

  return directions
    .map((dir) => ({ x: cell.x + dir.dx, y: cell.y + dir.dy }))
    .filter(
      (neighbor) =>
        neighbor.x >= 0 &&
        neighbor.x < mazeSize &&
        neighbor.y >= 0 &&
        neighbor.y < mazeSize &&
        currentMaze[neighbor.y][neighbor.x] === 0
    );
}

function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function reconstructPath(cameFrom, current) {
  const path = [current];
  let currentKey = `${current.x},${current.y}`;

  while (cameFrom.has(currentKey)) {
    current = cameFrom.get(currentKey);
    path.unshift(current);
    currentKey = `${current.x},${current.y}`;
  }

  return path;
}

function animatePath(path) {
  let i = 0;
  const pathIntervalId = setInterval(() => {
    if (i < path.length) {
      player = path[i];
      playerPath.push({ ...player });
      steps++;
      drawMaze();
      i++;
    } else {
      clearInterval(pathIntervalId);
      checkWin();
    }
  }, 100);
}

class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  enqueue(element, priority) {
    this.elements.push({ element, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.elements.shift();
  }

  isEmpty() {
    return this.elements.length === 0;
  }

  contains(element) {
    return this.elements.some(
      (item) => item.element.x === element.x && item.element.y === element.y
    );
  }
}

function showVsBotButton() {
  if (!vsBotBtn) {
    vsBotBtn = document.createElement("button");
    vsBotBtn.textContent = "VS Bot";
    vsBotBtn.classList.add("btn", "btn-primary");
    vsBotBtn.addEventListener("click", playVsBot);
    document.querySelector(".controls").appendChild(vsBotBtn);
  }
  vsBotBtn.style.display = "inline-block";
}

function hideVsBotButton() {
  if (vsBotBtn) {
    vsBotBtn.style.display = "none";
  }
}

function playVsBot() {
  const playerSteps = steps;
  isPlaying = true;
  isBotMode = true;
  timer = 0;
  steps = 0;
  player = { ...currentPlayer };
  exit = { ...currentExit };
  playerPath = [{ ...player }];
  timerElement.textContent = "Time: 0s";
  scoreElement.textContent = "Steps: 0";
  botModeBtn.disabled = true;
  difficultySelect.disabled = true;
  hideVsBotButton();

  drawMaze();

  const path = solveMazeAStar();
  if (path) {
    animateBotPath(path, playerSteps);
  } else {
    alert("No path found for the bot!");
    resetGame();
  }
}

function animateBotPath(path, playerSteps) {
  let i = 0;
  const botMoves = path.length - 1;
  player = { ...currentPlayer };
  playerPath = [{ ...player }];

  startBtn.disabled = true;
  botModeBtn.disabled = true;
  difficultySelect.disabled = true;

  const botIntervalId = setInterval(() => {
    if (i < path.length) {
      player = path[i];
      playerPath.push({ ...player });
      steps++;
      drawMaze();
      i++;

      timerElement.textContent = `Time: ${i}s`;
      scoreElement.textContent = `Steps: ${steps}`;
    } else {
      clearInterval(botIntervalId);
      const botSteps = steps;

      setTimeout(() => {
        if (playerSteps < botSteps) {
          alert(
            `You win! Your steps: ${playerSteps}, Bot's steps: ${botSteps}`
          );
        } else if (playerSteps > botSteps) {
          alert(
            `Bot wins! Your steps: ${playerSteps}, Bot's steps: ${botSteps}`
          );
        } else {
          alert(`It's a tie! Both steps: ${playerSteps}`);
        }
        resetGame();
      }, 500);
    }
  }, 100);
}

startBtn.addEventListener("click", startGame);
botModeBtn.addEventListener("click", toggleBotMode);
difficultySelect.addEventListener("change", initializeMaze);
resetBtn.addEventListener("click", resetGame);

document.addEventListener("keydown", (e) => {
  if (!isPlaying || isBotMode) return;

  switch (e.key) {
    case "ArrowUp":
      movePlayer(0, -1);
      break;
    case "ArrowRight":
      movePlayer(1, 0);
      break;
    case "ArrowDown":
      movePlayer(0, 1);
      break;
    case "ArrowLeft":
      movePlayer(-1, 0);
      break;
  }
});

initializeMaze();
