const gameArea = document.getElementById('game-area');
const diver = document.getElementById('diver');
const shark = document.getElementById('shark');
const treasure = document.getElementById('treasure');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-button');

let score = 0;
let isGameActive = false;

function startGame() {
    score = 0;
    isGameActive = true;
    scoreDisplay.innerText = `Score: ${score}`;
    moveShark();
    moveTreasure();
    document.addEventListener('keydown', moveDiver);
}

function moveDiver(event) {
    const diverRect = diver.getBoundingClientRect();
    if (event.key === 'ArrowUp' && diverRect.top > 0) {
        diver.style.top = `${diverRect.top - 20}px`;
    } else if (event.key === 'ArrowDown' && diverRect.bottom < gameArea.offsetHeight) {
        diver.style.top = `${diverRect.top + 20}px`;
    }
}

function moveShark() {
    if (!isGameActive) return;
    let sharkLeft = gameArea.offsetWidth;
    shark.style.top = `${Math.random() * (gameArea.offsetHeight - 50)}px`;
    const swimInterval = setInterval(() => {
        sharkLeft -= 5;
        shark.style.left = `${sharkLeft}px`;
        if (sharkLeft < 0) {
            clearInterval(swimInterval);
            if (isGameActive) {
                moveShark();
            }
        }
        checkCollision(shark);
    }, 100);
}

function moveTreasure() {
    if (!isGameActive) return;
    let treasureLeft = gameArea.offsetWidth;
    treasure.style.top = `${Math.random() * (gameArea.offsetHeight - 50)}px`;
    const swimInterval = setInterval(() => {
        treasureLeft -= 5;
        treasure.style.left = `${treasureLeft}px`;
        if (treasureLeft < 0) {
            clearInterval(swimInterval);
            if (isGameActive) {
                moveTreasure();
            }
        }
        checkTreasureCollision(treasure);
    }, 100);
}

function checkCollision(shark) {
    const diverRect = diver.getBoundingClientRect();
    const sharkRect = shark.getBoundingClientRect();
    if (diverRect.left < sharkRect.right &&
        diverRect.right > sharkRect.left &&
        diverRect.top < sharkRect.bottom &&
        diverRect.bottom > sharkRect.top) {
        endGame();
    }
}

function checkTreasureCollision(treasure) {
    const diverRect = diver.getBoundingClientRect();
    const treasureRect = treasure.getBoundingClientRect();
    if (diverRect.left < treasureRect.right &&
        diverRect.right > treasureRect.left &&
        diverRect.top < treasureRect.bottom &&
        diverRect.bottom > treasureRect.top) {
        score += 10;
        scoreDisplay.innerText = `Score: ${score}`;
        treasure.style.left = '100%'; // Reset treasure position
        moveTreasure();
    }
}

function endGame() {
    isGameActive = false;
    alert(`Game Over! Your score: ${score}`);
    document.removeEventListener('keydown', moveDiver);
}

startButton.addEventListener('click', startGame);