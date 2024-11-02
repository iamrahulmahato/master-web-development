const gameBoard = document.getElementById('game-board');
const startBtn = document.getElementById('start-btn');
const message = document.getElementById('message');

let sequence = [];
let playerSequence = [];
let level = 0;
let clickable = false;

// Create grid dynamically
function createGrid() {
    for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.id = `cell-${i}`;
        cell.addEventListener('click', () => handlePlayerClick(i));
        gameBoard.appendChild(cell);
    }
}

// Generate a random sequence
function generateSequence() {
    sequence.push(Math.floor(Math.random() * 16));
}

// Light up a specific cell
function lightUpCell(index) {
    const cell = document.getElementById(`cell-${index}`);
    cell.style.backgroundColor = '#ff6347';  // Tomato color for lit cells
    setTimeout(() => {
        cell.style.backgroundColor = '#ccc';  // Reset to default color
    }, 500);
}

// Play the sequence for the player
function playSequence() {
    clickable = false;
    playerSequence = [];
    message.textContent = `Level ${level + 1}`;
    sequence.forEach((num, index) => {
        setTimeout(() => {
            lightUpCell(num);
        }, index * 800);
    });
    setTimeout(() => {
        clickable = true;
        message.textContent = 'Your turn! Repeat the sequence.';
    }, sequence.length * 800);
}

// Handle player's clicks
function handlePlayerClick(index) {
    if (!clickable) return;
    
    playerSequence.push(index);
    lightUpCell(index);

    // Check if the player's input matches the sequence so far
    if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
        message.textContent = 'Game Over! You clicked the wrong cell.';
        resetGame();
        return;
    }

    if (playerSequence.length === sequence.length) {
        message.textContent = 'Correct! Advancing to next level.';
        level++;
        setTimeout(startNextLevel, 1000);
    }
}

// Start the next level
function startNextLevel() {
    generateSequence();
    playSequence();
}

// Reset the game
function resetGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    clickable = false;
    startBtn.disabled = false;
    message.textContent = 'Press "Start Game" to try again!';
}

// Start the game
startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    generateSequence();
    playSequence();
});

// Initialize the game board
createGrid();