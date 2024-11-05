const gameArea = document.getElementById('game-area');
const spaceship = document.getElementById('spaceship');
const debris = document.getElementById('debris');
const resource = document.getElementById('resource');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-button');

let score = 0;
let isGameActive = false;

function startGame() {
    score = 0;
    isGameActive = true;
    scoreDisplay.innerText = `Score: ${score}`;
    moveDebris();
    moveResource();
    document.addEventListener('keydown', moveSpaceship);
}

function moveSpaceship(event) {
    const spaceshipRect = spaceship.getBoundingClientRect();
    if (event.key === 'ArrowLeft' && spaceshipRect.left > 0) {
        spaceship.style.left = `${spaceshipRect.left - 20}px`;
    } else if (event.key === 'ArrowRight' && spaceshipRect.right < gameArea.offsetWidth) {
        spaceship.style.left = `${spaceshipRect.left + 20}px`;
    }
}

function moveDebris() {
    if (!isGameActive) return;
    let debrisTop = 0;
    debris.style.left = `${Math.random() * (gameArea.offsetWidth - 50)}px`;
    const dropInterval = setInterval(() => {
        debrisTop += 5;
        debris.style.top = `${debrisTop}px`;
        if (debrisTop > gameArea.offsetHeight) {
            clearInterval(dropInterval);
            if (isGameActive) {
                moveDebris();
            }
        }
        checkCollision(debris);
    }, 100);
}

function moveResource() {
    if (!isGameActive) return;
    let resourceTop = 0;
    resource.style.left = `${Math.random() * (gameArea.offsetWidth - 50)}px`;
    const dropInterval = setInterval(() => {
        resourceTop += 5;
        resource.style.top = `${resourceTop}px`;
        if (resourceTop > gameArea.offsetHeight) {
            clearInterval(dropInterval);
            if (isGameActive) {
                moveResource();
            }
        }
        checkResourceCollision(resource);
    }, 100);
}

function checkCollision(debris) {
    const spaceshipRect = spaceship.getBoundingClientRect();
    const debrisRect = debris.getBoundingClientRect();
    if (spaceshipRect.left < debrisRect.right &&
        spaceshipRect.right > debrisRect.left &&
        spaceshipRect.top < debrisRect.bottom &&
        spaceshipRect.bottom > debrisRect.top) {
        endGame();
    }
}

function checkResourceCollision(resource) {
    const spaceshipRect = spaceship.getBoundingClientRect();
    const resourceRect = resource.getBoundingClientRect();
    if (spaceshipRect.left < resourceRect.right &&
        spaceshipRect.right > resourceRect.left &&
        spaceshipRect.top < resourceRect.bottom &&
        spaceshipRect.bottom > resourceRect.top) {
        score += 10;
        scoreDisplay.innerText = `Score: ${score}`;
        resource.style.top = '0px'; // Reset resource position
        moveResource();
    }
}

function endGame() {
    isGameActive = false;
    alert(`Game Over! Your score: ${score}`);
    document.removeEventListener('keydown', moveSpaceship);
}

startButton.addEventListener('click', startGame);