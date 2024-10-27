const gameBoard = document.getElementById('game-board');
const playerPaddle = document.getElementById('player-paddle');
const computerPaddle = document.getElementById('computer-paddle');
const ball = document.getElementById('ball');
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button'); //newly added pause button 
const gameOverElement = document.getElementById('game-over');
const winnerElement = document.getElementById('winner');

let playerScore = 0;
let computerScore = 0;
let ballX = 300;
let ballY = 200;
let ballSpeedX = 5;
let ballSpeedY = 5;
let playerPaddleY = 160;
let computerPaddleY = 160;
let gameInterval;
let isGamePaused = false; // To find game pause state

function updateGame() {
    if (!isGamePaused) {
        moveBall();
        moveComputerPaddle();
        checkCollision();
        updateScores();
    }
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
}

function moveComputerPaddle() {
    const paddleCenter = computerPaddleY + 40;
    if (paddleCenter < ballY - 35) {
        computerPaddleY += 4;
    } else if (paddleCenter > ballY + 35) {
        computerPaddleY -= 4;
    }
    computerPaddle.style.top = computerPaddleY + 'px';
}

function checkCollision() {
    // Ball collison with top and bottom walls
    if (ballY <= 0 || ballY >= 385) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX <= 20 && ballY >= playerPaddleY && ballY <= playerPaddleY + 80) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX >= 575 && ballY >= computerPaddleY && ballY <= computerPaddleY + 80) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds
    if (ballX <= 0) {
        computerScore++;
        checkGameOver();
        resetBall();
    } else if (ballX >= 585) {
        playerScore++;
        checkGameOver();
        resetBall();
    }
}

function resetBall() {
    ballX = 300;
    ballY = 200;
    ballSpeedX = -ballSpeedX;
}

function updateScores() {
    playerScoreElement.textContent = `Player: ${playerScore}`;
    computerScoreElement.textContent = `Computer: ${computerScore}`;
}

function startGame() {
    if (!gameInterval) {
        gameOverElement.classList.add('hidden');
        resetGame();
        gameInterval = setInterval(updateGame, 1000 / 60);
        startButton.textContent = 'Restart Game';
    } else {
        clearInterval(gameInterval);
        resetGame();
        gameInterval = setInterval(updateGame, 1000 / 60);
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerPaddleY = 160;
    computerPaddleY = 160;
    resetBall();
    updateScores();
    gameOverElement.classList.add('hidden');
}

function checkGameOver() {
    if (playerScore >= 10 || computerScore >= 10) {
        clearInterval(gameInterval);
        gameInterval = null;
        const winner = playerScore >= 10 ? "Player" : "Computer";
        winnerElement.textContent = `${winner} wins!`;
        gameOverElement.classList.remove('hidden');
        startButton.textContent = 'Start New Game';
    }
}

function pauseGame() {
    if (gameInterval) {
        isGamePaused = !isGamePaused; // Toggle pause state
        if (isGamePaused) {
            pauseButton.textContent = 'Resume Game';
        } else {
            pauseButton.textContent = 'Pause Game';
        }
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
        playerPaddleY = Math.max(0, playerPaddleY - 50);
    } else if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
        playerPaddleY = Math.min(320, playerPaddleY + 50);
    }
    playerPaddle.style.top = playerPaddleY + 'px';
});

startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', pauseGame); // Pause button functionality

// Initial paddle positions
playerPaddle.style.top = playerPaddleY + 'px';
computerPaddle.style.top = computerPaddleY + 'px';
