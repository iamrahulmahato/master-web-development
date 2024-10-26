const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 600;

let player = {
    x: canvas.width / 2 - 15,
    y: canvas.height / 2 - 15,
    width: 30,
    height: 30,
    speed: 3,
    gravity: 0.5,
    velocityY: 0,
    isJumping: false,
};

let items = [];
let score = 0;
let isGravityDown = true;
let gameStarted = false;

function createItems() {
    for (let i = 0; i < 5; i++) {
        items.push({
            x: Math.random() * (canvas.width - 20),
            y: Math.random() * (canvas.height - 20),
            width: 20,
            height: 20,
            collected: false
        });
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply gravity
    if (isGravityDown) {
        player.velocityY += player.gravity;
        player.y += player.velocityY;
    } else {
        player.velocityY -= player.gravity;
        player.y -= player.velocityY;
    }

    // Check boundaries
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.velocityY = 0;
        player.isJumping = false;
    } else if (player.y < 0) {
        player.y = 0;
        player.velocityY = 0;
    }

    // Draw player
    ctx.fillStyle = '#61dafb';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw items
    items.forEach(item => {
        if (!item.collected) {
            ctx.fillStyle = 'gold';
            ctx.fillRect(item.x, item.y, item.width, item.height);
            checkCollision(item);
        }
    });

    requestAnimationFrame(update);
}

function checkCollision(item) {
    if (player.x < item.x + item.width &&
        player.x + player.width > item.x &&
        player.y < item.y + item.height &&
        player.y + player.height > item.y) {
        item.collected = true;
        score += 10;
        document.getElementById('score').innerText = `Score: ${score}`;
    }
}

document.getElementById('gravityButton').addEventListener('click', () => {
    isGravityDown = !isGravityDown;
    document.getElementById('gravityMeter').innerText = `Gravity: ${isGravityDown ? 'Down' : 'Up'}`;
});

document.getElementById('startButton').addEventListener('click', () => {
    if (!gameStarted) {
        gameStarted = true;
        document.getElementById('gravityButton').disabled = false;
        createItems();
        update();
    }
});
