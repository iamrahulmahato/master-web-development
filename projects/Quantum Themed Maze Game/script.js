const player = document.getElementById('player');
const goal = document.getElementById('goal');
const maze = document.getElementById('maze');
const restartBtn = document.getElementById('restartBtn');

const mazeWidth = 20; // Number of blocks in width
const mazeHeight = 20; // Number of blocks in height
const blockSize = 20; // Size of each block in pixels

let playerPosition = { x: 0, y: 0 };
let goalPosition = { x: Math.floor(Math.random() * mazeWidth), y: Math.floor(Math.random() * mazeHeight) };

function render() {
    player.style.left = playerPosition.x * blockSize + 'px';
    player.style.top = playerPosition.y * blockSize + 'px';
    goal.style.left = goalPosition.x * blockSize + 'px';
    goal.style.top = goalPosition.y * blockSize + 'px';
}

function movePlayer(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition.y > 0) playerPosition.y--;
            break;
        case 'ArrowDown':
            if (playerPosition.y < mazeHeight - 1) playerPosition.y++;
            break;
        case 'ArrowLeft':
            if (playerPosition.x > 0) playerPosition.x--;
            break;
        case 'ArrowRight':
            if (playerPosition.x < mazeWidth - 1) playerPosition.x++;
            break;
    }
    checkCollision();
    render();
}

function checkCollision() {
    if (playerPosition.x === goalPosition.x && playerPosition.y === goalPosition.y) {
        alert('Congratulations! You reached the quantum goal!');
        resetGame();
    }
}

function resetGame() {
    playerPosition = { x: 0, y: 0 };
    goalPosition = { x: Math.floor(Math.random() * mazeWidth), y: Math.floor(Math.random() * mazeHeight) };
    render();
}

document.addEventListener('keydown', movePlayer);
restartBtn.addEventListener('click', resetGame);

render();
