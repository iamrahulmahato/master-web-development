const gameBoard = document.querySelectorAll('.color-btn');
const message = document.getElementById('message');
const levelText = document.getElementById('level');
const scoreText = document.getElementById('score');
const startBtn = document.getElementById('start-btn');

let level = 1;
let score = 0;
let gameSequence = [];
let playerSequence = [];
let colors = ['red', 'blue', 'green', 'yellow'];
let inProgress = false;

function playSound(color) {
    let sound = new Audio(`sounds/${color}.mp3`);
    sound.play();
}

function flashButton(color) {
    const button = document.getElementById(color);
    button.style.opacity = '0.5';
    playSound(color);
    setTimeout(() => {
        button.style.opacity = '1';
    }, 500);
}

function generateSequence() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);
    displaySequence();
}

function displaySequence() {
    let i = 0;
    const interval = setInterval(() => {
        flashButton(gameSequence[i]);
        i++;
        if (i >= gameSequence.length) {
            clearInterval(interval);
            inProgress = true;
            message.innerText = "Your Turn!";
        }
    }, 1000);
}

function checkPlayerSequence() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== gameSequence[i]) {
            gameOver();
            return;
        }
    }
    if (playerSequence.length === gameSequence.length) {
        nextLevel();
    }
}

function gameOver() {
    message.innerText = "Game Over! Press Start to Retry.";
    inProgress = false;
    resetGame();
}

function resetGame() {
    gameSequence = [];
    playerSequence = [];
    level = 1;
    score = 0;
    updateScore();
}

function nextLevel() {
    level++;
    score += level * 10;
    updateScore();
    playerSequence = [];
    message.innerText = "Watch the Sequence!";
    setTimeout(generateSequence, 1000);
}

function updateScore() {
    levelText.innerText = `Level: ${level}`;
    scoreText.innerText = `Score: ${score}`;
}

function startGame() {
    resetGame();
    message.innerText = "Watch the Sequence!";
    generateSequence();
}

gameBoard.forEach(button => {
    button.addEventListener('click', () => {
        if (!inProgress) return;
        const color = button.id;
        playerSequence.push(color);
        flashButton(color);
        checkPlayerSequence();
    });
});

startBtn.addEventListener('click', () => {
    if (!inProgress) {
        startGame();
    }
});
