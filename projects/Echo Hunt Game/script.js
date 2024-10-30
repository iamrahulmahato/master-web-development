const grid = document.getElementById('grid');
const startButton = document.getElementById('startButton');
const livesDisplay = document.getElementById('lives');
const scoreDisplay = document.getElementById('score');

let sequence = [];
let playerSequence = [];
let lives = 3;
let score = 0;
const gridSize = 25; // 5x5 grid

// Initialize grid cells and sounds
for (let i = 0; i < gridSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    grid.appendChild(cell);

    // Assign unique sound to each cell
    const audio = new Audio(`sounds/sound${i + 1}.mp3`); // Ensure sounds are available
    cell.addEventListener('click', () => handlePlayerClick(i, audio));
}

startButton.addEventListener('click', startGame);

function startGame() {
    resetGame();
    playSequence();
}

// Play the sequence for the player
function playSequence() {
    let delay = 500;
    playerSequence = [];
    
    sequence.push(Math.floor(Math.random() * gridSize));
    sequence.forEach((cellIndex, i) => {
        setTimeout(() => {
            const cell = document.querySelector(`.cell[data-index='${cellIndex}']`);
            const sound = new Audio(`sounds/sound${cellIndex + 1}.mp3`);
            sound.play();
            cell.classList.add('active');

            setTimeout(() => {
                cell.classList.remove('active');
            }, delay / 2);
        }, delay * (i + 1));
    });
}

// Handle player clicking a cell
function handlePlayerClick(index, sound) {
    sound.play();
    playerSequence.push(index);

    const currentStep = playerSequence.length - 1;
    if (playerSequence[currentStep] !== sequence[currentStep]) {
        lives--;
        livesDisplay.textContent = lives;
        playerSequence = [];
        
        if (lives === 0) {
            endGame();
            return;
        }
        
        alert("Incorrect! Try again from the beginning of this sequence.");
        playSequence();
        return;
    }

    if (playerSequence.length === sequence.length) {
        score++;
        scoreDisplay.textContent = score;
        playSequence();
    }
}

// Reset game variables
function resetGame() {
    sequence = [];
    playerSequence = [];
    lives = 3;
    score = 0;
    livesDisplay.textContent = lives;
    scoreDisplay.textContent = score;
}

// End the game and display the player's final score
function endGame() {
    alert(`Game Over! Your final score is ${score}.`);
    resetGame();
}