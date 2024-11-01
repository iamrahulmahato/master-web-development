const gameArea = document.getElementById('gameArea');
const paddleLeft = document.getElementById('paddleLeft');
const paddleRight = document.getElementById('paddleRight');
const ball = document.getElementById('ball');
const scoreLeft = document.getElementById('scoreLeft');
const scoreRight = document.getElementById('scoreRight');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');

let ballX = 295;
let ballY = 195;
let ballSpeedX = 5;
let ballSpeedY = 3;
let paddleSpeed = 30;
let leftScore = 0;
let rightScore = 0;
let gameInterval;
let gamePaused = true;
const winningScore = 5;

// Paddle control for left paddle (controlled by ArrowUp and ArrowDown)
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && paddleLeft.offsetTop > 0) {
        paddleLeft.style.top = (paddleLeft.offsetTop - paddleSpeed) + 'px';
    }
    if (event.key === 'ArrowDown' && paddleLeft.offsetTop < gameArea.clientHeight - paddleLeft.clientHeight) {
        paddleLeft.style.top = (paddleLeft.offsetTop + paddleSpeed) + 'px';
    }
});

// AI control for the right paddle
function movePaddleRight() {
    const ballCenter = ballY + ball.clientHeight / 2;
    const paddleCenter = paddleRight.offsetTop + paddleRight.clientHeight / 2;

    if (ballCenter < paddleCenter) {
        paddleRight.style.top = Math.max(0, paddleRight.offsetTop - paddleSpeed / 2) + 'px';
    } else if (ballCenter > paddleCenter) {
        paddleRight.style.top = Math.min(gameArea.clientHeight - paddleRight.clientHeight, paddleRight.offsetTop + paddleSpeed / 2) + 'px';
    }
}

// Start or Pause the Game
startPauseBtn.addEventListener('click', () => {
    if (gamePaused) {
        gameInterval = setInterval(gameLoop, 20);
        startPauseBtn.textContent = 'Pause';
    } else {
        clearInterval(gameInterval);
        startPauseBtn.textContent = 'Start';
    }
    gamePaused = !gamePaused;
});

// Reset the Game
resetBtn.addEventListener('click', resetGame);

function resetGame() {
    leftScore = 0;
    rightScore = 0;
    updateScores();
    resetBall();
    startPauseBtn.textContent = 'Start';
    clearInterval(gameInterval);
    gamePaused = true;
}

function gameLoop() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom
    if (ballY <= 0 || ballY >= gameArea.clientHeight - ball.clientHeight) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (
        (ballX <= paddleLeft.offsetWidth && ballY + ball.clientHeight > paddleLeft.offsetTop && ballY < paddleLeft.offsetTop + paddleLeft.clientHeight) ||
        (ballX >= gameArea.clientWidth - paddleRight.offsetWidth - ball.clientWidth && ballY + ball.clientHeight > paddleRight.offsetTop && ballY < paddleRight.offsetTop + paddleRight.clientHeight)
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Scoring
    if (ballX < 0) {
        rightScore++;
        checkWinner();
        resetBall();
    } else if (ballX > gameArea.clientWidth) {
        leftScore++;
        checkWinner();
        resetBall();
    }

    // Update ball position
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    // Move AI paddle
    movePaddleRight();

    updateScores();
}

function resetBall() {
    ballX = 295;
    ballY = 195;
    ballSpeedX = 5 * (Math.random() < 0.5 ? 1 : -1);
    ballSpeedY = 3 * (Math.random() < 0.5 ? 1 : -1);
}

function updateScores() {
    scoreLeft.textContent = leftScore;
    scoreRight.textContent = rightScore;
}

function checkWinner() {
    if (leftScore === winningScore || rightScore === winningScore) {
        alert(`${leftScore === winningScore ? 'Left' : 'Right'} Player Wins!`);
        resetGame();
    }
}
