const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 600;

let player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 100,
    width: 40,
    height: 80,
    color: 'blue',
    speed: 5,
};

let obstacles = [];
let score = 0;
let gameInterval;

// Player movement
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && player.x > 0) {
        player.x -= player.speed;
    } else if (event.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
});

// Function to create obstacles
function createObstacle() {
    const obstacle = {
        x: Math.random() * (canvas.width - 20),
        y: -40,
        width: 20,
        height: 20,
        speed: 1 + Math.random() * 0.1,
        color: 'red',
    };
    obstacles.push(obstacle);
}

// Function to update the game
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw obstacles
    obstacles.forEach((obstacle, index) => {
        obstacle.y += obstacle.speed;
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Check for collision
        if (isColliding(player, obstacle)) {
            alert("Game Over! Final Score: " + score);
            clearInterval(gameInterval);
            return;
        }

        // Remove off-screen obstacles
        if (obstacle.y > canvas.height) {
            obstacles.splice(index, 1);
            score++;
            document.getElementById('score').innerText = `Score: ${score}`;
        }
    });
}

// Function to check for collision
function isColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Start the game
function startGame() {
    score = 0;
    obstacles = [];
    document.getElementById('score').innerText = `Score: ${score}`;
    
    // Increase the interval between obstacle spawns
    gameInterval = setInterval(() => {
        if (Math.random() < 0.5) { // Adjust probability to reduce frequency
            createObstacle();
        }
        update();
    }, 1000 / 30); // 30 FPS
}

// Begin the game when the page loads
startGame();
