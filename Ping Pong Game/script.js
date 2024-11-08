const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let playerScore = 0;
let computerScore = 0;
let paddleHeight = 75;
let paddleWidth = 10;
let ballRadius = 10;

let playerY = (canvas.height - paddleHeight) / 2;
let computerY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw paddles
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, playerY, paddleWidth, paddleHeight); // Player paddle
    ctx.fillRect(canvas.width - paddleWidth, computerY, paddleWidth, paddleHeight); // Computer paddle

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.closePath();

    // Update score
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;
}

// Move the ball
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX - ballRadius < paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX + ballRadius > canvas.width - paddleWidth && ballY > computerY && ballY < computerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds
    if (ballX + ballRadius < 0) {
        computerScore++;
        resetBall();
    }
    if (ballX - ballRadius > canvas.width) {
        playerScore++;
        resetBall();
    }
}

// Reset ball position
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX; // Change direction
}

// Move computer paddle
function moveComputer() {
    const paddleCenter = computerY + paddleHeight / 2;
    if (paddleCenter < ballY) {
        computerY += 4; // Move down
    } else {
        computerY -= 4; // Move up
    }

    // Keep computer paddle within bounds
    if (computerY < 0) computerY = 0;
    if (computerY + paddleHeight > canvas.height) computerY = canvas.height - paddleHeight;
}

// Update game
function update() {
    moveBall();
    moveComputer();
    draw();
    requestAnimationFrame(update);
}

// Control player paddle with mouse
canvas.addEventListener('mousemove', (event) => {
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    if (mouseY >= 0 && mouseY <= canvas.height - paddleHeight) {
        playerY = mouseY;
    }
});

// Start the game
update();
