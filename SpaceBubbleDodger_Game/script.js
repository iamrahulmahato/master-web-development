const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let score = 0;
let bubbles = [];
let gameOver = false;
let level = 1;
let spaceship = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 60,
    height: 60,
    speed: 10 // Increased base speed
};

let bubbleBaseSpeed = 2;
let bubbleSpeedIncrease = 0.5; // Bubble speed increase per level
let spaceshipSpeedIncrease = 2; // Speed increase per level for spaceship

function createBubble() {
    const size = Math.random() * (30 - 10) + 10;
    const x = Math.random() * (canvas.width - size);
    bubbles.push({ x, y: 0, size, speed: bubbleBaseSpeed + bubbleSpeedIncrease * (level - 1) });
}

function drawSpaceship() {
    ctx.save();
    ctx.translate(spaceship.x, spaceship.y);
    
    // Draw the main body
    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    ctx.moveTo(0, -spaceship.height / 2);
    ctx.lineTo(-spaceship.width / 2, spaceship.height / 2);
    ctx.lineTo(spaceship.width / 2, spaceship.height / 2);
    ctx.closePath();
    ctx.fill();

    // Draw the cockpit
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, spaceship.width / 6, 0, Math.PI * 2);
    ctx.fill();

    // Draw the wings
    ctx.fillStyle = '#ff00ff';
    ctx.beginPath();
    ctx.moveTo(-spaceship.width / 2, spaceship.height / 4);
    ctx.lineTo(-spaceship.width, spaceship.height / 2);
    ctx.lineTo(-spaceship.width / 2, spaceship.height / 2);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(spaceship.width / 2, spaceship.height / 4);
    ctx.lineTo(spaceship.width, spaceship.height / 2);
    ctx.lineTo(spaceship.width / 2, spaceship.height / 2);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

function drawBubbles() {
    bubbles.forEach(bubble => {
        ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

function update() {
    if (gameOver) return;

    bubbles.forEach((bubble, index) => {
        bubble.y += bubble.speed;

        // Collision detection
        if (
            bubble.y + bubble.size > spaceship.y - spaceship.height / 2 &&
            bubble.y - bubble.size < spaceship.y + spaceship.height / 2 &&
            bubble.x + bubble.size > spaceship.x - spaceship.width / 2 &&
            bubble.x - bubble.size < spaceship.x + spaceship.width / 2
        ) {
            gameOver = true;
            document.getElementById('game-over').classList.remove('hidden');
            document.getElementById('finalScore').textContent = score;
        }

        if (bubble.y - bubble.size > canvas.height) {
            bubbles.splice(index, 1);
            score++;
            document.getElementById('scoreValue').innerText = score;

            // Level up every 5 points
            if (score % 5 === 0) {
                level++;
                showLevelUpPopup();
                spaceship.speed += spaceshipSpeedIncrease; // Increased speed increment
                bubbleSpeedIncrease += 0.5; // Increase bubble speed increment
                createBubble();
            }
        }
    });

    if (bubbles.length < 5) {
        createBubble();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSpaceship();
    drawBubbles();
}

function gameLoop() {
    update();
    draw();
    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    }
}

document.addEventListener('keydown', (e) => {
    if (gameOver) return;
    const moveDistance = spaceship.speed;
    if (e.code === 'ArrowLeft' && spaceship.x > spaceship.width / 2) {
        spaceship.x = Math.max(spaceship.x - moveDistance, spaceship.width / 2);
    } else if (e.code === 'ArrowRight' && spaceship.x < canvas.width - spaceship.width / 2) {
        spaceship.x = Math.min(spaceship.x + moveDistance, canvas.width - spaceship.width / 2);
    }
});

document.getElementById('restartButton').addEventListener('click', () => {
    score = 0;
    bubbles = [];
    gameOver = false;
    level = 1;
    spaceship.speed = 10; // Reset to new base speed
    document.getElementById('scoreValue').innerText = score;
    document.getElementById('game-over').classList.add('hidden');
    spaceship.x = canvas.width / 2;
    gameLoop();
});

function showLevelUpPopup() {
    const popup = document.getElementById('level-up-popup');
    popup.textContent = `Level Up! Now at Level ${level}`;
    popup.classList.remove('hidden');
    popup.style.opacity = 1;
    setTimeout(() => {
        popup.style.opacity = 0;
        setTimeout(() => {
            popup.classList.add('hidden');
        }, 500);
    }, 2000);
}

// Start the game loop
gameLoop();