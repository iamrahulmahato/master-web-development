const gameArea = document.getElementById('gameArea');
const paddleLeft = document.getElementById('paddleLeft');
const paddleRight = document.getElementById('paddleRight');
const ball = document.getElementById('ball');
const scoreLeft = document.getElementById('scoreLeft');
const scoreRight = document.getElementById('scoreRight');

let ballX = 295;
let ballY = 195;
let ballSpeedX = 5;
let ballSpeedY = 3;
let paddleSpeed = 30;
let leftScore = 0;
let rightScore = 0;

document.addEventListener('keydown', (event) => {
    if (event.key === 'w' && paddleLeft.offsetTop > 0) {
        paddleLeft.style.top = (paddleLeft.offsetTop - paddleSpeed) + 'px';
    }
    if (event.key === 's' && paddleLeft.offsetTop < gameArea.clientHeight - paddleLeft.clientHeight) {
        paddleLeft.style.top = (paddleLeft.offsetTop + paddleSpeed) + 'px';
    }
    if (event.key === 'ArrowUp' && paddleRight.offsetTop > 0) {
        paddleRight.style.top = (paddleRight.offsetTop - paddleSpeed) + 'px';
    }
    if (event.key === 'ArrowDown' && paddleRight.offsetTop < gameArea.clientHeight - paddleRight.clientHeight) {
        paddleRight.style.top = (paddleRight.offsetTop + paddleSpeed) + 'px';
    }
});

function gameLoop() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Wall collision
    if (ballY <= 0 || ballY >= gameArea.clientHeight - ball.clientHeight) {
        ballSpeedY = -ballSpeedY;
    }

    // Paddle collision
    if (
        (ballX <= paddleLeft.offsetWidth && ballY + ball.clientHeight > paddleLeft.offsetTop && ballY < paddleLeft.offsetTop + paddleLeft.clientHeight) ||
        (ballX >= gameArea.clientWidth - paddleRight.offsetWidth - ball.clientWidth && ballY + ball.clientHeight > paddleRight.offsetTop && ballY < paddleRight.offsetTop + paddleRight.clientHeight)
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Scoring
    if (ballX < 0) {
        rightScore++;
        resetBall();
    } else if (ballX > gameArea.clientWidth) {
        leftScore++;
        resetBall();
    }

    // Update ball position
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    
    // Update score
    scoreLeft.textContent = leftScore;
    scoreRight.textContent = rightScore;

    requestAnimationFrame(gameLoop);
}

function resetBall() {
    ballX = 295;
    ballY = 195;
    ballSpeedX = 5 * (Math.random() < 0.5 ? 1 : -1);
    ballSpeedY = 3 * (Math.random() < 0.5 ? 1 : -1);
}

gameLoop();
