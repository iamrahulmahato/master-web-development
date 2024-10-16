// Select the grid and reset button
const grid = document.getElementById("grid");
const resetBtn = document.getElementById("reset-btn");
const winMessage = document.getElementById("win-message");

const GRID_SIZE = 5;  // 5x5 grid
let lights = [];      // Store the lights in a 2D array

// Create the game grid
function createGrid() {
  grid.innerHTML = ""; // Clear the grid first
  lights = [];
  
  for (let row = 0; row < GRID_SIZE; row++) {
    lights[row] = [];
    for (let col = 0; col < GRID_SIZE; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      
      // Randomly turn some lights on or off
      if (Math.random() > 0.5) {
        cell.classList.add("off");
      }
      
      // Add click event listener to toggle lights
      cell.addEventListener("click", () => toggleLights(row, col));
      
      grid.appendChild(cell);
      lights[row][col] = cell;
    }
  }
}

// Toggle a single light and its neighbors
function toggleLights(row, col) {
  toggleSingleLight(row, col);       // Toggle clicked light
  toggleSingleLight(row - 1, col);   // Top neighbor
  toggleSingleLight(row + 1, col);   // Bottom neighbor
  toggleSingleLight(row, col - 1);   // Left neighbor
  toggleSingleLight(row, col + 1);   // Right neighbor

  // Check if the player has won
  if (checkWinCondition()) {
    winMessage.textContent = "You Won! All lights are off!";
  }
}

// Toggle the state of a single light
function toggleSingleLight(row, col) {
  // Ensure we are within bounds
  if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
    lights[row][col].classList.toggle("off");
  }
}

// Check if all lights are off
function checkWinCondition() {
  return lights.every(row => row.every(cell => cell.classList.contains("off")));
}

// Reset the game to start over
function resetGame() {
  createGrid();
  winMessage.textContent = ""; // Clear win message
}

// Add reset button click event
resetBtn.addEventListener("click", resetGame);

// Start the game initially
createGrid();
