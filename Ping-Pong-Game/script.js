// Select elements from the DOM
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

const startPauseResumeButton = document.getElementById('startPauseResumeButton');
const endButton = document.getElementById('endButton');

// Initialize variables for game state
let ballX, ballY, ballSpeedX, ballSpeedY, leftScore, rightScore;
let paddleSpeed = 20;
let gameStarted = false;
let gamePaused = false;
let animationFrameId;

// Initialize game setup
function initGame() {
    ballX = 295;
    ballY = 195;
    ballSpeedX = 3;
    ballSpeedY = 2;
    leftScore = 0;
    rightScore = 0;
    scoreLeft.textContent = leftScore;
    scoreRight.textContent = rightScore;
    resetPaddles();
    updateBallPosition();
}

// Reset paddles to starting positions
function resetPaddles() {
    paddleLeft.style.top = '160px';
    paddleRight.style.top = '160px';
}

// Update ball position in the DOM
function updateBallPosition() {
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
}

// Listen for keyboard events for paddle movement
document.addEventListener('keydown', (event) => {
    if (!gameStarted || gamePaused) return;

    // Paddle left controls
    if (event.key === 'w' && paddleLeft.offsetTop > 0) {

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


    // Paddle right controls
    if (event.key === 'ArrowUp' && paddleRight.offsetTop > 0) {
        paddleRight.style.top = (paddleRight.offsetTop - paddleSpeed) + 'px';

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


// Main game loop

function gameLoop() {
    if (!gameStarted || gamePaused) return;

    // Update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom

    // Ball collision with top and bottom walls

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

    // Ball out of bounds (score update)
    if (ballX < 0) {
        rightScore++;
        checkWinner();
        resetBall();
    } else if (ballX > gameArea.clientWidth) {
        leftScore++;
        checkWinner();
        resetBall();
    }

<
    // Update ball position
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    // Move AI paddle
    movePaddleRight();

    updateScores();

    // Update ball and score display
    updateBallPosition();
    scoreLeft.textContent = leftScore;
    scoreRight.textContent = rightScore;

    animationFrameId = requestAnimationFrame(gameLoop);

}

// Reset ball to the center with random direction
function resetBall() {
    ballX = 295;
    ballY = 195;
    ballSpeedX = 3 * (Math.random() < 0.5 ? 1 : -1);
    ballSpeedY = 2 * (Math.random() < 0.5 ? 1 : -1);
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

// Start, pause, and resume game button functionality
startPauseResumeButton.addEventListener('click', () => {
    if (!gameStarted) {
        gameStarted = true;
        gamePaused = false;
        startPauseResumeButton.textContent = 'Pause';
        endButton.disabled = false;
        gameLoop();
    } else if (!gamePaused) {
        gamePaused = true;
        startPauseResumeButton.textContent = 'Resume';
        cancelAnimationFrame(animationFrameId);
    } else {
        gamePaused = false;
        startPauseResumeButton.textContent = 'Pause';
        gameLoop();
    }
});

// End game button functionality
endButton.addEventListener('click', () => {
    gameStarted = false;
    gamePaused = false;
    cancelAnimationFrame(animationFrameId);
    startPauseResumeButton.textContent = 'Start Game';
    endButton.disabled = true;
    initGame();
});

// Initialize the game on page load
initGame();
endButton.disabled = true;

