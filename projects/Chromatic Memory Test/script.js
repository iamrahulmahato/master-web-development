let sequence = [];
let playerSequence = [];
let level = 0;

const startButton = document.getElementById("start-game");
const statusDisplay = document.getElementById("status");
const colors = ["red", "green", "blue", "yellow"];

const colorBoxes = {
  red: document.getElementById("red"),
  green: document.getElementById("green"),
  blue: document.getElementById("blue"),
  yellow: document.getElementById("yellow"),
};

// Add color to the sequence
function addNewColor() {
  const randomColor = colors[Math.floor(Math.random() * 4)];
  sequence.push(randomColor);
  level++;
  statusDisplay.textContent = `Level ${level}: Watch the sequence`;
  playSequence();
}

// Light up the color in the sequence
function lightUp(color) {
  colorBoxes[color].classList.add("active");
  setTimeout(() => {
    colorBoxes[color].classList.remove("active");
  }, 600);
}

// Play the current sequence for the player to watch
function playSequence() {
  let i = 0;
  const interval = setInterval(() => {
    lightUp(sequence[i]);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      setTimeout(() => {
        statusDisplay.textContent = `Level ${level}: Your turn!`;
        enableClicking();
      }, 1000);
    }
  }, 1000);
}

// Handle player clicks and check their input
function handlePlayerClick(color) {
  playerSequence.push(color);
  lightUp(color);

  // Check the player's input
  if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
    gameOver();
    return;
  }

  // If player successfully completes the sequence
  if (playerSequence.length === sequence.length) {
    disableClicking();
    playerSequence = [];
    setTimeout(() => {
      addNewColor();
    }, 1000);
  }
}

// Game Over
function gameOver() {
  disableClicking();
  statusDisplay.textContent = `Game Over! You reached Level ${level}. Press Start to try again.`;
  sequence = [];
  playerSequence = [];
  level = 0;
}

// Enable clicking on color boxes
function enableClicking() {
  Object.values(colorBoxes).forEach((box) => {
    box.addEventListener("click", handleBoxClick);
  });
}

// Disable clicking on color boxes
function disableClicking() {
  Object.values(colorBoxes).forEach((box) => {
    box.removeEventListener("click", handleBoxClick);
  });
}

// Handle clicking on a color box
function handleBoxClick(event) {
  const color = event.target.id;
  handlePlayerClick(color);
}

// Start the game
startButton.addEventListener("click", () => {
  startButton.disabled = true;
  statusDisplay.textContent = "Get ready...";
  setTimeout(() => {
    addNewColor();
  }, 1000);
});