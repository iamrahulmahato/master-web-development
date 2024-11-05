const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let character = {
    x: 50,
    y: 300,
    width: 50,
    height: 50,
    speed: 5,
    isJumping: false,
    jumpSpeed: 15,
    gravity: 0.6,
    velocity: 0,
};

let obstacles = [];
let artifacts = [];
let score = 0;
let timeLeft = 60;
let currentEra = 'Prehistoric';
let gameInterval, eraInterval;

function startGame() {
    resetGame();
    gameInterval = setInterval(updateGame, 1000 / 60);
    eraInterval = setInterval(changeEra, 15000); // Change era every 15 seconds
    updateTimer();
}

function resetGame() {
    character.x = 50;
    character.y = 300;
    score = 0;
    timeLeft = 60;
    currentEra = 'Prehistoric';
    updateUI();
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveCharacter();
    drawCharacter();
    handleObstacles();
    handleArtifacts();
    detectCollisions();
}

function moveCharacter() {
    if (character.isJumping) {
        character.velocity -= character.gravity;
        character.y -= character.velocity;

        if (character.y >= 300) {
            character.y = 300;
            character.isJumping = false;
            character.velocity = 0;
        }
    }
}

function drawCharacter() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(character.x, character.y, character.width, character.height);
}

function jump() {
    if (!character.isJumping) {
        character.isJumping = true;
        character.velocity = character.jumpSpeed;
    }
}

function handleObstacles() {
    // Generate obstacles
    if (Math.random() < 0.02) {
        obstacles.push({
            x: canvas.width,
            y: 350,
            width: 30,
            height: 30,
            speed: 5 + Math.floor(score / 100),
        });
    }

    // Move obstacles
    obstacles.forEach((obstacle, index) => {
        obstacle.x -= obstacle.speed;
        ctx.fillStyle = 'red';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1);
        }
    });
}

function handleArtifacts() {
    // Generate artifacts
    if (Math.random() < 0.01) {
        artifacts.push({
            x: canvas.width,
            y: 250,
            width: 20,
            height: 20,
            speed: 5 + Math.floor(score / 100),
        });
    }

    // Move artifacts
    artifacts.forEach((artifact, index) => {
        artifact.x -= artifact.speed;
        ctx.fillStyle = 'green';
        ctx.fillRect(artifact.x, artifact.y, artifact.width, artifact.height);

        if (artifact.x + artifact.width < 0) {
            artifacts.splice(index, 1);
        }
    });
}

function detectCollisions() {
    // Check for obstacle collisions
    obstacles.forEach((obstacle) => {
        if (
            character.x < obstacle.x + obstacle.width &&
            character.x + character.width > obstacle.x &&
            character.y < obstacle.y + obstacle.height &&
            character.y + character.height > obstacle.y
        ) {
            endGame();
        }
    });

    // Check for artifact collection
    artifacts.forEach((artifact, index) => {
        if (
            character.x < artifact.x + artifact.width &&
            character.x + character.width > artifact.x &&
            character.y < artifact.y + artifact.height &&
            character.y + character.height > artifact.y
        ) {
            score += 10;
            artifacts.splice(index, 1);
            updateUI();
        }
    });
}

function updateUI() {
    document.getElementById('eraDisplay').innerText = `Era: ${currentEra}`;
    document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
}

function updateTimer() {
    setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById('timerDisplay').innerText = `Time: ${timeLeft}`;
        } else {
            endGame();
        }
    }, 1000);
}

function changeEra() {
    const eras = ['Prehistoric', 'Medieval', 'Industrial', 'Future'];
    currentEra = eras[(eras.indexOf(currentEra) + 1) % eras.length];
    updateUI();
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(eraInterval);
    alert(`Game Over! Your score: ${score}`);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});
